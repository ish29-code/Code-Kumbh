import React from 'react';
import './Navbar.css';

const Navbar = ({ onLoginClick }) => {
    return (
        <nav className="navbar">
            <div className="logo">CodeKumbh</div>
            <button className="login-button" onClick={onLoginClick}>Login</button>
        </nav>
    );
};

export default Navbar;
