import SearchInput from "./SearchInput.jsx";
import "../styles/Header.scss";

export default function Header({ heading, activeGenre, setActiveMoviesGenre }) {
  const movieGenres = ["all", "movie", "tv"];

  return (
    <div className="header">
      <div className="header__title">{heading}</div>
      <div className="header__buttons-wrapper">
        {movieGenres.map((genre) => {
          return (
            <button
              key={genre}
              className={`header__button ${
                activeGenre === genre ? "header__button-active-genre" : ""
              }`}
              onClick={() => setActiveMoviesGenre(genre)}
            >
              <span className="header__button-text">{genre}</span>
            </button>
          );
        })}
      </div>
      <SearchInput />
    </div>
  );
}
