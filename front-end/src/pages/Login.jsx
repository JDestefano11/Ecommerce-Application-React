import React, { useState } from "react";
import { FiMail, FiLock } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import "../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (email === "" || password === "") {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Login successful");
    } catch (err) {
      setError("Authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
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
            <p className="subtitle">Sign in to continue your journey</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
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
                <div className="input-glow"></div>
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
                <div className="input-glow"></div>
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
                <div className="loader">
                  <div className="loader-inner"></div>
                </div>
              ) : (
                "Sign In"
              )}
            </button>

            <div className="social-login">
              <span className="divider">or continue with</span>
              <div className="social-buttons">
                <button type="button" className="social-btn google-btn">
                  <FcGoogle /> Google
                </button>
                <button type="button" className="social-btn github-btn">
                  <FaGithub /> GitHub
                </button>
              </div>
            </div>
          </form>

          <div className="additional-options">
            <a href="/forgot-password" className="forgot-link">
              Forgot Password?
            </a>
            <a href="/register" className="register-link">
              Create Account
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
