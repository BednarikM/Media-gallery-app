import { useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PaginationContext } from "../context/PaginationContext";

import "../styles/components/PaginationInput.scss";

export default function PaginationInput({ classModifier }) {
  const [searchParams] = useSearchParams();
  const { setPage, totalPagesCount } = useContext(PaginationContext);
  const [paginationInputValue, setPaginationInputValue] = useState("");

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
    if (value === "" || /^[1-9][0-9]*$/.test(value)) {
      const numberValue = Number(value);
      if (numberValue <= totalPagesCount) {
        setPaginationInputValue(value);
      }
    }
  }

  return (
    <div
      className={`pagination-input ${
        classModifier ? `pagination-input--${classModifier}` : ""
      }`}
    >
      <input
        type="text"
        value={paginationInputValue}
        min={1}
        max={totalPagesCount}
        placeholder={Number(searchParams.get("page")) || 1}
        id={`pagination-input-element--"${classModifier}`}
        className="pagination-input__element"
        aria-label="Pagination input"
        onChange={(e) => handleChange(e)}
        onKeyDown={(e) => handleKeyDown(e)}
      />
      <label
        className="pagination-input__label"
        htmlFor={`pagination-input-element--"${classModifier}`}
      >
        of {totalPagesCount}
      </label>
    </div>
  );
}
