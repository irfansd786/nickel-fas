import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Award, Truck, ShieldCheck, RefreshCw } from 'lucide-react';
import ScrollReveal from '../common/ScrollReveal';

import productWatch from '../../assets/images/hero-slide-2.jpg';
import productSneakers from '../../assets/images/hero-slide-4.jpg';
import productJacket from '../../assets/images/hero-slide-1.jpg';

const NewSeasonBanner = () => {
  const slides = [
    { id: 1, name: "APEX SKELETON AUTOMATIC", category: "SWISS MOVEMENT TIMEPIECE", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80" },
    { id: 2, name: "APEX STEALTH RUNNER", category: "PREMIUM FOOTWEAR", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80" },
    { id: 3, name: "VANGUARD TAILORED BOMBER", category: "LIMITED OUTERWEAR", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80" }
  ];



  const [activeSlide, setActiveSlide] = useState(0);

  // Automatic slideshow interval (4 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="container" style={{ margin: '4rem auto' }}>
      <ScrollReveal variant="fade">
        <div 
          style={{
            position: 'relative',
            backgroundColor: '#090909',
            borderRadius: '6px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            overflow: 'hidden',
            padding: '4rem 4rem 2.5rem 4rem',
            color: '#FFFFFF',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)'
          }}
        >
          {/* Subtle Background 2026 Outlined Watermark */}
          <div 
            style={{
              position: 'absolute',
              top: '50%',
              left: '42%',
              transform: 'translate(-50%, -55%)',
              fontSize: 'clamp(8rem, 16vw, 16rem)',
              fontWeight: 900,
              color: 'transparent',
              WebkitTextStroke: '1px rgba(198, 161, 91, 0.08)',
              userSelect: 'none',
              pointerEvents: 'none',
              letterSpacing: '-0.05em',
              zIndex: 1
            }}
          >
            2026
          </div>

          {/* Main Top Banner Content Grid */}
          <div 
            style={{
              position: 'relative',
              zIndex: 2,
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '3rem',
              alignItems: 'center',
              minHeight: '380px'
            }}
          >
            {/* Left Column: Text & CTAs */}
            <div style={{ maxWidth: '540px' }}>
              <div 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  letterSpacing: '0.22em',
                  color: '#C6A15B',
                  textTransform: 'uppercase',
                  marginBottom: '1.25rem'
                }}
              >
                <span style={{ width: '20px', height: '1px', backgroundColor: '#C6A15B' }} />
                <span>LIMITED EDITION RELEASE</span>
              </div>

              <h2 
                style={{
                  fontSize: 'clamp(2.2rem, 4.5vw, 3.75rem)',
                  fontWeight: 900,
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                  textTransform: 'uppercase',
                  color: '#FFFFFF',
                  marginBottom: '1.5rem'
                }}
              >
                NEW SEASON <br />
                <span style={{ color: '#C6A15B' }}>DROPS</span> <br />
                HAS ARRIVED.
              </h2>

              <p 
                style={{
                  fontSize: '1rem',
                  color: 'rgba(255, 255, 255, 0.78)',
                  lineHeight: 1.6,
                  marginBottom: '2.5rem',
                  maxWidth: '480px'
                }}
              >
                Discover clean lines, dark tones, and premium technical fabrications crafted for the modern gentleman.
              </p>

              {/* Action Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <Link 
                  to="/new-arrivals" 
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    backgroundColor: '#C6A15B',
                    color: '#0A0A0A',
                    padding: '1.1rem 2.2rem',
                    fontWeight: 900,
                    fontSize: '0.8rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    borderRadius: '2px',
                    textDecoration: 'none',
                    transition: 'all 0.25s ease'
                  }}
                >
                  <span>DISCOVER NEW SEASON</span>
                  <ArrowRight size={16} />
                </Link>

                <Link 
                  to="/shop" 
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'transparent',
                    color: '#FFFFFF',
                    border: '1px solid rgba(255, 255, 255, 0.4)',
                    padding: '1.1rem 2rem',
                    fontWeight: 800,
                    fontSize: '0.8rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    borderRadius: '2px',
                    textDecoration: 'none',
                    transition: 'all 0.25s ease'
                  }}
                >
                  SHOP COLLECTION
                </Link>
              </div>
            </div>

            {/* Right Column: Prominent Product Image Highlight Slideshow */}
            <div 
              style={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                minHeight: '360px'
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide}
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.04 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '420px',
                    aspectRatio: '1 / 1',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    boxShadow: '0 15px 35px rgba(0,0,0,0.6)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <img 
                    src={slides[activeSlide].image} 
                    alt={slides[activeSlide].name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center',
                      filter: 'brightness(1.05) contrast(1.05)'
                    }} 
                  />

                  {/* Product Tag Overlay */}
                  <div 
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: '1.25rem 1.5rem',
                      background: 'linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent)',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <span style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.15em', color: '#C6A15B', textTransform: 'uppercase' }}>
                      {slides[activeSlide].category}
                    </span>
                    <span style={{ fontSize: '0.95rem', fontWeight: 900, color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: '0.02em', marginTop: '0.2rem' }}>
                      {slides[activeSlide].name}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Bottom Features Bar */}
          <div 
            style={{
              position: 'relative',
              zIndex: 2,
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '1.5rem',
              marginTop: '3.5rem',
              paddingTop: '2rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <Award size={24} color="#C6A15B" />
              <div>
                <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#FFFFFF' }}>PREMIUM QUALITY</span>
                <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.6)' }}>Finest materials</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <Truck size={24} color="#C6A15B" />
              <div>
                <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#FFFFFF' }}>FREE SHIPPING</span>
                <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.6)' }}>On orders over $150</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <ShieldCheck size={24} color="#C6A15B" />
              <div>
                <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#FFFFFF' }}>SECURE PAYMENT</span>
                <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.6)' }}>100% protected</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <RefreshCw size={24} color="#C6A15B" />
              <div>
                <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#FFFFFF' }}>EASY RETURNS</span>
                <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.6)' }}>30-day returns</span>
              </div>
            </div>
          </div>

          {/* Slide Indicator Dots at Bottom */}
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              marginTop: '2rem'
            }}
          >
            {slides.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => setActiveSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                style={{
                  height: '4px',
                  width: activeSlide === idx ? '28px' : '10px',
                  backgroundColor: activeSlide === idx ? '#C6A15B' : 'rgba(255, 255, 255, 0.25)',
                  border: 'none',
                  borderRadius: '2px',
                  cursor: 'pointer',
                  transition: 'all 0.35s ease'
                }}
              />
            ))}
          </div>

        </div>
      </ScrollReveal>
    </section>
  );
};

export default NewSeasonBanner;
