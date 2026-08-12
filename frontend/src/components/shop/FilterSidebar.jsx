import React from 'react';
import { X, RotateCcw } from 'lucide-react';

const FilterSidebar = ({
  filters,
  setFilters,
  resetFilters,
  categories = [],
  subcategories = [],
  availableSizes = ['S', 'M', 'L', 'XL', 'XXL', '40', '41', '42', '43', '44', '45'],
  availableColors = ['Black', 'White', 'Grey', 'Brown', 'Blue']
}) => {

  const handleCategoryChange = (cat) => {
    setFilters(prev => ({
      ...prev,
      category: prev.category === cat ? 'all' : cat,
      subcategory: 'all' // reset subcategory when category changes
    }));
  };

  const handleSubcategoryChange = (subcat) => {
    setFilters(prev => ({
      ...prev,
      subcategory: prev.subcategory === subcat ? 'all' : subcat
    }));
  };

  const handlePriceChange = (rangeKey) => {
    setFilters(prev => ({
      ...prev,
      priceRange: prev.priceRange === rangeKey ? 'all' : rangeKey
    }));
  };

  const handleSizeToggle = (size) => {
    setFilters(prev => {
      const exists = prev.sizes.includes(size);
      return {
        ...prev,
        sizes: exists ? prev.sizes.filter(s => s !== size) : [...prev.sizes, size]
      };
    });
  };

  const handleColorToggle = (color) => {
    setFilters(prev => {
      const exists = prev.colors.includes(color);
      return {
        ...prev,
        colors: exists ? prev.colors.filter(c => c !== color) : [...prev.colors, color]
      };
    });
  };

  const handleToggle = (key) => {
    setFilters(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <aside className="filter-sidebar" style={{ width: '260px', flexShrink: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid #E5E5E5' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em' }}>FILTERS</h3>
        <button
          onClick={resetFilters}
          style={{ fontSize: '0.75rem', fontWeight: 700, color: '#C6A15B', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}
        >
          <RotateCcw size={12} />
          <span>RESET ALL</span>
        </button>
      </div>

      {/* Category Filter */}
      <div className="filter-group" style={{ marginBottom: '2rem' }}>
        <h4 className="filter-group-title">DEPARTMENT</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {['all', 'footwear', 'clothing', 'accessories'].map(cat => (
            <label key={cat} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem', fontWeight: filters.category === cat ? 800 : 500, cursor: 'pointer', textTransform: 'uppercase' }}>
              <input
                type="radio"
                name="category"
                checked={filters.category === cat}
                onChange={() => handleCategoryChange(cat)}
                style={{ accentColor: '#0A0A0A' }}
              />
              <span>{cat === 'all' ? 'All Departments' : cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Subcategory Filter */}
      {subcategories.length > 0 && (
        <div className="filter-group" style={{ marginBottom: '2rem' }}>
          <h4 className="filter-group-title">CATEGORY</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '180px', overflowY: 'auto', paddingRight: '0.5rem' }}>
            {subcategories.map(sub => (
              <label key={sub} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.825rem', color: filters.subcategory === sub ? '#0A0A0A' : '#555', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={filters.subcategory === sub}
                  onChange={() => handleSubcategoryChange(sub)}
                  style={{ accentColor: '#0A0A0A' }}
                />
                <span>{sub}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Price Range Filter */}
      <div className="filter-group" style={{ marginBottom: '2rem' }}>
        <h4 className="filter-group-title">PRICE RANGE</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {[
            { label: 'All Prices', value: 'all' },
            { label: 'Under ₹100', value: 'under-100' },
            { label: '₹100 – ₹200', value: '100-200' },
            { label: '₹200 – ₹300', value: '200-300' },
            { label: '₹300+', value: '300-plus' }
          ].map(p => (
            <label key={p.value} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem', cursor: 'pointer' }}>
              <input
                type="radio"
                name="priceRange"
                checked={filters.priceRange === p.value}
                onChange={() => handlePriceChange(p.value)}
                style={{ accentColor: '#0A0A0A' }}
              />
              <span>{p.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Sizes Filter */}
      <div className="filter-group" style={{ marginBottom: '2rem' }}>
        <h4 className="filter-group-title">SIZES</h4>
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {availableSizes.map(size => {
            const isSelected = filters.sizes.includes(size);
            return (
              <button
                key={size}
                onClick={() => handleSizeToggle(size)}
                style={{
                  padding: '0.4rem 0.75rem',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  border: isSelected ? '2px solid #0A0A0A' : '1px solid #E5E5E5',
                  backgroundColor: isSelected ? '#0A0A0A' : '#FFFFFF',
                  color: isSelected ? '#FFFFFF' : '#0A0A0A',
                  borderRadius: '2px',
                  cursor: 'pointer'
                }}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* Color Filter */}
      <div className="filter-group" style={{ marginBottom: '2rem' }}>
        <h4 className="filter-group-title">COLOR</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {availableColors.map(color => {
            const isSelected = filters.colors.includes(color);
            return (
              <label key={color} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleColorToggle(color)}
                  style={{ accentColor: '#0A0A0A' }}
                />
                <span>{color}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Toggles */}
      <div className="filter-group" style={{ marginBottom: '2rem' }}>
        <h4 className="filter-group-title">AVAILABILITY & DROPS</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={filters.isNewOnly}
              onChange={() => handleToggle('isNewOnly')}
              style={{ accentColor: '#C6A15B' }}
            />
            <span>New Arrivals Only</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={filters.inStockOnly}
              onChange={() => handleToggle('inStockOnly')}
              style={{ accentColor: '#0A0A0A' }}
            />
            <span>In Stock Only</span>
          </label>
        </div>
      </div>

    </aside>
  );
};

export default FilterSidebar;
