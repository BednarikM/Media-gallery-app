import { useContext } from "react";

import { PaginationContext } from "../context/PaginationContext.jsx";

import PaginationList from "./PaginationList.jsx";
import PaginationInput from "./PaginationInput.jsx";
import SvgIcon from "./SvgIcon.jsx";

import "../styles/components/Pagination.scss";

export default function PaginationContainer() {
  const {
    firstPage,
    totalPagesCount,
    currentPageState,
    setPage,
    incrementPage,
    decrementPage,
  } = useContext(PaginationContext);

  return (
    <>
      <div className="pagination">
        <div className="pagination__container">
          <div className="pagination__panel">
            <SvgIcon
              className={`pagination__svg-double-chevron-left ${
                currentPageState === 1
                  ? "pagination__svg-double-chevron-left--disabled"
                  : ""
              }`}
              iconName={"double-chevron-left"}
              handleIconClick={() => setPage(1)}
            />
            <SvgIcon
              className={`pagination__svg-chevron-left ${
                currentPageState === 1
                  ? "pagination__svg-chevron-left--disabled"
                  : ""
              }`}
              iconName={"chevron-left"}
              handleIconClick={decrementPage}
            />
            <PaginationList />
            <PaginationInput classModifier={"mobile"} />
            <SvgIcon
              className={`pagination__svg-chevron-right ${
                currentPageState === totalPagesCount
                  ? "pagination__svg-chevron-right--disabled"
                  : ""
              }`}
              iconName={"chevron-right"}
              handleIconClick={incrementPage}
            />
            <SvgIcon
              className={`pagination__svg-double-chevron-right ${
                totalPagesCount === currentPageState
                  ? "pagination__svg-double-chevron-right--disabled"
                  : ""
              }`}
              iconName={"double-chevron-right"}
              handleIconClick={() => setPage(totalPagesCount)}
            />
          </div>
          <PaginationInput classModifier={"desktop"} />
        </div>
      </div>
    </>
  );
}
