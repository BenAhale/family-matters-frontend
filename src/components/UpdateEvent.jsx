import React, { useState, useEffect } from "react";
import moment from "moment";
import {
  EventForm,
  EventLabel,
  EventInput,
  EventInputSubmit,
  EventSelect,
} from "../styles/NewEvent";

// Update Event Functionality
export function UpdateEvent(props) {
  // setting initial states, hooks
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("12:00 AM");
  const eventDate = moment(props.date).format("LL");
  const id = props.match.params.id;

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/events/${id}`, {
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
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/events/${id}`, {
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
      `${process.env.REACT_APP_BACKEND_URL}/events`,
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
    <EventForm onSubmit={onFormSubmit}>
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
        value={time}
        onChange={(e) => setTime(e.target.value)}
      >
        <option value="6:00">6:00</option>
        <option value="6:30">6:30</option>
        <option value="7:00">7:00</option>
        <option value="7:30">7:30</option>
        <option value="8:00">8:00</option>
        <option value="8:30">8:30</option>
        <option value="9:00">9:00</option>
        <option value="9:30">9:30</option>
        <option value="10:00">10:00</option>
        <option value="10:30">10:30</option>
        <option value="11:00">11:00</option>
        <option value="11:30">11:30</option>
        <option value="12:00">12:00</option>
        <option value="12:30">12:30</option>
        <option value="13:00">13:00</option>
        <option value="13:30">13:30</option>
        <option value="14:00">14:00</option>
        <option value="14:30">14:30</option>
        <option value="15:00">15:00</option>
        <option value="15:30">15:30</option>
        <option value="16:00">16:00</option>
        <option value="16:30">16:30</option>
        <option value="17:00">17:00</option>
        <option value="17:30">17:30</option>
        <option value="18:00">18:00</option>
        <option value="18:30">18:30</option>
        <option value="19:00">19:00</option>
        <option value="19:30">19:30</option>
        <option value="20:00">20:00</option>
        <option value="20:30">20:30</option>
        <option value="21:00">21:00</option>
        <option value="21:30">21:30</option>
        <option value="22:00">22:00</option>
        <option value="22:30">22:30</option>
        <option value="23:00">23:00</option>
        <option value="23:30">23:30</option>
        <option value="0:00">0:00</option>
      </EventSelect>
      <EventInputSubmit
        type="submit"
        id="submit"
        value="Submit"
      ></EventInputSubmit>
    </EventForm>
  );
}
