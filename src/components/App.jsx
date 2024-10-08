/* IMPORTS ********************************************************************/
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import Homepage from "../pages/Homepage.jsx";
import Movie from "../pages/Movie.jsx";
import Header from "./Header.jsx";

import { SearchContext, MovieContext } from "../context/Context.js";

/* JSX LOGIC ******************************************************************/
function App() {
  /* DEFINITION ***************************************************************/
  const [moviesData, setMoviesData] = useState([]);
  const [activeMoviesGenre, setActiveMoviesGenre] = useState("all");
  const [selectedMovie, setSelectedMovie] = useState({});
  const [searchInputValue, setSearchInputValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");

  const apiKey = process.env.REACT_APP_TMDB_API_BEARER_TOKEN;

  const apiOptions = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  };

  /* FUNCTIONS ****************************************************************/
  async function fetchMoviesData(genre, apiOptions, pagination = "1") {
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/${genre}/week?language=en-US&page=${pagination}`,
      apiOptions
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    setMoviesData(data.results);
  }

  // async function fetchRequestedMovie(debouncedSearchValue) {
  //   const url = `http://www.omdbapi.com/?s=${debouncedSearchValue}&apikey=64c9f7e5`;

  //   const response = await fetch(url);
  //   const reponseJson = await response.json();

  //   if (reponseJson.Search) {
  //     setMovies(reponseJson.Search);
  //   }
  // }

  /* HOOKS ********************************************************************/
  // useEffect(() => {
  //   const timeoutId = setTimeout(() => {
  //     setDebouncedSearchValue(searchInputValue);
  //   }, 500);

  //   return () => clearTimeout(timeoutId);
  // }, [searchInputValue]);

  // useEffect(() => {
  //   fetchRequestedMovie(debouncedSearchValue);
  // }, [debouncedSearchValue]);

  useEffect(() => {
    fetchMoviesData(activeMoviesGenre, apiOptions);
  }, []);

  /* JSX TEMPLATE *************************************************************/
  return (
    <>
      <SearchContext.Provider value={{ searchInputValue, setSearchInputValue }}>
        <Header
          heading="Movies"
          {...{ activeMoviesGenre, setActiveMoviesGenre }}
        />
      </SearchContext.Provider>
      <Routes>
        <Route
          path="/"
          element={
            <MovieContext.Provider value={{ setSelectedMovie }}>
              <Homepage moviesData={moviesData} />
            </MovieContext.Provider>
          }
        />
        <Route path="/:id" element={<Movie movie={selectedMovie} />} />
      </Routes>
    </>
  );
}

export default App;
