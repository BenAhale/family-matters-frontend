import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Event } from "./Event";
import { NewEvent } from "./NewEvent";
import styles from "../styles/Events.module.css"
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function Events(props) {
  // initialise state to set date in calendar selection
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [eventDisplay, setEventDisplay] = useState("none")

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

  function toggleDisplay() {
    switch (eventDisplay) {
      case "block":
        setEventDisplay("none")
        break;
      case "none":
        setEventDisplay("block")
        break;
      default:
        setEventDisplay("none")
    }
  }

  return (
    <div>
      <div className={styles.headerRow}>
        <h1>Events</h1>
        <button onClick={toggleDisplay}><FontAwesomeIcon icon={faPencilAlt} /> New Event</button>
      </div>
      {/* relative props passed across components */}
      <div className={styles.calendarRow}>
        <Calendar onChange={setDate} date={date} className={styles.eventsCalendar} />
        <div className={styles.newEventForm} style={{display: eventDisplay}}>
          <h3>New Event</h3>
          <NewEvent events={events} setEvents={setEvents} date={date} />
        </div>
      </div>
      <div className={styles.eventsRow}>
        <Event date={date} events={events} setEvents={setEvents} />
      </div>
    </div>
  );
}
