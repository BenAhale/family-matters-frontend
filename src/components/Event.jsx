import React from "react";
import moment from "moment";
import { CardLink } from "../styles/Events";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { UpdateEvent } from "./UpdateEvent";
import styles from "../styles/Events.module.css"
import { faClock, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
    await fetch(`https://family-matters-api.herokuapp.com/events/${event.id}`, {
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
      `https://family-matters-api.herokuapp.com/events`,
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
    <div>
      <h1> {eventDate} </h1>
      {/* uses above filter to map out desired event entries */}
      <div className={styles.eventsContainer}>
        {sortedEvents.map((event, index) => {
          return (
            <div key={event.id} className={styles.eventCard}>
              <h2>{event.name}</h2>
              <p><FontAwesomeIcon icon={faClock} /> {event.time}</p>
              <p><FontAwesomeIcon icon={faInfoCircle} />  {event.description}</p>
              <div className={styles.eventActions}>
                <BrowserRouter>
                  <Link
                    to={{
                      pathname: `/events/${event.id}/edit`,
                    }} className={styles.eventButton}
                  >
                    Edit
                  </Link>
                  <Route
                    path="/events/:id/edit"
                    render={(props) => (
                      <UpdateEvent {...props} setEvents={setEvents} />
                    )}
                  />
                </BrowserRouter>
                <CardLink
                  onClick={(e) => onDeleteClick(e, event)}
                  to={`/events/${event.id}`} className={styles.eventButton}
                >
                  Delete
                </CardLink>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
