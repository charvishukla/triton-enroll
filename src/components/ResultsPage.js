import React from 'react';
import CourseCard from './CourseCard';
import SearchForm from './SearchForm';

const ResultsPage = ({ fetchedCourses, onSearch }) => {
  return (
    <div className="results-page">
      {/* Add the SearchForm component */}
      <SearchForm onSearch={onSearch} />
      {fetchedCourses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
};

// UNCOMMENT THIS TO SEE JUST THE JSON RESPONSE

// const ResultsPage = ({ fetchedCourses }) => {
//   return (
//     <div>
//       <h1>Results</h1>
//       <pre>{JSON.stringify(fetchedCourses, null, 2)}</pre>
//     </div>
//   );
// };


export default ResultsPage;







