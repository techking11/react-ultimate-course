import StarRating from "./StarRating";
import Loader from "./Loader";
import { usePopcorn } from "../context/PopcornContext";

function MovieDetails() {
  const { handleClose, movie, isLoading2 } = usePopcorn();
  const {
    Title: title,
    // Year: year,
    Released: released,
    Runtime: runtime,
    Director: director,
    Genre: genre,
    Plot: plot,
    Poster: poster,
    imdbRating: imdbRating,
    Actors: actors,
  } = movie;

  return (
    <div className="details">
      {isLoading2 ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={handleClose}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${poster} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDB Rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              <StarRating maxRating={10} size={24} />
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Director by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}

export default MovieDetails;
