import { useContext, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { SearchContext } from "../context/Context.js";

import SvgIcon from "../components/SvgIcon.jsx";

import "../styles/components/SearchInput.scss";

export default function SearchInput() {
  const [ searchParams , setSearchParams] = useSearchParams()
  const { searchInputValue, setSearchInputValue } = useContext(SearchContext);
  const inputRef = useRef();

  /* FUNCTIONS ******************************************************************/
  function handleKeyDown(event) {
    if (event.key === "Enter") {
      setSearchParams(() => {
        return {keyword: searchInputValue}
      })
    }
  }

  function handleClearIconClick() {
    if (searchInputValue) {
      setSearchInputValue("");
    }
  }

  /* HOOKS ********************************************************************/
  /* DEBOUNCED SEARCH KEYWORD LOGIC */
  useEffect(() => {
    if (searchInputValue) {
      const timeoutId = setTimeout(() => {
        setSearchParams(() => {
          return {keyword: searchInputValue}
        })

      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [searchInputValue]);

  return (
    <div className="search-input">
      <input
        type="text"
        ref={inputRef}
        value={searchInputValue}
        id="search-input__element"
        className="search-input__element"
        aria-label="Search input"
        placeholder="Type to search"
        onChange={(e) => setSearchInputValue(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e)}
      />
      <SvgIcon
        className={`search-input__svg-clear ${
          searchInputValue ? "search-input__svg-clear--display" : ""
        }`}
        iconName="clear"
        handleIconClick={() => handleClearIconClick()}
      />
    </div>
  );
}
