import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/NavBar.css";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const id = JSON.parse(localStorage.getItem("user"))?._id;

  const isLoggedIn = localStorage.getItem("accessToken") !== null;
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar_container">
        <div className="nav_left_side">
          <Link to="/" className="navbar-logo">
            Home
          </Link>
        </div>
        <div className="nav_right">
          <ul className="navbar-menu">
            {!isLoggedIn && (
              <>
                <li className="navbar-item">
                  <Link to="/signup" className="navbar-link">
                    Signup
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link to="/login" className="navbar-link">
                    Login
                  </Link>
                </li>
              </>
            )}
            {isLoggedIn && (
              <>
                <li className="navbar-item">
                  <span className="navbar-link">{user?.username}</span>
                </li>
                <li className="navbar-item">
                  <Link to={`/account/${id}`} className="navbar-link">
                    Account
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link to={`/update/${id}`} className="navbar-link">
                    Update Account
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link to={`/delete/${id}`} className="navbar-link">
                    Delete Account
                  </Link>
                </li>
                <li className="navbar-item">
                  <button onClick={handleLogout} className="navbar-button">
                    Logout
                  </button>
                </li>
              </>
            )}
            {isLoggedIn && user?.isAdmin && (
              <li className="navbar-item">
                <Link to="/admin" className="navbar-link">
                  Admin Dashboard
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
