import { useState, useEffect } from "react";
import "./App.css";

import MovieList from "./components/MovieList/MovieList.jsx";
import Header from "./components/Header/Header.jsx";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("")

  async function fetchRequestedMovie(searchValue) {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=64c9f7e5`;

    const response = await fetch(url);
    const reponseJson = await response.json()

    console.log(reponseJson)
    setMovies(reponseJson.Search)
  }

  useEffect(() => {
    fetchRequestedMovie("avengers")
  }, [])

  return (
    <>
      <div>
        <Header heading="Movies"/>
      </div>
      <MovieList movies={movies} />
    </>
  );
}

export default App;
