import { useNavigate, useLocation } from "react-router-dom";
import SearchInput from "./SearchInput.jsx";
import "../styles/Header.scss";

export default function Header({
  heading,
  activeMediasGenre,
  setActiveMediasGenre,
  setSearchInputValue,
}) {
  const mediaGenres = ["all", "movie", "tv"];
  const navigate = useNavigate();
  const location = useLocation();

  function handleButtonClick(genre) {
    setActiveMediasGenre(genre);
    setSearchInputValue("");
    if (location.pathname !== "/") {
      navigate("/");
    }
  }

  return (
    <div className="header">
      <div className="header__title">{heading}</div>
      <div className="header__buttons-wrapper">
        {mediaGenres.map((genre) => {
          return (
            <button
              key={genre}
              className={`header__button ${
                activeMediasGenre === genre ? "header__button--active" : ""
              }`}
              onClick={() => handleButtonClick(genre)}
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
