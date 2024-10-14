/* IMPORTS ********************************************************************/
import { useState, useEffect } from "react";
import { Route, Routes, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { SearchContext, GenreContext } from "../context/Context.js";
import { formatRoute, formatDate } from "../utils/Utils.js";

import Homepage from "../pages/Homepage.jsx";
import Movie from "../pages/Movie.jsx";
import Tv from "../pages/Tv.jsx";
import Search from "../pages/Search.jsx";
import MediaDetail from "../pages/MediaDetail.jsx";
import Error from "../pages/Error.jsx"; // Custom 404 component
import NotFound from "../pages/NotFound.jsx";

import Header from "./Header.jsx";

/* JSX LOGIC ******************************************************************/
export default function App() {
  /* DEFINITION ***************************************************************/
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [mediasData, setMediasData] = useState([]);
  const [mediaGenres, setMediaGenres] = useState({});
  const [loadingGenres, setLoadingGenres] = useState(true);
  const [pagination, setPagination] = useState(1);
  const [activeMediasGenre, setActiveMediasGenre] = useState("");
  const [selectedMedia, setSelectedMedia] = useState(
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

    try {
      const response = await fetch(url, apiOptions);
      const fetchedData = await response.json();

      const formattedData = fetchedData.results
        .filter((media) => media.media_type !== "person")
        .map((media) => {
          const isMovie = media.media_type === "movie";

          const formattedTitle = isMovie ? media.title : media.name;
          const formattedRoute = formatRoute(
            isMovie ? media.title : media.name
          );
          const formattedReleaseDate = formatDate(
            isMovie ? media.release_date : media.first_air_date
          );

          const selectedGenreList = isMovie
            ? mediaGenres.movie
            : mediaGenres.tv;

          const formattedGenres = media.genre_ids.map((genreId) => {
            const genre = selectedGenreList.find(
              (genre) => genre.id === genreId
            );
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
    } catch (error) {
      console.error("Caught error while fetching media data:", error);
    }
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
  /* LOCATION PATHNAME HOOK */
  useEffect(() => {
    if (location.pathname === "/") {
      setActiveMediasGenre("all");
      navigate("/all", { replace: true });
    } else if (location.pathname !== "/search" && !location.pathname.startsWith("/media/")) {
      setSearchInputValue("");
    }
    setIsInitialLoad(false);
  }, [navigate, location.pathname]); 

  /* INITIAL GENRE LISTS HOOK */
  useEffect(() => {
    fetchMediaGenres(apiOptions);
  }, []);

  /* SEARCH QUERY HOOK */
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const keyword = queryParams.get("keyword");

    if (keyword) {
      setSearchInputValue(keyword)
    } 

  }, [location.search]); 

  /* FETCH GENRE LIST HOOK */
  useEffect(() => {
    if (activeMediasGenre === "search") return;
    const apiUrl = `https://api.themoviedb.org/3/trending/${activeMediasGenre}/week?language=en-US&page=${pagination}`;
    fetchMediasData(apiUrl, apiOptions);
  }, [activeMediasGenre, loadingGenres]);

  /* SAVE DEBOUNCED SEARCH VALUE */
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchValue(searchInputValue);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchInputValue]);

  /* FETCH SEARCHED MEDIA */
  useEffect(() => {
    if (debouncedSearchValue) {
      const apiUrl = `https://api.themoviedb.org/3/search/multi?query=${debouncedSearchValue}&include_adult=false&language=en-US&page=${pagination}`;
      fetchMediasData(apiUrl, apiOptions);

      navigate(`/search?keyword=${debouncedSearchValue}`);
    }
  }, [debouncedSearchValue]);


  /* SAVE SELECTED MEDIA TO LOCAL */
  useEffect(() => {
    if (selectedMedia && Object.keys(selectedMedia).length > 0) {
      localStorage.setItem("selectedMedia", JSON.stringify(selectedMedia));
    }
  }, [selectedMedia]);

  /* JSX TEMPLATE *************************************************************/
  return (
    <>
      <SearchContext.Provider value={{ searchInputValue, setSearchInputValue }}>
        <Header heading="Medias Search App" />
      </SearchContext.Provider>
      {!isInitialLoad && (
        <GenreContext.Provider value={{ setActiveMediasGenre }}>
          <Routes>
            <Route path="/all" element={<Homepage mediasData={mediasData} />} />
            <Route path="/movie" element={<Movie mediasData={mediasData} />} />
            <Route path="/tv" element={<Tv mediasData={mediasData} />} />
            <Route
              path="/search"
              element={<Search mediasData={mediasData} />}
            />
            <Route
              path="/media/:formattedRoute/:id"
              element={<MediaDetail media={selectedMedia} />}
            />

            <Route path="/error" element={<Error />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </GenreContext.Provider>
      )}
    </>
  );
}
