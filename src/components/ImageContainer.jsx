import { useState } from "react";

export default function ImageContainer({ imageUrl, imageAlt, parentClass }) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div className={`${parentClass}__image-container`}>
      {!isImageLoaded && <div className={`${parentClass}__placeholder`} />}
      <img
        src={`https://image.tmdb.org/t/p/w500/${imageUrl}`}
        alt={`${imageAlt} image`}
        className={`${parentClass}__image`}
        onLoad={() => setIsImageLoaded(true)}
        style={{ display: isImageLoaded ? "block" : "none" }}
      />
    </div>
  );
}
