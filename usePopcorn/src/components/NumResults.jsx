import { usePopcorn } from "../context/PopcornContext";

function NumResults() {
  const { movies } = usePopcorn();
  return (
    <p className="num-results">
      Found <strong>{movies?.length || 0}</strong> results
    </p>
  );
}

export default NumResults;
