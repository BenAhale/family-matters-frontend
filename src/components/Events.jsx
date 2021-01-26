import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Event } from "./Event";

export function Events() {
  const [date, setDate] = useState(new Date());
  console.log(date.toLocaleDateString());

  return (
    <div>
      <h1>Events Page</h1>
      <Calendar onChange={setDate} date={date} />
      <Event date={date} />
    </div>
  );
}
