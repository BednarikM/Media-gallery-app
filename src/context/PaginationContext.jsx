import { createContext, useEffect, useState, useRef } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

export const PaginationContext = createContext();

export const PaginationProvider = ({ children }) => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const [totalPagesCount, setTotalPagesCount] = useState(); // FINISH
  const [currentPageState, setCurrentPageState] = useState(1);
  const [visiblePagesArray, setVisiblePagesArray] = useState([]);
  const [isPageExcluded, setIsPageExcluded] = useState(false);
  const [paginationInputValue, setPaginationInputValue] = useState("");

  const isSynced = useRef(false);
  const firstPage = 1;

  /* FUNCTIONS ****************************************************************/
  function incrementPage() {
    if (currentPageState < totalPagesCount) {
      setCurrentPageState((prev) => prev + 1);
    }
  }

  function decrementPage() {
    if (currentPageState > 1) {
      setCurrentPageState((prev) => prev - 1);
    }
  }

  function setPage(pageNumber) {
    setCurrentPageState(pageNumber);
  }

  /* HOOKS ********************************************************************/
  /* CURRENT PAGE */
  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams);
    const queryPageState = Number(newSearchParams.get("page"))

    if(queryPageState && queryPageState !== currentPageState && !isSynced.current) {
      setCurrentPageState(queryPageState)
      isSynced.current = true;
    }

    if (currentPageState === 1) {
      newSearchParams.delete("page")
    } else {
      newSearchParams.set("page", currentPageState);
    }

    if (newSearchParams.toString() !== searchParams.toString()) {
      setSearchParams(newSearchParams);
    }
  }, [currentPageState, searchParams]);

  /* EXCLUDED PAGES TO HIDE PAGINATION*/
  useEffect(() => {
    const excludedPages = ["/", "/media", "/favorites"];

    const isExcluded = excludedPages.some((page) => location.pathname === page);
    setIsPageExcluded(isExcluded);
  }, [location.pathname]);

  useEffect(() => {
    const visiblePages = [];
    const totalVisiblePages = 5;
    const lastVisiblePage = totalPagesCount;

    let startPage;
    let endPage;

    if (currentPageState < 3) {
      startPage = 1;
      endPage = Math.min(totalVisiblePages, lastVisiblePage);

    } else if (currentPageState >= lastVisiblePage - 2) {
      startPage = Math.max(1, lastVisiblePage - totalVisiblePages + 1);
      endPage = lastVisiblePage;

    } else {
      startPage = currentPageState - 2;
      endPage = currentPageState + 2;
    }

    for (let i = startPage; i <= endPage; i++) {
      visiblePages.push(i);
    }

    setVisiblePagesArray(visiblePages);
  }, [currentPageState, totalPagesCount]);

  return (
    <PaginationContext.Provider
      value={{
        firstPage,
        isPageExcluded,
        totalPagesCount,
        setTotalPagesCount,
        visiblePagesArray,
        currentPageState,
        setCurrentPageState,
        setPage, // BUTTON FUNCTION
        incrementPage, // SVG FUNCTION
        decrementPage, // SVG FUNCTION
        paginationInputValue, // INPUT STATE
        setPaginationInputValue, // INPUT SETSTATE
      }}
    >
      {children}
    </PaginationContext.Provider>
  );
};
