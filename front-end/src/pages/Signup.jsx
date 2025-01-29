import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiUser, FiArrowRight } from "react-icons/fi";
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    navigate("/login");
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
            <div className="form-group">
              <div className="input-wrapper">
                <FiUser className="input-icon" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <div className="input-wrapper">
                <FiMail className="input-icon" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
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
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <div className="input-wrapper">
                <FiLock className="input-icon" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
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

            <button
              type="submit"
              className="signup-button"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="loader"></div>
              ) : (
                <>
                  Create Account
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
