/* IMPORTS ********************************************************************/
import { useState, useEffect, useRef } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { SearchContext } from "../context/Context.js";
import { formatRoute, formatDate } from "../utils/Utils.js";

import Homepage from "../pages/Homepage.jsx";
import MediaDetail from "../pages/MediaDetail.jsx";
import Error from "../pages/Error.jsx"; // Custom 404 component
import Search from "../pages/Search.jsx";

import Header from "./Header.jsx";

/* JSX LOGIC ******************************************************************/
export default function App() {
  /* DEFINITION ***************************************************************/
  const navigate = useNavigate();
  const location = useLocation(); // Track the current pathname
  const prevPathname = useRef(location.pathname); // Store the previous pathname

  const [mediasData, setMediasData] = useState([]);
  const [mediaGenres, setMediaGenres] = useState({});
  const [loadingGenres, setLoadingGenres] = useState(true);
  const [pagination, setPagination] = useState(1);
  const [activeMediasGenre, setActiveMediasGenre] = useState("all");
  const [selectedMedia, _] = useState(
    JSON.parse(localStorage.getItem("selectedMedia")) || {}
  );
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
  async function fetchMediasData(url, apiOptions) {
    if (loadingGenres) return;

    const response = await fetch(url, apiOptions);

    //TODO HIDE SEARCH BAR

    const fetchedData = await response.json();

    const formattedData = fetchedData.results
      .filter((media) => media.media_type !== "person")
      .map((media) => {
        const isMovie = media.media_type === "movie";

        const formattedTitle = isMovie ? media.title : media.name;
        const formattedRoute = formatRoute(isMovie ? media.title : media.name);
        const formattedReleaseDate = formatDate(
          isMovie ? media.release_date : media.first_air_date
        );

        const selectedGenreList = isMovie ? mediaGenres.movie : mediaGenres.tv;

        const formattedGenres = media.genre_ids.map((genreId) => {
          const genre = selectedGenreList.find((genre) => genre.id === genreId);
          return genre.name;
        });

        return {
          ...media,
          formattedTitle,
          formattedRoute,
          formattedReleaseDate,
          formattedGenres,
        };
      });

    setMediasData(formattedData);
  }

  async function fetchMediaGenres(apiOptions) {
    setLoadingGenres(true);

    const movieGenresResponse = await fetch(
      "https://api.themoviedb.org/3/genre/movie/list?language=en",
      apiOptions
    );
    const tvGenresResponse = await fetch(
      "https://api.themoviedb.org/3/genre/tv/list?language=en",
      apiOptions
    );

    const movieGenresData = await movieGenresResponse.json();
    const tvGenresData = await tvGenresResponse.json();

    const genresList = {
      movie: movieGenresData.genres || [],
      tv: tvGenresData.genres || [],
    };

    setMediaGenres(genresList);
    setLoadingGenres(false);
  }

  /* HOOKS ********************************************************************/
  /* DEFAULT HOMEPAGE */
  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/all");
    }
  }, [navigate]);

  useEffect(() => {
    fetchMediaGenres(apiOptions);
  }, []);

  useEffect(() => {
    const apiUrl = `https://api.themoviedb.org/3/trending/${activeMediasGenre}/week?language=en-US&page=${pagination}`;
    fetchMediasData(apiUrl, apiOptions);
    console.log(location);
    if (
      prevPathname.current === "/search" &&
      activeMediasGenre === location.pathname
    ) {
      console.log(location.pathname);
      fetchMediasData(apiUrl, apiOptions);
    }

    prevPathname.current = location.pathname;
  }, [activeMediasGenre, loadingGenres, prevPathname]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchValue(searchInputValue);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchInputValue]);

  useEffect(() => {
    if (debouncedSearchValue) {
      const apiUrl = `https://api.themoviedb.org/3/search/multi?query=${debouncedSearchValue}&include_adult=false&language=en-US&page=${pagination}`;
      fetchMediasData(apiUrl, apiOptions);
      navigate("/search");
    }
  }, [debouncedSearchValue]);

  useEffect(() => {
    if (selectedMedia && Object.keys(selectedMedia).length > 0) {
      localStorage.setItem("selectedMedia", JSON.stringify(selectedMedia));
    }
  }, [selectedMedia]);

  /* JSX TEMPLATE *************************************************************/
  return (
    <>
      <SearchContext.Provider value={{ searchInputValue, setSearchInputValue }}>
        <Header
          heading="Medias Search App"
          {...{ activeMediasGenre, setActiveMediasGenre, setSearchInputValue }}
        />
      </SearchContext.Provider>
      <Routes>
        <Route path="/all" element={<Homepage mediasData={mediasData} />} />
        <Route path="/movie" element={<Homepage mediasData={mediasData} />} />
        <Route path="/tv" element={<Homepage mediasData={mediasData} />} />
        <Route path="/search" element={<Search mediasData={mediasData} />} />
        <Route
          path="/media/:formattedRoute"
          element={<MediaDetail media={selectedMedia} />}
        />
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}
