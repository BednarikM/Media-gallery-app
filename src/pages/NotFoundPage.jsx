import { Link } from "react-router-dom";

import "../styles/pages/NotFoundPage.scss";

export default function NotFoundPage() {
  return (
    <div className="not-found-page">
      <div className="not-found-page__content">
        <h1 className="not-found-page__status-code">404</h1>
        <p className="not-found-page__title">Page not found</p>
        <section className="not-found-page__message-section">
          <p className="not-found-page__redirect-instructions">
            {`go to the `}
            <Link className="not-found-page__redirect-link" to={"/all"}>
              Homepage
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
}
