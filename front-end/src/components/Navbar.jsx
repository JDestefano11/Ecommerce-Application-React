import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faShoppingCart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const user = true;
  const isAdmin = true;

  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState);
  };

  return (
    <header className="navbar-container">
      <div className="navbar-wrapper">
        {/* Navbar Left */}
        <Link to="/" className="navbar-brand">
          NovaCart
        </Link>

        {/* Desktop Links */}
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

        {/* Right Section */}
        <div className="navbar-right">
          {user && (
            <Link to="/cart" className="cart-link">
              <FontAwesomeIcon icon={faShoppingCart} />
              <span className="cart-badge">3</span>
            </Link>
          )}
          {user ? (
            <button className="navbar-button">Log Out</button>
          ) : (
            <Link to="/login" className="auth-link">
              Login
            </Link>
          )}
        </div>

        {/* Mobile Icons */}
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

      {/* Mobile Navigation */}
      <nav className={`navbar-links ${menuOpen ? "open" : ""}`}>
        <Link to="/" className="navbar-link" onClick={() => setMenuOpen(false)}>
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
        {user ? (
          <button className="navbar-button" onClick={() => setMenuOpen(false)}>
            Log Out
          </button>
        ) : (
          <Link
            to="/login"
            className="auth-link"
            onClick={() => setMenuOpen(false)}
          >
            Login
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
