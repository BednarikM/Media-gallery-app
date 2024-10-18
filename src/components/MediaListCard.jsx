import { useState } from "react";
import { Link } from "react-router-dom";

import ImageContainer from "../components/ImageContainer.jsx";
import Rating from "../components/Rating.jsx";
import SvgIcon from "./SvgIcon.jsx";

import "../styles/components/MediaListCard.scss";

export default function MediaListCard({ media, index }) {
  const [addedToFavorites, setAddedToFavorites] = useState(false);

  const {
    formattedRoute,
    id,
    poster_path,
    formattedTitle,
    media_type,
    formattedReleaseDate,
    vote_average,
    vote_count,
  } = media;

  function toggleFavorite(e) {
    event.stopPropagation();
    setAddedToFavorites((added) => !added);
  }

  return (
    <li className="media-list-card" key={index}>
      <Link
        to={`${formattedRoute}?type=${media_type}&id=${id}`}
        className="media-list-card__link"
        onClick={() => {
          localStorage.setItem("selectedMedia", JSON.stringify(media)); // Store media in localStorage
        }}
      >
        <ImageContainer
          parentClass="media-list-card"
          imageUrl={poster_path}
          imageAlt={formattedTitle}
        />
        <div className="media-list-card__information">
          <div className="media-list-card__title">{formattedTitle}</div>
          <div className="media-list-card__details">
            <Rating voteAverage={vote_average} voteCount={vote_count} />

            <div className="media-list-card__type">
              {media_type.toUpperCase()}
            </div>
            <div className="media-list-card__release-date">
              {formattedReleaseDate || ""}
            </div>
          </div>
          <SvgIcon
            className={`media-list-card__svg-favorite ${
              addedToFavorites ? "media-list-card__svg-favorite--added" : ""
            }`}
            iconName={"favorite"}
            handleIconClick={(e) => toggleFavorite(e)}
          />
        </div>
      </Link>
    </li>
  );
}
