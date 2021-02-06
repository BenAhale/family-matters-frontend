import React, { useState } from "react";
import moment from "moment";
import {
  EventForm,
  EventLabel,
  EventInput,
  EventInputSubmit,
  EventSelect,
} from "../styles/NewEvent";

// create event functionality
export function NewEvent(props) {
  // setting initial states, hooks
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("12:00 AM");
  const eventDate = moment(props.date).format("LL");

  console.log(props);

  async function onFormSubmit(e) {
    e.preventDefault();
    // POST request with fetch, refer to SheetsDB docs
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/events`, {
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
      `${process.env.REACT_APP_BACKEND_URL}/events`,
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
    setTime("12:00 AM");
  }

  return (
    // Event Creation Form
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
        <option value="6:00 AM">6:00 AM</option>
        <option value="6:30 AM">6:30 AM</option>
        <option value="7:00 AM">7:00 AM</option>
        <option value="7:30 AM">7:30 AM</option>
        <option value="8:00 AM">8:00 AM</option>
        <option value="8:30 AM">8:30 AM</option>
        <option value="9:00 AM">9:00 AM</option>
        <option value="9:30 AM">9:30 AM</option>
        <option value="10:00 AM">10:00 AM</option>
        <option value="10:30 AM">10:30 AM</option>
        <option value="11:00 AM">11:00 AM</option>
        <option value="11:30 AM">11:30 AM</option>
        <option value="12:00 PM">12:00 AM</option>
        <option value="12:30 PM">12:30 AM</option>
        <option value="1:00 PM">1:00 PM</option>
        <option value="1:30 PM">1:30 PM</option>
        <option value="2:00 PM">2:00 PM</option>
        <option value="2:30 PM">2:30 PM</option>
        <option value="3:00 PM">3:00 PM</option>
        <option value="3:30 PM">3:30 PM</option>
        <option value="4:00 PM">4:00 PM</option>
        <option value="4:30 PM">4:30 PM</option>
        <option value="5:00 PM">5:00 PM</option>
        <option value="5:30 PM">5:30 PM</option>
        <option value="6:00 PM">6:00 PM</option>
        <option value="6:30 PM">6:30 PM</option>
        <option value="7:00 PM">7:00 PM</option>
        <option value="7:30 PM">7:30 PM</option>
        <option value="8:00 PM">8:00 PM</option>
        <option value="8:30 PM">8:30 PM</option>
        <option value="9:00 PM">9:00 PM</option>
        <option value="9:30 PM">9:30 PM</option>
        <option value="10:00 PM">10:00 PM</option>
        <option value="10:30 PM">10:30 PM</option>
        <option value="11:00 PM">11:00 PM</option>
        <option value="11:30 PM">11:30 PM</option>
        <option value="12:00 AM">12:00 AM</option>
      </EventSelect>
      <EventInputSubmit
        type="submit"
        id="submit"
        value="Submit"
      ></EventInputSubmit>
    </EventForm>
  );
}
