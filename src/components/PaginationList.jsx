import { useContext } from "react";

import { PaginationContext } from "../context/PaginationContext.jsx";

import "../styles/components/PaginationList.scss";

export default function PaginationList() {
  const { currentPageState, visiblePagesArray, setPage } =
    useContext(PaginationContext);

  return (
    <ul className="pagination-list">
      {visiblePagesArray.map((pageNumber) => {
        return (
          <li className="pagination-list__item" key={pageNumber}>
            <button
              className={`pagination-list__button ${
                pageNumber === currentPageState
                  ? "pagination-list__button--active"
                  : ""
              }`}
              onClick={() => setPage(pageNumber)}
            >
              {pageNumber}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
