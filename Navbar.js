import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css"; // Import the external CSS file

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    alert("Logged out successfully!");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo-container">
          {/* Use the public path for the logo */}
          <img src="/logo.png" alt="Logo" className="logo" />
          {/* <h1 className="navbar-title">
            <Link to="/">StepIn</Link>
          </h1> */}
        </div>
        <ul className="navbar-links">
          <li>
            <Link to="/about" className="navbar-link">
              About
            </Link>
          </li>
          {/* <li>
            <Link to="/signup" className="navbar-link">
              Signup
            </Link>
          </li>
          <li>
            <Link to="/login" className="navbar-link">
              Login
            </Link>
          </li> */}
          <li>
            <Link to="/Program" className="navbar-link">
              Program
            </Link>
          </li>
          <li>
            <Link to="/StudentProfile" className="navbar-link">
              Profile
            </Link>
          </li>
          <li>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
