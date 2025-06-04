import { Link } from "react-router";

function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>Page Not Found</h1>
      <Link to="/">Go back home</Link>
    </div>
  );
}

export default NotFound;