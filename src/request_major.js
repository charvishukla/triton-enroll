/*
 * Write a javascript function that 
 * accepts the major's code as a parameter
 * and executes a sequence of requests (one
 * request per page of the major) and combines 
 * all the data into a JSON object
 */

const axios = require('axios');

const qs = require('qs');

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
async function pg1_req(term, dep) {
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
    } catch (error) {
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
async function allpgs_req(pg1, term, dep) {


    let dom = new JSDOM(pg1);
    // console.log(typeof(pg1));

    let tablesArr = dom.window.document.querySelectorAll("table");
    //console.log("Number of tables in HTML: " + tablesArr.length);

    if (tablesArr.length > 0) {
        let table = tablesArr[0];
        let row = table.querySelectorAll("tr").item(0);
        let cell = row.querySelectorAll("td").item(2).innerHTML.trim();
        let rx = /\(.*\)/gm;
        let arr = rx.exec(cell.trim());
        let pages = arr[0].replace('&nbsp;of&nbsp;', ' ').replace('(', '').replace(')', '').split(" ").map(str => parseInt(str))[1];
        //console.log("The number of pages is:" + pages);

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
                //console.log("sent request #" + i);
                response_arr.push(response.data);
            } catch (error) {
                console.error(error);
            }

        }
        //console.log(response_arr.length);
        return response_arr;
    }
}


async function buildcombinedJSON(term, dep) {
    const pg1 = await pg1_req(term, dep);
    let first_page = parse.parseHtml(pg1);
    const req_arr = await allpgs_req(pg1, term, dep);
    let remaining_pages = parse.parseHtmlArr(req_arr);
    let res = [];
  
    first_page.forEach(obj => {
      res.push(obj);
    });
  
    remaining_pages.forEach(page => {
      page.forEach(obj => {
        res.push(obj)
      })
    });
  
    // Save the data to LocalStorage
    const resultJSONString = JSON.stringify({ "data": res }, null, 2);
    localStorage.setItem(`combined_${term}_${dep}`, resultJSONString);
  
    return resultJSONString;
  }
  

buildcombinedJSON("WI23", "CSE");

module.exports = {
    buildcombinedJSON: buildcombinedJSON,
    allpgs_req: allpgs_req,
    pg1_req: pg1_req
}

