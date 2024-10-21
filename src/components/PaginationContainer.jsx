import { useEffect, useState, useContext } from "react";

import { PaginationContext } from "../context/PaginationContext.jsx";

import SvgIcon from "../components/SvgIcon.jsx";

import "../styles/components/PaginationContainer.scss";

export default function PaginationContainer({ propsPagesCount = 5 }) {
  const {
    actualStatePage,
    setActualStatePage,
    setPage,
    incrementPage,
    decrementPage,
  } = useContext(PaginationContext);

  const [isLoaded, setIsLoaded] = useState(false);
  const [initialPagesCount, setInitialPagesCount] = useState([]);

  useEffect(() => {
    const array = [];
    for (let i = 1; i <= propsPagesCount; i++) {
      array.push(i);
    }

    setInitialPagesCount(array);
    setIsLoaded(true);
  }, [propsPagesCount]);

  return (
    <>
      {isLoaded && (
        <div className="pagination-container">
          <SvgIcon
            className="pagination-container__svg-chevron-left"
            iconName={"chevron-left"}
            handleIconClick={incrementPage}
          />
          <ul className="pagination-container__list">
            {initialPagesCount.map((pageNumber) => {
              return (
                <li className="pagination-container__item" key={pageNumber}>
                  <button
                    className="pagination-container__button"
                    onClick={() => setPage(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                </li>
              );
            })}
          </ul>
          <SvgIcon
            className="pagination-container__svg-chevron-right"
            iconName={"chevron-right"}
            handleIconClick={decrementPage}
          />
        </div>
      )}
    </>
  );
}
