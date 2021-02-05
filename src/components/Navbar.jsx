import React from 'react'
import { Link, useHistory } from "react-router-dom";

export function Navbar() {

  function signOut() {
    localStorage.removeItem("token")
    history.push("/")
  }

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/events">Events</Link>
      <Link to="/memories">Memories</Link>
      <Link to="/groceries">Groceries</Link>
      <Link to="/chores">Chores</Link>
      <Link to="/sign-in">Sign In</Link>
      <Link to="/sign-up">Sign Up</Link>
      <button type="button" onClick={signOut()}>
      </button>
    </nav>
  )
}