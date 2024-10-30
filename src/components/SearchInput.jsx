import { useContext, useRef } from "react";

import { SearchContext } from "../context/Context.js";

import SvgIcon from "../components/SvgIcon.jsx";

import "../styles/components/SearchInput.scss";

export default function SearchInput() {
  const { searchInputValue, setSearchInputValue } = useContext(SearchContext);
  const inputRef = useRef();

  // function handleKeyDown(event) {
  //   if (event.key === "Enter") {
  //     console.log("trigered");
  //     setTriggerState(inputRef.current.value); // TODO TRIGGER SEARCH HOOK WITH ENTER KEYDOWN
  //   }
  // }

  function handleClearIconClick() {
    if (searchInputValue) {
      setSearchInputValue("");
    }
  }

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
        // onKeyDown={handleKeyDown}
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
