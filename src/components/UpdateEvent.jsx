import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom'
import moment from "moment";
import {
  EventForm,
  EventLabel,
  EventInput,
  EventInputSubmit,
  EventSelect,
} from "../styles/NewEvent";
import styles from "../styles/Events.module.css"
import { TimeSelection } from "../utils/TimeSelection";

// Update Event Functionality
export function UpdateEvent(props) {
  // setting initial states, hooks
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("12:00 AM");
  const eventDate = moment(props.date).format("LL");
  const id = props.match.params.id;
  let history = useHistory("")

  useEffect(() => {
    fetch(`https://family-matters-api.herokuapp.com/events/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((event) => {
        setName(event.name);
        setDescription(event.description);
        setTime(event.time);
      });
  }, [id]);

  async function onFormSubmit(e) {
    e.preventDefault();
    // PUT request with fetch
    await fetch(`https://family-matters-api.herokuapp.com/events/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        event: {
          name: name,
          description: description,
          time: time,
          date: eventDate,
        },
      }),
    });

    // resets state to render again with newly updated event
    const response = await fetch(
      `https://family-matters-api.herokuapp.com/events`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const events = await response.json();
    props.setEvents(events);
    props.history.push("/events");
  }

  return (
    <div className={styles.editEventContainer}>
      <h2>Edit Event</h2>
      <EventForm class={styles.editEventForm} onSubmit={onFormSubmit}>
        <EventLabel htmlFor="name">Event Name:</EventLabel>
        <EventInput
          type="text"
          name="name"
          id="name"
          value={name}
          placeholder="e.g. Soccer Game"
          onChange={(e) => setName(e.target.value)}
        />
        <EventLabel htmlFor="description">Event Details:</EventLabel>
        <EventInput
          type="text"
          name="description"
          id="description"
          value={description}
          placeholder="Details..."
          onChange={(e) => setDescription(e.target.value)}
        />
        <EventLabel htmlFor="time">Time</EventLabel>
        <EventSelect
          name="time"
          id="time"
          selected="6:00"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        >
          <TimeSelection />
        </EventSelect>
        <EventInputSubmit
          type="submit"
          id="submit"
          value="Submit"
        ></EventInputSubmit>
        <button onClick={() => history.push("/events")}>Back</button>
      </EventForm>
    </div>
  );
}
