import React, { useState, useEffect } from "react";
import { Albums } from "./Albums";
import { NewAlbum } from "./NewAlbum";

export function Memories() {
  const [albums, setAlbums] = useState([]);
  //   console.log(date.toLocaleDateString());

  useEffect(() => {
    // For privacy can hide URL in .env.development file where it is declared
    fetch(`${process.env.REACT_APP_ALBUMS_API}`)
      .then((response) => response.json())
      .then((body) => setAlbums(body));
  }, []);
  //   console.log(events);

  return (
    <div>
      <h1>Memories Page</h1>
      <NewAlbum />
      <Albums albums={albums} />
    </div>
  );
}
