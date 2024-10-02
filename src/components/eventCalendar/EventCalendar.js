import React from 'react';
import './EventCalendar.css';

function EventCalendar({ events }) {
  console.log("events in componenets: " , events);
  return (
    <div className="event-calendar">
      {events.length===0 ? (<p>there is no events to load yet !</p>) :
       (events.map((event, index) => (
          <div key={index} className="event-item">
            <h4>{event.title}</h4>
            <p>{event.date} - {event.location}</p>
            <p>{event.type}</p>
          </div>
        ))
      )

      }
    </div>
  );
}

export default EventCalendar;
