import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Truck, RotateCcw, Star, Award, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../common/ScrollReveal';
import heroBg from '../../assets/images/hero-slide-1.jpg';

const AboutSection = () => {
  const whyChooseUsCards = [
    {
      icon: <Award size={28} color="#C6A15B" />,
      title: 'HANDCRAFTED QUALITY',
      subtitle: 'Premium Materials',
      description: 'Engineered with full-grain calfskin leathers, high-resilience EVA soles, and 450gsm organic combed cotton for longevity.'
    },
    {
      icon: <Truck size={28} color="#C6A15B" />,
      title: 'EXPRESS 48-HR DISPATCH',
      subtitle: 'Fast Global Delivery',
      description: 'All orders are quality verified, packaged in signature boxes, and dispatched with express tracking within 48 hours.'
    },
    {
      icon: <RotateCcw size={28} color="#C6A15B" />,
      title: '30-DAY EASY RETURNS',
      subtitle: 'Zero-Risk Guarantee',
      description: 'Enjoy effortless 30-day returns and complimentary size exchanges with dedicated client service assistance.'
    },
    {
      icon: <Star size={28} color="#C6A15B" />,
      title: '4.9★ CLIENT RATING',
      subtitle: '25,000+ Satisfied Clients',
      description: 'Trusted by modern gentlemen worldwide for minimalist architecture, refined presence, and unmatched comfort.'
    }
  ];

  return (
    <section 
      id="about" 
      style={{
        backgroundColor: '#FFFFFF',
        padding: '5.5rem 0',
        borderBottom: '1px solid #E5E5E5',
        scrollMarginTop: '80px'
      }}
    >
      <div className="container">
        
        {/* BRAND STORY HEADER & EDITORIAL PORTRAIT */}
        <ScrollReveal variant="fade">
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '4rem',
              alignItems: 'center',
              marginBottom: '5.5rem'
            }}
            className="about-grid-wrapper"
          >
            <div>
              <div 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  letterSpacing: '0.2em',
                  color: '#C6A15B',
                  textTransform: 'uppercase',
                  marginBottom: '1rem'
                }}
              >
                <Sparkles size={14} />
                <span>ABOUT NIKHIL FASHIONS</span>
              </div>

              <h2 
                style={{
                  fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)',
                  fontWeight: 900,
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                  textTransform: 'uppercase',
                  color: '#111111',
                  marginBottom: '1.5rem'
                }}
              >
                STYLE THAT <br />
                <span style={{ color: '#C6A15B' }}>DEFINES YOU.</span>
              </h2>

              <p 
                style={{
                  fontSize: '1.05rem',
                  color: '#555555',
                  lineHeight: 1.7,
                  marginBottom: '1.25rem'
                }}
              >
                At <strong>NIKHIL FASHIONS</strong>, we construct menswear designed for clean lines, effortless confidence, and refined urban presence. Every footwear drop, leather silhouette, and garment is designed to empower your individuality without noise.
              </p>

              <p 
                style={{
                  fontSize: '0.95rem',
                  color: '#777777',
                  lineHeight: 1.6,
                  marginBottom: '2rem'
                }}
              >
                We eliminate fast-fashion compromise by focusing exclusively on architectural cuts, premium fabrications, and timeless versatility—built to elevate your daily wardrobe.
              </p>

              <Link 
                to="/shop" 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  backgroundColor: '#111111',
                  color: '#FFFFFF',
                  padding: '1rem 2rem',
                  fontWeight: 800,
                  fontSize: '0.8rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  borderRadius: '2px',
                  textDecoration: 'none',
                  transition: 'all 0.25s ease'
                }}
              >
                <span>EXPLORE CATALOGUE</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Editorial Brand Image */}
            <div 
              style={{
                position: 'relative',
                height: '460px',
                borderRadius: '4px',
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(0,0,0,0.08)'
              }}
            >
              <img 
                src={heroBg} 
                alt="URBAN EDGE Brand Editorial" 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'contrast(1.05) brightness(0.95)'
                }} 
              />
              <div 
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)',
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: '2rem'
                }}
              >
                <div>
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.2em', color: '#C6A15B', textTransform: 'uppercase' }}>ESTABLISHED 2026</span>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#FFFFFF', textTransform: 'uppercase', margin: '0.2rem 0 0 0' }}>REFINED MENSWEAR ESSENTIALS</h3>
                </div>
              </div>
            </div>

          </div>
        </ScrollReveal>

        {/* DEDICATED WHY CHOOSE OUR STORE SECTION */}
        <ScrollReveal variant="slide-up">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.2em', color: '#C6A15B', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
              STORE PROMISE
            </span>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', fontWeight: 900, textTransform: 'uppercase', color: '#111111', margin: 0 }}>
              WHY CHOOSE OUR STORE
            </h2>
            <p style={{ color: '#777777', fontSize: '0.95rem', maxWidth: '600px', margin: '0.75rem auto 0 auto' }}>
              Here is why modern gentlemen choose NIKHIL FASHIONS as their trusted fashion destination.
            </p>
          </div>

          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.75rem'
            }}
          >
            {whyChooseUsCards.map((card, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                style={{
                  backgroundColor: '#F8F8F8',
                  border: '1px solid #E5E5E5',
                  borderRadius: '4px',
                  padding: '2.25rem 1.75rem',
                  borderTop: '3px solid #C6A15B'
                }}
              >
                <div style={{ marginBottom: '1.25rem' }}>{card.icon}</div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 900, textTransform: 'uppercase', color: '#111111', marginBottom: '0.25rem' }}>
                  {card.title}
                </h3>
                <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#C6A15B', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.85rem' }}>
                  {card.subtitle}
                </span>
                <p style={{ fontSize: '0.875rem', color: '#666666', lineHeight: 1.6, margin: 0 }}>
                  {card.description}
                </p>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};

export default AboutSection;
