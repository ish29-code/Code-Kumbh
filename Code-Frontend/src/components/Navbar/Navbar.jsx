import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ onLoginClick, onLogout, isAuthenticated }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    onLogout();
    navigate("/login");
  };

  return (
    <header className="navbar">
      <div className="logo">
        <h2>Travel Safety App</h2>
      </div>

      {/* Desktop Navigation */}
      <nav className="desktop-nav">
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          {isAuthenticated && (
            <li>
              <Link to="/map">Map</Link>
            </li>
          )}
        </ul>
      </nav>

      {/* Authentication Button */}
      <div className="auth-btn">
        {isAuthenticated ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <button onClick={onLoginClick}>Login</button>
        )}
      </div>

      {/* Hamburger Menu for Mobile */}
      <div className="hamburger" onClick={toggleSidebar}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Sidebar for Mobile */}
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <ul>
          <li>
            <Link to="/home" onClick={toggleSidebar}>Home</Link>
          </li>
          {isAuthenticated && (
            <li>
              <Link to="/map" onClick={toggleSidebar}>Map</Link>
            </li>
          )}
          <li>
            {isAuthenticated ? (
              <button onClick={handleLogout} className="logout-button">Logout</button>
            ) : (
              <button onClick={onLoginClick} className="login-button">Login</button>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
