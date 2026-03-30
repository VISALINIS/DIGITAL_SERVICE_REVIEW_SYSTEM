import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/Navbar.css";

const Navbar = ({ onNavClick }) => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-brand">
          <h1>🎓 Educational Platform Review</h1>
        </div>
        <ul className="nav-menu">
          <li>
            <button className="nav-link" onClick={() => onNavClick("home")}>
              Explore Learning Platforms
            </button>
          </li>
          {user && (
            <li>
              <button className="nav-link" onClick={() => onNavClick("dashboard")}>
                My Platform Reviews
              </button>
            </li>
          )}
          {user?.isAdmin && (
            <>
              <li>
                <button className="nav-link" onClick={() => onNavClick("add-platform")}>
                  Add Platform
                </button>
              </li>
              <li>
                <button className="nav-link admin-link" onClick={() => onNavClick("admin-dashboard")}>
                  📊 Admin Dashboard
                </button>
              </li>
            </>
          )}
          <li className="nav-user">
            {user ? (
              <>
                <span>Welcome, {user.username}!</span>
                <button className="logout-btn" onClick={logout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <button className="nav-link" onClick={() => onNavClick("login")}>
                  Login
                </button>
                <button className="nav-link" onClick={() => onNavClick("register")}>
                  Register
                </button>
              </>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
