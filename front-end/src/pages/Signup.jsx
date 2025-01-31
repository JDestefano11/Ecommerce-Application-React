import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiUser, FiArrowRight, FiAlertCircle } from "react-icons/fi";
import "../styles/Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate("/login");
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="animated-shapes">
        <div className="floating-circle circle-1"></div>
        <div className="floating-circle circle-2"></div>
        <div className="floating-circle circle-3"></div>
      </div>

      <div className="signup-container">
        <div className="glass-effect"></div>
        <div className="signup-content">
          <div className="signup-header">
            <div className="logo-container">
              <div className="logo-circle">
                <div className="logo-inner"></div>
              </div>
            </div>
            <h1>Create Account</h1>
            <p className="subtitle">Join our community today</p>
          </div>

          <form onSubmit={handleSubmit}>
            {error && (
              <div className="error-message">
                <FiAlertCircle />
                {error}
              </div>
            )}

            <div className="form-group">
              <div className="input-wrapper">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  required
                />
                <FiUser className="input-icon" />
              </div>
            </div>

            <div className="form-group">
              <div className="input-wrapper">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email address"
                  required
                />
                <FiMail className="input-icon" />
              </div>
            </div>

            <div className="form-group">
              <div className="input-wrapper">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  required
                />
                <FiLock className="input-icon" />
              </div>
            </div>

            <div className="form-group">
              <div className="input-wrapper">
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  required
                />
                <FiLock className="input-icon" />
              </div>
            </div>

            <button 
              type="submit" 
              className="signup-button"
              disabled={isLoading}
            >
              {isLoading ? (
                "Creating Account..."
              ) : (
                <>
                  Sign Up
                  <FiArrowRight />
                </>
              )}
            </button>
          </form>

          <div className="additional-options">
            <a href="/login">Already have an account?</a>
            <a href="/terms">Terms & Privacy</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
