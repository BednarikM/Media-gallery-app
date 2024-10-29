import { Link } from "react-router-dom";

import ImageContainer from "../components/ImageContainer.jsx";
import Rating from "../components/Rating.jsx";
import FavoriteIcon from "./FavoriteIcon.jsx";
import MediaSubInformation from "../components/MediaSubInformation.jsx";

import "../styles/components/MediaListCard.scss";

export default function MediaListCard({ mediaItem, index }) {
  const {
    formattedRoute,
    id,
    poster_path,
    formattedTitle,
    media_type,
    vote_average,
    vote_count,
  } = mediaItem;

  const newSearchParams = () => {
    const params = new URLSearchParams();
    params.set("type", media_type);
    params.set("id", id);
    return params.toString();  // Return the search string
  };

  return (
    <li className="media-list-card">
      <Link
        to={`${formattedRoute}?${newSearchParams()}`}
        state={{ mediaDataLocationState: mediaItem }}
        className="media-list-card__link"
      >
        <ImageContainer
          parentClass="media-list-card"
          imageUrl={poster_path}
          imageAlt={formattedTitle}
        />
        <div className="media-list-card__information">
          <div className="media-list-card__information-container">
            <div className="media-list-card__title">{formattedTitle}</div>
            <MediaSubInformation mediaData={mediaItem} />
          </div>
          <div className="media-list-card__likeness">
            <Rating voteAverage={vote_average} voteCount={vote_count} />
            <FavoriteIcon mediaData={mediaItem} />
          </div>
        </div>
      </Link>
    </li>
  );
}
