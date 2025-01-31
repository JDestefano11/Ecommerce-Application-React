import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faSearch, faHeart, faUser } from "@fortawesome/free-solid-svg-icons";
import "../styles/Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  

  const isLoggedIn = false;
  const isAdmin = false;

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > 20) {
      if (!scrolled) setScrolled(true);
    } else {
      if (scrolled) setScrolled(false);
    }
  }, [scrolled]);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    // Add your logout logic here
    closeMenu();
  };

  const renderAuthButtons = () => {
    if (isLoggedIn) {
      return (
        <div className="auth-buttons">
          <Link to="/account" className="icon-button" onClick={closeMenu}>
            <FontAwesomeIcon icon={faUser} />
          </Link>
          <button className="navbar-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      );
    }
    return (
      <div className="auth-buttons">
        <Link to="/login" className="navbar-button" onClick={closeMenu}>
          Login
        </Link>
        <Link to="/signup" className="navbar-button signup" onClick={closeMenu}>
          Sign Up
        </Link>
      </div>
    );
  };

  return (
    <header className={`navbar-container ${scrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
      <div className="navbar-announcement">
        Free Worldwide Shipping on Orders Over $200
      </div>
      
      <div className="navbar-wrapper">
        <Link to="/" className="navbar-brand" onClick={closeMenu}>
          NOVA<span className="brand-accent">LUXE</span>
        </Link>

        <nav className="navbar-center">
          <Link to="/" className="navbar-link">
            Home
          </Link>
          <Link to="/collections" className="navbar-link">
            Collections
          </Link>
          <Link to="/new-arrivals" className="navbar-link">
            New Arrivals
          </Link>
          <Link to="/about" className="navbar-link">
            About
          </Link>
          <Link to="/contact" className="navbar-link">
            Contact
          </Link>
          {isLoggedIn && isAdmin && (
            <Link to="/admin" className="navbar-link admin-link">
              Admin
            </Link>
          )}
        </nav>

        <div className="navbar-right">
          <button className="icon-button">
            <FontAwesomeIcon icon={faSearch} />
          </button>
          {isLoggedIn && (
            <>
              <Link to="/wishlist" className="icon-button">
                <FontAwesomeIcon icon={faHeart} />
              </Link>
              <Link to="/cart" className="icon-button cart-link" onClick={closeMenu}>
                <FontAwesomeIcon icon={faShoppingCart} />
                <span className="cart-badge">3</span>
              </Link>
            </>
          )}
          {renderAuthButtons()}
        </div>

        <div className="mobile-icons">
          <button className="icon-button">
            <FontAwesomeIcon icon={faSearch} />
          </button>
          {isLoggedIn && (
            <Link to="/cart" className="icon-button cart-link" onClick={closeMenu}>
              <FontAwesomeIcon icon={faShoppingCart} />
              <span className="cart-badge">3</span>
            </Link>
          )}
          <button 
            className={`navbar-menu-icon ${menuOpen ? 'open' : ''}`} 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <div className="menu-icon-wrapper">
              <div className="menu-icon-inner">
                <span className="menu-icon-line"></span>
                <span className="menu-icon-line"></span>
                <span className="menu-icon-dot"></span>
              </div>
            </div>
          </button>
        </div>
      </div>

      <nav className={`navbar-links ${menuOpen ? "open" : ""}`}>
        <Link to="/" className="navbar-link" onClick={closeMenu} style={{"--i": 1}}>
          Home
        </Link>
        <Link to="/collections" className="navbar-link" onClick={closeMenu} style={{"--i": 2}}>
          Collections
        </Link>
        <Link to="/new-arrivals" className="navbar-link" onClick={closeMenu} style={{"--i": 3}}>
          New Arrivals
        </Link>
        <Link to="/about" className="navbar-link" onClick={closeMenu} style={{"--i": 4}}>
          About
        </Link>
        <Link to="/contact" className="navbar-link" onClick={closeMenu} style={{"--i": 5}}>
          Contact
        </Link>
        {isLoggedIn && isAdmin && (
          <Link to="/admin" className="navbar-link admin-link" onClick={closeMenu} style={{"--i": 6}}>
            Admin
          </Link>
        )}
        <div className="mobile-auth" style={{"--i": 7}}>
          {renderAuthButtons()}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
