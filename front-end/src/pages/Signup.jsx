import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiMail,
  FiLock,
  FiUser,
  FiArrowRight,
  FiAlertCircle,
} from "react-icons/fi";
import "../styles/Signup.css";
import { useAuth } from "../context/AuthContext";

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
  const { login } = useAuth();

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

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill in all fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setIsLoading(true);
      
      // Detailed network error handling
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10-second timeout

      try {
        const response = await fetch('http://localhost:5000/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password
          }),
          mode: 'cors',
          credentials: 'include',
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || 'Signup failed');
        }

        login(data);

        console.log("Signup successful");
        navigate("/login");
      } catch (fetchError) {
        clearTimeout(timeoutId);
        
        // Detailed error logging and user feedback
        if (fetchError.name === 'AbortError') {
          setError("Request timed out. Please check your internet connection.");
        } else if (fetchError.message.includes('Failed to fetch')) {
          setError("Unable to connect to the server. Please check your network connection.");
        } else {
          setError(fetchError.message || "An unexpected error occurred");
        }
        
        console.error("Signup error:", fetchError);
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error("Unexpected error:", err);
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
              <a href="/login" className="register-link">
                Sign In
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
