import React, { useState } from "react";
import "./index.css";
import Navbar from "./components/Navbar/Navbar";
import LoginPopup from "./components/LoginPopup/LoginPopup";

function App() {
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const handleLoginClick = () => {
    setShowLoginPopup(true);
  };

  const handleClosePopup = () => {
    setShowLoginPopup(false);
  };

  return (
    <div className="App">
      <Navbar onLoginClick={handleLoginClick} />
      {showLoginPopup && (
        <div className="popup-overlay" onClick={handleClosePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <LoginPopup />
            <button className="close-button" onClick={handleClosePopup}>X</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;


