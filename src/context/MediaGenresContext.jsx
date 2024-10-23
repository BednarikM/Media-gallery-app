import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const MediaGenresContext = createContext();

export const MediaTypeProvider = ({ children }) => {
  const location = useLocation();
  const [mediaTypeState, setMediaTypeState] = useState(false);
  const [validMediaGenres, setValidMediaGenress] = useState(["all", "movie", "tv"])

  useEffect(() => {
    const mediaType = validMediaGenres.find((type) =>
      location.pathname.includes(type)
    );

    setMediaTypeState(mediaType);
  }, [location, location.pathname]);

  return (
    <MediaGenresContext.Provider
      value={{
        validMediaGenres,
        setValidMediaGenress,
        mediaTypeState,
        setMediaTypeState,
      }}
    >
      {children}
    </MediaGenresContext.Provider>
  );
};
