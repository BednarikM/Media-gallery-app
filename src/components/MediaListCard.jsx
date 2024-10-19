import { Link } from "react-router-dom";

import ImageContainer from "../components/ImageContainer.jsx";
import Rating from "../components/Rating.jsx";
import Favorite from "./Favorite.jsx";

import "../styles/components/MediaListCard.scss";

export default function MediaListCard({ media, index }) {
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

  return (
    <li className="media-list-card" key={index}>
      <Link
        to={`${formattedRoute}?type=${media_type}&id=${id}`}
        className="media-list-card__link"
      >
        <ImageContainer
          parentClass="media-list-card"
          imageUrl={poster_path}
          imageAlt={formattedTitle}
        />
        <div className="media-list-card__information">
          <div className="media-list-card__title">{formattedTitle}</div>
          <div className="media-list-card__details">
            <div className="media-list-card__type">
              {media_type.toUpperCase()}
            </div>
            <div className="media-list-card__release-date">
              {formattedReleaseDate || ""}
            </div>
            <div className="media-list-card__likeness">
              <Rating voteAverage={vote_average} voteCount={vote_count} />
              <Favorite media={media} />
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}
