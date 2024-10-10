/* IMPORTS ********************************************************************/
import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import Homepage from "../pages/Homepage.jsx";
import Movie from "../pages/Movie.jsx";
import Header from "./Header.jsx";
import NotFound from "../pages/NotFound.jsx"; // Custom 404 component

import { SearchContext, MovieContext } from "../context/Context.js";

/* JSX LOGIC ******************************************************************/
export default function App() {
  /* DEFINITION ***************************************************************/
  const navigate = useNavigate();

  const [moviesData, setMoviesData] = useState([]);
  const [pagination, setPagination] = useState(1);
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
  async function fetchMovieData(url, apiOptions) {
    try {
      const response = await fetch(url, apiOptions);

      if (!response.ok) {
        throw {
          status: "5XX",
          message:
            "Oops! It seems like we're having trouble fetching data right now. Please try again later.",
        };
      }

      const fetchedData = await response.json();

      if (!fetchedData.results || fetchedData.total_results === 0) {
        throw {
          status: "404",
          message:
            "Sorry, we couldn't find any results for your search. Please try different keywords or check for spelling mistakes.",
        };
      }

      const filteredData = fetchedData.results.filter(
        (item) => item.media_type !== "person"
      );
      setMoviesData(filteredData);
    } catch (error) {
      console.log(error);
      navigate(`/${error.status}`, {
        state: { status: error.status, message: error.message },
      });
    }
  }

  /* HOOKS ********************************************************************/
  useEffect(() => {
    const apiUrl = `https://api.themoviedb.org/3/trending/${activeMoviesGenre}/week?language=en-US&page=${pagination}`;
    fetchMovieData(apiUrl, apiOptions);
  }, [activeMoviesGenre]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchValue(searchInputValue);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchInputValue]);

  useEffect(() => {
    if (debouncedSearchValue) {
      const apiUrl = `https://api.themoviedb.org/3/search/multi?query=${debouncedSearchValue}&include_adult=false&language=en-US&page=${pagination}`;
      fetchMovieData(apiUrl, apiOptions);
    }
  }, [debouncedSearchValue]);

  /* JSX TEMPLATE *************************************************************/
  return (
    <>
      <SearchContext.Provider value={{ searchInputValue, setSearchInputValue }}>
        <Header
          heading="Movies Search App"
          {...{ activeMoviesGenre, setActiveMoviesGenre, setSearchInputValue }}
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
        <Route path="/404" element={<NotFound />} />
        <Route path="/5XX" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
