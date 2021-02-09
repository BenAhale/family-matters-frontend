import React, { useState } from "react";
import moment from "moment";
import {
  EventForm,
  EventLabel,
  EventInput,
  EventInputSubmit,
  EventSelect,
} from "../styles/NewEvent";
import { TimeSelection } from "../utils/TimeSelection";

// create event functionality
export function NewEvent(props) {
  // setting initial states, hooks
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("0:00");
  const eventDate = moment(props.date).format("LL");

  console.log(props);

  async function onFormSubmit(e) {
    e.preventDefault();
    // POST request with fetch, refer to SheetsDB docs
    await fetch(`https://family-matters-api.herokuapp.com/events`, {
      method: "POST",
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

    const response = await fetch(
      `https://family-matters-api.herokuapp.com/events`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const events = await response.json();

    // resets new event form back to placeholders/initial state
    props.setEvents(events);
    setName("");
    setDescription("");
    setTime("0:00");
  }

  return (
    // Event Creation Form
    <EventForm onSubmit={onFormSubmit}>
      <EventLabel htmlFor="name">Name</EventLabel>
      <EventInput
        type="text"
        name="name"
        id="name"
        value={name}
        placeholder="e.g. Soccer Game"
        onChange={(e) => setName(e.target.value)}
      />
      <EventLabel htmlFor="description">Details</EventLabel>
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
        <TimeSelection />
      </EventSelect>
      <EventInputSubmit
        type="submit"
        id="submit"
        value="Submit"
      ></EventInputSubmit>
    </EventForm>
  );
}
