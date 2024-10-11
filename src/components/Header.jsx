import { useNavigate, NavLink } from "react-router-dom";
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

  function handleButtonClick(genre) {
    setActiveMediasGenre(genre);
    setSearchInputValue("");
    navigate(`/${genre}`);
  }

  return (
    <div className="header">
      <div className="header__title">{heading}</div>
      <div className="header__nav-links-wrapper">
        {mediaGenres.map((genre) => {
          return (
            <NavLink
            key={genre}
            to={`/${genre}`} // Navigate to the correct route
            className={({ isActive }) =>
              isActive
                ? "header__nav-link header__nav-link--active"
                : "header__nav-link"
            }
            
            // className={`header__button ${
            //   activeMediasGenre === genre ? "header__button--active" : ""
            // }`}



            onClick={() => handleButtonClick(genre)} // Perform the click logic
          >
            <span className="header__nav-link-text">{genre}</span>
          </NavLink>
          );
        })}
      </div>
      <SearchInput />
    </div>
  );
}
