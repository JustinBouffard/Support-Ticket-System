import { Link, useNavigate } from "react-router-dom";
import "./Navigation.css";

function Navigation({ isAuthenticated }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Dispatch auth change event to notify App
    window.dispatchEvent(new Event("authChange"));

    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-wrapper">
        <ul className="nav-list">
          {!isAuthenticated ? (
            <>
              <li>
                {/* This is only here because of the requirement in 3.5 of having 
                    Home page visible in the nav when being logged out, even if there isn't one */}
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
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
