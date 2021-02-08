import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Event } from "./Event";
import { NewEvent } from "./NewEvent";

export function Events(props) {
  // initialise state to set date in calendar selection
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // For privacy can hide URL in .env.development file where it is declared
    fetch(`https://family-matters-api.herokuapp.com/events`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((body) => setEvents(body));
  }, []);
  //   console.log(events);

  return (
    <div>
      <h1>Events Page</h1>
      {/* relative props passed across components */}
      <Calendar onChange={setDate} date={date} />
      <Event date={date} events={events} setEvents={setEvents} />
      <NewEvent events={events} setEvents={setEvents} date={date} />
    </div>
  );
}
