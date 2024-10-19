import { useState, useEffect } from "react";

import SvgIcon from "./SvgIcon.jsx";

export default function Favorite({ media }) {
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const storedFavorites =
      JSON.parse(localStorage.getItem("favoriteMedias")) || [];
    const isFavorited = storedFavorites.some((fav) => fav.id === media.id);
    setIsFavorited(isFavorited);
  }, [media.id]);

  function toggleFavorite(e) {
    e.stopPropagation();
    e.preventDefault();

    setIsFavorited((favorited) => !favorited);
  }

  useEffect(() => {
    const storedFavorites =
      JSON.parse(localStorage.getItem("favoriteMedias")) || [];

    const updatedFavorites = isFavorited
      ? [...storedFavorites, media]
      : storedFavorites.filter((fav) => fav.id !== media.id);

    localStorage.setItem("favoriteMedias", JSON.stringify(updatedFavorites));
  }, [isFavorited]);

  return (
    <SvgIcon
      className={`media-list-card__svg-favorite ${
        isFavorited ? "media-list-card__svg-favorite--added" : ""
      }`}
      iconName={"favorite"}
      handleIconClick={toggleFavorite}
    />
  );
}
