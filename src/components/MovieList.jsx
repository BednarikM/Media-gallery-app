import MovieListCard from "./MovieListCard.jsx";

import "../styles/MovieList.scss";

export default function MovieList({ moviesData }) {
  console.log(moviesData);

  return (
    <>
      <ul className="movie-list">
        {moviesData.map((movie, index) => {
          return <MovieListCard key={index} {...{ movie, index }} />;
        })}
      </ul>
    </>
  );
}
