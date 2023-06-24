import React
 from "react";
const CoursesTable = ({ courses }) => {
  // Check if courses.data is an array, otherwise use an empty array
  const data = courses && Array.isArray(courses.data) ? courses.data : [];

  return (
    <table>
      <thead>
        <tr>
          <th>Course Name</th>
          <th>Section ID</th>
          {/* Add other headers as needed */}
        </tr>
      </thead>
      <tbody>
        {data.map((course, index) =>
          course.sections.map((section, idx) => (
            <tr key={index + '_' + idx}>
              <td>{course.courseName}</td>
              <td>{section.secID}</td>
              {/* Add other columns as needed */}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default CoursesTable;