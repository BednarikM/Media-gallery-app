import { createContext, useState } from "react";

export const PaginationContext = createContext();

export const PaginationProvider = ({ children }) => {
  const [actualPaginationNumber, setActualPaginationNumber] = useState(2);

  return (
    <PaginationContext.Provider
      value={{ actualPaginationNumber, setActualPaginationNumber}}
    >
      {children}
    </PaginationContext.Provider>
  );
};
