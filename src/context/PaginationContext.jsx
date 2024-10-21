import { createContext, useEffect, useState } from "react";

export const PaginationContext = createContext();

export const PaginationProvider = ({ children }) => {
  const [initialPagesCount, setInitialPagesCount] = useState(5); // FINISH
  const [actualStatePage, setActualStatePage] = useState(2);

  function incrementPage() {
    if (actualPageNumber < pagesCount) {
      setActualStatePage((prev) => prev + 1);
    }
  }

  function decrementPage() {
    if (actualPageNumber > 1) {
      setActualStatePage((prev) => prev - 1);
    }
  }

  function setPage(pageNumber) {
    setActualStatePage(pageNumber);
  }

  useEffect(() => {
    console.log(actualStatePage);
  }, [actualStatePage]);

  return (
    <PaginationContext.Provider
      value={{
        actualStatePage,
        setActualStatePage,
        setPage,
        incrementPage,
        decrementPage,
      }}
    >
      {children}
    </PaginationContext.Provider>
  );
};
