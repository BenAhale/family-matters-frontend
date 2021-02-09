import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import '../styles/Navbar.module.css'
import { faHome, faCalendar, faImages, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from '../styles/Navbar.module.css'
import {Animated} from "react-animated-css";

// Navbar separated as own component to shrink code
export function Navbar(props) {

  const [navDisplay, setNavDisplay] = useState(false)
  const [auth, setAuth] = useState(false)
  let history = useHistory("")
  let height = window.innerHeight;

  // document.getElementById("navbar").addEventListener("mouseover", showNav)

  useEffect(() => {
    async function checkAuthStatus() {
      try {
        const response = await fetch(`https://family-matters-api.herokuapp.com/status`, {
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

  function toggleNav() {
    switch (navDisplay) {
      case true:
        setNavDisplay(false)
        break;
      case false:
        setNavDisplay(true)
        break;
      default:
        setNavDisplay(false)
    }
  }

  return (
    <>
      <nav id="navbar">
        <button onClick={toggleNav} className={styles.menuButton}><FontAwesomeIcon icon={faBars} /></button>
        <ul className="navlinks">
          <li key="home"><Link to="/"><FontAwesomeIcon icon={faHome} /></Link></li>
          <li key="calendar"><Link to="/events"><FontAwesomeIcon icon={faCalendar} /></Link></li>
          <li key="memories"><Link to="/memories"><FontAwesomeIcon icon={faImages} /></Link></li>
        </ul>
        <ul className="account-links">
          {auth ? <li key="signout"><button className={styles.signOut} onClick={endSession}>Sign Out</button></li> : <button className={styles.signIn} onClick={() => history.push("/sign-in")}>Sign In</button>}
        </ul>
      </nav>
      <Animated animationIn="fadeInLeft" animationOut="fadeOut" isVisible={navDisplay}>
        <div id="expandedNav" className={styles.expandedNav} >
          <div className={styles.innerNavContainer}>
            <h1>Family Matters</h1>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/events">Events</Link></li>
              <li><Link to="/memories">Memories</Link></li>
            </ul>
            <div className={styles.flexHolder}></div>
          </div>
        </div>
      </Animated>
    </>
  );
}
