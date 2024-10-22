/* IMPORTS ********************************************************************/
import { useState, useEffect, useContext } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";

import {
  SearchContext,
  ApiOptionsContext,
  MediasDataFetchedContext,
} from "../context/Context.js";
import { PaginationContext } from "../context/PaginationContext.jsx";
import { FavoritesProvider } from "../context/FavoritesContext.jsx";

import { formatRoute, formatDate } from "../utils/Utils.js";

import HomePage from "../pages/HomePage.jsx";
import MoviePage from "../pages/MoviePage.jsx";
import TvPage from "../pages/TvPage.jsx";
import SearchPage from "../pages/SearchPage.jsx";
import FavoritesPage from "../pages/FavoritesPage.jsx";
import MediaDetailPage from "../pages/MediaDetailPage.jsx";
import ErrorPage from "../pages/ErrorPage.jsx"; // Custom 5XX page component
import NotFoundPage from "../pages/NotFoundPage.jsx"; // Custom 404 page component

import PageLayout from "../layouts/PageLayout.jsx";

import Header from "./Header.jsx";

/* JSX LOGIC ******************************************************************/
export default function App() {
  /* DEFINITION ***************************************************************/
  const navigate = useNavigate();
  const location = useLocation();

  const [mediasData, setMediasData] = useState([]);
  const [mediasDataFetched, setMediasDataFetched] = useState(false);
  const [mediaGenres, setMediaGenres] = useState({});
  const [mediasGenresFetched, setMediasGenresFetched] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");

  const { actualStatePage, setTotalPagesCount } = useContext(PaginationContext);

  const apiKey = process.env.REACT_APP_TMDB_API_BEARER_TOKEN;

  const apiOptions = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  };

  const validMediaTypes = ["all", "movie", "tv"];

  /* FUNCTIONS ****************************************************************/
  async function fetchMediasData(url, apiOptions) {
    try {
      const response = await fetch(url, apiOptions);
      const fetchedData = await response.json();

      setTotalPagesCount(fetchedData.total_pages)

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
      setMediasDataFetched(true);
    } catch (error) {
      console.error("Caught error while fetching media data:", error);
    }
  }

  async function fetchMediasGenres(apiOptions) {
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
    setMediasGenresFetched(true);
  }

  /* HOOKS ********************************************************************/
  /* FETCH GENRE LIST HOOK */
  useEffect(() => {
    fetchMediasGenres(apiOptions);
  }, []);

  /* LOCATION PATHNAME HOOK */
  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/all");
    }

    if (
      location.pathname !== "/search" &&
      !location.pathname.startsWith("/media/")
    ) {
      setSearchInputValue("");
    }
  }, [location.pathname]);

  /* LOCATION MEDIASDATA FETCH HOOK */
  useEffect(() => {
    const mediaType = validMediaTypes.find((type) =>
      location.pathname.includes(type)
    );

    if (mediaType && mediasGenresFetched) {
      const apiUrl = `https://api.themoviedb.org/3/trending/${mediaType}/week?language=en-US&page=${actualStatePage}`;
      fetchMediasData(apiUrl, apiOptions);
    }
  }, [location.pathname, mediasGenresFetched, actualStatePage]);

  /* SEARCH QUERY HOOK */
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const keyword = queryParams.get("keyword");

    if (keyword) {
      setSearchInputValue(keyword);
    }
  }, [location.search]);

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
      const apiUrl = `https://api.themoviedb.org/3/search/multi?query=${debouncedSearchValue}&include_adult=false&language=en-US&page=${actualStatePage}`;
      fetchMediasData(apiUrl, apiOptions);

      navigate(`/search?keyword=${debouncedSearchValue}`);
    }
  }, [debouncedSearchValue, actualStatePage]);

  /* JSX TEMPLATE *************************************************************/
  return (
    <ApiOptionsContext.Provider value={{ apiOptions }}>
      <SearchContext.Provider value={{ searchInputValue, setSearchInputValue }}>
        <Header heading="Medias Search App" />
      </SearchContext.Provider>
      <PageLayout>
        <MediasDataFetchedContext.Provider value={{ mediasDataFetched }}>
          <FavoritesProvider>
            <Routes>
              <Route
                path="/all"
                element={<HomePage mediasData={mediasData} />}
              />
              <Route
                path="/movie"
                element={<MoviePage mediasData={mediasData} />}
              />
              <Route path="/tv" element={<TvPage mediasData={mediasData} />} />
              <Route
                path="/search"
                element={<SearchPage mediasData={mediasData} />}
              />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route
                path="/media/:selectedMovieId"
                element={<MediaDetailPage />}
              />

              <Route path="/error" element={<ErrorPage />} />
              <Route path="/*" element={<NotFoundPage />} />
            </Routes>
          </FavoritesProvider>
        </MediasDataFetchedContext.Provider>
      </PageLayout>
    </ApiOptionsContext.Provider>
  );
}
