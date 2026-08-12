import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Star, ShoppingBag, Eye } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';

const ProductCard = ({ product, onQuickView }) => {
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);

  if (!product) return null;

  const {
    id,
    name,
    category,
    price,
    oldPrice,
    discount,
    rating,
    reviews,
    images,
    isNew
  } = product;

  const primaryImage = images && images.length > 0 ? images[0] : '';
  const secondaryImage = images && images.length > 1 ? images[1] : primaryImage;
  const wishlisted = isWishlisted(id);

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickViewClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) onQuickView(product);
  };

  const handleAddToCartClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <motion.div 
      className="product-card"
      whileHover={{ y: -3 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="product-card-image-wrapper">
        <Link to={`/product/${id}`}>
          <img 
            src={primaryImage} 
            alt={name} 
            className="product-card-image" 
            loading="lazy" 
          />
        </Link>

        {/* Badges */}
        <div className="product-badge">
          {isNew && <span className="badge-gold">NEW DROP</span>}
          {!isNew && discount && <span className="badge-dark">{discount}</span>}
        </div>

        {/* Wishlist Icon */}
        <button 
          className={`product-wishlist-btn ${wishlisted ? 'active' : ''}`}
          onClick={handleWishlistClick}
          aria-label="Add to wishlist"
          type="button"
        >
          <Heart size={18} fill={wishlisted ? '#E63946' : 'none'} color={wishlisted ? '#E63946' : '#111111'} />
        </button>

        {/* Quick Add To Cart & Quick View Overlays */}
        <div className="product-quick-add" style={{ display: 'flex', gap: '0.4rem' }}>
          <button 
            type="button" 
            onClick={handleAddToCartClick} 
            className="btn-quick-add flex-center gap-1"
            style={{ flex: 1, backgroundColor: '#C6A15B', color: '#0A0A0A', fontWeight: 800 }}
          >
            <ShoppingBag size={14} />
            <span>ADD TO CART</span>
          </button>
          
          <button 
            type="button" 
            onClick={handleQuickViewClick} 
            className="btn-quick-add flex-center gap-1"
            style={{ flex: 1, backgroundColor: '#1A1A1A', color: '#FFFFFF' }}
          >
            <Eye size={14} />
            <span>QUICK VIEW</span>
          </button>
        </div>
      </div>


      {/* Product Info - Fixed Layout & Alignment */}
      <div className="product-card-info">
        <Link to={`/product/${id}`}>
          <h3 className="product-title" title={name}>{name}</h3>
        </Link>

        <span className="product-category">{category}</span>

        {/* Rating Stars row */}
        <div className="product-rating-row">
          <div style={{ display: 'flex', color: '#C6A15B', gap: '2px' }}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={12} fill={i < Math.floor(rating || 5) ? '#C6A15B' : 'none'} />
            ))}
          </div>
          <span className="product-rating-count">({reviews || 24})</span>
        </div>
        
        {/* Pricing Row */}
        <div className="product-price-row">
          <span className="product-price">${price}</span>
          {oldPrice && <span className="product-old-price">${oldPrice}</span>}
          {discount && !isNew && <span className="product-discount">{discount}</span>}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
