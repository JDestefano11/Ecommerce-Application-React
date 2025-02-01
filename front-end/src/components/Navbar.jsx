import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faShoppingCart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/Navbar.css";
import { useAuth } from "../context/AuthContext";  

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();  
  const navigate = useNavigate();
  const isAdmin = user && user.role === 'admin';  

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState);
  };

  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      navigate('/login');
    }
  };

  return (
    <header className={`navbar-container ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-wrapper">
        <Link to="/" className="navbar-brand">
          Fashionista
        </Link>

        <div className="navbar-center">
          <Link to="/" className="navbar-link">
            Home
          </Link>
          {isAdmin && (
            <Link to="/admin" className="navbar-link">
              Admin
            </Link>
          )}
        </div>

        <div className="navbar-right">
          {user && (
            <Link to="/cart" className="cart-link">
              <FontAwesomeIcon icon={faShoppingCart} />
              <span className="cart-badge">3</span>
            </Link>
          )}
          {user ? (
            <button 
              className="navbar-button" 
              onClick={handleLogout}
            >
              Log Out
            </button>
          ) : (
            <>
              <Link to="/login" className="navbar-button">
                Login
              </Link>
              <Link to="/signup" className="navbar-button">
                Sign Up
              </Link>
            </>
          )}
        </div>

        <div className="mobile-icons">
          {user && (
            <Link to="/cart" className="cart-link">
              <FontAwesomeIcon icon={faShoppingCart} />
              <span className="cart-badge">3</span>
            </Link>
          )}
          <button className="navbar-menu-icon" onClick={toggleMenu}>
            <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
          </button>
        </div>
      </div>

      <nav className={`navbar-links ${menuOpen ? "open" : ""}`}>
        <div className="menu-links">
          <Link
            to="/"
            className="navbar-link"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          {isAdmin && (
            <Link
              to="/admin"
              className="navbar-link"
              onClick={() => setMenuOpen(false)}
            >
              Admin
            </Link>
          )}
        </div>

        <div className="mobile-auth">
          {user ? (
            <button 
              className="navbar-button" 
              onClick={handleLogout}
            >
              Log Out
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="navbar-button"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="navbar-button"
                onClick={() => setMenuOpen(false)}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
