import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Event } from "./Event";

export function Events() {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  //   console.log(date.toLocaleDateString());

  useEffect(() => {
    // For privacy can hide URL in .env.development file where it is declared
    fetch(`${process.env.REACT_APP_DUMMY_API}`)
      .then((response) => response.json())
      .then((body) => setEvents(body));
  }, []);
  //   console.log(events);

  return (
    <div>
      <h1>Events Page</h1>
      <Calendar onChange={setDate} date={date} />
      <Event date={date} events={events} />
    </div>
  );
}
