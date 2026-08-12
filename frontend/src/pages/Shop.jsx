import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnnouncementBar from '../components/layout/AnnouncementBar';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ProductCard from '../components/common/ProductCard';
import QuickViewModal from '../components/common/QuickViewModal';
import ScrollReveal from '../components/common/ScrollReveal';
import { products } from '../data/products';
import { SlidersHorizontal, RotateCcw, ChevronDown, X, Check } from 'lucide-react';
import '../styles/shop.css';

const CATEGORY_CHIPS = [
  { id: 'all', name: 'ALL' },
  { id: 'sneakers', name: 'SNEAKERS' },
  { id: 'shoes', name: 'SHOES' },
  { id: 'sandals', name: 'SANDALS' },
  { id: 'chappels', name: 'CHAPPELS' },
  { id: 'crocs', name: 'CROCS' },
  { id: 't-shirts', name: 'T-SHIRTS' },
  { id: 'shirts', name: 'SHIRTS' },
  { id: 'jeans', name: 'JEANS' },
  { id: 'jackets', name: 'JACKETS' },
  { id: 'watches', name: 'WATCHES' },
  { id: 'accessories', name: 'ACCESSORIES' }
];



const Shop = () => {
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [displayCount, setDisplayCount] = useState(12);

  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: 'all',
    sizes: [],
    colors: [],
    minRating: 0
  });

  const isFilterActive = useMemo(() => {
    return (
      filters.category !== 'all' ||
      filters.priceRange !== 'all' ||
      filters.sizes.length > 0 ||
      filters.colors.length > 0 ||
      filters.minRating > 0
    );
  }, [filters]);

  const resetFilters = () => {
    setFilters({
      category: 'all',
      priceRange: 'all',
      sizes: [],
      colors: [],
      minRating: 0
    });
  };

  const toggleSizeFilter = (size) => {
    setFilters(prev => {
      const exists = prev.sizes.includes(size);
      return {
        ...prev,
        sizes: exists ? prev.sizes.filter(s => s !== size) : [...prev.sizes, size]
      };
    });
  };

  const toggleColorFilter = (color) => {
    setFilters(prev => {
      const exists = prev.colors.includes(color);
      return {
        ...prev,
        colors: exists ? prev.colors.filter(c => c !== color) : [...prev.colors, color]
      };
    });
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (filters.category !== 'all') {
      const targetCat = filters.category.toLowerCase().replace('-', ' ');
      result = result.filter(p => {
        const cat = p.category.toLowerCase();
        const subcat = (p.subcategory || '').toLowerCase();
        return cat === targetCat || subcat === targetCat || subcat.replace(' ', '-') === filters.category.toLowerCase();
      });
    }

    // Price range filter
    if (filters.priceRange !== 'all') {
      if (filters.priceRange === 'under-100') result = result.filter(p => p.price < 100);
      else if (filters.priceRange === '100-200') result = result.filter(p => p.price >= 100 && p.price <= 200);
      else if (filters.priceRange === '200-300') result = result.filter(p => p.price > 200 && p.price <= 300);
      else if (filters.priceRange === '300-plus') result = result.filter(p => p.price > 300);
    }

    // Sizes filter
    if (filters.sizes.length > 0) {
      result = result.filter(p => p.sizes && p.sizes.some(s => filters.sizes.includes(s)));
    }

    // Colors filter
    if (filters.colors.length > 0) {
      result = result.filter(p => p.colors && p.colors.some(c => filters.colors.includes(c)));
    }

    // Minimum rating filter
    if (filters.minRating > 0) {
      result = result.filter(p => (p.rating || 5) >= filters.minRating);
    }

    // Sorting
    if (sortBy === 'newest') {
      result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    } else if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return result;
  }, [filters, sortBy]);

  const visibleProducts = useMemo(() => {
    return filteredProducts.slice(0, displayCount);
  }, [filteredProducts, displayCount]);

  const handleLoadMore = () => {
    setDisplayCount(prev => prev + 12);
  };

  return (
    <div className="page-wrapper" style={{ overflowX: 'hidden', width: '100%' }}>
      <AnnouncementBar />
      <Navbar />

      <main className="shop-main-content">
        <div className="shop-container">
          
          {/* ALL PRODUCTS HEADER */}
          <div className="all-products-header">
            <div>
              <h1 className="all-products-title">ALL PRODUCTS</h1>
              <p className="all-products-subtext">Curated men's essentials for everyday style.</p>
            </div>
            
            {/* Filter & Sort Toolbar */}
            <div className="filter-sort-toolbar">
              <button 
                type="button" 
                className={`filter-toggle-btn ${isFilterOpen ? 'active' : ''}`}
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                aria-expanded={isFilterOpen}
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
                  <option value="featured">Featured</option>
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
            {CATEGORY_CHIPS.map((chip) => {
              const isActive = filters.category === chip.id;
              return (
                <button
                  key={chip.id}
                  type="button"
                  className={`category-chip-btn ${isActive ? 'active' : ''}`}
                  onClick={() => setFilters(prev => ({ ...prev, category: chip.id }))}
                >
                  {chip.name}
                </button>
              );
            })}
          </div>

          {/* TOGGLEABLE EXPANDABLE FILTER PANEL */}
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div 
                className="expandable-filter-panel"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="filter-panel-inner">
                  
                  {/* Category Selection */}
                  <div className="filter-block">
                    <span className="filter-block-title">CATEGORY</span>
                    <div className="filter-options-column">
                      {CATEGORY_CHIPS.map(c => (
                        <label key={c.id} className="filter-checkbox-label">
                          <input 
                            type="radio" 
                            name="category" 
                            checked={filters.category === c.id}
                            onChange={() => setFilters(prev => ({ ...prev, category: c.id }))}
                          />
                          <span>{c.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div className="filter-block">
                    <span className="filter-block-title">PRICE RANGE</span>
                    <div className="filter-options-column">
                      {[
                        { id: 'all', label: 'All Prices' },
                        { id: 'under-100', label: 'Under $100' },
                        { id: '100-200', label: '$100 – $200' },
                        { id: '200-300', label: '$200 – $300' },
                        { id: '300-plus', label: '$300+' }
                      ].map(p => (
                        <label key={p.id} className="filter-checkbox-label">
                          <input 
                            type="radio" 
                            name="price" 
                            checked={filters.priceRange === p.id}
                            onChange={() => setFilters(prev => ({ ...prev, priceRange: p.id }))}
                          />
                          <span>{p.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Sizes */}
                  <div className="filter-block">
                    <span className="filter-block-title">SIZES</span>
                    <div className="filter-size-grid">
                      {['S', 'M', 'L', 'XL', '8', '9', '10', '11'].map(sz => {
                        const isSelected = filters.sizes.includes(sz);
                        return (
                          <button
                            key={sz}
                            type="button"
                            className={`filter-size-box ${isSelected ? 'active' : ''}`}
                            onClick={() => toggleSizeFilter(sz)}
                          >
                            {sz}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Colors */}
                  <div className="filter-block">
                    <span className="filter-block-title">COLOR</span>
                    <div className="filter-options-column">
                      {['Black', 'White', 'Brown', 'Blue', 'Beige'].map(cl => {
                        const isSelected = filters.colors.includes(cl);
                        return (
                          <label key={cl} className="filter-checkbox-label">
                            <input 
                              type="checkbox" 
                              checked={isSelected}
                              onChange={() => toggleColorFilter(cl)}
                            />
                            <span>{cl}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="filter-block">
                    <span className="filter-block-title">RATING</span>
                    <div className="filter-options-column">
                      {[
                        { val: 0, label: 'All Ratings' },
                        { val: 4.5, label: '★ 4.5 & Above' },
                        { val: 4.0, label: '★ 4.0 & Above' }
                      ].map(r => (
                        <label key={r.val} className="filter-checkbox-label">
                          <input 
                            type="radio" 
                            name="rating" 
                            checked={filters.minRating === r.val}
                            onChange={() => setFilters(prev => ({ ...prev, minRating: r.val }))}
                          />
                          <span>{r.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Filter Footer Actions */}
                <div className="filter-panel-footer">
                  {isFilterActive && (
                    <button 
                      type="button" 
                      onClick={resetFilters} 
                      className="clear-all-filters-btn"
                    >
                      <RotateCcw size={14} />
                      <span>CLEAR ALL</span>
                    </button>
                  )}
                  <button 
                    type="button" 
                    onClick={() => setIsFilterOpen(false)} 
                    className="apply-filters-btn"
                  >
                    <span>SHOW {filteredProducts.length} PRODUCTS</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* CONTROLLED PRODUCT VIEWPORT & GRID */}
          <div className="product-viewport-container">
            {filteredProducts.length > 0 ? (
              <div className="shop-product-grid">
                {visibleProducts.map((product) => (
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
                <h3>NO PRODUCTS FOUND</h3>
                <p>Try resetting your active category or filters to explore our full collection.</p>
                <button type="button" onClick={resetFilters} className="btn btn-primary gap-2">
                  <RotateCcw size={14} />
                  <span>CLEAR ALL FILTERS</span>
                </button>
              </div>
            )}

            {/* LOAD MORE CONTROL */}
            {filteredProducts.length > displayCount && (
              <div className="load-more-wrapper">
                <button 
                  type="button" 
                  onClick={handleLoadMore}
                  className="load-more-btn"
                >
                  <span>LOAD MORE</span>
                  <ChevronDown size={16} />
                </button>
              </div>
            )}
          </div>

        </div>
      </main>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />

      <Footer />
    </div>
  );
};

export default Shop;
