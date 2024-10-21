import PaginationContainer from "../components/PaginationContainer";

import "../styles/layouts/PageLayout.scss";

export default function PageLayout({ children }) {
  return (
    <>
    <div className="page-layout">
      <div className="page-layout__page-container">
        {children}
      </div>
      <PaginationContainer  pagesCount={5}/>
    </div>
    </>
  );
}
