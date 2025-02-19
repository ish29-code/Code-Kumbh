/*import React, { useState } from "react";
import axios from "axios";
import "./LoginPopup.css";

const LoginPopup = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Prevent multiple requests

    const toggleAuthMode = (e) => {
        e.preventDefault();
        setIsLogin(!isLogin);
        setName('');
        setEmail('');
        setPassword('');
        setError('');
    };

    // ✅ Handle Signup
    const handleSignup = async (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            setError("All fields are required");
            return;
        }

        setError("");
        setIsLoading(true); // Prevent duplicate submissions

        try {
            const userData = { name, email, password };
            console.log("Sending Signup Data:", userData);

            const response = await axios.post("http://localhost:5000/api/users/register", userData);

            console.log("Signup Successful:", response.data.token);
            localStorage.setItem("token", response.data.token); // Store token
            setIsLoading(false);
        } catch (error) {
            console.error("Signup Error:", error.response ? error.response.data : error.message);
            setError("Signup failed. Please check your details.");
            setIsLoading(false);
        }
    };

    // ✅ Handle Login
    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Email and password are required");
            return;
        }

        setError("");
        setIsLoading(true);

        try {
            const userData = { email, password };
            console.log("Sending Login Data:", userData);

            const response = await axios.post("http://localhost:5000/api/users/login", userData);

            console.log("Login Successful:", response.data.token);
            localStorage.setItem("token", response.data.token); // Store token
            setIsLoading(false);
        } catch (error) {
            console.error("Login Error:", error.response ? error.response.data : error.message);
            setError("Invalid email or password. Please try again.");
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-popup">
            <div className="auth-container">
                <h2>{isLogin ? "Login" : "Signup"}</h2>
                <form onSubmit={isLogin ? handleLogin : handleSignup} noValidate>
                    {!isLogin && (
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required={!isLogin}
                        />
                    )}
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? "Processing..." : isLogin ? "Login" : "Signup"}
                    </button>
                </form>
                {error && <p className="error-message">{error}</p>}
                <p className="toggle-link">
                    {isLogin ? (
                        <>Don't have an account? <a href="#" onClick={toggleAuthMode}>Signup</a></>
                    ) : (
                        <>Already have an account? <a href="#" onClick={toggleAuthMode}>Login</a></>
                    )}
                </p>
            </div>
        </div>
    );
};

export default LoginPopup;*/


import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./LoginPopup.css";

const LoginPopup = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const toggleAuthMode = (e) => {
        e.preventDefault();
        setIsLogin(!isLogin);
        setName('');
        setEmail('');
        setPassword('');
        setError('');
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            setError("All fields are required");
            return;
        }

        setError("");
        setIsLoading(true);

        try {
            const response = await axios.post("http://localhost:5000/api/users/register", { name, email, password });

            console.log("Signup Successful:", response.data.token);
            localStorage.setItem("token", response.data.token);
            setIsAuthenticated(true);
            setIsLoading(false);

            toast.success("Signup Successful! Redirecting... 🚀"); // ✅ Show success toast
            setTimeout(() => navigate("/home"), 2000); // Redirect after 2 sec
        } catch (error) {
            console.error("Signup Error:", error.response ? error.response.data : error.message);
            setError("Signup failed. Please check your details.");
            toast.error("Signup Failed! ❌"); // ✅ Show error toast
            setIsLoading(false);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Email and password are required");
            return;
        }

        setError("");
        setIsLoading(true);

        try {
            const response = await axios.post("http://localhost:5000/api/users/login", { email, password });

            console.log("Login Successful:", response.data.token);
            localStorage.setItem("token", response.data.token);
            setIsAuthenticated(true);
            setIsLoading(false);

            toast.success("Login Successful! Redirecting... 🚀"); // ✅ Show success toast
            setTimeout(() => navigate("/home"), 2000); // Redirect after 2 sec
        } catch (error) {
            console.error("Login Error:", error.response ? error.response.data : error.message);
            setError("Invalid email or password. Please try again.");
            toast.error("Login Failed! ❌"); // ✅ Show error toast
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        toast.info("Logged Out!"); // ✅ Show logout toast
        navigate("/login");
    };

    return (
        <div className="auth-popup">
            <div className="auth-container">
                <ToastContainer position="top-right" autoClose={2000} />
                {isAuthenticated ? (
                    <>
                        <h2>Welcome!</h2>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        <h2>{isLogin ? "Login" : "Signup"}</h2>
                        <form onSubmit={isLogin ? handleLogin : handleSignup} noValidate>
                            {!isLogin && (
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required={!isLogin}
                                />
                            )}
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button type="submit" disabled={isLoading}>
                                {isLoading ? "Processing..." : isLogin ? "Login" : "Signup"}
                            </button>
                        </form>
                        {error && <p className="error-message">{error}</p>}
                        <p className="toggle-link">
                            {isLogin ? (
                                <>Don't have an account? <a href="#" onClick={toggleAuthMode}>Signup</a></>
                            ) : (
                                <>Already have an account? <a href="#" onClick={toggleAuthMode}>Login</a></>
                            )}
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};

export default LoginPopup;

