import { Link, useLocation } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>404</h1>
      <p>Page not found</p>
      <p>
        go to the <Link to={"/all"}>Homepage</Link>
      </p>
    </div>
  );
}
