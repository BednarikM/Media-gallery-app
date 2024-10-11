import { useState } from "react";

export default function ImageContainer({imageUrl, imageAlt}) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div className="media-list-card__image-container">
    {!isImageLoaded && <div className="media-list-card__placeholder" />}
    <img
      src={`https://image.tmdb.org/t/p/w500/${imageUrl}`}
      alt={`${imageAlt} image`}
      className="media-list-card__image"
      onLoad={() => setIsImageLoaded(true)}
      style={{ display: isImageLoaded ? "block" : "none" }}
    />
  </div>
  )
}