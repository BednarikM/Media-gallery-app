export default function MovieList({ movies }) {
  return (
    <>
      <ul className="movie-list">
        {movies.map((movie, index) => {
          return (
            <li key={index}>
              <img src={movie.Poster} alt={`${movie.Title} poster`}></img>
            </li>
          );
        })}
      </ul>
    </>
  );
}
