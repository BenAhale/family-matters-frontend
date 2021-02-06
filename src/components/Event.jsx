import React from "react";
import moment from "moment";
import { CardLink } from "../styles/Events";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { UpdateEvent } from "./UpdateEvent";

export function Event(props) {
  // props passed through
  const eventDate = moment(props.date).format("LL");
  const setEvents = props.setEvents;

  // filter to display events that are on calendar date clicked on
  const todaysEvents = props.events.filter((event) => event.date === eventDate);

  const sortedEvents = todaysEvents.sort((a, b) =>
    a.time > b.time ? 1 : b.time > a.time ? -1 : 0
  );

  // delete event functionality
  async function onDeleteClick(e, event) {
    e.preventDefault();
    // DELETE request with fetch
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/events/${event.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        event: {
          id: event.id,
          name: event.name,
          description: event.description,
          time: event.time,
          date: event.date,
        },
      }),
    });

    // resets state to render again without deleted event
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/events`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const events = await response.json();

    props.setEvents(events);
  }

  return (
    <div className="event">
      <h1>Event on {eventDate} </h1>
      {/* uses above filter to map out desired event entries */}
      {sortedEvents.map((event, index) => {
        return (
          <div key={event.id}>
            <h2>{event.name}</h2>
            <p>{event.time}</p>
            <p>{event.description}</p>
            <CardLink
              onClick={(e) => onDeleteClick(e, event)}
              to={`/events/${event.id}`}
            >
              Delete Event
            </CardLink>
            <BrowserRouter>
              <Link
                to={{
                  pathname: `/events/${event.id}/edit`,
                }}
              >
                Update Event
              </Link>
              <Route
                path="/events/:id/edit"
                render={(props) => (
                  <UpdateEvent {...props} setEvents={setEvents} />
                )}
              />
            </BrowserRouter>{" "}
          </div>
        );
      })}
    </div>
  );
}
