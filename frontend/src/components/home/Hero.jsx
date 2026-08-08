import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
      alt: "Leather Jacket Collection", 
      category: "LEATHER & STREETWEAR",
      headingLine1: "BUILT FOR",
      headingLine2: "YOUR STYLE.",
      description: "Premium outerwear, clothing and accessories designed for everyday confidence and refined urban presence."
    },
    { 
      id: 2, 
      image: heroWhiteShoes, 
      alt: "1 White Shoes Collection", 
      category: "FRESH DROP — 1 WHITE SHOES",
      headingLine1: "ULTRA CLEAN",
      headingLine2: "WHITE SNEAKERS.",
      description: "Step into pristine luxury with our signature white sneakers. Engineered for crisp street style and all-day comfort."
    },
    { 
      id: 3, 
      image: heroCrocs, 
      alt: "1 Crocs Clogs Collection", 
      category: "DAILY COMFORT — 1 CROCS",
      headingLine1: "ICONIC COZY",
      headingLine2: "CROCS CLOGS.",
      description: "Discover unmatched lightweight comfort with our trending Crocs clogs edition. Perfect for laid-back ease and urban vibes."
    },
    { 
      id: 4, 
      image: slide2, 
      alt: "Luxury Chronograph Watch", 
      category: "LUXURY ACCESSORIES",
      headingLine1: "TIMELESS",
      headingLine2: "PRECISION.",
      description: "Handcrafted chronographs and accessories crafted for timeless elegance and statement sophistication."
    },
    { 
      id: 5, 
      image: slide3, 
      alt: "New Season Bomber Jackets", 
      category: "NEW SEASON JACKETS",
      headingLine1: "NEW SEASON",
      headingLine2: "OUTERWEAR.",
      description: "Weather-ready bomber jackets and luxury layers forged for maximum versatility."
    },
    { 
      id: 6, 
      image: slide4, 
      alt: "Urban Footwear & Style", 
      category: "URBAN FOOTWEAR & STYLE",
      headingLine1: "ELEVATE YOUR",
      headingLine2: "EVERYDAY.",
      description: "Curated modern wardrobe essentials built to empower your unique personal aesthetic."
    }
  ];

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Automatic slide rotation every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex(prevIndex => (prevIndex + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // Stagger animation container for hero text content
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const currentSlide = slides[currentSlideIndex];

  return (
    <section className="hero-section" style={{ position: 'relative' }}>
      {/* Background Image Slideshow with automatic smooth crossfade */}
      <div className="hero-background">
        <AnimatePresence>
          <motion.img 
            key={currentSlide.id}
            src={currentSlide.image} 
            alt={currentSlide.alt} 
            className="hero-bg-image"
            style={{ position: 'absolute', inset: 0 }}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          />
        </AnimatePresence>
        <div className="hero-overlay" />
      </div>

      {/* Hero Container with Fixed Text Content */}
      <div className="hero-container">
        <motion.div 
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Eyebrow Tag */}
          <motion.div className="hero-eyebrow" variants={itemVariants}>
            <span className="hero-eyebrow-line" />
            <span>LUXURY COLLECTION — 2026</span>
          </motion.div>

          {/* Main Fixed Heading */}
          <motion.h1 className="hero-heading" variants={itemVariants}>
            <span className="hero-heading-span">BUILT FOR</span>
            <span className="hero-heading-span hero-heading-gold">YOUR STYLE.</span>
          </motion.h1>

          {/* Fixed Description */}
          <motion.p className="hero-description" variants={itemVariants}>
            Premium footwear, clothing and accessories designed for everyday confidence and refined urban presence.
          </motion.p>

          {/* Action Buttons */}
          <motion.div className="hero-actions" variants={itemVariants}>
            <Button variant="secondary" href="/shop">
              SHOP COLLECTION
            </Button>
            
            <Button variant="outline-white" href="/category/footwear">
              EXPLORE FOOTWEAR
            </Button>
          </motion.div>

          {/* Stats Bar */}
          <motion.div className="hero-stats" variants={itemVariants}>
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
          </motion.div>
        </motion.div>
      </div>

      {/* Slide Navigation Dots & Auto-Rotate Controls */}
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
