/* IMPORTS ********************************************************************/
import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import Homepage from "../pages/Homepage.jsx";
import MediaDetail from "../pages/MediaDetail.jsx";
import Header from "./Header.jsx";
import NotFound from "../pages/NotFound.jsx"; // Custom 404 component

import { SearchContext } from "../context/Context.js";
import { formatRoute, formatDate } from "../utils/Utils.js";

/* JSX LOGIC ******************************************************************/
export default function App() {
  /* DEFINITION ***************************************************************/
  const navigate = useNavigate();

  const [mediasData, setMediasData] = useState([]);
  const [mediaGenres, setMediaGenres] = useState({});
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
    // try {
    const response = await fetch(url, apiOptions);

    // TODO HIDE SEARCH BAR
    // if (!response.ok) {
    //   throw {
    //     status: "5XX",
    //     message:
    //       "Oops! It seems like we're having trouble fetching data right now. Please try again later.",
    //   };
    // }

    const fetchedData = await response.json();

    const formattedData = fetchedData.results
      .filter((media) => media.media_type !== "person")
      .map((media) => ({
        ...media,
        formattedTitle: media.media_type === "movie" ? media.title : media.name,
        formattedRoute: formatRoute(
          media.media_type === "movie" ? media.title : media.name
        ),
        formattedReleaseDate: formatDate(
          media.media_type === "movie"
            ? media.release_date
            : media.first_air_date
          // ),
          // formattedGenres:
          //   media.media_type === "movie"
          //     ? media.genre_ids
          //         .map((genreId) => {
          //           const genre = mediaGenres.movie.find(
          //             (genre) => genre.id === genreId
          //           );
          //           return genre ? genre.name : "";
          //         })
          //         .filter((name) => name)
          //     : media.media_type === "tv"
          //     ? media.genre_ids
          //         .map((genreId) => {
          //           const genre = mediaGenres.tv.find(
          //             (genre) => genre.id === genreId
          //           );
          //           return genre ? genre.name : "";
          //         })
          //         .filter((name) => name)
          //     : [],
        ),
      }));

    setMediasData(formattedData);
    // } catch (error) {
    //   navigate(`/${error.status}`, {
    //     state: { status: error.status, message: error.message },
    //   });
    // }
  }

  async function fetchMediaGenres(apiOptions) {
    const movieGenresResponse = await fetch(
      "https://api.themoviedb.org/3/genre/movie/list?language=en",
      apiOptions
    );
    const tvGenresResponse = await fetch(
      "https://api.themoviedb.org/3/genre/tv/list?language=en",
      apiOptions
    );

    // try {
    //   if (!movieGenresResponse.ok || !tvGenresResponse.ok) {
    //     throw {
    //       status: "5XX",
    //       message:
    //         "Oops! It seems like we're having trouble fetching data right now. Please try again later.",
    //     };
    //   }

    const movieGenresData = await movieGenresResponse.json();
    const tvGenresData = await tvGenresResponse.json();

    setMediaGenres({
      movie: movieGenresData.genres || [],
      tv: tvGenresData.genres || [],
    });

    console.log(mediaGenres);
    // } catch (error) {
    //   navigate(`/${error.status}`, {
    //     state: { status: error.status, message: error.message },
    //   });
    // }
  }

  /* HOOKS ********************************************************************/
  /* DEFAULT HOMEPAGE */
  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/all");
    }
  }, [navigate]);

  useEffect(() => {
    const apiUrl = `https://api.themoviedb.org/3/trending/${activeMediasGenre}/week?language=en-US&page=${pagination}`;
    fetchMediasData(apiUrl, apiOptions);
  }, [activeMediasGenre]);

  useEffect(() => {
    fetchMediaGenres(apiOptions);
  }, []);

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
        <Route
          path="/media/:formattedRoute"
          element={<MediaDetail media={selectedMedia} />}
        />
        <Route path="/5XX" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
