import React from "react";
import moment from "moment";

export function Event(props) {
  const eventDate = moment(props.date).format("dddd Do MMMM YYYY");
  return <h1>Event on {eventDate} </h1>;
}
