/* IMPORTS ********************************************************************/
import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import Homepage from "../pages/Homepage.jsx";
import MediaDetail from "../pages/MediaDetail.jsx";
import Header from "./Header.jsx";
import NotFound from "../pages/NotFound.jsx"; // Custom 404 component

import { SearchContext } from "../context/Context.js";

/* JSX LOGIC ******************************************************************/
export default function App() {
  /* DEFINITION ***************************************************************/
  const navigate = useNavigate();

  const [mediasData, setMediasData] = useState([]);
  const [pagination, setPagination] = useState(1);
  const [activeMediasGenre, setActiveMediasGenre] = useState("all");
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
    try {
      const response = await fetch(url, apiOptions);

      // TODO HIDE SEARCH BAR
      if (!response.ok) {
        throw {
          status: "5XX",
          message:
            "Oops! It seems like we're having trouble fetching data right now. Please try again later.",
        };
      }

      const fetchedData = await response.json();

      const filteredData = fetchedData.results.filter(
        (item) => item.media_type !== "person"
      );
      setMediasData(filteredData);
    } catch (error) {
      console.log(error);
      navigate(`/${error.status}`, {
        state: { status: error.status, message: error.message },
      });
    }
  }

  /* HOOKS ********************************************************************/
  useEffect(() => {
    const apiUrl = `https://api.themoviedb.org/3/trending/${activeMediasGenre}/week?language=en-US&page=${pagination}`;
    fetchMediasData(apiUrl, apiOptions);
  }, [activeMediasGenre]);

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
        <Route path="/" element={<Homepage mediasData={mediasData} />} />
        <Route path="/:id" element={<MediaDetail media={selectedMedia} />} />
        <Route path="/5XX" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
