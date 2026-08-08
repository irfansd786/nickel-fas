import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnnouncementBar from '../components/layout/AnnouncementBar';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Breadcrumbs from '../components/common/Breadcrumbs';
import { storeInfo } from '../data/store';
import { MapPin, Phone, Mail, Clock, ArrowRight, ChevronUp, Sparkles, Award, ShieldCheck, UserCheck } from 'lucide-react';
import contactPersonImg from '../assets/images/contact-person-enhanced.png';
import '../styles/contact.css';

const Contact = () => {
  const [showMap, setShowMap] = useState(false);

  const handleToggleMap = () => {
    const nextState = !showMap;
    setShowMap(nextState);

    if (nextState) {
      setTimeout(() => {
        const el = document.getElementById('store-map-section');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 150);
    }
  };

  return (
    <div className="page-wrapper" style={{ overflowX: 'hidden', width: '100%' }}>
      <AnnouncementBar />
      <Navbar />

      <main className="contact-page-main">
        <div className="contact-container">
          
          {/* Breadcrumbs */}
          <Breadcrumbs items={[{ label: 'CONTACT US', path: '/contact' }]} />

          {/* HERO / PAGE HEADER (Short 2-line intro) */}
          <motion.div 
            className="contact-header"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="contact-title">CONTACT US</h1>
            <p className="contact-subtitle">
              Have a question about our collection or your order?<br />
              We're here to help.
            </p>
          </motion.div>

          {/* MAIN 2-COLUMN SECTION: STORE DETAILS | SEND US A MESSAGE */}
          <div className="contact-grid">
            
            {/* LEFT COLUMN — STORE DETAILS */}
            <motion.div 
              className="store-details-section"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h2 className="section-subheading">STORE DETAILS</h2>

              {/* LOCATION */}
              <div className="store-detail-item">
                <div className="store-detail-icon">
                  <MapPin size={20} />
                </div>
                <div>
                  <span className="store-detail-label">LOCATION</span>
                  <p className="store-detail-value">
                    {storeInfo.address}<br />
                    {storeInfo.city}
                  </p>
                </div>
              </div>

              {/* PHONE */}
              <div className="store-detail-item">
                <div className="store-detail-icon">
                  <Phone size={20} />
                </div>
                <div>
                  <span className="store-detail-label">PHONE</span>
                  <p className="store-detail-value">
                    <a href={`tel:${storeInfo.phone}`} className="store-detail-link">
                      {storeInfo.phone}
                    </a>
                  </p>
                </div>
              </div>

              {/* EMAIL */}
              <div className="store-detail-item">
                <div className="store-detail-icon">
                  <Mail size={20} />
                </div>
                <div>
                  <span className="store-detail-label">EMAIL</span>
                  <p className="store-detail-value">
                    <a href={`mailto:${storeInfo.email}`} className="store-detail-link">
                      {storeInfo.email}
                    </a>
                  </p>
                </div>
              </div>

              {/* OPENING HOURS */}
              <div className="store-detail-item">
                <div className="store-detail-icon">
                  <Clock size={20} />
                </div>
                <div>
                  <span className="store-detail-label">OPENING HOURS</span>
                  <p className="store-detail-value">
                    {storeInfo.hours}
                  </p>
                </div>
              </div>

              {/* VISIT OUR STORE / HIDE STORE MAP BUTTON */}
              <button 
                type="button"
                className="visit-store-btn"
                onClick={handleToggleMap}
                aria-expanded={showMap}
              >
                <span>{showMap ? 'HIDE STORE MAP' : 'VISIT OUR STORE'}</span>
                {showMap ? (
                  <ChevronUp size={16} className="btn-arrow-icon" />
                ) : (
                  <ArrowRight size={16} className="btn-arrow-icon" />
                )}
              </button>
            </motion.div>

            {/* RIGHT COLUMN — FOUNDER & CONCIERGE PORTRAIT SHOWCASE */}
            <motion.div 
              className="contact-portrait-showcase"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <div className="portrait-card">
                {/* Dark luxury background with golden spotlight */}
                <div className="portrait-backdrop-glow" />
                
                <div className="portrait-image-frame">
                  <img 
                    src={contactPersonImg} 
                    alt="Nikhil - Founder & Owner" 
                    className="portrait-image"
                  />
                  <div className="portrait-vignette" />
                </div>

                <div className="portrait-content">
                  <div className="portrait-badge">
                    <Sparkles size={14} className="text-gold" />
                    <span>FOUNDER & CREATIVE DIRECTOR</span>
                  </div>
                  <h3 className="portrait-title">NIKHIL</h3>
                  <p className="portrait-description">
                    "Welcome to Nikhil Fashions. Dedicated to bringing you luxury apparel, authentic style, and exceptional personal fashion concierge service."
                  </p>

                  <div className="portrait-highlights">
                    <div className="portrait-highlight-item">
                      <Award size={18} className="highlight-icon" />
                      <span>100% Authentic Premium Quality</span>
                    </div>
                    <div className="portrait-highlight-item">
                      <UserCheck size={18} className="highlight-icon" />
                      <span>Personal Styling Assistance</span>
                    </div>
                    <div className="portrait-highlight-item">
                      <ShieldCheck size={18} className="highlight-icon" />
                      <span>Verified Client Satisfaction</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>

          {/* INTERACTIVE EXPANDABLE BRIGHT MAP SECTION */}
          <AnimatePresence>
            {showMap && (
              <motion.div 
                id="store-map-section"
                className="interactive-map-wrapper"
                initial={{ opacity: 0, height: 0, scale: 0.98 }}
                animate={{ opacity: 1, height: 'auto', scale: 1 }}
                exit={{ opacity: 0, height: 0, scale: 0.98 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Floating Store Location Card */}
                <motion.div 
                  className="floating-location-card"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <MapPin size={26} className="location-pin-icon" />
                  <div>
                    <h3 className="location-card-title">{storeInfo.name}</h3>
                    <p className="location-card-address">{storeInfo.address}, {storeInfo.city}</p>
                  </div>
                </motion.div>

                {/* Bright Light Map Embed */}
                <iframe 
                  title="Store Location Map"
                  src={storeInfo.mapEmbedUrl}
                  className="bright-map-iframe"
                  loading="lazy"
                />
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
