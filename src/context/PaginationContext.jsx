import { createContext, useEffect, useState } from "react";
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

  const firstPage = 1;

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
    const newSearchParams = new URLSearchParams(searchParams);
    if (pageNumber === 1) {
      newSearchParams.delete("page");
    } else {
      newSearchParams.set("page", pageNumber);
    }
    setSearchParams(newSearchParams);
  }

  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams);
    const queryPageState = Number(newSearchParams.get("page")) || 1;

    if (queryPageState !== currentPageState) {
      setCurrentPageState(queryPageState);
    }
  }, [searchParams]);

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
      // Scenario 1: Current page is less than 4, so display pages 1 through 7
      startPage = 1;
      endPage = Math.min(totalVisiblePages, lastVisiblePage);
    } else if (currentPageState >= lastVisiblePage - 2) {
      // Scenario 3: Near the end, display the last 7 pages
      startPage = Math.max(1, lastVisiblePage - totalVisiblePages + 1);
      endPage = lastVisiblePage;
    } else {
      // Scenario 2: Center currentPageState in the middle of the visible range
      startPage = currentPageState - 2;
      endPage = currentPageState + 2;
    }

    // Populate visiblePages array based on calculated start and end pages
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
