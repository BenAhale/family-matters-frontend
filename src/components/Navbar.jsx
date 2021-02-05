import React from 'react'
import { Link, useHistory } from "react-router-dom";

export function Navbar() {

  function signOut() {
    localStorage.removeItem("token")
<<<<<<< HEAD
=======
    history.push("/")
>>>>>>> c796df86b43c9bba6c67407ba4614232e9d913e0
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