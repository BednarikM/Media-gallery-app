import { useContext } from "react";
import { SearchContext } from "../../context/SearchContext.js";
import "./SearchInput.scss";

export default function SearchInput() {
  const { searchValue, setSearchValue } = useContext(SearchContext);

  return (
    <div className="search-input">
      <label htmlFor="search-input__element" className="search-input__label">
        Search:
      </label>
      <input
        type="text"
        value={searchValue}
        className="search-input__element"
        placeholder="Type to search"
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </div>
  );
}
