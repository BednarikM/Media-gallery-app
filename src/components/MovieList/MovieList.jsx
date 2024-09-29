import "./MovieList.scss";

export default function MovieList({ movies }) {
  return (
    <>
      <ul className="movie-list">
        {movies.map((movie, index) => {
          return (
            <li key={index} className="movie-list__item">
              <img src={movie.Poster} alt={`${movie.title} poster`} />
              <div className="movie-list__item-overlay"></div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
