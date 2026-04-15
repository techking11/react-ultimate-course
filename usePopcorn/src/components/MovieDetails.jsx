import StarRating from "./StarRating";
import Loader from "./Loader";
import { usePopcorn } from "../context/PopcornContext";
import { useState } from "react";

function MovieDetails() {
  const { handleClose, movie, isLoading2, dispatch, watched } = usePopcorn();
  const [userRating, setUserRating] = useState(0);
  const isWatched = watched.some((m) => m.imdbId === movie.imdbID);

  const {
    Title: title,
    Year: year,
    Released: released,
    Runtime: runtime,
    Director: director,
    Genre: genre,
    Plot: plot,
    Poster: poster,
    imdbRating: imdbRating,
    Actors: actors,
  } = movie;

  function handleAddWatched() {
    const newWatchedMovie = {
      imdbId: movie.imdbID,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      userRating: Number(userRating),
      runtime: runtime !== "N/A" ? Number(runtime.split(" ").at(0)) : 0,
    };
    dispatch({ type: "ADD_WATCHED", payload: newWatchedMovie });
    handleClose();
  }

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
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAddWatched}>
                      + Add to watchlist
                    </button>
                  )}{" "}
                </>
              ) : (
                <p>
                  You rated this movie{" "}
                  {watched.find((m) => m.imdbId === movie.imdbID).userRating} ⭐
                </p>
              )}
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
