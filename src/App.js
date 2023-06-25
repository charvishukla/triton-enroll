import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import SearchForm from "./components/SearchForm";
import ResultsPage from "./components/ResultsPage";
import axios from "axios"; // Import axios for making API requests

function App() {
  const [courses, setCourses] = useState([]);

  const handleSearch = async (department) => {
    try {
      const response = await axios.get(
        `http://localhost:3002/api/courses/${department}`
      ); // replace 'localhost:3002' with your server's base URL
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching course data:", error);
    }
  };

  // return (
  //   <div className="App">
  //     <Routes>
  //       <Route
  //         path="/"
  //         element={<SearchForm onSearch={handleSearch} />}
  //       />
  //       <Route
  //         path="/results"
  //         element={<ResultsPage fetchedCourses={courses} />}
  //       />
  //     </Routes>
  //   </div>
  // );
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={<SearchForm onSearch={handleSearch} />}
        />
        {/* Pass the handleSearch function to ResultsPage as onSearch prop */}
        <Route
          path="/results"
          element={<ResultsPage fetchedCourses={courses} onSearch={handleSearch} />}
        />
      </Routes>
    </div>
  );
}

export default App;