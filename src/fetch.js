const fs = require("fs");
const db = getFirestore();

var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");
const { getFirestore } = require("firebase-admin/firestore");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});



async function subjectCollectionToJSON(db, subjectCollectionName) {
  let subjectCollectionRef = db.collection(subjectCollectionName);
  let courseDocumentArr = await subjectCollectionRef.listDocuments();
  return (
    await Promise.all(courseDocumentArr.map(compileCourseDocuments))
  ).flat(1);
}

async function compileCourseDocuments(courseDocumentRef) {
  let courseDocumentData = await courseDocumentRef.get();
  let sectionCollectionArr = await courseDocumentRef.listCollections();
  let { id } = courseDocumentData;
  let { name, units } = courseDocumentData.data();
  return await Promise.all(
    sectionCollectionArr.map(async (sectionCollection) =>
      compileSectionObjs(sectionCollection, id, name, units)
    )
  );
}

async function compileSectionObjs(sectionCollection, id, name, units) {
  return {
    courseNum: id,
    courseName: name,
    courseUnits: units,
    sections: await collectionDocsToJSONArr(sectionCollection),
  };
}

async function collectionDocsToJSONArr(sectionCollection) {
  let sectionDocumentRefs = await sectionCollection.listDocuments();
  return await Promise.all(sectionDocumentRefs.map(documentFieldsToJSON));
}

async function documentFieldsToJSON(documentRef) {
  return (await documentRef.get()).data();
}

function main() {
  subjectCollectionToJSON(db, "CSE").then((res) => {
    localStorage.setItem("fetchResult", JSON.stringify({ data: res }));
  });
}

main();