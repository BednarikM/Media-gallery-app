import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import SearchInput from "../components/SearchInput.jsx";
import SvgIcon from "../components/SvgIcon.jsx";

import "../styles/components/Header.scss";

export default function Header({ heading }) {
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);
  const mediaGenres = ["all", "movie", "tv"];

  function toggleMenu() {
    setIsMobileMenuOpened((open) => !open);
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 900 && isMobileMenuOpened) {
        setIsMobileMenuOpened(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobileMenuOpened]);

  return (
    <div className="header">
      <div className="header__content">
        <div className="header__title-container">
          <span className="header__title">{heading}</span>
        </div>
        <div
          className={`header__menu ${
            isMobileMenuOpened ? "header__menu--is-opened" : ""
          }`}
        >
          <SearchInput />
          <ul className="header__nav-link-list">
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
          </ul>
        </div>
        <SvgIcon
          className="header__svg-hamburger-menu"
          iconName={"hamburger-menu"}
          handleIconClick={toggleMenu}
        />
      </div>
    </div>
  );
}
