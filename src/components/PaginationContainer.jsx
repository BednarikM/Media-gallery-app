import DesktopPagination from "./DesktopPagination.jsx";
import PaginationInput from "./PaginationInput.jsx";

import "../styles/components/PaginationContainer.scss";

export default function PaginationContainer() {
  return (
    <>
      <div className="pagination-container">
        <DesktopPagination />
        <PaginationInput />
      </div>
    </>
  );
}
