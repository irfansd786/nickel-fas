import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { storeInfo } from '../../data/store';
import { MapPin, Phone, Mail, Clock, ArrowRight, ChevronUp, Sparkles, Award, ShieldCheck, UserCheck } from 'lucide-react';
import ScrollReveal from '../common/ScrollReveal';
import contactPersonImg from '../../assets/images/contact-person-enhanced.png';
import '../../styles/contact.css';

const ContactSection = () => {
  const [showMap, setShowMap] = useState(false);

  const handleToggleMap = () => {
    const nextState = !showMap;
    setShowMap(nextState);

    if (nextState) {
      setTimeout(() => {
        const el = document.getElementById('home-store-map');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 150);
    }
  };

  return (
    <section 
      id="contact" 
      style={{
        backgroundColor: '#FFFFFF',
        padding: '5.5rem 0',
        borderBottom: '1px solid #E5E5E5',
        scrollMarginTop: '80px'
      }}
    >
      <div className="contact-container">
        
        {/* HERO / HEADER (Short 2-line intro) */}
        <ScrollReveal variant="fade">
          <div className="contact-header">
            <h2 className="contact-title">CONTACT US</h2>
            <p className="contact-subtitle">
              Have a question about our collection or your order?<br />
              We're here to help.
            </p>
          </div>
        </ScrollReveal>

        {/* MAIN 2-COLUMN SECTION: STORE DETAILS | FOUNDER PORTRAIT SHOWCASE */}
        <ScrollReveal variant="slide-up">
          <div className="contact-grid">
            
            {/* LEFT COLUMN — STORE DETAILS */}
            <div className="store-details-section">
              <h3 className="section-subheading">STORE DETAILS</h3>

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
            </div>

            {/* RIGHT COLUMN — FOUNDER PORTRAIT SHOWCASE */}
            <div className="contact-portrait-showcase">
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
            </div>

          </div>
        </ScrollReveal>

        {/* INTERACTIVE EXPANDABLE BRIGHT MAP SECTION */}
        <AnimatePresence>
          {showMap && (
            <motion.div 
              id="home-store-map"
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
    </section>
  );
};

export default ContactSection;
