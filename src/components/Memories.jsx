import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom'

export function Memories() {
  const [memories, setMemories] = useState(null);
  let history = useHistory()

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/memories/all`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(response => response.json())
    .then(body => setMemories(body))
  }, []);

  async function deleteMemory(e, id) {
    e.preventDefault()
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/memories/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/memories/all`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(response => response.json())
    .then(body => setMemories(body))
  }

  function newImage() {
    history.push("/memories/new")
  }

  return (
    <div>
      <button onClick={newImage}>New Image</button>
      <h1>Memories Page</h1>
      <div>
        {!(memories === null) && memories.map((memory, index) => { 
          return ([
          <img alt="memory" src={memory.url} key={index}/>,
          <p>{memory.description}</p>,
          <button onClick={(e) => deleteMemory(e, memory.id)}>Delete</button>
          ])
        } ) }
        <p></p>
      </div>

      {/* <img src="https://family-matters.s3.ap-southeast-2.amazonaws.com/98f0ea2b/danandrews.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZPLUNIQPS2V3SGR3%2F20210208%2Fap-southeast-2%2Fs3%2Faws4_request&X-Amz-Date=20210208T040042Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=b3e5ae70cbc335c682d1c96945b3bc1e5b8566c84a4b23224bbea9e16c3661fd"/> */}
      {/* <NewAlbum /> */}
      {/* <Albums albums={albums} /> */}
    </div>
  );
}
