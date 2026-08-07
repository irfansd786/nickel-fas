import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import CategoryCard from '../common/CategoryCard';
import { categories } from '../../data/categories';

const CategorySection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section 
      className="category-section" 
      style={{ backgroundColor: '#FFFFFF', padding: '4.5rem 0', borderBottom: '1px solid #E5E5E5' }}
    >
      <div className="container">
        
        {/* Section Header: Left Title, Right View All */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '2.5rem'
          }}
        >
          <h2 
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              fontWeight: 900,
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              color: '#111111',
              margin: 0
            }}
          >
            SHOP BY CATEGORY
          </h2>

          <Link 
            to="/shop" 
            className="view-all-category-link"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '15px',
              fontWeight: 700,
              color: '#111111',
              textDecoration: 'none',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
          >
            <span>View All</span>
            <ArrowRight size={18} className="view-all-arrow" style={{ transition: 'transform 0.25s ease' }} />
          </Link>
        </div>

        {/* 9 Categories Row / Mobile Horizontal Scroll */}
        <motion.div
          className="categories-scroll-wrapper"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
            overflowX: 'auto',
            paddingBottom: '0.75rem',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {categories.map((category) => (
            <motion.div key={category.id} variants={itemVariants}>
              <CategoryCard category={category} />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default CategorySection;
