import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import SearchForm from "./components/SearchForm";
import ResultsPage from "./components/ResultsPage";
import GitHubPage from "./components/GitHubInf";
import AboutPage from "./components/AboutPage";

import axios from "axios"; // Import axios for making API requests
import styles from "./App.css";


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

  return (
    <div className="App">
      <nav>
        {/* Define two Links in the navbar */}
        <Link to="/">Home Page</Link>
        <Link to="/github">GitHub</Link>
        <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            <div className="App">
              <h1> Triton Enroll</h1>
              <h2> Making organizing cleaner</h2>
              <SearchForm onSearch={handleSearch} />
            </div>
          }
        />
        <Route
          path="/results"
          element={
            <div className="App">
              <ResultsPage fetchedCourses={courses} onSearch={handleSearch} />
            </div>
          }
        />
        <Route
          path="/github"
          element={
            <div className="App">
              <GitHubPage />
            </div>
          }
        />
        <Route
          path="/about"
          element={
            <div className="App">
              <AboutPage />
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
