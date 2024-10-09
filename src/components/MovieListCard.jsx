import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { MovieContext } from "../context/Context.js";
import "../styles/MovieListCard.scss";

export default function MovieListCard({ movie, index }) {
  const { setSelectedMovie } = useContext(MovieContext);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  function formatRoute(title) {
    return title
      .toLowerCase() // Convert to lowercase
      .replace(/:/g, "-") // Replace colons with hyphens
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/-+/g, "-") // Collapse multiple hyphens into one
      .replace(/^-+|-+$/g, ""); // Remove leading or trailing hyphens
  }

  function formatDate(dateString) {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  }

  return (
    <li className="movie-list-card" key={index}>
      <Link
        to={formatRoute(
          movie.media_type === "movie" ? movie.title : movie.name
        )}
        className="movie-list-card__link"
        onClick={() => setSelectedMovie(movie)}
      >
        {!isImageLoaded ? (
          <div className="movie-list-card__placeholder" />
        ) : (
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={`${movie.title} poster`}
            className="movie-list-card__image"
            onLoad={() => setIsImageLoaded(true)} // Set isLoaded to true when image is loaded
          />
        )}
        <div className="movie-list-card__information">
          <div className="movie-list-card__title">
            {movie.media_type === "movie" ? movie.title : movie.name}
          </div>
          <div className="movie-list-card__release-date">
            {movie.media_type === "movie"
              ? formatDate(movie.release_date)
              : formatDate(movie.first_air_date)}
          </div>
        </div>
      </Link>
    </li>
  );
}
