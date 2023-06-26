import React from "react";
import styles from "./CourseCard.css";

export const formatTime = ({ hour, ampm, minutes }) =>
  `${hour}:${minutes < 10 ? "0" + minutes : minutes} ${ampm}`;

  
  export const formatDays = (dayString) => {
    if(dayString === 'TuTh'){
      return 'Tuesday, Thursday';
    }

    const daysMap = { 'M': 'Monday', 'T': 'Tuesday', 'W': 'Wednesday', 'R': 'Thursday', 'F': 'Friday', 'S': 'Saturday', 'U': 'Sunday' };
    const formattedDays = dayString.split("").reduce((acc, char) => {
      if (daysMap[char]) {
        acc.push(daysMap[char]);
      }
      return acc;
    }, []);
  
    console.log(formattedDays.join(', '));
    return formattedDays.join(', ');
  };

  export const CourseCard = ({ course, onCourseSelect }) => {
  const { id, name, units, subcollections } = course;

  return (
    <div className="course-card-container">
      <h2>
        {id} {name} ({units} Units)
      </h2>

      {subcollections.map((subcollection) => {
        const { id: subcollectionId, documents } = subcollection;
        const [section0, ...otherSections] = documents;

        return (
          <div key={subcollectionId}>
            <div
              className={`section-card`}
              onClick={() => onCourseSelect(course, section0)} // Add onClick event handler to make lecture part clickable
              style={{ cursor: "pointer" }}> 
              <h3>Lecture: {section0.secID}</h3>
              <p>Instructor: {section0.instructor}</p>
              <p>Days: {section0.day}</p>
              <p>
                From {formatTime(section0.fromTime)} to {formatTime(section0.toTime)}
              </p>
              <p>
                Building {section0.building} and Room {section0.room}
              </p>
            </div>

            <div className="discussion-sections">
              <h3>Discussion Sections:</h3>
              {otherSections.map((section) => {
                const hasRemainingSeats = section.seatsLeft !== undefined;
                const isACard = /^A\d+$/.test(section.secID);

                return (
                  <div
                    key={section.id}
                    className={`section-card${
                      isACard && hasRemainingSeats ? " section-card-highlighted" : ""
                    }`}

                    onClick={() => onCourseSelect(course, section)}
                    style={{ cursor: "pointer" }} // Make the div appear clickable
                  >
                    <h5>Section {section.secID}</h5>
                    <p>Instructor: {section.instructor}</p>
                    <p>Days: {section.day}</p>
                    <p>
                      From {formatTime(section.fromTime)} to {formatTime(section.toTime)}
                    </p>
                    <p>
                      Building {section.building}, room {section.room}
                    </p>
                    {hasRemainingSeats && (
                      <p>Seats remaining: {section.seatsLeft}</p>
                    )}
                    {section.capacity !== undefined && (
                      <p>Total seats: {section.capacity}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CourseCard;