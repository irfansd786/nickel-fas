import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AnnouncementBar from '../components/layout/AnnouncementBar';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Breadcrumbs from '../components/common/Breadcrumbs';
import ProductCard from '../components/common/ProductCard';
import SectionTitle from '../components/common/SectionTitle';
import Button from '../components/common/Button';
import ScrollReveal from '../components/common/ScrollReveal';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { Star, Heart, ShoppingBag, Truck, RefreshCw, ShieldCheck, Minus, Plus, ArrowLeft } from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const product = products.find(p => p.id === id);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
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
      window.scrollTo(0, 0);
    }
  }, [id, product]);

  // Invalid Product State
  if (!product) {
    return (
      <div className="page-wrapper">
        <AnnouncementBar />
        <Navbar />
        <main className="section-padding" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
          <div className="container" style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '1rem' }}>
              PRODUCT NOT FOUND
            </h1>
            <p style={{ color: '#777', maxWidth: '500px', margin: '0 auto 2rem auto' }}>
              The requested item does not exist or has been removed from our current collection.
            </p>
            <Button variant="primary" href="/shop" icon={false} className="gap-2">
              <ArrowLeft size={16} />
              <span>BACK TO SHOP CATALOGUE</span>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    addToCart(product, quantity, selectedSize, selectedColor, product.images[activeImageIndex] || product.images[0]);
  };

  const handleBuyNow = () => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    addToCart(product, quantity, selectedSize, selectedColor, product.images[activeImageIndex] || product.images[0]);
    navigate('/cart');
  };

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="page-wrapper">
      <AnnouncementBar />
      <Navbar />

      <main className="section-padding">
        <div className="container">
          
          {/* Breadcrumbs */}
          <Breadcrumbs items={[
            { label: 'SHOP', path: '/shop' },
            { label: product.category, path: `/category/${product.category}` },
            { label: product.name, path: `/product/${product.id}` }
          ]} />

          {/* Product Main Detail Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '4rem', marginBottom: '6rem', alignItems: 'start' }}>
            
            {/* Gallery Left */}
            <div>
              <div style={{ aspectRatio: '3/4', backgroundColor: '#F5F5F3', borderRadius: '4px', overflow: 'hidden', marginBottom: '1.25rem', position: 'relative' }}>
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={activeImageIndex}
                    src={product.images[activeImageIndex] || product.images[0]} 
                    alt={product.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                </AnimatePresence>
                <div style={{ position: 'absolute', top: '1.25rem', left: '1.25rem' }}>
                  {product.isNew && <span className="badge-gold">NEW DROP</span>}
                </div>
              </div>

              {/* Thumbnails */}
              {product.images && product.images.length > 1 && (
                <div style={{ display: 'flex', gap: '1rem' }}>
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      style={{
                        width: '80px',
                        height: '100px',
                        borderRadius: '2px',
                        overflow: 'hidden',
                        border: activeImageIndex === idx ? '2px solid #C6A15B' : '1px solid #E5E5E5',
                        cursor: 'pointer',
                        opacity: activeImageIndex === idx ? 1 : 0.7,
                        transition: 'all 0.2s'
                      }}
                    >
                      <img src={img} alt={`Thumbnail ${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Specifications Right */}
            <div>
              <span className="eyebrow">{product.category} — {product.subcategory}</span>
              <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 900, textTransform: 'uppercase', marginBottom: '0.75rem', lineHeight: 1.05 }}>
                {product.name}
              </h1>

              {/* Rating & Review count */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', color: '#C6A15B' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill={i < Math.floor(product.rating) ? '#C6A15B' : 'none'} />
                  ))}
                </div>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#555' }}>
                  {product.rating} ({product.reviews} VERIFIED REVIEWS)
                </span>
              </div>

              {/* Pricing */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.75rem' }}>
                <span style={{ fontSize: '2rem', fontWeight: 900, color: '#0A0A0A' }}>₹{product.price}</span>
                {product.oldPrice && <span style={{ textDecoration: 'line-through', color: '#888', fontSize: '1.25rem' }}>₹{product.oldPrice}</span>}
                {product.discount && <span className="badge-gold">{product.discount}</span>}
              </div>

              {/* Description */}
              <p style={{ color: '#444', fontSize: '1rem', lineHeight: 1.7, marginBottom: '2rem', borderBottom: '1px solid #E5E5E5', paddingBottom: '2rem' }}>
                {product.description}
              </p>

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div style={{ marginBottom: '1.75rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.12em', display: 'block', marginBottom: '0.6rem', textTransform: 'uppercase' }}>
                    COLOR: <span style={{ color: '#C6A15B' }}>{selectedColor}</span>
                  </span>
                  <div style={{ display: 'flex', gap: '0.6rem' }}>
                    {product.colors.map(col => (
                      <button
                        key={col}
                        onClick={() => setSelectedColor(col)}
                        style={{
                          padding: '0.5rem 1rem',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          border: selectedColor === col ? '2px solid #0A0A0A' : '1px solid #E5E5E5',
                          backgroundColor: selectedColor === col ? '#F5F5F3' : '#FFFFFF',
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

              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div style={{ marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                      SELECT SIZE: <span style={{ color: '#C6A15B' }}>{selectedSize}</span>
                    </span>
                    {sizeError && (
                      <span style={{ color: '#E63946', fontSize: '0.75rem', fontWeight: 800 }}>PLEASE SELECT A SIZE</span>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => { setSelectedSize(size); setSizeError(false); }}
                        style={{
                          minWidth: '48px',
                          height: '48px',
                          padding: '0 0.8rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 800,
                          fontSize: '0.85rem',
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase' }}>QUANTITY:</span>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #E5E5E5', borderRadius: '2px' }}>
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    style={{ padding: '0.6rem 0.9rem', color: '#0A0A0A', cursor: 'pointer' }}
                  >
                    <Minus size={16} />
                  </button>
                  <span style={{ padding: '0.6rem 1.25rem', fontWeight: 800, fontSize: '1rem' }}>{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    style={{ padding: '0.6rem 0.9rem', color: '#0A0A0A', cursor: 'pointer' }}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Add to Cart & Buy Now Buttons */}
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
                <button
                  onClick={handleAddToCart}
                  className="btn btn-primary"
                  style={{ flex: '2', minWidth: '180px', gap: '0.6rem' }}
                >
                  <ShoppingBag size={18} />
                  <span>ADD TO CART</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="btn btn-secondary"
                  style={{ flex: '1', minWidth: '140px', backgroundColor: '#C6A15B', color: '#FFF', borderColor: '#C6A15B' }}
                >
                  BUY NOW
                </button>

                <button
                  onClick={() => toggleWishlist(product, product.images[activeImageIndex] || product.images[0])}
                  style={{
                    width: '54px',
                    height: '54px',
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
                  <Heart size={22} fill={wishlisted ? '#E63946' : 'none'} />
                </button>
              </div>

              {/* Value Props & Guarantees */}
              <div style={{ borderTop: '1px solid #E5E5E5', paddingTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.85rem', color: '#555' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <Truck size={20} color="#C6A15B" />
                  <div>
                    <strong style={{ display: 'block', color: '#0A0A0A' }}>EXPRESS GLOBAL DISPATCH</strong>
                    <span>Complimentary air courier on all orders over ₹1,500.</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <RefreshCw size={20} color="#C6A15B" />
                  <div>
                    <strong style={{ display: 'block', color: '#0A0A0A' }}>30-DAY COMPLIMENTARY RETURNS</strong>
                    <span>Hassle-free size exchange and store credit options.</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <ShieldCheck size={20} color="#C6A15B" />
                  <div>
                    <strong style={{ display: 'block', color: '#0A0A0A' }}>VERIFIED CRAFTSMANSHIP GUARANTEE</strong>
                    <span>Precision stitching and high grade sustainable fabrics.</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Related Products Section */}
          {relatedProducts.length > 0 && (
            <ScrollReveal variant="slide-up">
              <div style={{ paddingTop: '4rem', borderTop: '1px solid #E5E5E5' }}>
                <SectionTitle 
                  eyebrow="MATCHING STYLES"
                  title="YOU MAY ALSO LIKE"
                  description="Complete your outfit with curated pairings from the same collection."
                />
                <div className="trending-grid">
                  {relatedProducts.map(relProduct => (
                    <ProductCard key={relProduct.id} product={relProduct} />
                  ))}
                </div>
              </div>
            </ScrollReveal>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetails;
