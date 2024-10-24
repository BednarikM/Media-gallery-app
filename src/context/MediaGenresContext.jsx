import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const MediaGenresContext = createContext();

export const MediaGenresProvider = ({ children }) => {
  const location = useLocation();

  const [currentMediaTypeState, setCurrentMediaTypeState] = useState();
  const [isValidTrendingMediaGenre, setIsValidTrendingMediaGenres] = useState();
  const [validMediaGenres, setValidMediaGenress] = useState([
    "all",
    "movie",
    "tv",
  ]);

  useEffect(() => {
    const mediaType = validMediaGenres.find((type) =>
      location.pathname.includes(type)
    );

    if (currentMediaTypeState !== mediaType) {
      setCurrentMediaTypeState(mediaType);
    }

    if (validMediaGenres.includes(mediaType)) {
      setIsValidTrendingMediaGenres(true);
    } else {
      setIsValidTrendingMediaGenres(false);
    }
  }, [location, location.pathname]);

  return (
    <MediaGenresContext.Provider
      value={{
        validMediaGenres,
        setValidMediaGenress,
        currentMediaTypeState,
        setCurrentMediaTypeState,
        isValidTrendingMediaGenre,
        setIsValidTrendingMediaGenres,
      }}
    >
      {children}
    </MediaGenresContext.Provider>
  );
};
