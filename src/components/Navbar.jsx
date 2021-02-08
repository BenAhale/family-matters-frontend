import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

// Navbar separated as own component to shrink code
export function Navbar(props) {

  const [auth, setAuth] = useState(false)
  let history = useHistory("")

  useEffect(() => {
    async function checkAuthStatus() {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/status`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.status >= 400) {
          history.push("/sign-in")
          throw new Error("not authorized");
        } else {
          setAuth(true)
        }
      } catch (err) {
        console.log(err.message);
      }
    }
    checkAuthStatus();
  }, [auth, history]);

  function endSession() {
    localStorage.removeItem("token")
    setAuth(false)
  }

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/events">Events</Link>
      <Link to="/memories">Memories</Link>
      {/* <button onClick={props.endSession}>Sign Out</button> */}
      {auth ? <button onClick={endSession}>Sign Out</button> : [
            <Link to="/sign-in">Sign In</Link>,
            <Link to="/sign-up">Sign Up</Link>
          ]}
    </nav>
  );
}
