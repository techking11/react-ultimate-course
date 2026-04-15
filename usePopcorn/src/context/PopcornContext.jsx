/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useReducer } from "react";

const PopcornContext = createContext();

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const KEY = "c80f733f";

const initialState = {
  query: "interstellar",
  movies: [],
  watched: [],
  isOpen1: true,
  isOpen2: true,
  isLoading1: false,
  isLoading2: false,
  error: "",
  selectedId: null,
  movie: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_ISLOADING":
      return { ...state, isLoading: !state.isLoading1 };
    case "SET_ISLOADING1":
      return { ...state, isLoading1: !state.isLoading1 };
    case "SET_ISLOADING2":
      return { ...state, isLoading2: !state.isLoading2 };
    case "SET_SELECTEDID":
      return { ...state, selectedId: action.payload };
    case "SET_MOVIES":
      return { ...state, movies: action.payload };
    case "SET_QUERY":
      return { ...state, query: action.payload };
    case "SET_WATCHED":
      return { ...state, watched: action.payload };
    case "SET_ISOPEN1":
      return { ...state, isOpen1: !state.isOpen1 };
    case "SET_ISOPEN2":
      return { ...state, isOpen2: !state.isOpen2 };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_MOVIE":
      return { ...state, movie: action.payload };
    case "ADD_WATCHED":
      return { ...state, watched: [...state.watched, action.payload] };
    case "DELETE_WATCHED":
      return {
        ...state,
        watched: state.watched.filter(
          (movie) => movie.imdbId !== action.payload,
        ),
      };
    default:
      throw new Error("Unknown action type!");
  }
};

function PopcornProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    query,
    movies,
    watched,
    isOpen1,
    isOpen2,
    isLoading,
    error,
    selectedId,
    movie,
  } = state;

  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  const handleSelectMovie = (id) =>
    dispatch({ type: "SET_SELECTEDID", payload: id });

  const handleClose = () => dispatch({ type: "SET_SELECTEDID", payload: null });

  useEffect(() => {
    async function fetchMovies() {
      dispatch({ type: "SET_ISLOADING1" });
      try {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
        );

        if (!res.ok) {
          throw new Error("Something went wrong in fetch movies!");
        }

        const data = await res.json();
        if (!data.Response) {
          throw new Error("Movies not found!");
        }

        dispatch({ type: "SET_MOVIES", payload: data.Search });
      } catch (error) {
        console.log(error);
        dispatch({ type: "SET_ERROR", payload: error.message });
      } finally {
        dispatch({ type: "SET_ISLOADING1" });
      }
    }

    if (query.length < 3) {
      dispatch({ type: "SET_MOVIES", payload: [] });
      dispatch({ type: "SET_ERROR", payload: "" });
      return;
    }

    fetchMovies();
  }, [query]);

  useEffect(
    function () {
      async function fetchMovie() {
        dispatch({ type: "SET_ISLOADING2" });
        try {
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`,
          );
          const data = await res.json();
          dispatch({ type: "SET_MOVIE", payload: data });
        } catch (error) {
          console.log(error);
        } finally {
          dispatch({ type: "SET_ISLOADING2" });
        }
      }

      fetchMovie();
    },
    [selectedId],
  );

  return (
    <PopcornContext.Provider
      value={{
        query,
        movies,
        watched,
        isOpen1,
        isOpen2,
        isLoading,
        error,
        selectedId,
        avgImdbRating,
        avgUserRating,
        avgRuntime,
        handleSelectMovie,
        handleClose,
        dispatch,
        movie,
      }}
    >
      {children}
    </PopcornContext.Provider>
  );
}

function usePopcorn() {
  const context = useContext(PopcornContext);
  if (context === undefined) {
    throw new Error("usePopcorn must be used within a PopcornProvider");
  }
  return context;
}

export { usePopcorn, PopcornProvider };
