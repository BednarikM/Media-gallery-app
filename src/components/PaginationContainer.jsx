import { useEffect, useState } from "react";

import SvgIcon from "../components/SvgIcon.jsx";

import "../styles/components/PaginationContainer.scss";

export default function PaginationContainer({ pagesCount }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [paginationCount, setPaginationCount] = useState([]);
  const [actualNumber, setActualNumber] = useState(1);

  console.log(paginationCount);

  useEffect(() => {
    const pagesCountArray = [];
    for (let i = 1; i <= pagesCount; i++) {
      pagesCountArray.push(i);
    }

    setPaginationCount(pagesCountArray);
    setIsLoaded(true);
  }, []);

  return (
    <>
      {isLoaded && (
        <div className="pagination-container">
          <SvgIcon className="pagination-container__svg-chevron-left" iconName={"chevron-left"} />
          <ul className="pagination-container__list">
            {paginationCount.map((page) => {
              return (
                <li className="pagination-container__item" key={page}>
                  <button className="pagination-container__button">{page}</button>
                </li>
              );
            })}
          </ul>
          <SvgIcon className="pagination-container__svg-chevron-right" iconName={"chevron-right"} />
        </div>
      )}
    </>
  );
}
