import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnnouncementBar from '../components/layout/AnnouncementBar';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Breadcrumbs from '../components/common/Breadcrumbs';
import CategoryCard from '../components/common/CategoryCard';
import SectionTitle from '../components/common/SectionTitle';
import Button from '../components/common/Button';
import ScrollReveal from '../components/common/ScrollReveal';
import { categories } from '../data/categories';
import { Sparkles, Shield, RefreshCw, Compass, ArrowRight } from 'lucide-react';
import heroBg from '../assets/images/hero-slide-1.jpg';

const About = () => {
  const valueCards = [
    {
      icon: <Sparkles size={24} color="#C6A15B" />,
      title: 'CURATED STYLE',
      description: 'Everyday pieces selected for modern wardrobes, built with attention to silhouette, weight, and texture.'
    },
    {
      icon: <Shield size={24} color="#C6A15B" />,
      title: 'CONFIDENT DESIGN',
      description: 'Clean lines, dark tones, and versatile styling engineered to elevate your daily presence.'
    },
    {
      icon: <RefreshCw size={24} color="#C6A15B" />,
      title: 'EVERYDAY VERSATILITY',
      description: 'From casual weekend essentials to sharp urban outerwear, designed for seamless pairing.'
    },
    {
      icon: <Compass size={24} color="#C6A15B" />,
      title: 'PERSONAL STYLE',
      description: 'Fashion designed to empower your individuality, giving you complete freedom of expression.'
    }
  ];

  return (
    <div className="page-wrapper">
      <AnnouncementBar />
      <Navbar />

      <main className="section-padding">
        <div className="container">
          
          <Breadcrumbs items={[{ label: 'ABOUT US', path: '/about' }]} />

          {/* About Editorial Hero */}
          <ScrollReveal variant="fade">
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '4rem',
              alignItems: 'center',
              marginBottom: '6rem'
            }}>
              <div>
                <span className="eyebrow">OUR STORY</span>
                <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, textTransform: 'uppercase', lineHeight: 0.95, marginBottom: '1.5rem' }}>
                  STYLE THAT<br />
                  <span style={{ color: '#C6A15B' }}>MOVES WITH YOU.</span>
                </h1>
                <p className="subheading" style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
                  A modern men's fashion destination built around confident everyday style, quality presentation and carefully selected essentials.
                </p>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <Button variant="primary" href="/shop">
                    SHOP COLLECTION
                  </Button>
                  <Button variant="outline" href="/contact">
                    GET IN TOUCH
                  </Button>
                </div>
              </div>

              <div style={{ height: '480px', borderRadius: '4px', overflow: 'hidden', backgroundColor: '#0A0A0A', position: 'relative' }}>
                <img 
                  src={heroBg} 
                  alt="URBAN EDGE Brand Lookbook" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.85) contrast(1.05)' }} 
                />
              </div>
            </div>
          </ScrollReveal>

          {/* Concept Story */}
          <ScrollReveal variant="slide-up">
            <div style={{
              backgroundColor: '#F5F5F3',
              padding: '4rem 3rem',
              borderRadius: '4px',
              marginBottom: '6rem',
              textAlign: 'center'
            }}>
              <span className="eyebrow" style={{ textAlign: 'center' }}>OUR ESSENCE</span>
              <h2 style={{ fontSize: '2.25rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '1.5rem' }}>
                BUILT FOR THE MODERN MAN.
              </h2>
              <p style={{ maxWidth: '780px', margin: '0 auto', fontSize: '1.05rem', color: '#444', lineHeight: 1.8 }}>
                At <strong>NIKHIL FASHIONS</strong>, we believe menswear should be clean, functional, and inherently confident. Our curated departments bring together precision-engineered footwear, structured streetwear, and refined lifestyle accessories—all designed to help you construct a signature look without effort.
              </p>
            </div>
          </ScrollReveal>

          {/* About Category Grid */}
          <ScrollReveal variant="slide-up">
            <div style={{ marginBottom: '6rem' }}>
              <SectionTitle 
                eyebrow="EXPLORE DEPARTMENTS"
                title="CURATED COLLECTIONS"
                description="Discover our three core style pillars tailored for contemporary menswear."
              />
              <div className="category-grid">
                {categories.map((cat, idx) => (
                  <CategoryCard key={cat.id} category={cat} />
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* About Values */}
          <ScrollReveal variant="slide-up">
            <div style={{ marginBottom: '6rem' }}>
              <SectionTitle 
                eyebrow="BRAND COMMITMENT"
                title="WHY CHOOSE NIKHIL FASHIONS"
                description="Designed with purpose, tailored for performance, and curated for everyday confidence."
                center
              />

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
                {valueCards.map((card, idx) => (
                  <div key={idx} style={{ padding: '2.25rem', backgroundColor: '#F5F5F3', borderRadius: '4px', borderTop: '3px solid #0A0A0A' }}>
                    <div style={{ marginBottom: '1rem' }}>{card.icon}</div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                      {card.title}
                    </h3>
                    <p style={{ fontSize: '0.875rem', color: '#666', lineHeight: 1.6 }}>
                      {card.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* About Final CTA */}
          <ScrollReveal variant="fade">
            <div style={{
              position: 'relative',
              padding: '6rem 3rem',
              backgroundColor: '#0A0A0A',
              color: '#FFFFFF',
              borderRadius: '4px',
              textAlign: 'center',
              overflow: 'hidden'
            }}>
              <div style={{ position: 'relative', zIndex: 2, maxWidth: '650px', margin: '0 auto' }}>
                <span className="eyebrow" style={{ color: '#C6A15B' }}>YOUR LOOKBOOK AWAITS</span>
                <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', fontWeight: 900, textTransform: 'uppercase', marginBottom: '1.25rem', lineHeight: 1.05 }}>
                  FIND YOUR NEXT EVERYDAY ESSENTIAL.
                </h2>
                <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.8)', marginBottom: '2.5rem' }}>
                  Explore our newest footwear drops, structured outerwear, and premium accessories today.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <Button variant="secondary" href="/shop">
                    SHOP COLLECTION
                  </Button>
                  <Button variant="outline-white" href="/contact">
                    CONTACT US
                  </Button>
                </div>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
