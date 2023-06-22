var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");

// DATA DEFINITION
// SubjectCollection (CSE)
//     CourseDocument (11)
//        CourseFields ({ name, units })
//        SectionCollection (A)
//            SectionDocument (0)
//                SectionFields ({ ... })
//            SectionDocument (1)
//                SectionFields ({ ... })
//            SectionDocument (2)
//        SectionCollection (B)
// 
//     CourseDocument (8A)
// 
// SubjectCollection (BIMM)
// . . . . 
// SubjectCollection (AAS)
// . . . . 

const {
  getFirestore
} = require("firebase-admin/firestore");
const jsdom = require("jsdom");
const {
  JSDOM
} = jsdom;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});



const fs = require('fs')
const axios = require('axios');
const generatejson = require('./request_major.js');


const db = getFirestore()



let url = "https://act.ucsd.edu/scheduleOfClasses/scheduleOfClassesStudentResult.htm";
let QTR = 'WI23'

function getSubjectUrl(qtr) {
  return `https://act.ucsd.edu/scheduleOfClasses/subject-list.json?selectedTerm=${qtr}`
}



const assert = require('assert');
const {
  exit
} = require("process");

const chalk = require('chalk');


function populateDB(courseCode) {

  // Right now, we just get from test/combined.json
  let fileData = fs.readFileSync('./test/combined.json')
  let json = JSON.parse(fileData)
  let data = json.data;

  assert(data.length > 0, 'data should not be empty')

  for (let i = 0; i < data.length; i++) {
    const obj = data[i];

    assert(obj.hasOwnProperty('courseDep'), 'courseDep DNE')
    const courseDep = obj.courseDep;
    assert(obj.hasOwnProperty('courseNum'), 'courseNum DNE')
    const courseNum = obj.courseNum;
    assert(obj.hasOwnProperty('courseName'), 'courseName DNE')
    const courseName = obj.courseName;
    assert(obj.hasOwnProperty('courseUnits'), 'courseUnits DNE')
    const courseUnits = obj.courseUnits;
    assert(obj.hasOwnProperty('sections'), 'sections DNE')
    const sections = obj.sections;

    console.log(chalk.red(`SubjectCollection (${courseCode})`));
    let collection = db.collection(`${courseCode}`);
    console.log(chalk.blue(`    CourseDocument (${courseNum})`));
    let document = collection.doc(`${courseNum}`);
    console.log(chalk.green(`        CourseFields (${JSON.stringify({ name: courseName, units: courseUnits })})`));
    
    document.set({
      name: courseName,
      units: courseUnits
    })

    for (let j = 0; j < sections.length; j++) {
      const section = sections[j];
      assert(section.hasOwnProperty('secID'), 'sectionId DNE')
      let secID = section.secID
      let {
        sectionName,
        sectionNumber
      } = parseSectionId(secID)

      console.log(chalk.yellow(`        SectionCollection (${sectionName})`));
      let section_collection = document.collection(`${sectionName}`);
      
      console.log(chalk.red(`            SectionCollection (${sectionNumber})`));
      let single_section = section_collection.doc(`${sectionNumber}`)
      
      console.log(chalk.green(`                SectionFields (${JSON.stringify({
        room: section.room,
        building: section.building
      })})`))

      
      single_section.set(section)
    }
  }
}

function parseSectionId(str) {
  if (/^\d+$/.test(str)) { // isNumber? 
    return ({
      sectionName: 'seminar',
      sectionNumber: Number(str)
    })
  } else {
    return ({
      sectionName: str.substring(0, 1),
      sectionNumber: Number(str.substring(1))
    })
  }

}

function getSubs(qtr) {
  axios.get(getSubjectUrl(qtr))
    .then(response => {
      let data = response.data;
      // console.log(data);
      return data;
    })
    .catch(error => {
      console.log(error);
    });
}



getSubs('WI23')











// .collection("section1").set({
//   "instructionType": "LE",
//   "secID": "A00",
//   "day": "TuTh",
//   "fromTime": {
//     "hour": 2,
//     "minutes": 0,
//     "ampm": "pm"
//   },
//   "toTime": {
//     "hour": 3,
//     "minutes": 20,
//     "ampm": "pm"
//   },
//   "building": "PETER",
//   "room": "102",
//   "instructor": "Butler, Elizabeth Annette"
// })
//db.collection("collection_a").doc("doc_b").set({ json : "value"});
/**
 * save the object  --> requestmajor 
 * 
 */