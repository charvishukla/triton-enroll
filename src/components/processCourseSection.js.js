// processCourseSection.js
import { parse, nextDay, isPast } from "date-fns";
import { formatDays, formatTime } from "./CourseCard";

const processCourseSection = (selectedCourse, selectedSection, allEvents, setAllEvents) => {
  console.log("Course selected:", selectedCourse);
  console.log("Section selected:", selectedSection);

  const daysString = selectedSection.day;
  const days = formatDays(daysString).split(", ");

  const createEvent = (fromDate, toDate) => {
    const eventData = {
      title: `${selectedCourse.id} - ${selectedCourse.name}`,
      start: fromDate,
      end: toDate,
    };

    setAllEvents(prevEvents => [...prevEvents, eventData]);
  };

  const refDate = new Date('2023-09-25');

  for (let i = 0; i < 10; i++) { // 10 occurrences for each day
    days.forEach((day) => {
      const dayIndex = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].indexOf(day);
      let nextOccurrence = nextDay(refDate, dayIndex);
      nextOccurrence.setDate(nextOccurrence.getDate() + 7 * i);

      let fromHour = parseInt(selectedSection.fromTime.hour, 10);
      if (selectedSection.fromTime.ampm === 'pm' && fromHour !== 12) fromHour += 12;
      if (selectedSection.fromTime.ampm === 'am' && fromHour === 12) fromHour = 0;
      nextOccurrence.setHours(fromHour);
      nextOccurrence.setMinutes(parseInt(selectedSection.fromTime.minutes, 10));

      const toDate = new Date(nextOccurrence);
      let toHour = parseInt(selectedSection.toTime.hour, 10);
      if (selectedSection.toTime.ampm === 'pm' && toHour !== 12) toHour += 12;
      if (selectedSection.toTime.ampm === 'am' && toHour === 12) toHour = 0;
      toDate.setHours(toHour);
      toDate.setMinutes(parseInt(selectedSection.toTime.minutes, 10));

      if (!isPast(nextOccurrence)) {
        createEvent(nextOccurrence, toDate);
      }
    });
  }
};

export default processCourseSection;