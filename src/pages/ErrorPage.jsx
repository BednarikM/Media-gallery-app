import { useLocation, Link } from "react-router-dom";

import "../styles/pages/ErrorPage.scss";

export default function ErrorPage() {
  const location = useLocation();

  const error = location.state || {};

  return (
    <div className="error-page">
      <div className="error-page__content">
        <h1 className="error-page__status-code">{error.httpStatus}</h1>
        <p className="error-page__title">
          Oops! Something didn't go as expected
        </p>
        <section className="error-page__message-section">
          <div className="error-page__message-details">
            <span className="error-page__message-label">Error message : </span>
            <p className="error-page__error-message">{error.message}</p>
          </div>
          <p className="error-page__redirect-instructions">
            {`go to the `}
            <Link className="error-page__redirect-link" to={"/all"}>
              Homepage
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
}

// http://localhost:3000/all?page=501
