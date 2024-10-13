import { Link, useLocation } from "react-router-dom";

export default function Error() {
  const location = useLocation();
  const { status, message } = location.state || {}; // Fallback in case state is missing

  console.log("error page hitted");

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
