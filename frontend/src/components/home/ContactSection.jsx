import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { storeInfo } from '../../data/store';
import { MapPin, Phone, Mail, Clock, ArrowRight, ChevronUp, Send, CheckCircle2 } from 'lucide-react';
import ScrollReveal from '../common/ScrollReveal';
import '../../styles/contact.css';

const ContactSection = () => {
  const [showMap, setShowMap] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Product Enquiry',
    message: ''
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    message: false
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {
      name: !formData.name.trim(),
      email: !formData.email.trim(),
      message: !formData.message.trim()
    };

    setErrors(newErrors);

    if (newErrors.name || newErrors.email || newErrors.message) {
      return;
    }

    setSubmitted(true);
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

        {/* MAIN 2-COLUMN SECTION: STORE DETAILS | SEND US A MESSAGE */}
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

            {/* RIGHT COLUMN — SEND MESSAGE FORM */}
            <div className="send-message-section">
              <h3 className="section-subheading" style={{ marginBottom: '0.5rem' }}>SEND US A MESSAGE</h3>
              <p className="form-supporting-text">Have a question? Send us a message and we'll get back to you.</p>

              {submitted ? (
                <div className="form-success-box">
                  <CheckCircle2 size={44} color="#198754" style={{ margin: '0 auto' }} />
                  <h4>MESSAGE RECEIVED</h4>
                  <p>Thanks! Your message has been received. Our concierge team will reach out shortly.</p>
                  <button 
                    type="button" 
                    className="visit-store-btn"
                    style={{ width: 'auto', marginTop: 0 }}
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', subject: 'Product Enquiry', message: '' });
                    }}
                  >
                    SEND ANOTHER MESSAGE
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  
                  {/* NAME */}
                  <div className="form-field-group">
                    <label className="form-label">NAME *</label>
                    <input 
                      type="text" 
                      className="form-input"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{ borderColor: errors.name ? '#E63946' : undefined }}
                    />
                    {errors.name && <span style={{ fontSize: '0.7rem', color: '#E63946', marginTop: '0.2rem' }}>Name is required.</span>}
                  </div>

                  {/* EMAIL / WHATSAPP */}
                  <div className="form-field-group">
                    <label className="form-label">EMAIL / WHATSAPP *</label>
                    <input 
                      type="text" 
                      className="form-input"
                      placeholder="Enter your email or WhatsApp"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{ borderColor: errors.email ? '#E63946' : undefined }}
                    />
                    {errors.email && <span style={{ fontSize: '0.7rem', color: '#E63946', marginTop: '0.2rem' }}>Email or WhatsApp is required.</span>}
                  </div>

                  {/* SUBJECT */}
                  <div className="form-field-group">
                    <label className="form-label">SUBJECT</label>
                    <select 
                      className="form-input"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    >
                      <option value="Product Enquiry">Product Enquiry</option>
                      <option value="Order Support">Order Support</option>
                      <option value="Product Availability">Product Availability</option>
                      <option value="Size Enquiry">Size Enquiry</option>
                      <option value="Store Visit">Store Visit</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* MESSAGE */}
                  <div className="form-field-group">
                    <label className="form-label">MESSAGE *</label>
                    <textarea 
                      className="form-textarea"
                      placeholder="Tell us how we can help..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      style={{ borderColor: errors.message ? '#E63946' : undefined }}
                    />
                    {errors.message && <span style={{ fontSize: '0.7rem', color: '#E63946', marginTop: '0.2rem' }}>Message is required.</span>}
                  </div>

                  {/* SUBMIT BUTTON */}
                  <button type="submit" className="send-message-btn">
                    <span>SEND MESSAGE</span>
                    <ArrowRight size={16} className="btn-arrow-icon" />
                  </button>

                </form>
              )}
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
