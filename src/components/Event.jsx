import React from "react";
import moment from "moment";

export function Event(props) {
  const eventDate = moment(props.date).format("LL");
  console.log(props.date);
  console.log(props);

  const todaysEvents = props.events.filter((event) => event.date === eventDate);
  console.log(todaysEvents);

  return (
    <div className="event">
      <h1>Event on {eventDate} </h1>
      {todaysEvents.map((event, index) => {
        return (
          <div key={event.id}>
            <h2>{event.name}</h2>
            <p>{event.time}</p>
            <p>{event.description}</p>
          </div>
        );
      })}
    </div>
  );
}
