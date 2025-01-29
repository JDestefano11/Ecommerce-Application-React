import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiArrowRight } from "react-icons/fi";
import "../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setError("Please fill in all fields");
    } else {
      // Login logic here
      console.log("Login successful");
    }
  };

  return (
    <div className="login-page">
      <div className="background-effects">
        <div className="grid-pattern"></div>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      <div className="animated-shapes">
        <div className="floating-circle circle-1"></div>
        <div className="floating-circle circle-2"></div>
        <div className="floating-circle circle-3"></div>
      </div>

      <div className="login-container">
        <div className="glass-effect"></div>
        <div className="login-content">
          <div className="login-header">
            <div className="logo-container">
              <div className="logo-circle">
                <div className="logo-inner"></div>
              </div>
            </div>
            <h1>Welcome Back</h1>
            <p className="subtitle">Sign in to continue</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <div className="input-wrapper">
                <FiMail className="input-icon" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <div className="input-wrapper">
                <FiLock className="input-icon" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="error-message">
                <div className="error-icon">!</div>
                {error}
              </div>
            )}

            <button type="submit" className="login-button" disabled={isLoading}>
              {isLoading ? (
                <div className="loader"></div>
              ) : (
                <>
                  Sign In
                  <FiArrowRight />
                </>
              )}
            </button>
          </form>

          <div className="additional-options">
            <a href="/forgot-password">Forgot Password?</a>
            <a href="/signup">Create Account</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
