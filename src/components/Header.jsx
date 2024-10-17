import { NavLink } from "react-router-dom";

import SearchInput from "./SearchInput.jsx";
import SvgIcon from "./SvgIcon.jsx";

import "../styles/components/Header.scss";

export default function Header({ heading }) {
  const mediaGenres = ["all", "movie", "tv"];

  return (
    <div className="header">
      <div className="header__content">
        <div className="header__title">{heading}</div>
        <div className="header__content-container">
          {/* <SearchInput /> */}
          <div className="header__nav-links-wrapper">
            {mediaGenres.map((genre) => {
              return (
                <NavLink
                  key={genre}
                  to={`/${genre}`}
                  className={({ isActive }) =>
                    `header__nav-link ${
                      isActive ? "header__nav-link--active" : ""
                    }`
                  }
                >
                  <span className="header__nav-link-text">{genre}</span>
                </NavLink>
              );
            })}
          </div>
          <SvgIcon
            className="header__svg-hamburger-menu"
            iconName={"hamburger-menu"}
          />
        </div>
      </div>
    </div>
  );
}
