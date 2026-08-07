import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Footprints, Shirt, Watch, ShoppingBag } from 'lucide-react';

const getFallbackIcon = (slug) => {
  switch (slug) {
    case 'sneakers':
    case 'shoes':
    case 'sandals':
    case 'chappels':
      return <Footprints size={48} color="#777777" />;
    case 't-shirts':
    case 'shirts':
    case 'jeans':
    case 'jackets':
      return <Shirt size={48} color="#777777" />;
    case 'accessories':
      return <Watch size={48} color="#777777" />;
    default:
      return <ShoppingBag size={48} color="#777777" />;
  }
};

const CategoryCard = ({ category }) => {
  const [imageError, setImageError] = useState(false);

  if (!category) return null;

  const { name, slug, image, alt } = category;

  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}
    >
      <Link 
        to={`/category/${slug}`}
        aria-label={`Shop ${name}`}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textDecoration: 'none',
          color: '#111111'
        }}
      >
        {/* Light-gray circular container */}
        <div 
          className="category-circle-container"
          style={{
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            backgroundColor: '#F3F3F3',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)',
            transition: 'background-color 0.2s, box-shadow 0.2s'
          }}
        >
          {!imageError && image ? (
            <img 
              src={image} 
              alt={alt || name} 
              onError={() => setImageError(true)}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                transition: 'transform 0.35s ease'
              }} 
            />
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {getFallbackIcon(slug)}
            </div>
          )}
        </div>

        {/* Category Label Underneath */}
        <span 
          style={{
            marginTop: '12px',
            fontSize: '16px',
            fontWeight: 600,
            color: '#111111',
            textAlign: 'center',
            letterSpacing: '0.01em',
            whiteSpace: 'nowrap'
          }}
        >
          {name}
        </span>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;
