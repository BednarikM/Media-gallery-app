import { NavLink } from "react-router-dom";
import SearchInput from "./SearchInput.jsx";
import "../styles/Header.scss";

export default function Header({ heading }) {
  const mediaGenres = ["all", "movie", "tv"];

  return (
    <div className="header">
      <div className="header__title">{heading}</div>
      <div className="header__nav-links-wrapper">
        {mediaGenres.map((genre) => {
          return (
            <NavLink
              key={genre}
              to={`/${genre}`}
              className={({ isActive }) =>
                isActive
                  ? "header__nav-link header__nav-link--active"
                  : "header__nav-link"
              }
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
