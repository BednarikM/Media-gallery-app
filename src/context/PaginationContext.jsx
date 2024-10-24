import { createContext, useEffect, useState, useContext } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

export const PaginationContext = createContext();

export const PaginationProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  // const { validMediaGenres, mediaTypeState } = useContext(MediaGenresContext); DELETE

  const [totalPagesCount, setTotalPagesCount] = useState(); // FINISH
  const [currentPageState, setCurrentPageState] = useState(1);
  const [visiblePagesArray, setVisiblePagesArray] = useState([]);
  const [leftEllipsisVisible, setLeftEllipsisVisible] = useState(false);
  const [rightEllipsisVisible, setrightEllipsisVisible] = useState(true);
  const [isPageExcluded, setIsPageExcluded] = useState(false)

  const firstPage = 1

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

  useEffect(() => {
    const excludedPages = ["/", "/media", "/favorites"];
  
    const isExcluded = excludedPages.some(page => location.pathname === page);
    setIsPageExcluded(isExcluded);
  
  
  }, [location.pathname]);


  useEffect(() => {
    if (location.pathname === "/" || location.pathname.startsWith("/media")) {
      return;
    }

    const newSearchParams = new URLSearchParams(searchParams);
    const queryPageState = Number(newSearchParams.get("page"));

    if (queryPageState === currentPageState) return;

    if (currentPageState === 1) {
      newSearchParams.delete("page");
      setSearchParams(newSearchParams);
      return;
    }

    if (currentPageState >= 2) {
      newSearchParams.set("page", currentPageState.toString());
      setSearchParams(newSearchParams);
      return;
    }

    if (queryPageState !== currentPageState) {
      queryPageState > totalPagesCount
        ? totalPagesCount
        : setCurrentPageState(queryPageState);
      return;
    }

  }, [searchParams, currentPageState]);

  useEffect(() => {
    const visiblePages = [];
    const totalVisiblePages = 5;
    const lastVisiblePage = totalPagesCount - 1;

    let startPage = Math.max(2, currentPageState - 2);
    let endPage = Math.min(lastVisiblePage, currentPageState + 2);

    // ARRAY BEGINNING
    if (currentPageState <= 3) {
      startPage = 2;
      endPage = Math.min(lastVisiblePage, totalVisiblePages + 1);
    }

    // ARRAY END
    if (currentPageState >= lastVisiblePage - 2) {
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
