import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

export function ImageForm() {

  const [picture, setPicture] = useState("Original Value");
  let url = ""
  let history = useHistory();
  const [description, setDescription] = useState("")

  const onChangeHandler = (e) => {
    setPicture(e.target.files[0])
  }

  const descriptionHandler = (e) => {
    setDescription(e.target.value)
  }

  async function onFormSubmit(e) {
    e.preventDefault();
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/memories/url`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        image: {
          name: picture.name
        },
      }),
    })
    .then((response) => response.json())
    .then((body) => {
      url = body.url
    })
    .then(uploadFile)
  }

  async function uploadFile() {
    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": ""
      },
      body: picture
    })
    .then(response => console.log(response))
    .then(updateDatabase)
    .catch(error => console.log(error))
  }

  async function updateDatabase() {
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/memories/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        image: {
          name: picture.name,
          description: description,
        }
      })
    })
    .then(response => response.json())
    .then(body => console.log(body))
    .then(history.push("/memories"))
    .catch(error => console.log(error))
  }

  // async function getImage() {
  //   await fetch(`${process.env.REACT_APP_BACKEND_URL}/memories/geturl`, {
  //     method: "GET"
  //   })
  //   .then(response => response.json())
  //   .then((body) => {
  //     setNewUrl(body.url)
  //   })
  // }

  return (
    <div>
      <input type="file" onChange={onChangeHandler} />
      <input type="text" onChange={descriptionHandler} />
      <button onClick={onFormSubmit}>Upload!</button>
    </div>
  )
}