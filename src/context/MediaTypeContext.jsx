import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const MediaTypeContext = createContext();

export const MediaTypeProvider = ({ children }) => {
  const location = useLocation();
  const [mediaTypeState, setMediaTypeState] = useState(false);

  const validMediaTypes = ["all", "movie", "tv", "search"];

  useEffect(() => {
    const mediaType = validMediaTypes.find((type) =>
      location.pathname.includes(type)
    );

    setMediaTypeState(mediaType);
  }, [location, location.pathname]);

  return (
    <MediaTypeContext.Provider
      value={{
        mediaTypeState,
        setMediaTypeState,
      }}
    >
      {children}
    </MediaTypeContext.Provider>
  );
};
