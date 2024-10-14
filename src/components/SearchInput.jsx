import { useContext, useRef } from "react";
import { SearchContext } from "../context/Context.js";

import "../styles/SearchInput.scss";

import SvgIcon from "./SvgIcon.jsx";

export default function SearchInput() {
  const { searchInputValue, setSearchInputValue } = useContext(SearchContext);
  const inputRef = useRef();

  // function handleSearchIconClick() {
  //   inputRef.current.focus(); // Focus the input when the SVG is clicked
  // }

  function handleClearIconClick() {
    if(searchInputValue) {
      setSearchInputValue("")
    }
  }

  return (
    <div className="search-input">
      <div className="search-input__element-container">
        <input
          type="text"
          ref={inputRef}
          value={searchInputValue}
          id="search-input__element"
          className="search-input__element"
          placeholder="Search"
          onChange={(e) => setSearchInputValue(e.target.value)}
        />
        <SvgIcon
            className={`search-input__svg-clear ${
              searchInputValue ? "search-input__svg-clear--display" : ""
            }`}
          iconName="clear"
          handleIconClick={() => handleClearIconClick()}
        />
      </div>
      {/* <div className="search-input__svg-container">
        <SvgIcon
          className="search-input__svg-search"
          iconName="search"
          handleIconClick={() => handleSearchIconClick()}
        />
      </div> */}
    </div>
  );
}
