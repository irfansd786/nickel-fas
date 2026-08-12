import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { storeInfo } from '../../data/store';

const InstagramIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const FacebookIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const WhatsAppIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
  </svg>
);

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#090909', color: '#FFFFFF', paddingTop: '4.5rem', paddingBottom: '2.5rem', borderTop: '1px solid #1A1A1A' }}>
      <div className="container">
        
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 1fr 1.2fr',
            gap: '4rem',
            marginBottom: '3.5rem',
            alignItems: 'start'
          }}
          className="footer-grid-wrapper"
        >
          
          {/* LEFT COLUMN: BRAND INFO & GLOWING SOCIAL ICONS */}
          <div>
            <Link to="/" className="brand-logo" style={{ color: '#FFFFFF', marginBottom: '1rem', display: 'inline-flex' }}>
              <span>NIKHIL</span>
              <span className="brand-logo-accent">FASHIONS</span>
            </Link>

            <p style={{ fontSize: '0.875rem', color: '#888888', lineHeight: '1.7', marginBottom: '1.75rem', maxWidth: '380px' }}>
              {storeInfo.name} — Premium menswear, luxury footwear, and modern lifestyle accessories designed for everyday confidence and refined urban presence.
            </p>

            {/* REAL GLOWING SOCIAL MEDIA ICONS */}
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              {/* INSTAGRAM WITH REAL CLIENT LINK: nikhilfashions123 */}
              <a 
                href="https://www.instagram.com/nikhilfashions123" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Instagram Page" 
                className="glowing-social-icon"
              >
                <InstagramIcon size={18} />
              </a>

              {/* WHATSAPP ICON */}
              <a 
                href="https://wa.me/919848012345" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="WhatsApp Contact" 
                className="glowing-social-icon"
              >
                <WhatsAppIcon size={18} />
              </a>

              {/* FACEBOOK ICON */}
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Facebook Page" 
                className="glowing-social-icon"
              >
                <FacebookIcon size={18} />
              </a>
            </div>
          </div>

          {/* MIDDLE COLUMN: ONLY SHOP, PROFILE, ABOUT LINKS */}
          <div>
            <h4 style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.18em', color: '#C6A15B', marginBottom: '1.25rem', textTransform: 'uppercase' }}>
              QUICK NAVIGATION
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem', listStyle: 'none', padding: 0, margin: 0 }}>
              <li>
                <Link to="/shop" style={{ color: '#CCCCCC', textDecoration: 'none', fontWeight: 700, letterSpacing: '0.05em', transition: 'color 0.2s' }}>
                  SHOP
                </Link>
              </li>
              <li>
                <Link to="/track-order" style={{ color: '#CCCCCC', textDecoration: 'none', fontWeight: 700, letterSpacing: '0.05em', transition: 'color 0.2s' }}>
                  TRACK ORDER
                </Link>
              </li>
              <li>
                <Link to="/wishlist" style={{ color: '#CCCCCC', textDecoration: 'none', fontWeight: 700, letterSpacing: '0.05em', transition: 'color 0.2s' }}>
                  PROFILE
                </Link>
              </li>
              <li>
                <a href="/#about" style={{ color: '#CCCCCC', textDecoration: 'none', fontWeight: 700, letterSpacing: '0.05em', transition: 'color 0.2s' }}>
                  ABOUT
                </a>
              </li>
            </ul>

          </div>

          {/* RIGHT COLUMN: STORE LOCATION & DETAILS */}
          <div>
            <h4 style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.18em', color: '#C6A15B', marginBottom: '1.25rem', textTransform: 'uppercase' }}>
              STORE CONTACT
            </h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.85rem', color: '#AAAAAA' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <MapPin size={16} color="#C6A15B" style={{ flexShrink: 0, marginTop: '3px' }} />
                <span>{storeInfo.address}, {storeInfo.city}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Phone size={16} color="#C6A15B" style={{ flexShrink: 0 }} />
                <a href={`tel:${storeInfo.phone}`} style={{ color: '#AAAAAA', textDecoration: 'none' }}>{storeInfo.phone}</a>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Mail size={16} color="#C6A15B" style={{ flexShrink: 0 }} />
                <a href={`mailto:${storeInfo.email}`} style={{ color: '#AAAAAA', textDecoration: 'none' }}>{storeInfo.email}</a>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Clock size={16} color="#C6A15B" style={{ flexShrink: 0 }} />
                <span>{storeInfo.hours}</span>
              </div>
            </div>
          </div>

        </div>

        {/* FOOTER BOTTOM */}
        <div style={{ paddingTop: '1.75rem', borderTop: '1px solid #1A1A1A', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', fontSize: '0.75rem', color: '#666666' }}>
          <p>© 2026 {storeInfo.name}. ALL RIGHTS RESERVED.</p>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <a href="#privacy" style={{ color: '#666666', textDecoration: 'none' }}>PRIVACY POLICY</a>
            <a href="#terms" style={{ color: '#666666', textDecoration: 'none' }}>TERMS OF SERVICE</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
