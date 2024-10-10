import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/MediaListCard.scss";

export default function MediaListCard({ media, index }) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  function formatRoute(mediaTitle) {
    return mediaTitle
      .toLowerCase() // Convert to lowercase
      .replace(/:/g, "-") // Replace colons with hyphens
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/-+/g, "-") // Collapse multiple hyphens into one
      .replace(/^-+|-+$/g, ""); // Remove leading or trailing hyphens
  }

  function formatDate(dateString) {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  }

  return (
    <li className="media-list-card" key={index}>
      <Link
        to={formatRoute(
          media.media_type === "movie" ? media.title : media.name
        )}
        className="media-list-card__link"
        onClick={() => {
          localStorage.setItem("selectedMedia", JSON.stringify(media)); // Store media in localStorage
        }}
      >
        <div className="media-list-card__image-container">
          {!isImageLoaded && <div className="media-list-card__placeholder" />}
          <img
            src={`https://image.tmdb.org/t/p/w500/${media.poster_path}`}
            alt={`${media.title} poster`}
            className="media-list-card__image"
            onLoad={() => setIsImageLoaded(true)}
            style={{ display: isImageLoaded ? "block" : "none" }}
          />
          <div className="media-list-card__information">
            <div className="media-list-card__title">
              {media.media_type === "movie" ? media.title : media.name}
            </div>
            <div className="media-list-card__release-date">
              {media.media_type === "movie"
                ? formatDate(media.release_date)
                : formatDate(media.first_air_date)}
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}
