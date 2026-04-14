import Navbar from "./components/Navbar";
import Search from "./components/Search";
import NumResults from "./components/NumResults";
import Main from "./components/Main";
import Box from "./components/Box";
import MoviesList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";
import WatchedSummary from "./components/WatchedSummary";
import WatchedMoviesList from "./components/WatchedMoviesList";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import { usePopcorn } from "./context/PopcornContext";

export default function App() {
  const { isOpen1, isOpen2, isLoading1, error, selectedId, dispatch } =
    usePopcorn();

  return (
    <div className="wrapper">
      <Navbar>
        <Search />
        <NumResults />
      </Navbar>
      <Main>
        <Box open={isOpen1} toggle={() => dispatch({ type: "SET_ISOPEN1" })}>
          {isLoading1 && <Loader />}
          {!isLoading1 && !error && <MoviesList />}
          {error && <ErrorMessage />}
        </Box>
        <Box open={isOpen2} toggle={() => dispatch({ type: "SET_ISOPEN2" })}>
          {selectedId ? (
            <MovieDetails />
          ) : (
            <>
              <WatchedSummary />
              <WatchedMoviesList />
            </>
          )}
        </Box>
      </Main>
    </div>
  );
}
