import { useContext } from "react";

import { PaginationContext } from "../context/PaginationContext.jsx";

import SvgIcon from "../components/SvgIcon.jsx";

import "../styles/components/DesktopPagination.scss";

export default function DesktopPagination() {
  const {
    firstPage,
    totalPagesCount,
    currentPageState,
    visiblePagesArray,
    setPage,
    incrementPage,
    decrementPage,
  } = useContext(PaginationContext);

  return (
    <div className="desktop-pagination">
      <SvgIcon
        className={`desktop-pagination__svg-double-chevron-left ${
          currentPageState === 1
            ? "desktop-pagination__svg-double-chevron-left--disabled"
            : ""
        }`}
        iconName={"double-chevron-left"}
        handleIconClick={() => setPage(firstPage)}
      />
      <SvgIcon
        className={`desktop-pagination__svg-chevron-left ${
          currentPageState === 1
            ? "desktop-pagination__svg-chevron-left--disabled"
            : ""
        }`}
        iconName={"chevron-left"}
        handleIconClick={decrementPage}
      />
      <div className="desktop-pagination__list-container">
        <ul className="desktop-pagination__list">
          {visiblePagesArray.map((pageNumber) => {
            return (
              <li className="desktop-pagination__item" key={pageNumber}>
                <button
                  className={`desktop-pagination__button ${
                    pageNumber === currentPageState
                      ? "desktop-pagination__button--active"
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
      </div>
      <SvgIcon
        className={`desktop-pagination__svg-chevron-right ${
          currentPageState === totalPagesCount
            ? "desktop-pagination__svg-chevron-right--disabled"
            : ""
        }`}
        iconName={"chevron-right"}
        handleIconClick={incrementPage}
      />
      <SvgIcon
        className={`desktop-pagination__svg-double-chevron-right ${
          totalPagesCount === currentPageState
            ? "desktop-pagination__svg-double-chevron-right--disabled"
            : ""
        }`}
        iconName={"double-chevron-right"}
        handleIconClick={() => setPage(totalPagesCount)}
      />
    </div>
  );
}
