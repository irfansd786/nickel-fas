import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Heart, ShoppingBag, Menu, X, ChevronRight, ChevronDown, Check, Tag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import SearchOverlay from '../common/SearchOverlay';
import MobileBottomNav from './MobileBottomNav';
import { categories } from '../../data/categories';
import '../../styles/navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const { cartCount, notification } = useCart();
  const { wishlistCount } = useWishlist();
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll listener for translucent header background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll Spy for Home page sections (#home, #about, #contact)
  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveSection('');
      return;
    }

    const handleScrollSpy = () => {
      const scrollPos = window.scrollY + 220;
      const contactEl = document.getElementById('contact');
      const aboutEl = document.getElementById('about');

      if (contactEl && scrollPos >= contactEl.offsetTop) {
        setActiveSection('contact');
      } else if (aboutEl && scrollPos >= aboutEl.offsetTop) {
        setActiveSection('about');
      } else {
        setActiveSection('home');
      }
    };

    handleScrollSpy();
    window.addEventListener('scroll', handleScrollSpy);
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, [location.pathname]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname, location.hash]);

  const navLinks = [
    { name: 'HOME', path: '/', sectionKey: 'home' },
    { name: 'SHOP ALL', path: '/shop' },
    { name: 'NEW ARRIVALS', path: '/new-arrivals' },
    { name: 'TRACK ORDER', path: '/track-order' },
    { name: 'ABOUT', path: '/#about', hashSection: 'about', sectionKey: 'about' },
    { name: 'CONTACT US', path: '/#contact', hashSection: 'contact', sectionKey: 'contact' }
  ];

  const handleSectionClick = (e, link) => {
    if (link.hashSection) {
      e.preventDefault();
      if (location.pathname === '/') {
        const el = document.getElementById(link.hashSection);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        navigate(`/#${link.hashSection}`);
      }
    }
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          {/* Left Side: Brand Logo */}
          <Link to="/" className="brand-logo">
            <span>NIKHIL</span>
            <span className="brand-logo-accent">FASHIONS</span>
          </Link>

          {/* Middle Navigation Links */}
          <div className="nav-menu">
            {navLinks.map((link) => {
              if (link.hashSection) {
                const isActive = location.pathname === '/' && activeSection === link.sectionKey;
                return (
                  <a
                    key={link.name}
                    href={link.path}
                    onClick={(e) => handleSectionClick(e, link)}
                    className={`nav-link ${isActive ? 'active' : ''}`}
                  >
                    {link.name}
                  </a>
                );
              }

              if (link.path === '/') {
                const isActive = location.pathname === '/' && activeSection === 'home';
                return (
                  <Link
                    key={link.name}
                    to="/"
                    className={`nav-link ${isActive ? 'active' : ''}`}
                    onClick={() => {
                      if (location.pathname === '/') {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                  >
                    {link.name}
                  </Link>
                );
              }

              return (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  {link.name}
                </NavLink>
              );
            })}
          </div>

          {/* Right Action Icons */}
          <div className="nav-actions">
            <button 
              className="icon-btn" 
              onClick={() => setSearchOpen(true)} 
              aria-label="Open search"
            >
              <Search size={20} />
            </button>

            <Link to="/wishlist" className="icon-btn" aria-label="Open wishlist">
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="cart-count" style={{ backgroundColor: '#0A0A0A' }}>
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link to="/cart" className="icon-btn" aria-label="Open cart">
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="cart-count">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Trigger */}
            <button 
              className="icon-btn mobile-menu-btn"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </nav>

      {/* Global Notification Toast */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            style={{
              position: 'fixed',
              top: '90px',
              right: '20px',
              backgroundColor: '#0A0A0A',
              color: '#FFFFFF',
              padding: '0.85rem 1.5rem',
              borderRadius: '2px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
              borderLeft: '4px solid #C6A15B',
              zIndex: 1100,
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              fontSize: '0.75rem',
              fontWeight: 800,
              letterSpacing: '0.1em'
            }}
          >
            <Check size={16} color="#C6A15B" />
            <span>{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              className="mobile-menu-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              className="mobile-menu-drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="mobile-drawer-header">
                <Link to="/" className="brand-logo" style={{ color: '#fff' }}>
                  <span>NIKHIL</span>
                  <span className="brand-logo-accent">FASHIONS</span>
                </Link>
                <button
                  className="mobile-drawer-close"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="mobile-nav-links">
                {/* HOME */}
                <NavLink
                  to="/"
                  className={({ isActive }) => `mobile-nav-link ${isActive && location.pathname === '/' ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                  end
                >
                  <span>HOME</span>
                  <ChevronRight size={18} />
                </NavLink>

                {/* SHOP */}
                <NavLink
                  to="/shop"
                  className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>SHOP ALL</span>
                  <ChevronRight size={18} />
                </NavLink>

                {/* CATEGORIES ACCORDION */}
                <div>
                  <button
                    onClick={() => setCategoriesOpen(!categoriesOpen)}
                    className="mobile-nav-link"
                    style={{ width: '100%', justifyContent: 'space-between', background: 'none', border: 'none' }}
                  >
                    <span>CATEGORIES</span>
                    <ChevronDown
                      size={18}
                      style={{
                        transform: categoriesOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease'
                      }}
                    />
                  </button>
                  
                  <AnimatePresence>
                    {categoriesOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        style={{ overflow: 'hidden', paddingLeft: '1.25rem', backgroundColor: 'rgba(255, 255, 255, 0.03)' }}
                      >
                        {categories.map((cat) => (
                          <Link
                            key={cat.id}
                            to={`/category/${cat.slug}`}
                            onClick={() => setMobileMenuOpen(false)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              padding: '0.65rem 0',
                              color: 'rgba(255, 255, 255, 0.8)',
                              fontSize: '0.825rem',
                              fontWeight: 700,
                              letterSpacing: '0.08em',
                              borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
                            }}
                          >
                            <span>{cat.name}</span>
                            <ChevronRight size={14} color="#C6A15B" />
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* NEW ARRIVALS */}
                <NavLink
                  to="/new-arrivals"
                  className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>NEW ARRIVALS</span>
                  <ChevronRight size={18} />
                </NavLink>

                {/* OFFERS */}
                <Link
                  to="/shop?discount=20"
                  className="mobile-nav-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Tag size={16} color="#C6A15B" />
                    <span>OFFERS & DROPS</span>
                  </div>
                  <ChevronRight size={18} />
                </Link>

                {/* TRACK ORDER */}
                <NavLink
                  to="/track-order"
                  className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>TRACK ORDER</span>
                  <ChevronRight size={18} />
                </NavLink>

                {/* ABOUT */}
                <a
                  href="/#about"
                  onClick={(e) => {
                    handleSectionClick(e, { hashSection: 'about', sectionKey: 'about' });
                    setMobileMenuOpen(false);
                  }}
                  className={`mobile-nav-link ${location.pathname === '/' && activeSection === 'about' ? 'active' : ''}`}
                >
                  <span>ABOUT US</span>
                  <ChevronRight size={18} />
                </a>

                {/* CONTACT */}
                <a
                  href="/#contact"
                  onClick={(e) => {
                    handleSectionClick(e, { hashSection: 'contact', sectionKey: 'contact' });
                    setMobileMenuOpen(false);
                  }}
                  className={`mobile-nav-link ${location.pathname === '/' && activeSection === 'contact' ? 'active' : ''}`}
                >
                  <span>CONTACT US</span>
                  <ChevronRight size={18} />
                </a>
              </div>

              <div className="mobile-drawer-footer">
                <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#C6A15B' }}>
                  CLIENT SUPPORT & INQUIRIES
                </p>
                <p className="mobile-contact-info">support@nikhilfashions.com</p>
                <p className="mobile-contact-info">+91 98480 12345</p>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Fixed Mobile Bottom Navigation Bar */}
      <MobileBottomNav onOpenSearch={() => setSearchOpen(true)} />
    </>
  );
};

export default Navbar;

