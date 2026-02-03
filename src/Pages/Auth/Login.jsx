import React, { useEffect } from "react";
import "./Auth.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Login = () => {
    const { login, currentUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
            navigate("/");
        }
    }, [currentUser, navigate]);

    const handleLogin = () => {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if (login(email, password)) {
            navigate("/");
        } else {
            alert("Invalid credentials");
        }
    };

    return (
        <div className="auth-wrapper login-bg">
            <header className="auth-header">
                <h2 className="logo"></h2>
            </header>

            <div className="auth-card">
                <h1>Sign In</h1>

                <input id="email" type="email" placeholder="Email or Phone Number" />
                <input id="password" type="password" placeholder="Password" />

                <button className="auth-btn" onClick={handleLogin}>Sign In</button>


                <p className="auth-footer-text">
                    New to OTTApp? <Link to="/signup">Sign up now.</Link>
                </p>

                <small className="captcha">
                    This page is protected by Google reCAPTCHA to ensure you're not a bot.
                </small>
            </div>
        </div>
    );
};

export default Login;
