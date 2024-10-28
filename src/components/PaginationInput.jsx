import { useContext, useState } from "react";
import { PaginationContext } from "../context/PaginationContext";

import "../styles/components/PaginationInput.scss";

export default function PaginationInput({classModifier}) {
  const { currentPageState, setPage, totalPagesCount } =
    useContext(PaginationContext);
  const [paginationInputValue, setPaginationInputValue] =
    useState(currentPageState);

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      const pageNumber = Number(paginationInputValue);
      if (pageNumber >= 1 && pageNumber <= totalPagesCount) {
        setPage(pageNumber);
      }
    }
  }

  function handleChange(e) {
    const value = e.target.value;
    setPaginationInputValue(value);
  }

  return (
    <div className={`pagination-input ${classModifier ? `pagination-input--${classModifier}` : ""}`}>
      <input
        type="number"
        value={paginationInputValue}
        min={1}
        max={totalPagesCount}
        id="pagination-input-element"
        className="pagination-input__element"
        aria-label="Pagination input"
        onChange={(e) => handleChange(e)}
        onKeyDown={(e) => handleKeyDown(e)} // onKeyDown={handleKeyDown}
      />
      <label
        className="pagination-input__label"
        htmlFor="pagination-input-element"
      >
        of {totalPagesCount}
      </label>
    </div>
  );
}
