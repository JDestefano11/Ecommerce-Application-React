import React, { useEffect, useRef } from "react";
import { BsStars } from "react-icons/bs";
import { FaShippingFast } from "react-icons/fa";
import "../styles/Hero.css";

const Hero = () => {
  const titleRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="hero-container">
      <div className="hero-content">
        <div className="hero-left">
          <div className="floating-elements">
            <div className="floating-badge">
              <span className="badge-icon">
                <BsStars />
              </span>
              <span>New Collection</span>
            </div>
            <div className="floating-card">
              <div className="card-icon">
                <FaShippingFast />
              </div>
              <div className="card-text">
                <span>Free Shipping</span>
                <strong>Orders Over $50</strong>
              </div>
            </div>
          </div>

          <h1 ref={titleRef} className="hero-title">
            Elevate Your
            <span className="gradient-text">Style</span>
            Today
          </h1>

          <p className="hero-description">
            Discover the latest fashion trends and express your unique style with our
            curated collection of premium clothing and accessories.
          </p>

          <div className="cta-group">
            <button className="cta-primary">
              Shop Collection
              <div className="button-glow"></div>
              <div className="button-particles">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </button>
            <button className="cta-secondary">
              View Lookbook
              <div className="button-border"></div>
              <svg className="arrow-icon" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="achievement-grid">
            <div className="achievement-item">
              <div className="achievement-value">500+</div>
              <div className="achievement-label">Brands</div>
            </div>
            <div className="achievement-item">
              <div className="achievement-value">50k+</div>
              <div className="achievement-label">Customers</div>
            </div>
            <div className="achievement-item">
              <div className="achievement-value">2-Day</div>
              <div className="achievement-label">Delivery</div>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <div className="visual-container">
            <div className="geometric-shapes">
              <div className="shape shape-1"></div>
              <div className="shape shape-2"></div>
              <div className="shape shape-3"></div>
            </div>
            <div className="image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3"
                alt="Fashion Collection"
                className="hero-image"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="background-elements">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
      </div>
    </section>
  );
};

export default Hero;
