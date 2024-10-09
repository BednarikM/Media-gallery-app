import { Link } from "react-router-dom";
import "../styles/MovieListCard.scss";

export default function MovieListCard({ movie, index }) {
  function formatRoute(title) {
    return title.toLowerCase().replace(/\s+/g, "-");
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
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={`${movie.title} poster`}
          className="movie-list-card__image"
        />
        <div className="movie-list-card__information">
          <div className="movie-list-card__title">{movie.media_type === "movie" ? movie.title : movie.name}</div>
        </div>
      </Link>
    </li>
  );
}
