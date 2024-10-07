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
  const [authToken, setAuthToken] = useState("")
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("all")

  /* FUNCTIONS ****************************************************************/

  async function fetchRequestedMovie(debouncedSearchValue) {
    const url = `http://www.omdbapi.com/?s=${debouncedSearchValue}&apikey=64c9f7e5`;

    const response = await fetch(url);
    const reponseJson = await response.json();

    if (reponseJson.Search) {
      setMovies(reponseJson.Search);
    }
  }

  /* HOOKS ********************************************************************/
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchValue(searchValue);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchValue]);
  
  
  useEffect(() => {
    fetchRequestedMovie(debouncedSearchValue);
  }, [debouncedSearchValue]);


  /* JSX TEMPLATE *************************************************************/
  return (
    <>
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header heading="Movies" setSearchValue={setSearchValue} />
      </SearchContext.Provider>
      <Routes>
        <Route
          path="/"
          element={
            <MovieContext.Provider value={{ setSelectedMovie }}>
              <Homepage movies={movies} />
            </MovieContext.Provider>
          }
        />
        <Route path="/:id" element={<Movie movie={selectedMovie} />} />
      </Routes>
    </>
  );
}

export default App;
