import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, RotateCcw, Check } from 'lucide-react';
import FilterSidebar from './FilterSidebar';

const FilterDrawer = ({
  isOpen,
  onClose,
  filters,
  setFilters,
  resetFilters,
  subcategories,
  availableSizes,
  availableColors
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(10,10,10,0.6)',
          backdropFilter: 'blur(4px)',
          zIndex: 1250
        }}
        onClick={onClose}
      />
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        exit={{ x: '-100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '85%',
          maxWidth: '360px',
          height: '100vh',
          backgroundColor: '#FFFFFF',
          zIndex: 1300,
          padding: '2rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #E5E5E5' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 900, textTransform: 'uppercase' }}>FILTER PRODUCTS</h3>
          <button onClick={onClose} aria-label="Close filters" style={{ cursor: 'pointer' }}>
            <X size={22} color="#0A0A0A" />
          </button>
        </div>

        <div style={{ flex: 1 }}>
          <FilterSidebar
            filters={filters}
            setFilters={setFilters}
            resetFilters={resetFilters}
            subcategories={subcategories}
            availableSizes={availableSizes}
            availableColors={availableColors}
          />
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #E5E5E5' }}>
          <button
            onClick={resetFilters}
            className="btn btn-outline"
            style={{ flex: 1, padding: '0.85rem' }}
          >
            RESET
          </button>
          <button
            onClick={onClose}
            className="btn btn-primary"
            style={{ flex: 1, padding: '0.85rem' }}
          >
            APPLY
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FilterDrawer;
