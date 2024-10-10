import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MediaDetail() {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [media, setMedia] = useState(
    JSON.parse(localStorage.getItem("selectedMedia")) || {}
  );

  const navigate = useNavigate();
  console.log(media);

  const mediaType = media.media_type;

  if (Object.entries(media).length === 0) {
    return null;
  }

  useEffect(() => {
    if (Object.entries(media).length === 0) {
      navigate("/404");
    }
  }, [media]);

  return (
    <>
      <h1>TEST</h1>
      <div>{media.name}</div>
      <div>{media.adult.toString()}</div>
      <div className="media-list-card__image-container">
        {!isImageLoaded && <div className="media-list-card__placeholder" />}
        <img
          src={`https://image.tmdb.org/t/p/w500/${media.poster_path}`}
          alt={`${media.title} poster`}
          className="media-list-card__image"
          onLoad={() => setIsImageLoaded(true)}
          style={{ display: isImageLoaded ? "block" : "none" }}
        />
      </div>
    </>
  );
}
