import React, { useState } from "react";
import CourseCard from "./CourseCard";
import SearchForm from "./SearchForm";
import CalendarComponent from "./CalendarComponent";
import processCourseSection from './processCourseSection.js';
import "./ResultsPage.css";

const ResultsPage = ({ fetchedCourses, onSearch }) => {
  const [events, setEvents] = useState([]);

  return (
    <div className="results-page">
      {/* Content of left half */}
      <div className="left-side">
        <SearchForm onSearch={onSearch} />
        {fetchedCourses.map((course) => (
           <CourseCard
           key={course.id}
           course={course}
           onCourseSelect={(selectedCourse, selectedSection) => {
             processCourseSection(selectedCourse, selectedSection, events, setEvents);
           }}
         />
        ))}
      </div>

      {/* Right half */}
      <div className="right-side">
        <CalendarComponent events={events} />
      </div>
    </div>
  );
};

export default ResultsPage;
