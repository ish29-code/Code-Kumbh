import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";  
import "./index.css";
import Navbar from "./components/Navbar/Navbar";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import SafeRoutesMap from "./pages/MapPage/SafeRoutesMap";
import Footer from "./components/Footer/Footer";

function App() {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setShowLoginPopup(false);  // Close popup after login
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <>
      <Navbar 
        onLoginClick={() => setShowLoginPopup(true)} 
        onLogout={handleLogout} 
        isAuthenticated={isAuthenticated} 
      />

      {/* Login Popup */}
      {showLoginPopup && (
        <div className="popup-overlay" onClick={() => setShowLoginPopup(false)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <LoginPopup onLoginSuccess={handleLoginSuccess} />
            <button className="close-button" onClick={() => setShowLoginPopup(false)}>X</button>
          </div>
        </div>
      )}

      {/* Routes */}
      <Routes>
        {/* If not logged in, show message on home page */}
        <Route path="/" element={isAuthenticated ? <Navigate to="/map" /> : <p className="login-message">Please log in to access features.</p>} />
        <Route path="/map" element={isAuthenticated ? <SafeRoutesMap /> : <Navigate to="/" />} />
      </Routes>

        
      <Footer />
    </>
  );
}

export default App;



