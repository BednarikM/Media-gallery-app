import { useEffect, useState, useContext } from "react";

import { PaginationContext } from "../context/PaginationContext.jsx";

import SvgIcon from "../components/SvgIcon.jsx";

import "../styles/components/PaginationContainer.scss";

export default function PaginationContainer() {
  const {
    firstPage,
    totalPagesCount,
    actualStatePage,
    visiblePagesArray,
    leftEllipsisVisible,
    rightEllipsisVisible,
    setTotalpagesCount,
    spreadedPagesCount,
    setSpreadedPagesCount,
    setActualStatePage,
    setPage,
    incrementPage,
    decrementPage,
  } = useContext(PaginationContext);

  const [isLoaded, setIsLoaded] = useState(true);

  return (
    <>
      {isLoaded && (
        <div className="pagination-container">
          <SvgIcon
            className={`pagination-container__svg-chevron-left ${
              actualStatePage === 1
                ? "pagination-container__svg-chevron-left--disabled"
                : ""
            }`}
            iconName={"chevron-left"}
            handleIconClick={decrementPage}
          />
          <div className="pagination-container__list-container">
            <button
              className={`pagination-container__button pagination-container__button--first ${
                firstPage === actualStatePage
                  ? "pagination-container__button--active"
                  : ""
              }`}
              onClick={() => setPage(firstPage)}
            >
              {firstPage}
            </button>
            {leftEllipsisVisible && (
              <SvgIcon
                className={"pagination-container__svg-ellipsis"}
                iconName={"ellipsis"}
              />
            )}
            <ul className="pagination-container__list">
              {visiblePagesArray.map((pageNumber) => {
                return (
                  <li className="pagination-container__item" key={pageNumber}>
                    <button
                      className={`pagination-container__button ${
                        pageNumber === actualStatePage
                          ? "pagination-container__button--active"
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
            {rightEllipsisVisible && (
              <SvgIcon
                className={"pagination-container__svg-ellipsis"}
                iconName={"ellipsis"}
              />
            )}
            <button
              className={`pagination-container__button pagination-container__button--last ${
                totalPagesCount === actualStatePage
                  ? "pagination-container__button--active"
                  : ""
              }`}
              onClick={() => setPage(totalPagesCount)}
            >
              {totalPagesCount}
            </button>
          </div>
          <SvgIcon
            className={`pagination-container__svg-chevron-right ${
              actualStatePage === totalPagesCount.length
                ? "pagination-container__svg-chevron-right--disabled"
                : ""
            }`}
            iconName={"chevron-right"}
            handleIconClick={incrementPage}
          />
        </div>
      )}
    </>
  );
}
