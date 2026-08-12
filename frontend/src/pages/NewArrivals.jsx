import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnnouncementBar from '../components/layout/AnnouncementBar';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ProductCard from '../components/common/ProductCard';
import QuickViewModal from '../components/common/QuickViewModal';
import Breadcrumbs from '../components/common/Breadcrumbs';
import { products } from '../data/products';
import { Sparkles, SlidersHorizontal, RotateCcw, ChevronDown } from 'lucide-react';
import '../styles/shop.css';

const NewArrivals = () => {
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const [filters, setFilters] = useState({
    priceRange: 'all',
    sizes: [],
    colors: []
  });

  // Filter products to show ONLY NEW ARRIVALS (isNew: true)
  const newProductsList = useMemo(() => {
    return products.filter(p => p.isNew);
  }, []);


  // Filtered result
  const filteredProducts = useMemo(() => {
    let result = [...newProductsList];

    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    if (filters.priceRange !== 'all') {
      if (filters.priceRange === 'under-150') result = result.filter(p => p.price < 150);
      else if (filters.priceRange === '150-250') result = result.filter(p => p.price >= 150 && p.price <= 250);
      else if (filters.priceRange === '250-plus') result = result.filter(p => p.price > 250);
    }

    if (filters.sizes.length > 0) {
      result = result.filter(p => p.sizes && p.sizes.some(s => filters.sizes.includes(s)));
    }

    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return result;
  }, [newProductsList, selectedCategory, filters, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setFilters({ priceRange: 'all', sizes: [], colors: [] });
  };

  return (
    <div className="page-wrapper" style={{ overflowX: 'hidden', width: '100%' }}>
      <AnnouncementBar />
      <Navbar />

      <main className="shop-main-content">
        <div className="shop-container">
          
          {/* Breadcrumbs */}
          <Breadcrumbs items={[{ label: 'NEW ARRIVALS', path: '/new-arrivals' }]} />

          {/* NEW ARRIVALS HEADER */}
          <div className="all-products-header" style={{ marginTop: '1rem' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#C6A15B', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                <Sparkles size={14} />
                <span>SEASON 2026 CAPSULE</span>
              </div>
              <h1 className="all-products-title">NEW ARRIVALS</h1>
              <p className="all-products-subtext">Exclusive new drops, latest trends, and fresh seasonal releases.</p>
            </div>
            
            {/* Filter & Sort Toolbar */}
            <div className="filter-sort-toolbar">
              <button 
                type="button" 
                className={`filter-toggle-btn ${isFilterOpen ? 'active' : ''}`}
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <SlidersHorizontal size={16} />
                <span>FILTERS</span>
                <ChevronDown size={14} style={{ transform: isFilterOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.25s ease' }} />
              </button>

              <div className="sort-dropdown-wrapper">
                <span className="sort-label">SORT BY</span>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-select-input"
                >
                  <option value="newest">Newest Drops</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
          </div>

          {/* CATEGORY CHIPS */}
          <div className="category-chips-scroll-container">
            {[
              { id: 'all', label: 'ALL NEW DROPS' },
              { id: 'footwear', label: 'FOOTWEAR' },
              { id: 'clothing', label: 'CLOTHING' },
              { id: 'accessories', label: 'ACCESSORIES' }
            ].map(cat => (
              <button
                key={cat.id}
                type="button"
                className={`category-chip-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* EXPANDABLE FILTER PANEL */}
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div 
                className="expandable-filter-panel"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="filter-panel-inner" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                  
                  {/* Category */}
                  <div className="filter-block">
                    <span className="filter-block-title">CATEGORY</span>
                    <div className="filter-options-column">
                      {['all', 'footwear', 'clothing', 'accessories'].map(c => (
                        <label key={c} className="filter-checkbox-label">
                          <input 
                            type="radio" 
                            name="new-cat" 
                            checked={selectedCategory === c}
                            onChange={() => setSelectedCategory(c)}
                          />
                          <span>{c.toUpperCase()}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="filter-block">
                    <span className="filter-block-title">PRICE RANGE</span>
                    <div className="filter-options-column">
                      {[
                        { id: 'all', label: 'All Prices' },
                        { id: 'under-150', label: 'Under ₹150' },
                        { id: '150-250', label: '₹150 – ₹250' },
                        { id: '250-plus', label: '₹250+' }
                      ].map(p => (
                        <label key={p.id} className="filter-checkbox-label">
                          <input 
                            type="radio" 
                            name="new-price" 
                            checked={filters.priceRange === p.id}
                            onChange={() => setFilters(prev => ({ ...prev, priceRange: p.id }))}
                          />
                          <span>{p.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="filter-block" style={{ justifyContent: 'flex-end' }}>
                    <button 
                      type="button" 
                      onClick={resetFilters}
                      className="clear-all-filters-btn"
                      style={{ marginBottom: '1rem' }}
                    >
                      <RotateCcw size={14} />
                      <span>RESET FILTERS</span>
                    </button>
                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* NEW ARRIVALS GRID */}
          <div className="product-viewport-container">
            {filteredProducts.length > 0 ? (
              <div className="shop-product-grid">
                {filteredProducts.map((product) => (
                  <motion.div 
                    key={product.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                  >
                    <ProductCard
                      product={product}
                      onQuickView={(p) => setQuickViewProduct(p)}
                    />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="no-products-fallback">
                <h3>NO NEW ARRIVALS FOUND</h3>
                <p>Try resetting filters to explore all current new releases.</p>
                <button type="button" onClick={resetFilters} className="btn btn-primary gap-2">
                  <RotateCcw size={14} />
                  <span>RESET FILTERS</span>
                </button>
              </div>
            )}
          </div>

        </div>
      </main>

      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />

      <Footer />
    </div>
  );
};

export default NewArrivals;
