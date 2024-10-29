import { createContext, useEffect, useState, useRef, useContext } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

export const PaginationContext = createContext();

export const PaginationProvider = ({ children }) => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams({page: 1});

  const [totalPagesCount, setTotalPagesCount] = useState(); // FINISH
  const [visiblePagesArray, setVisiblePagesArray] = useState([]);
  const [isPageExcluded, setIsPageExcluded] = useState(false);
  const [paginationInputValue, setPaginationInputValue] = useState("");

  const excludedPages = ["/", "/media", "/favorites"];

  /* FUNCTIONS ****************************************************************/
  function incrementPage() {
    setSearchParams((prev) => {
      const currentPage = Number(prev.get("page"));
      return { ...Object.fromEntries(prev), page: currentPage + 1 };
    });
  }

  function decrementPage() {
    setSearchParams((prev) => {
      const currentPage = Number(prev.get("page")); // Default to 1 if not set
      if (currentPage > 1) {
        return { ...Object.fromEntries(prev), page: currentPage - 1 }; // Decrement page if > 1
      }
      return prev; // Return previous params if already at 1
    });
  }

  function setPage(pageNumber) {
    setSearchParams((prev) => {
      return { ...Object.fromEntries(prev), page: pageNumber }; // Set the specific page number
    });
  }

  /* HOOKS ********************************************************************/
  /* CURRENT PAGE */
  // useEffect(() => {
  //   const newSearchParams = new URLSearchParams(searchParams);
  //   const queryPageState = Number(newSearchParams.get("page"));

  //   // if (
  //   //   queryPageState &&
  //   //   queryPageState !== currentPageState &&
  //   //   !isSynced.current
  //   // ) {
  //   //   setCurrentPageState(queryPageState);
  //   //   isSynced.current = true;
  //   // }

  //   // console.log("params", newSearchParams.get("page"));
  //   // console.log("current", currentPageState);
  //   // console.log("queryPageState", queryPageState);

  //   // // if (currentPageState !== firstPage && !isPageExcluded) {
  //   // //   newSearchParams.set("page", currentPageState);
  //   // // } else if (currentPageState === firstPage || isPageExcluded) {
  //   // //   // console.log(currentPageState, firstPage, currentPageState === firstPage)
  //   // //   // console.log(isPageExcluded)
  //   // //   newSearchParams.delete("page");
  //   // // }

  //   setSearchParams(newSearchParams);
  // }, [currentPageState]);

  /* EXCLUDED PAGES TO HIDE PAGINATION*/
  useEffect(() => {
    const isExcluded = excludedPages.some((page) => location.pathname === page);
    setIsPageExcluded(isExcluded);
  }, [location.pathname]);

  useEffect(() => {
    const currentPage = Number(searchParams.get("page"))

    const visiblePages = [];
    const totalVisiblePages = 5;
    const lastVisiblePage = totalPagesCount;

    let startPage;
    let endPage;

    if (currentPage < 3) {
      startPage = 1;
      endPage = Math.min(totalVisiblePages, lastVisiblePage);
    } else if (currentPage >= lastVisiblePage - 2) {
      startPage = Math.max(1, lastVisiblePage - totalVisiblePages + 1);
      endPage = lastVisiblePage;
    } else {
      startPage = currentPage - 2;
      endPage = currentPage + 2;
    }

    for (let i = startPage; i <= endPage; i++) {
      visiblePages.push(i);
    }

    setVisiblePagesArray(visiblePages);
  }, [searchParams, totalPagesCount]);

  return (
    <PaginationContext.Provider
      value={{
        isPageExcluded,
        totalPagesCount,
        setTotalPagesCount,
        visiblePagesArray,
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
