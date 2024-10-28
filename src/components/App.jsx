/* IMPORTS ********************************************************************/
import {
  Route,
  Routes,
  useNavigate,
  useLocation,
  Navigate,
  useSearchParams,
} from "react-router-dom";
import { useState, useEffect, useContext, useRef } from "react";

import {
  SearchContext,
  ApiOptionsContext,
  MediaDataFetchedContext,
} from "../context/Context.js";
import { PaginationContext } from "../context/PaginationContext.jsx";
import { MediaGenresContext } from "../context/MediaGenresContext.jsx";
import { FavoritesProvider } from "../context/FavoritesContext.jsx";

import { formatRoute, formatDate } from "../utils/Utils.js";

import GenrePage from "../pages/GenrePage.jsx";
import SearchPage from "../pages/SearchPage.jsx";
import FavoritesPage from "../pages/FavoritesPage.jsx";
import MediaDetailPage from "../pages/MediaDetailPage.jsx";
import ErrorPage from "../pages/ErrorPage.jsx"; // CUSTOM 5XX PAGE
import NotFoundPage from "../pages/NotFoundPage.jsx"; // CUSTOM PAGE

import PageLayout from "../layouts/PageLayout.jsx";

import Header from "./Header.jsx";

/* JSX LOGIC ******************************************************************/
export default function App() {
  /* DEFINITION ***************************************************************/
  const navigate = useNavigate();
  const location = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();

  const [mediaDataState, setMediaDataState] = useState([]);
  const [areMediaDataFetched, setAreMediaDataFetched] = useState(false);
  const [mediaGenres, setMediaGenres] = useState({});
  const [areMediaGenresFetched, setAreMediaGenresFetched] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");

  // const previousSearchInputRef = useRef("");

  const { currentPageState, setPage, setTotalPagesCount } =
    useContext(PaginationContext);
  const { currentMediaTypeState, isValidTrendingMediaGenre } =
    useContext(MediaGenresContext);

  /* API KEY */
  const apiKey = process.env.REACT_APP_TMDB_API_BEARER_TOKEN;

  /* DYNAMIC URLS */
  const trendingUrl = `https://api.themoviedb.org/3/trending/${currentMediaTypeState}/week?language=en-US&page=${currentPageState}`;
  const movieGenresUrl =
    "https://api.themoviedb.org/3/genre/movie/list?language=en";
  const tvGenresUrl = "https://api.themoviedb.org/3/genre/tv/list?language=en";

  const apiOptions = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  };

  /* FUNCTIONS ****************************************************************/
  async function fetchMediaData(url, apiOptions) {
    setAreMediaDataFetched(false);
    try {
      const response = await fetch(url, apiOptions);
      const fetchedData = await response.json();

      setTotalPagesCount(fetchedData.total_pages);

      const formattedData = fetchedData.results
        .filter((media) => media.media_type !== "person")
        .map((media) => {
          let formattedTitle;
          let formattedRoute;
          let formattedReleaseDate;
          let selectedGenreList;

          if (media.media_type === "movie") {
            formattedTitle = media.title;
            formattedRoute = formatRoute(media.title);
            formattedReleaseDate = formatDate(media.release_date);
            selectedGenreList = mediaGenres.movie;
          }

          if (media.media_type === "tv") {
            formattedTitle = media.name;
            formattedRoute = formatRoute(media.name);
            formattedReleaseDate = formatDate(media.first_air_date);
            selectedGenreList = mediaGenres.tv;
          }

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

      setMediaDataState(formattedData);
      setAreMediaDataFetched(true);
    } catch (error) {
      console.error("Caught error while fetching media data:", error);
    }
  }

  async function fetchMediaGenres(apiOptions) {
    const movieGenresResponse = await fetch(movieGenresUrl, apiOptions);
    const tvGenresResponse = await fetch(tvGenresUrl, apiOptions);

    const movieGenresData = await movieGenresResponse.json();
    const tvGenresData = await tvGenresResponse.json();

    const genresList = {
      movie: movieGenresData.genres || [],
      tv: tvGenresData.genres || [],
    };

    setMediaGenres(genresList);
    setAreMediaGenresFetched(true);
  }

  /* HOOKS ********************************************************************/
  /* FETCH GENRE LIST HOOK */
  useEffect(() => {
    fetchMediaGenres(apiOptions);
  }, []);

  /* LOCATION PATHNAME HOOK */
  useEffect(() => {
    if (
      location.pathname !== "/search" &&
      !location.pathname.startsWith("/media/")
    ) {
      setSearchInputValue("");
    }
  }, [location.pathname]);

  /* GENRE MEDIA TYPE DATA FETCH HOOK */
  useEffect(() => {
    if (isValidTrendingMediaGenre && areMediaGenresFetched) {
      fetchMediaData(trendingUrl, apiOptions);
    }
  }, [
    currentMediaTypeState,
    areMediaGenresFetched,
    currentPageState,
  ]);

  /* DEBOUNCED SEARCH KEYWORD LOGIC */
  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams);
    const keywordQuery = newSearchParams.get("keyword");

    const value = keywordQuery ? keywordQuery : searchInputValue;

    //TODO ADD isSynced.current = true;

    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchInputValue, searchParams]);

  /* SEPARATE SEARCH FETCH LOGIC */
  useEffect(() => {
    console.log("trigered")
    if (debouncedValue) {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set("keyword", debouncedValue);

      const searchUrl = `https://api.themoviedb.org/3/search/multi?query=${debouncedValue}&include_adult=false&language=en-US&page=${currentPageState}`;
      fetchMediaData(searchUrl, apiOptions);
      navigate(`/search?${newSearchParams.toString()}`, { replace: true });
    }
  }, [debouncedValue, currentPageState]);

  /* JSX TEMPLATE *************************************************************/
  return (
    <ApiOptionsContext.Provider value={{ apiOptions }}>
      <SearchContext.Provider
        value={{ searchInputValue, setSearchInputValue, fetchMediaData }}
      >
        <Header heading="Media gallery app" />
      </SearchContext.Provider>
      <PageLayout>
        <MediaDataFetchedContext.Provider value={{ areMediaDataFetched }}>
          <FavoritesProvider>
            <Routes>
              <Route path="/" element={<Navigate to="/all" replace />} />
              <Route
                path="/:genre"
                element={<GenrePage mediaDataState={mediaDataState} />}
              />
              <Route
                path="/search"
                element={<SearchPage mediaDataState={mediaDataState} />}
              />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route
                path="/media/:selectedMovieId"
                element={<MediaDetailPage />}
              />
              <Route path="/error" element={<ErrorPage />} />
              <Route path="/*" element={<Navigate to="/404" replace />} />
              <Route path="/404" element={<NotFoundPage />} />
            </Routes>
          </FavoritesProvider>
        </MediaDataFetchedContext.Provider>
      </PageLayout>
    </ApiOptionsContext.Provider>
  );
}
