import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.scss";

import Homepage from "./pages/Homepage.jsx";
import Header from "./components/Header/Header.jsx";
import Movie from "./pages/Movie.jsx";

import { SearchContext, MovieContext } from "./context/Context.js";

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState({});
  const [searchValue, setSearchValue] = useState("all");

  async function fetchRequestedMovie(searchValue) {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=64c9f7e5`;

    const response = await fetch(url);
    const reponseJson = await response.json();

    if (reponseJson.Search) {
      setMovies(reponseJson.Search);
    }
  }

  useEffect(() => {
    fetchRequestedMovie(searchValue);
  }, [searchValue]);

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
