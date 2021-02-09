import React from 'react'
import { useHistory } from 'react-router-dom'
import styles from '../styles/Home.module.css'

export function Home() {

  let history = useHistory("")

  return (
    <div className={styles.container}>
      <h1>Family Matters.</h1>
      <h3>We're here to help organise your family matters, because we think there's nothing more important than family.</h3>
      <div className={styles.homepageButtons}>
        <button onClick={() => history.push("/sign-in")}>Sign In</button>
        <button onClick={() => history.push("/sign-up")}>Sign Up</button>
      </div>
    </div>
  )
}
