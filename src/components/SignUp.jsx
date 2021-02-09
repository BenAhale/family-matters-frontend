import React, { useState } from "react";
import styles from '../styles/SignIn.module.css'

export function SignUp({ history }) {
  // setting initial states, hooks
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [familyID, setFamilyID] = useState("");

  async function onFormSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch(
        `https://family-matters-api.herokuapp.com/auth/sign-up`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: {
              email,
              password,
              first_name: firstName,
              last_name: lastName,
              family_id: familyID,
            },
          }),
        }
      );
      if (response.status >= 400) {
        throw new Error("incorrect credentials");
      } else {
        const { jwt } = await response.json();
        console.log(jwt);
        localStorage.setItem("token", jwt);
        history.push("/");
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <div className={styles.formContainer}>
      <h1>Sign Up</h1>
      <form onSubmit={onFormSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="firstname">First Name</label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="familyid">Family Code</label>
          <p className={styles.fadedText}>(Leave blank to create a new family)</p>
          <input
            type="text"
            name="familyid"
            id="familyid"
            value={familyID}
            onChange={(e) => setFamilyID(e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <input type="submit" value="Submit" />
          <button className={styles.redirectButton} onClick={() => history.push("/sign-in")}>Sign In</button>
        </div>
      </form>
    </div>
  );
}
