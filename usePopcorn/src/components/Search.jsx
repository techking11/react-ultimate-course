import { usePopcorn } from "../context/PopcornContext";

function Search() {
  const { query, dispatch } = usePopcorn();
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => dispatch({ type: "SET_QUERY", payload: e.target.value })}
    />
  );
}

export default Search;
