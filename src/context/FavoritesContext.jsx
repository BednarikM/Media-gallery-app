import { createContext, useState, useEffect } from "react";

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favoritesState, setFavoritesState] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favoritesMedia"));
    console.log("storedFavorites", storedFavorites)
    if (storedFavorites && storedFavorites.length) {
      setFavoritesState(storedFavorites);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favoritesMedia", JSON.stringify(favoritesState));
  }, [favoritesState]);

  function addFavorite(mediaData) {
    setFavoritesState((prevFavorites) => [...prevFavorites, mediaData]);
  }

  function removeFavorite(mediaId) {
    setFavoritesState((prevFavorites) =>
      prevFavorites.filter((fav) => fav.id !== mediaId)
    );
  }

  function isFavorited(mediaId) {
    return favoritesState.some((fav) => fav.id === mediaId);
  }

  return (
    <FavoritesContext.Provider
      value={{ favoritesState, addFavorite, removeFavorite, isFavorited }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
