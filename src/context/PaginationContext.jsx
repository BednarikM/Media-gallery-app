import { createContext, useEffect, useState, useRef, useContext } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

export const PaginationContext = createContext();

export const PaginationProvider = ({ children }) => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams({page: 1});

  const [totalPagesCount, setTotalPagesCount] = useState();
  const [visiblePagesArray, setVisiblePagesArray] = useState([]);
  const [isPageExcluded, setIsPageExcluded] = useState(false);

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
      const currentPage = Number(prev.get("page")); 
      if (currentPage > 1) {
        return { ...Object.fromEntries(prev), page: currentPage - 1 };
      }
      return prev;
    });
  }

  function setPage(pageNumber) {
    setSearchParams((prev) => {
      return { ...Object.fromEntries(prev), page: pageNumber };
    });
  }

  /* HOOKS ********************************************************************/
  /* EXCLUDED PAGES TO HIDE PAGINATION */
  useEffect(() => {
    const isExcluded = excludedPages.some((page) => location.pathname === page);
    setIsPageExcluded(isExcluded);
  }, [location.pathname]);

  /* VISIBLE PAGINATION ARRAY*/
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
        setPage,
        incrementPage,
        decrementPage,
      }}
    >
      {children}
    </PaginationContext.Provider>
  );
};
