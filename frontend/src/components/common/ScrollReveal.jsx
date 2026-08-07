import React from 'react';
import { motion } from 'framer-motion';

const ScrollReveal = ({
  children,
  variant = 'slide-up',
  delay = 0,
  duration = 0.6,
  className = ''
}) => {
  const getVariants = () => {
    switch (variant) {
      case 'slide-up':
        return {
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0 }
        };
      case 'slide-left':
        return {
          hidden: { opacity: 0, x: 40 },
          visible: { opacity: 1, x: 0 }
        };
      case 'slide-right':
        return {
          hidden: { opacity: 0, x: -40 },
          visible: { opacity: 1, x: 0 }
        };
      case 'fade':
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 }
        };
    }
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={getVariants()}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
