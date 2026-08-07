import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight } from 'lucide-react';
import { products } from '../../data/products';

const SearchOverlay = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredProducts = query.trim() === '' ? [] : products.filter(p => {
    const q = query.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.subcategory.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  });

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(10, 10, 10, 0.94)',
          backdropFilter: 'blur(10px)',
          zIndex: 1300,
          display: 'flex',
          flexDirection: 'column',
          color: '#FFFFFF',
          overflowY: 'auto'
        }}
      >
        {/* Search Bar Header */}
        <div style={{ padding: '2rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', position: 'relative' }}>
          <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <Search size={28} color="#C6A15B" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="SEARCH FOOTWEAR, CLOTHING, ACCESSORIES..."
              autoFocus
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                color: '#FFFFFF',
                fontSize: 'clamp(1.2rem, 3vw, 2rem)',
                fontWeight: 800,
                letterSpacing: '0.05em',
                textTransform: 'uppercase'
              }}
            />
            <button
              onClick={onClose}
              aria-label="Close search"
              style={{
                padding: '0.75rem',
                color: '#FFFFFF',
                cursor: 'pointer',
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderRadius: '50%'
              }}
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Search Results Area */}
        <div className="container section-padding" style={{ flex: 1 }}>
          {query.trim() === '' ? (
            <div style={{ textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.15em', fontSize: '0.85rem' }}>
              <p style={{ marginBottom: '1.5rem', color: '#C6A15B', fontWeight: 800 }}>POPULAR SEARCH TERMS:</p>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {['Sneakers', 'Jacket', 'Watch', 'Boots', 'Jeans', 'Wallet'].map(term => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    style={{
                      padding: '0.6rem 1.25rem',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '2px',
                      color: '#FFF',
                      fontWeight: 700,
                      cursor: 'pointer',
                      background: 'transparent',
                      fontSize: '0.75rem'
                    }}
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div>
              <p style={{ fontSize: '0.8rem', color: '#C6A15B', letterSpacing: '0.15em', fontWeight: 800, marginBottom: '2rem', textTransform: 'uppercase' }}>
                FOUND {filteredProducts.length} MATCHING PRODUCTS FOR "{query.toUpperCase()}"
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '2rem' }}>
                {filteredProducts.map(p => (
                  <Link
                    key={p.id}
                    to={`/product/${p.id}`}
                    onClick={onClose}
                    style={{
                      backgroundColor: '#141414',
                      borderRadius: '2px',
                      overflow: 'hidden',
                      border: '1px solid rgba(255,255,255,0.08)',
                      transition: 'transform 0.2s',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <div style={{ aspectRatio: '3/4', backgroundColor: '#1A1A1A', overflow: 'hidden' }}>
                      <img src={p.images[0]} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ padding: '1rem' }}>
                      <span style={{ fontSize: '0.65rem', color: '#777', textTransform: 'uppercase', letterSpacing: '0.15em', display: 'block' }}>
                        {p.category}
                      </span>
                      <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#FFF', textTransform: 'uppercase', margin: '0.25rem 0 0.5rem 0' }}>
                        {p.name}
                      </h4>
                      <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#C6A15B' }}>${p.price}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '1rem' }}>
                NO PRODUCTS FOUND FOR "{query.toUpperCase()}"
              </h3>
              <p style={{ color: '#777', maxWidth: '500px', margin: '0 auto 2rem auto', fontSize: '0.95rem' }}>
                Try searching for sneakers, jackets, watches, denim, or explore our full collection.
              </p>
              <button
                onClick={() => setQuery('')}
                className="btn btn-outline-white"
              >
                CLEAR SEARCH
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SearchOverlay;
