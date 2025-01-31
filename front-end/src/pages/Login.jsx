import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiLogIn, FiAlertCircle } from "react-icons/fi";
import "../styles/Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setIsLoading(true);
      // API call simulation
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log("Login successful");
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-login-wrapper">
      <div className="auth-background">
        <div className="auth-gradient-circle auth-circle-1"></div>
        <div className="auth-gradient-circle auth-circle-2"></div>
        <div className="auth-gradient-circle auth-circle-3"></div>
        <div className="auth-grid-overlay"></div>
      </div>

      <div className="auth-login-container">
        <div className="auth-glass-effect"></div>
        <div className="auth-login-content">
          <div className="auth-brand-header">
            <div className="auth-logo">
              <div className="auth-logo-glow"></div>
              <div className="auth-logo-inner"></div>
            </div>
            <h1>Welcome Back</h1>
            <p>Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {error && (
              <div className="auth-error">
                <FiAlertCircle />
                <span>{error}</span>
              </div>
            )}

            <div className="auth-input-group">
              <div className="auth-input-wrapper">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email address"
                  className="auth-input"
                  required
                />
                <FiMail className="auth-input-icon" />
              </div>
            </div>

            <div className="auth-input-group">
              <div className="auth-input-wrapper">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="auth-input"
                  required
                />
                <FiLock className="auth-input-icon" />
              </div>
            </div>

            <div className="auth-actions">
              <a href="/forgot-password" className="auth-forgot-link">
                Forgot password?
              </a>

              <button 
                type="submit" 
                className="auth-submit-btn"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="auth-loading">Signing in...</span>
                ) : (
                  <>
                    Sign In
                    <FiLogIn />
                  </>
                )}
              </button>
            </div>

            <div className="auth-alternate">
              Don't have an account?
              <a href="/signup" className="auth-link">Create Account</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
