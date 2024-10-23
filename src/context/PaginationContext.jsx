import { createContext, useEffect, useState, useContext } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import { MediaGenresContext } from "./MediaGenresContext";

export const PaginationContext = createContext();

export const PaginationProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const { validMediaGenres, mediaTypeState } = useContext(MediaGenresContext);

  const [firstPage, _] = useState(1);
  const [totalPagesCount, setTotalPagesCount] = useState(1); // FINISH
  const [actualPageState, setActualPageState] = useState(1);
  const [visiblePagesArray, setVisiblePagesArray] = useState([]);
  const [leftEllipsisVisible, setLeftEllipsisVisible] = useState(false);
  const [rightEllipsisVisible, setrightEllipsisVisible] = useState(true);
  const [skipUseEffect, setSkipUseEffect] = useEffect(false);

  function incrementPage() {
    if (actualPageState < totalPagesCount) {
      setActualPageState((prev) => prev + 1);
    }
  }

  function decrementPage() {
    if (actualPageState > 1) {
      setActualPageState((prev) => prev - 1);
    }
  }

  function setPage(pageNumber) {
    setActualPageState(pageNumber);
  }

  useEffect(() => {
    if (location.pathname === "/") {
      return;
    }

    const newSearchParams = new URLSearchParams(searchParams);
    const mappedPageQuery = newSearchParams.get("page"); // CONTINUE

    if (actualPageState !== 1) {
      newSearchParams.set("page", actualPageState);
    }

    setSearchParams(newSearchParams);
  }, [searchParams, actualPageState]);

  useEffect(() => {
    const visiblePages = [];
    const totalVisiblePages = 5;
    const lastVisiblePage = totalPagesCount - 1;

    let startPage = Math.max(2, actualPageState - 2);
    let endPage = Math.min(lastVisiblePage, actualPageState + 2);

    // ARRAY BEGINNING
    if (actualPageState <= 3) {
      startPage = 2;
      endPage = Math.min(lastVisiblePage, totalVisiblePages + 1);
    }

    // ARRAY END
    if (actualPageState >= lastVisiblePage - 2) {
      startPage = Math.max(2, lastVisiblePage - (totalVisiblePages - 1));
      endPage = lastVisiblePage;
    }

    // VISIBLE ARRAY
    for (
      let i = startPage;
      i <= endPage && visiblePages.length < totalVisiblePages;
      i++
    ) {
      visiblePages.push(i);
    }

    setLeftEllipsisVisible(startPage > 2);

    setrightEllipsisVisible(endPage < totalPagesCount - 1);

    setVisiblePagesArray(visiblePages);
  }, [actualPageState, totalPagesCount]);

  return (
    <PaginationContext.Provider
      value={{
        firstPage,
        totalPagesCount,
        setTotalPagesCount,
        visiblePagesArray,
        actualPageState,
        setActualPageState,
        leftEllipsisVisible,
        rightEllipsisVisible,
        setPage, // BUTTON FUNCTION
        incrementPage, // SVG FUNCTION
        decrementPage, // SVG FUNCTION
      }}
    >
      {children}
    </PaginationContext.Provider>
  );
};
