import React from "react";
import { Link } from "react-router-dom";

// Navbar separated as own component to shrink code
export function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/events">Events</Link>
      <Link to="/memories">Memories</Link>
      <Link to="/groceries">Groceries</Link>
      <Link to="/chores">Chores</Link>
      <Link to="/sign-in">Sign In</Link>
      <Link to="/sign-up">Sign Up</Link>
    </nav>
  );
}
