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
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setIsLoading(true);
      // API call simulation
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log("Signup successful");
      navigate("/dashboard");
    } catch (err) {
      setError("Failed to create account");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-background">
        <div className="register-shapes">
          <div className="register-shape shape-1"></div>
          <div className="register-shape shape-2"></div>
          <div className="register-shape shape-3"></div>
        </div>
        <div className="register-pattern"></div>
      </div>

      <div className="register-card">
        <div className="register-glass"></div>
        <div className="register-content">
          <div className="register-header">
            <div className="register-logo">
              <div className="register-logo-ring"></div>
              <div className="register-logo-core"></div>
            </div>
            <h1>Create Account</h1>
            <p>Join our community today</p>
          </div>

          <form onSubmit={handleSubmit} className="register-form">
            {error && (
              <div className="register-error">
                <FiAlertCircle />
                <span>{error}</span>
              </div>
            )}

            <div className="register-field">
              <div className="register-input-container">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full name"
                  className="register-input"
                  required
                />
                <FiUser className="register-icon" />
              </div>
            </div>

            <div className="register-field">
              <div className="register-input-container">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email address"
                  className="register-input"
                  required
                />
                <FiMail className="register-icon" />
              </div>
            </div>

            <div className="register-field">
              <div className="register-input-container">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="register-input"
                  required
                />
                <FiLock className="register-icon" />
              </div>
            </div>

            <div className="register-field">
              <div className="register-input-container">
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  className="register-input"
                  required
                />
                <FiLock className="register-icon" />
              </div>
            </div>

            <button 
              type="submit" 
              className="register-button"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="register-loading">Creating account...</span>
              ) : (
                <>
                  Create Account
                  <FiArrowRight className="register-button-icon" />
                </>
              )}
            </button>

            <div className="register-footer">
              <p>Already have an account?</p>
              <a href="/login" className="register-link">Sign In</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
