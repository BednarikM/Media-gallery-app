import { useContext } from "react";

import { FavoritesContext } from "../context/FavoritesContext.jsx";

import SvgIcon from "./SvgIcon.jsx";

import "../styles/components/FavoriteIcon.scss";

export default function FavoriteIcon({ mediaData }) {
  const { isFavorited, addFavorite, removeFavorite } =
    useContext(FavoritesContext);

  const favorited = isFavorited(mediaData.id);

  function toggleFavorite(e) {
    e.stopPropagation();
    e.preventDefault();

    if (favorited) {
      removeFavorite(mediaData.id);
    } else {
      addFavorite(mediaData);
    }
  }

  return (
    <div className="favorite-icon">
      <SvgIcon
        className={`favorite-icon__svg-favorite ${
          favorited ? "favorite-icon__svg-favorite--added" : ""
        }`}
        iconName={"favorite"}
        handleIconClick={toggleFavorite}
      />
    </div>
  );
}
