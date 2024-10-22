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
    const totalVisiblePages = 5; // Max number of visible pages, including middle, left, and right
    const maxMiddlePage = totalPagesCount - 1; // Ensure the last page is handled separately
  
    let startPage = Math.max(2, actualStatePage - 2); // Calculate the start page, but not below 2
    let endPage = Math.min(maxMiddlePage, actualStatePage + 2); // Calculate the end page, don't exceed totalPagesCount - 1
  
    // Adjust if we're too close to the beginning
    if (actualStatePage <= 3) {
      startPage = 2;
      endPage = Math.min(maxMiddlePage, totalVisiblePages + 1); // Keep the range within the total and maxMiddlePage
    }
  
    // Adjust if we're too close to the end
    if (actualStatePage >= maxMiddlePage - 2) {
      startPage = Math.max(2, maxMiddlePage - (totalVisiblePages - 1)); // Adjust to show the last set of pages
      endPage = maxMiddlePage;
    }
  
    // Fill the visiblePages array
    for (let i = startPage; i <= endPage && visiblePages.length < totalVisiblePages; i++) {
      visiblePages.push(i);
    }
  
    // Check left ellipsis visibility
    setLeftEllipsisVisible(startPage > 2);
    
    // Check right ellipsis visibility
    setrightEllipsisVisible(endPage < totalPagesCount - 1);
  
    // Set the visible pages array
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
