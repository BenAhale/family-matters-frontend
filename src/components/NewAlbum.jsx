import React, { useState } from "react";
import {
  AlbumForm,
  AlbumLabel,
  AlbumInput,
  AlbumInputSubmit,
} from "../styles/NewAlbum";

export function NewAlbum() {
  const [name, setName] = useState("");

  async function onFormSubmit(e) {
    e.preventDefault();
    // POST request with fetch, refer to SheetsDB docs
    const response = await fetch(process.env.REACT_APP_ALBUMS_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: [
          {
            id: "INCREMENT",
            name: name,
            // image: image,
          },
        ],
      }),
    });
    console.log(response);
    // props.history.push(path), kinda like redirect_to from rails
    // history.push("/");
  }

  return (
    <AlbumForm onSubmit={onFormSubmit}>
      <AlbumLabel htmlFor="name">Album Name:</AlbumLabel>
      <AlbumInput
        type="text"
        name="name"
        id="name"
        value={name}
        placeholder="e.g. Soccer Game"
        onChange={(e) => setName(e.target.value)}
      />
      <AlbumInputSubmit
        type="submit"
        id="submit"
        value="Submit"
      ></AlbumInputSubmit>
    </AlbumForm>
  );
}
