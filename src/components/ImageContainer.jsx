import { useState } from "react";

import backdropPlaceholder from "../assets/images/backdrop_placeholder.png"; // Adjust path as needed
import posterPlaceholder from "../assets/images/poster_placeholder.png";

export default function ImageContainer({
  imageUrl,
  imageAlt,
  imageType = "poster",
  parentClass,
  classModifier,
}) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const placeholders = {
    poster: posterPlaceholder,
    backdrop: backdropPlaceholder,
  };

  const placeholder = placeholders[imageType] || backdropPlaceholder; // Fallback if imageType is not recognized

  return (
    <div
      className={`${parentClass}__image-container ${
        classModifier ? `${parentClass}__image-container--${classModifier}` : ""
      }`}
    >
      {(!isImageLoaded || !imageUrl) && (
        <img
          src={placeholder}
          alt={`${imageAlt} placeholder`}
          className={`${parentClass}__placeholder`}
        />
      )}
      {imageUrl && (
        <img
          src={`https://image.tmdb.org/t/p/w780/${imageUrl}`}
          alt={`${imageAlt} image`}
          className={`${parentClass}__image`}
          onLoad={() => setIsImageLoaded(true)}
          onError={() => setIsImageLoaded(false)}
          style={{ display: isImageLoaded ? "block" : "none" }}
        />
      )}
    </div>
  );
}
