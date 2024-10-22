import { createContext, useEffect, useState } from "react";

export const PaginationContext = createContext();

export const PaginationProvider = ({ children }) => {
  const [firstPage, setFirstPage] = useState(1);
  const [totalPagesCount, setTotalPagesCount] = useState(); // FINISH
  const [visiblePagesArray, setVisiblePagesArray] = useState([]);
  const [leftEllipsisVisible, setLeftEllipsisVisible] = useState(false);
  const [rightEllipsisVisible, setrightEllipsisVisible] = useState(true);
  const [spreadedPagesCount, setSpreadedPagesCount] = useState();
  const [actualStatePage, setActualStatePage] = useState(1);

  /* CONSTANTS ****************************************************************/
  const lastPage = totalPagesCount;
  const leftOffset = 2,
    rightOffset = 2;
  const maxVisiblePages = 1 + leftOffset + rightOffset;

  function incrementPage() {
    if (actualStatePage < totalPagesCount) {
      console.log("trigered");
      setActualStatePage((prev) => prev + 1);
    }
  }

  function decrementPage() {
    if (actualStatePage > 1) {
      setActualStatePage((prev) => prev - 1);
    }
  }

  function setPage(pageNumber) {
    setActualStatePage(pageNumber);
  }

  useEffect(() => {
    const visiblePages = [];
    const totalVisiblePages = 5; 
    const maxMiddlePage = totalPagesCount - 1; 
  
    let startPage = Math.max(2, actualStatePage - 2); 
    let endPage = Math.min(maxMiddlePage, actualStatePage + 2); 
  
    // ARRAY BEGINNING
    if (actualStatePage <= 3) {
      startPage = 2;
      endPage = Math.min(maxMiddlePage, totalVisiblePages + 1); 
    }
  
    // ARRAY END
    if (actualStatePage >= maxMiddlePage - 2) {
      startPage = Math.max(2, maxMiddlePage - (totalVisiblePages - 1)); 
      endPage = maxMiddlePage;
    }
  
    // VISIBLE ARRAY
    for (let i = startPage; i <= endPage && visiblePages.length < totalVisiblePages; i++) {
      visiblePages.push(i);
    }
  
    setLeftEllipsisVisible(startPage > 2);
    
    setrightEllipsisVisible(endPage < totalPagesCount - 1);
  
    setVisiblePagesArray(visiblePages);
    
    console.log("Current page:", actualStatePage);
    console.log("Visible Pages:", visiblePages);
  
  }, [actualStatePage, totalPagesCount]);

  return (
    <PaginationContext.Provider
      value={{
        firstPage,
        totalPagesCount,
        setTotalPagesCount,
        visiblePagesArray,
        actualStatePage,
        setActualStatePage,
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
