import { usePopcorn } from "../context/PopcornContext";

function WatchedMoviesList() {
  const { watched, dispatch } = usePopcorn();

  function handleDeleteId(id) {
    dispatch({ type: "DELETE_WATCHED", payload: id });
  }

  return (
    <ul className="list">
      {watched.map((movie, idx) => (
        <li key={idx}>
          <img src={movie.poster} alt={`${movie.title} poster`} />
          <h3>{movie.title}</h3>
          <div>
            <p>
              <span>⭐️</span>
              <span>{movie.imdbRating}</span>
            </p>
            <p>
              <span>🌟</span>
              <span>{movie.userRating}</span>
            </p>
            <p>
              <span>⏳</span>
              <span>{movie.runtime} min</span>
            </p>

            <button
              className="btn-delete"
              onClick={() => handleDeleteId(movie.imdbId)}
            >
              X
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default WatchedMoviesList;
