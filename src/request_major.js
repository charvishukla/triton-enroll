/*
 * Write a javascript function that 
 * accepts the major's code as a parameter
 * and executes a sequence of requests (one
 * request per page of the major) and combines 
 * all the data into a JSON object
 */

const axios = require('axios');

const qs = require('qs');
const fs = require('fs');
const jsdom = require("jsdom");
const {
    JSDOM
} = jsdom;

const parse = require('./parse_single_department.js');


let fetchfrom = 'https://act.ucsd.edu/scheduleOfClasses/scheduleOfClassesStudentResult.htm';

/**
 * @param {String} term 
 * @param {String} dep 
 * 
 * Returns the first page of schedule for a given term and department 
 */
export async function pg1_req(term, dep) {
    const data = {
        'selectedTerm': term,
        'selectedSubjects': dep, 
        '_selectedSubjects': '1',
        'schedOption1': 'true',
        '_schedOption1': 'on',
        '_schedOption11': 'on',
        '_schedOption12': 'on',
        'schedOption2': 'true',
        '_schedOption2': 'on',
        '_schedOption4': 'on',
        '_schedOption5': 'on',
        '_schedOption3': 'on',
        '_schedOption7': 'on',
        '_schedOption8': 'on',
        '_schedOption13': 'on',
        '_schedOption10': 'on',
        '_schedOption9': 'on'
    }

    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    try {
        const response = await axios.post(fetchfrom, qs.stringify(data), config);
        return response.data;
    } 
    catch (error) {
        console.error(error);
    }

}
/**
 * @param {String} term 
 * @param {String} dep 
 * 
 * - gets responses for all the pages related to a given department
 * - saves all these responses in an array
 */
export async function allpgs_req(term, dep) {
    // check if there are multiple pages 
    const pg1 = await pg1_req(term, dep);
    let dom = new JSDOM(pg1);
    // console.log(typeof(pg1));

    let tablesArr = dom.window.document.querySelectorAll("table");
    console.log("Number of tables in HTML: " + tablesArr.length);

    if (tablesArr.length > 0) {
        let table = tablesArr[0];
        let row = table.querySelectorAll("tr").item(0);
        let cell = row.querySelectorAll("td").item(2).innerHTML.trim();
        let rx = /\(.*\)/gm;
        let arr = rx.exec(cell.trim());
        let pages = arr[0].replace('&nbsp;of&nbsp;', ' ').replace('(', '').replace(')', '').split(" ").map(str => parseInt(str))[1];
        console.log("The number of pages is:" + pages);

        let response_arr = [];
        for (let i = 2; i <= pages; i++) {
            let new_url = fetchfrom + `?page=${i}`
            // data remains same 
            const data = {
                'selectedTerm': term,
                'selectedSubjects': dep
            }
            // config remains same 
            const config = {
                timeout: 20000,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            };
            
            try {
                const response = await axios.post(new_url, qs.stringify(data), config);

                await new Promise(resolve => setTimeout(resolve, 8000));

                //return response.data;
                console.log("sent request #" +  i)
                response_arr.push(response.data);
            } 
            catch (error) {
                console.error(error);
            }
            
        }
        console.log(response_arr.length);
        return response_arr;   
    }
}


/**
 * 
 * @param {*} term 
 * @param {*} dep 
 * @returns 
 */
export async function buildcombinedJSON(term, dep){
    const pg1 = await pg1_req(term, dep); // html
    let first_page = parse.parseHtml(pg1); // parse 

    const req_arr = await allpgs_req(term, dep); // array of htmls 
    let remaining_pages = parse.parseHtmlArr(req_arr); // json array 
    
    let all = [first_page, ...remaining_pages];

    let res = {
        dep: all
    }
    
    fs.writeFileSync('test.json', JSON.stringify(res) , {
        encoding: 'utf-8', 
        flag: "w"
    }); 

    return res;
}


buildcombinedJSON("WI22", "CSE");


// module.exports = {
//     buildcombinedJSON: buildcombinedJSON, 
//     allpgs_req: allpgs_req, 
//     pg1_req: pg1_req
// }