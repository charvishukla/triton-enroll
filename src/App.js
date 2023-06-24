import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import SearchForm from "./components/SearchForm";
import ResultsPage from "./components/ResultsPage";
import { db } from "./firebaseConfig.js"; // Import your 'db' object from your Firebase configuration

function App() {
  const [courses, setCourses] = useState([]);

  const fetchCourses = async (subjectCollectionName) => {
    const subjectCourses = await subjectCollectionToJSON(db, subjectCollectionName);
    setCourses(subjectCourses);
    console.log(subjectCourses);
  };

  async function subjectCollectionToJSON(db, subjectCollectionName) {
    let subjectCollectionRef = db.collection(subjectCollectionName);
    const querySnapshot = await subjectCollectionRef.get();

    return (
      await Promise.all(
        querySnapshot.docs.map((doc) => compileCourseDocuments(db, doc.ref))
      )
    ).flat(1);
  }

  async function compileCourseDocuments(db, courseDocumentRef) {
    const courseDocumentData = await courseDocumentRef.get();
    const sectionsRef = courseDocumentRef.collection("sections"); // replace with your subcollection name

    const { id } = courseDocumentData;
    const { name, units } = courseDocumentData.data();

    return compileSectionObjs(sectionsRef, id, name, units);
  }

  async function compileSectionObjs(sectionCollection, id, name, units) {
    const sectionsSnapshot = await sectionCollection.get();

    return {
      courseNum: id,
      courseName: name,
      courseUnits: units,
      sections: sectionsSnapshot.docs.map((doc) => doc.data()),
    };
  }

  const handleSearch = async (department) => {
    await fetchCourses(department);
  };

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={<SearchForm onSearch={handleSearch} />}
        />
        <Route
          path="/results"
          element={<ResultsPage fetchedCourses={courses} />}
        />
      </Routes>
    </div>
  );
}

export default App;