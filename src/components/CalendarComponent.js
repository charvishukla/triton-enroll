import React from 'react';
import moment from 'moment';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import ICAL from 'ical.js';

const localizer = momentLocalizer(moment);

const downloadICS = (events) => {
  const calendar = new ICAL.Component(['vcalendar', [], []]);

  events.forEach((event) => {
    const vevent = new ICAL.Component('vevent');
    vevent.addPropertyWithValue('dtstart', ICAL.Time.fromJSDate(event.start));
    vevent.addPropertyWithValue('dtend', ICAL.Time.fromJSDate(event.end));
    vevent.addPropertyWithValue('summary', event.title);
    // vevent.addPropertyWithValue('description', event.description);
    // vevent.addPropertyWithValue('location', event.location);

    calendar.addSubcomponent(vevent);
  });

  const icsData = calendar.toString();
  const blob = new Blob([icsData], { type: 'text/calendar' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = 'react-calendar.ics';
  a.click();
  URL.revokeObjectURL(url);
};

const CalendarComponent = ({ events }) => {
  const defaultDate = new Date(2023, 8, 28, 10, 0); // September 28, 2023

  return (
    <div className="calendar">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{
          height: 800,
        }}
        defaultView={Views.WEEK}
        views={{
          week: true,
        }}
        defaultDate={defaultDate}
      />
      <div className='DownloadCalendarButton'> 
      <p>Download your schedule here:</p>
      <button onClick={() => downloadICS(events)}>Download Calendar</button>
      </div>
    </div>
  );
};

export default CalendarComponent;