export function Albums(props) {
  return (
    <div className="event">
      <h1>Family Albums </h1>
      {props.albums.map((album, index) => {
        return (
          <div key={album.id}>
            <h2>{album.name}</h2>
            <p>{album.image}</p>
          </div>
        );
      })}
    </div>
  );
}
