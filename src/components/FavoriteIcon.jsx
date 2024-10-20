import { useContext } from "react";

import { FavoritesContext } from "../context/FavoritesContext.jsx";

import SvgIcon from "./SvgIcon.jsx";

import "../styles/components/FavoriteIcon.scss";

export default function Favorite({ media }) {
  const { isFavorited, addFavorite, removeFavorite } =
    useContext(FavoritesContext);

  const favorited = isFavorited(media.id);

  function toggleFavorite(e) {
    e.stopPropagation();
    e.preventDefault();

    if (favorited) {
      removeFavorite(media.id);
    } else {
      addFavorite(media);
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
