import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("currentUser");
    if (stored) setCurrentUser(JSON.parse(stored));
  }, []);

  const logout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("role");
    setCurrentUser(null);
    navigate("/sign-in");
  };

  return (
    <nav className="d-flex gap-2 align-items-center">
      <Link to="/" className="btn btn-secondary">
        Home
      </Link>

      {currentUser?.role === "teacher" && (
        <button
          className="btn btn-warning"
          onClick={() => navigate("/teacher")}
        >
          Teacher Panel
        </button>
      )}

      {!currentUser && (
        <Link to="/sign-in" className="btn btn-primary">
          Sign In
        </Link>
      )}

      {!currentUser && (
        <Link to="/sign-up" className="btn btn-outline-light">
          Sign Up
        </Link>
      )}

      {currentUser && (
        <button className="btn btn-danger" onClick={logout}>
          Logout
        </button>
      )}
    </nav>
  );
};

export default Navbar;
