import { usePopcorn } from "../context/PopcornContext";

function WatchedSummary() {
  const { watched, avgImdbRating, avgRuntime, avgUserRating } = usePopcorn();
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{Math.floor(avgImdbRating)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{Math.floor(avgUserRating)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{Math.floor(avgRuntime)} min</span>
        </p>
      </div>
    </div>
  );
}

export default WatchedSummary;
