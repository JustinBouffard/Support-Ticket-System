import { Link, useNavigate } from "react-router-dom";
import "./Navigation.css";

function Navigation({ isAuthenticated }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <nav className="navbar">
      <div className="nav-wrapper">
        <ul className="nav-list">
          {!isAuthenticated ? (
            <>
              <li>
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/dashboard" className="nav-link">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/tickets" className="nav-link">
                  Tickets
                </Link>
              </li>
              <li>
                <Link to="/profile" className="nav-link">
                  Profile
                </Link>
              </li>
              <li>
                <button className="nav-logout" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
