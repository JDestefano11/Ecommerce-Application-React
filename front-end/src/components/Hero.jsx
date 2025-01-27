import React from "react";
import "../styles/Hero.css";

const Hero = () => {
  return (
    <section className="hero-container">
      <div className="hero-content">
        <span className="hero-label">Premium Collection</span>
        <h1 className="hero-title">
          Discover Your <br />
          <span className="accent-text">Signature Style</span>
        </h1>
        <p className="hero-description">
          Where luxury meets innovation. Experience fashion that transcends
          boundaries.
        </p>

        <div className="cta-group">
          <button className="cta-primary">
            Explore Now
            <span className="arrow">→</span>
          </button>
          <button className="cta-secondary">View Collections</button>
        </div>

        <div className="stats-container">
          <div className="stat">
            <span className="stat-value">15k+</span>
            <span className="stat-label">Unique Pieces</span>
          </div>
          <div className="stat">
            <span className="stat-value">98%</span>
            <span className="stat-label">Client Satisfaction</span>
          </div>
        </div>
      </div>

      <div className="hero-visual">
        <img
          src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-4.0.3"
          alt="Fashion Model"
          className="hero-image"
        />
        <div className="geometric-overlay"></div>
        <div className="accent-circle"></div>
      </div>
    </section>
  );
};

export default Hero;
