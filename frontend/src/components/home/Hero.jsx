import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../common/Button';

// 4 Hero Background Images
import slide1 from '../../assets/images/hero-slide-1.jpg';
import slide2 from '../../assets/images/hero-slide-2.jpg';
import slide3 from '../../assets/images/hero-slide-3.jpg';
import slide4 from '../../assets/images/hero-slide-4.jpg';

const Hero = () => {
  const slides = [
    { id: 1, image: slide1, alt: "Leather Jacket Collection", category: "LEATHER & STREETWEAR" },
    { id: 2, image: slide2, alt: "Luxury Chronograph Watch", category: "LUXURY ACCESSORIES" },
    { id: 3, image: slide3, alt: "New Season Bomber Jackets", category: "NEW SEASON JACKETS" },
    { id: 4, image: slide4, alt: "Urban Sneakers & Streetwear", category: "URBAN FOOTWEAR & STYLE" }
  ];

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Automatic slide shift every 5 seconds
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
        staggerChildren: 0.18,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section className="hero-section" style={{ position: 'relative' }}>
      {/* Background Image Slideshow with automatic crossfade */}
      <div className="hero-background">
        <AnimatePresence mode="wait">
          <motion.img 
            key={currentSlideIndex}
            src={slides[currentSlideIndex].image} 
            alt={slides[currentSlideIndex].alt} 
            className="hero-bg-image"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          />
        </AnimatePresence>
        <div className="hero-overlay" />
      </div>

      {/* Hero Content */}
      <div className="hero-container">
        <motion.div 
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Dynamic Eyebrow updating with slide category */}
          <motion.div className="hero-eyebrow" variants={itemVariants}>
            <span className="hero-eyebrow-line" />
            <AnimatePresence mode="wait">
              <motion.span
                key={currentSlideIndex}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.4 }}
              >
                {slides[currentSlideIndex].category} — 2026
              </motion.span>
            </AnimatePresence>
          </motion.div>

          {/* Main Heading */}
          <motion.h1 className="hero-heading" variants={itemVariants}>
            <span className="hero-heading-span">BUILT FOR</span>
            <span className="hero-heading-span hero-heading-gold">YOUR STYLE.</span>
          </motion.h1>

          {/* Description */}
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

      {/* Slide Navigation Dots & Progress Bar */}
      <div 
        style={{
          position: 'absolute',
          bottom: '2rem',
          right: 'var(--container-padding, 2rem)',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}
      >
        {slides.map((slide, idx) => (
          <button
            key={slide.id}
            onClick={() => setCurrentSlideIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            style={{
              height: '4px',
              width: currentSlideIndex === idx ? '32px' : '12px',
              backgroundColor: currentSlideIndex === idx ? '#C6A15B' : 'rgba(255, 255, 255, 0.4)',
              border: 'none',
              borderRadius: '2px',
              cursor: 'pointer',
              transition: 'all 0.4s ease'
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
