import SearchInput from "./SearchInput.jsx";
import { MovieContext } from "../context/Context.js";
import "../styles/Header.scss";

export default function Header({heading}) {
  const { activeMoviesGenre, setActiveMoviesGenre } = useContext(MovieContext);
  
  const movieGenres = ["all", "movie", "tv"]

  return (
    <div className="header">
      <span className="header__title">{heading}</span>
      <div className="header__buttons-wrapper">
        {movieGenres.map((genre) => {
          return (
            <button 
              key={movieGenres} 
              className={`header__button ${activeGenre === genre ? "header__button-active-genre" : ""}`}
            >
              {genre}
            </button>
          )
        })}
      </div>
      <SearchInput />
    </div>
  );
}
