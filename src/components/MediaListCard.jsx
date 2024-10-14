import { Link } from "react-router-dom";
import "../styles/MediaListCard.scss";

import ImageContainer from "./ImageContainer";

export default function MediaListCard({ media, index }) {
  const {
    formattedRoute,
    id,
    poster_path,
    formattedTitle,
    media_type,
    formattedReleaseDate,
  } = media;

  return (
    <li className="media-list-card" key={index}>
      <Link
        to={`${formattedRoute}/${id}`}
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
            <div className="media-list-card__type">
              {media_type.toUpperCase()}
            </div>
            <div className="media-list-card__release-date">
              {formattedReleaseDate || ""}
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}
