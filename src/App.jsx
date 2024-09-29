import { useState, useEffect } from "react";
import "./App.scss";

import MovieList from "./components/MovieList/MovieList.jsx";
import Header from "./components/Header/Header.jsx";

import { SearchContext } from "./context/SearchContext.js";

function App() {
  const [movies, setMovies] = useState([]);
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
      <div>
        <SearchContext.Provider value={{ searchValue, setSearchValue }}>
          <Header heading="Movies" setSearchValue={setSearchValue} />
        </SearchContext.Provider>
      </div>
      <MovieList movies={movies} />
    </>
  );
}

export default App;
