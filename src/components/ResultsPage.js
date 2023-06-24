import React from "react";

const ResultsPage = ({ fetchedCourses }) => {
  return (
    <div>
      <h1>Results</h1>
      <pre>{JSON.stringify(fetchedCourses, null, 2)}</pre>
    </div>
  );
};

export default ResultsPage;