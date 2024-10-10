import MovieListCard from "./MovieListCard.jsx";

import "../styles/MovieList.scss";

export default function MovieList({ moviesData }) {
  const isMoviesDataEmpty = moviesData.length === 0;

  return (
    <>
      {isMoviesDataEmpty ? (
        <div className="movie-list__no-results">
          <span>No results found.</span>
          <span>Please try different keywords.</span>
        </div>
      ) : (
        <ul className="movie-list">
          {moviesData.map((movie, index) => {
            return <MovieListCard key={index} {...{ movie, index }} />;
          })}
        </ul>
      )}
    </>
  );
}
