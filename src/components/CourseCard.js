import React from 'react';
import styles from './CourseCard.css';

const formatTime = ({ hour, ampm, minutes }) => `${hour}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;

const CourseCard = ({ course }) => {
  const { id, name, units, subcollections } = course;

  return (
    <div className='course-card-containe'>
      <h2>
        {id} {name} ({units} Units)
      </h2>

      {subcollections.map((subcollection) => {
        const { id: subcollectionId, documents } = subcollection;
        const [section0, ...otherSections] = documents;

        return (
          <div key={subcollectionId}>
            <h3>Section {subcollectionId}</h3>
            <h4>Lecture: {section0.secID}</h4>
            <p>Instructor: {section0.instructor}</p>
            <p>
              From {formatTime(section0.fromTime)} to {formatTime(section0.toTime)}
            </p>
            <p>
              Building {section0.building} and Room {section0.room}
            </p>

            <div className='other-sections'>
              {otherSections.map((section) => {
                const hasRemainingSeats = section.seatsLeft !== undefined;
                const isACard = (/^A\d+$/).test(section.secID);

                return (
                  <div
                  key={section.id}
                  className={`section-card${isACard && hasRemainingSeats ? ' section-card-highlighted' : ''}`}
                  >
                    <h5>Section {section.secID}</h5>
                    <p>Instructor: {section.instructor}</p>
                    <p>
                      From {formatTime(section.fromTime)} to {formatTime(section.toTime)}
                    </p>
                    <p>
                      Building {section.building}, room {section.room}
                    </p>
                    {hasRemainingSeats && (
                      <p>Seats remaining: {section.seatsLeft}</p>
                    )}
                    {section.capacity !== undefined && <p>Total seats: {section.capacity}</p>}
                  </div>
                )
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CourseCard;