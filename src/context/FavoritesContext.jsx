import { createContext, useState, useEffect } from "react";

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const storedFavorites =
      JSON.parse(localStorage.getItem("favoriteMedias")) || [];
    setFavorites(storedFavorites);
  }, []);

  // Sync favorites with localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("favoriteMedias", JSON.stringify(favorites));
  }, [favorites]);

  function addFavorite(media) {
    setFavorites((prevFavorites) => [...prevFavorites, media]);
  }

  function removeFavorite(mediaId) {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((fav) => fav.id !== mediaId)
    );
  }

  function isFavorited(mediaId) {
    return favorites.some((fav) => fav.id === mediaId);
  }

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorited }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
