import { useContext } from "react";
import { useSearchParams } from "react-router-dom";

import { PaginationContext } from "../context/PaginationContext.jsx";

import "../styles/components/PaginationList.scss";

export default function PaginationList() {
  const [searchParams] = useSearchParams()
  const { visiblePagesArray, setPage } = useContext(PaginationContext);

  return (
    <ul className="pagination-list">
      {visiblePagesArray.map((pageNumber) => {
        return (
          <li className="pagination-list__item" key={pageNumber}>
            <button
              className={`pagination-list__button ${
                pageNumber === Number(searchParams.get("page") || 1)
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
