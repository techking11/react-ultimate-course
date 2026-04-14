import { usePopcorn } from "../context/PopcornContext";

function MoviesList() {
  const { movies, handleSelectMovie } = usePopcorn();
  return (
    <ul className="list">
      {movies?.map((movie, idx) => (
        <li key={idx} onClick={() => handleSelectMovie(movie.imdbID)}>
          <img src={movie.Poster} alt={`${movie.Title} poster`} />
          <h3>{movie.Title}</h3>
          <div>
            <p>
              <span>🗓</span>
              <span>{movie.Year}</span>
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default MoviesList;
