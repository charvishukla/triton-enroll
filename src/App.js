import React, { useState } from 'react';
import axios from 'axios';
import SearchForm from './components/SearchForm';
import CoursesTable from './components/CoursesTable';

function App() {
  const [courses, setCourses] = useState([]);
  

  const fetchCourses = async (majorCode) => {
    try {
      console.log('Major code:', majorCode);
      const response = await axios.get(`http://localhost:3002/api/courses/${majorCode}`)
      
      // Set the fetched data in the courses state
      setCourses(response.data);
    } catch (error) {
      console.error(`Error fetching courses: ${error}`);
    }
  };

  return (
    
    <div className="App">
      <div className='Header'> 
        <h1> Triton-Enroll</h1>
      </div>
      <SearchForm onSearch={fetchCourses} />
      <CoursesTable courses={courses} />
    </div>
    
  );
}

export default App;