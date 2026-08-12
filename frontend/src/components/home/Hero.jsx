import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '../common/Button';

// Hero Background Images
import slide1 from '../../assets/images/hero-slide-1.jpg';
import slide2 from '../../assets/images/hero-slide-2.jpg';
import slide3 from '../../assets/images/hero-slide-3.jpg';
import slide4 from '../../assets/images/hero-slide-4.jpg';
import heroWhiteShoes from '../../assets/images/hero-white-shoes.png';
import heroCrocs from '../../assets/images/hero-crocs.png';

const Hero = () => {
  const slides = [
    { 
      id: 1, 
      image: slide1, 
      alt: "Leather Jacket & Streetwear Collection", 
      category: "MEN'S LEATHER & STREETWEAR",
      headingLine1: "BUILT FOR",
      headingLine2: "YOUR STYLE.",
      description: "Premium men's outerwear, menswear clothing and men's accessories designed for everyday confidence and refined urban presence."
    },
    { 
      id: 2, 
      image: heroWhiteShoes, 
      alt: "White Shoes Collection", 
      category: "FRESH DROP — WHITE SHOES",
      headingLine1: "ULTRA CLEAN",
      headingLine2: "WHITE SNEAKERS.",
      description: "Step into pristine luxury with our signature white sneakers. Engineered for crisp street style and all-day comfort."
    },
    { 
      id: 3, 
      image: heroCrocs, 
      alt: "Crocs Clogs Collection", 
      category: "DAILY COMFORT — CROCS CLOGS",
      headingLine1: "ICONIC COZY",
      headingLine2: "CROCS CLOGS.",
      description: "Discover unmatched lightweight comfort with our trending Crocs clogs edition. Perfect for laid-back ease and urban vibes."
    },
    { 
      id: 4, 
      image: slide2, 
      alt: "Luxury Chronograph Watch", 
      category: "LUXURY MEN'S ACCESSORIES",
      headingLine1: "TIMELESS",
      headingLine2: "PRECISION.",
      description: "Handcrafted men's chronographs and accessories crafted for timeless elegance and statement sophistication."
    },
    { 
      id: 5, 
      image: slide3, 
      alt: "New Season Bomber Jackets", 
      category: "NEW SEASON MEN'S JACKETS",
      headingLine1: "NEW SEASON",
      headingLine2: "OUTERWEAR.",
      description: "Weather-ready men's bomber jackets and luxury layers forged for maximum versatility."
    },
    { 
      id: 6, 
      image: slide4, 
      alt: "Urban Footwear & Style", 
      category: "URBAN FOOTWEAR & STYLE",
      headingLine1: "ELEVATE YOUR",
      headingLine2: "EVERYDAY.",
      description: "Curated modern men's wardrobe essentials built to empower your unique personal aesthetic."
    }
  ];

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Automatic slide rotation every 5.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex(prevIndex => (prevIndex + 1) % slides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="hero-section" style={{ position: 'relative' }}>
      {/* Background Image Slideshow with continuous silky-smooth crossfade */}
      <div className="hero-background">
        {slides.map((slide, idx) => {
          const isActive = currentSlideIndex === idx;
          return (
            <motion.img 
              key={slide.id}
              src={slide.image} 
              alt={slide.alt} 
              className="hero-bg-image"
              style={{ 
                position: 'absolute', 
                inset: 0,
                pointerEvents: 'none'
              }}
              initial={false}
              animate={{ 
                opacity: isActive ? 1 : 0,
                scale: isActive ? 1 : 1.05
              }}
              transition={{ 
                opacity: { duration: 1.8, ease: [0.4, 0, 0.2, 1] },
                scale: { duration: 5.5, ease: "linear" }
              }}
            />
          );
        })}
        <div className="hero-overlay" />
      </div>

      {/* Hero Container with Fixed Hero Content */}
      <div className="hero-container">
        <div className="hero-content">
          {/* Eyebrow Tag */}
          <div className="hero-eyebrow">
            <span className="hero-eyebrow-line" />
            <span>LUXURY COLLECTION — 2026</span>
          </div>

          {/* Main Fixed Heading */}
          <h1 className="hero-heading">
            <span className="hero-heading-span">BUILT FOR</span>
            <span className="hero-heading-span hero-heading-gold"> YOUR STYLE.</span>
          </h1>

          {/* Fixed Description */}
          <p className="hero-description">
            Premium men's footwear, clothing and accessories designed for everyday confidence and refined urban presence.
          </p>

          {/* Action Buttons */}
          <div className="hero-actions" style={{ marginTop: '2rem' }}>
            <Button variant="secondary" href="/shop">
              SHOP COLLECTION
            </Button>
            
            <Button variant="outline-white" href="/category/footwear">
              EXPLORE FOOTWEAR
            </Button>
          </div>

          {/* Stats Bar */}
          <div className="hero-stats">
            <div className="hero-stat-item">
              <span className="hero-stat-number">100%</span>
              <span className="hero-stat-label">ORIGINAL DESIGNS</span>
            </div>
            <div className="hero-stat-item">
              <span className="hero-stat-number">48 HRS</span>
              <span className="hero-stat-label">EXPRESS DISPATCH</span>
            </div>
            <div className="hero-stat-item">
              <span className="hero-stat-number">4.9★</span>
              <span className="hero-stat-label">CLIENT SATISFACTION</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls: Clean Dots Only (No Arrow Buttons) */}
      <div className="hero-slide-nav">
        <div className="hero-slide-dots">
          {slides.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setCurrentSlideIndex(idx)}
              aria-label={`Go to slide ${idx + 1}: ${slide.alt}`}
              className={`hero-dot-btn ${currentSlideIndex === idx ? 'active' : ''}`}
            >
              <span className="hero-dot-line" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
