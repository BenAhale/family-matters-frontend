import React, { useState, useEffect } from "react";
import styles from '../styles/Memories.module.css'
import {ImageForm} from './ImageForm'
import { faPencilAlt, faExclamationCircle, faStickyNote, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function Memories() {
  const [memories, setMemories] = useState(null);
  const [formDisplay, setFormDisplay] = useState("none")

  useEffect(() => {
    fetch(`https://family-matters-api.herokuapp.com/memories/all`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(response => response.json())
    .then(body => setMemories(body))
  }, [memories]);

  async function deleteMemory(e, id) {
    e.preventDefault()
    await fetch(`https://family-matters-api.herokuapp.com/memories/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
    await fetch(`https://family-matters-api.herokuapp.com/memories/all`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(response => response.json())
    .then(body => setMemories(body))
  }

  function toggleDisplay() {
    switch (formDisplay) {
      case "block":
        setFormDisplay("none")
        break;
      case "none":
        setFormDisplay("block")
        break;
      default:
        setFormDisplay("none")
    }
  }

  return (
    <div>
      <div className={styles.headerSection}>
        <h1>Memories</h1>
        <button onClick={toggleDisplay}><FontAwesomeIcon icon={faPencilAlt} /> New Memory</button>
      </div>
      <div className={styles.newImageForm} style={{display: formDisplay}}>
        <ImageForm />
      </div>
      <div className={styles.memoriesContainer}>
        {/* {console.log(memories)} */}
        { (memories === null || memories.length === 0) && <div className={styles.noMemoriesMsg}><h2><FontAwesomeIcon icon={faExclamationCircle} /></h2><p>Uh oh, you haven't added any memories yet!</p></div> }
        {!(memories === null) && memories.map((memory, index) => { 
          return (
          <div className={styles.memoryCard}>
            <img alt="memory" src={memory.url} key={index}/>
            <p>{memory.description}</p>
            <p><button onClick={(e) => deleteMemory(e, memory.id)}><FontAwesomeIcon icon={faTrash} /> Delete</button></p>
          </div>)
        } ) }
        <p></p>
      </div>
    </div>
  );
}
