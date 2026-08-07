import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Heart, ShoppingBag, ArrowRight, Minus, Plus } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

const QuickViewModal = ({ product, isOpen, onClose }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [sizeError, setSizeError] = useState(false);

  useEffect(() => {
    if (product) {
      if (product.sizes && product.sizes.length > 0) {
        setSelectedSize(product.sizes[0]);
      }
      if (product.colors && product.colors.length > 0) {
        setSelectedColor(product.colors[0]);
      }
      setQuantity(1);
      setActiveImageIndex(0);
      setSizeError(false);
    }
  }, [product]);

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

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    addToCart(product, quantity, selectedSize, selectedColor);
    onClose();
  };

  const wishlisted = isWishlisted(product.id);

  return (
    <AnimatePresence>
      <div 
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(10, 10, 10, 0.75)',
          backdropFilter: 'blur(6px)',
          zIndex: 1200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem'
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            backgroundColor: '#FFFFFF',
            width: '100%',
            maxWidth: '900px',
            maxHeight: '90vh',
            overflowY: 'auto',
            borderRadius: '4px',
            position: 'relative',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            style={{
              position: 'absolute',
              top: '1.25rem',
              right: '1.25rem',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: '#F5F5F3',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
              cursor: 'pointer'
            }}
          >
            <X size={20} color="#0A0A0A" />
          </button>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', padding: '2.5rem' }}>
            
            {/* Gallery Left */}
            <div>
              <div style={{ aspectRatio: '3/4', backgroundColor: '#F5F5F3', borderRadius: '4px', overflow: 'hidden', marginBottom: '1rem' }}>
                <img 
                  src={product.images && product.images[activeImageIndex] ? product.images[activeImageIndex] : product.images[0]} 
                  alt={product.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              {product.images && product.images.length > 1 && (
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      style={{
                        width: '60px',
                        height: '75px',
                        borderRadius: '2px',
                        overflow: 'hidden',
                        border: activeImageIndex === idx ? '2px solid #C6A15B' : '1px solid #E5E5E5',
                        cursor: 'pointer'
                      }}
                    >
                      <img src={img} alt={`Thumbnail ${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details Right */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span className="eyebrow">{product.category}</span>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '0.5rem', lineHeight: 1.1 }}>
                {product.name}
              </h2>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', color: '#C6A15B' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill={i < Math.floor(product.rating) ? '#C6A15B' : 'none'} />
                  ))}
                </div>
                <span style={{ fontSize: '0.8rem', color: '#777', fontWeight: 600 }}>{product.rating} ({product.reviews} reviews)</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0A0A0A' }}>${product.price}</span>
                {product.oldPrice && <span style={{ textDecoration: 'line-through', color: '#777', fontSize: '1rem' }}>${product.oldPrice}</span>}
                {product.discount && <span className="badge-gold">{product.discount}</span>}
              </div>

              <p style={{ fontSize: '0.9rem', color: '#555', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                {product.description}
              </p>

              {/* Color Selector */}
              {product.colors && product.colors.length > 0 && (
                <div style={{ marginBottom: '1.25rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', display: 'block', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                    COLOR: <span style={{ color: '#C6A15B' }}>{selectedColor}</span>
                  </span>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {product.colors.map(col => (
                      <button
                        key={col}
                        onClick={() => setSelectedColor(col)}
                        style={{
                          padding: '0.4rem 0.8rem',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          border: selectedColor === col ? '2px solid #0A0A0A' : '1px solid #E5E5E5',
                          backgroundColor: selectedColor === col ? '#F5F5F3' : '#FFF',
                          borderRadius: '2px',
                          cursor: 'pointer'
                        }}
                      >
                        {col}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selector */}
              {product.sizes && product.sizes.length > 0 && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                      SIZE: <span style={{ color: '#C6A15B' }}>{selectedSize}</span>
                    </span>
                    {sizeError && (
                      <span style={{ color: '#E63946', fontSize: '0.75rem', fontWeight: 700 }}>PLEASE SELECT A SIZE</span>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => { setSelectedSize(size); setSizeError(false); }}
                        style={{
                          width: '42px',
                          height: '42px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 800,
                          fontSize: '0.8rem',
                          border: selectedSize === size ? '2px solid #0A0A0A' : '1px solid #E5E5E5',
                          backgroundColor: selectedSize === size ? '#0A0A0A' : '#FFFFFF',
                          color: selectedSize === size ? '#FFFFFF' : '#0A0A0A',
                          borderRadius: '2px',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Controls */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.75rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>QUANTITY:</span>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #E5E5E5', borderRadius: '2px' }}>
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    style={{ padding: '0.5rem 0.75rem', color: '#0A0A0A', cursor: 'pointer' }}
                  >
                    <Minus size={14} />
                  </button>
                  <span style={{ padding: '0.5rem 1rem', fontWeight: 800, fontSize: '0.9rem' }}>{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    style={{ padding: '0.5rem 0.75rem', color: '#0A0A0A', cursor: 'pointer' }}
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto' }}>
                <button
                  onClick={handleAddToCart}
                  className="btn btn-primary"
                  style={{ flex: 1, gap: '0.5rem' }}
                >
                  <ShoppingBag size={16} />
                  <span>ADD TO CART</span>
                </button>

                <button
                  onClick={() => toggleWishlist(product)}
                  style={{
                    width: '50px',
                    height: '50px',
                    border: '1px solid #E5E5E5',
                    borderRadius: '2px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: wishlisted ? '#0A0A0A' : '#FFF',
                    color: wishlisted ? '#E63946' : '#0A0A0A',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  aria-label="Wishlist"
                >
                  <Heart size={20} fill={wishlisted ? '#E63946' : 'none'} />
                </button>
              </div>

              <div style={{ marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid #E5E5E5' }}>
                <Link 
                  to={`/product/${product.id}`} 
                  onClick={onClose}
                  style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.12em', color: '#0A0A0A', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  <span>VIEW FULL PRODUCT DETAILS</span>
                  <ArrowRight size={14} />
                </Link>
              </div>

            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default QuickViewModal;
