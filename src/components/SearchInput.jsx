import { useContext, useRef } from "react";
import { SearchContext } from "../context/Context.js";
import "../styles/SearchInput.scss";
import SvgIcon from "./SvgIcon.jsx";

export default function SearchInput() {
  const { searchValue, setSearchValue } = useContext(SearchContext);
  const inputRef = useRef();

  const handleIconClick = () => {
    inputRef.current.focus();  // Focus the input when the SVG is clicked
  };

  return (
    <div className="search-input">
      <input
        type="text"
        ref={inputRef}
        value={searchValue}
        id="search-input__element"
        className="search-input__element"
        placeholder="Search"
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <SvgIcon 
        className="search-input__svg" 
        iconName="search" 
        handleIconClick={handleIconClick}
      />
    </div>
  );
}
