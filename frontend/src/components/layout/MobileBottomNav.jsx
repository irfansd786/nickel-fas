import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, ShoppingBag, Search, Heart, ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

const MobileBottomNav = ({ onOpenSearch }) => {
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  return (
    <div 
      className="mobile-bottom-nav"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: 'calc(var(--mobile-bottom-nav-height, 64px) + env(safe-area-inset-bottom, 0px))',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        backgroundColor: '#0A0A0A',
        borderTop: '1px solid rgba(255, 255, 255, 0.12)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        zIndex: 'var(--z-bottom-nav, 980)',
      }}
    >
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          height: '100%',
          alignItems: 'center',
          maxWidth: '500px',
          margin: '0 auto'
        }}
      >
        {/* HOME */}
        <NavLink
          to="/"
          end
          className={({ isActive }) => `mobile-bottom-tab ${isActive ? 'active' : ''}`}
          style={({ isActive }) => ({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: isActive ? '#C6A15B' : 'rgba(255, 255, 255, 0.6)',
            textDecoration: 'none',
            fontSize: '0.65rem',
            fontWeight: 800,
            letterSpacing: '0.05em',
            gap: '3px',
            position: 'relative'
          })}
        >
          <Home size={20} />
          <span>HOME</span>
        </NavLink>

        {/* SHOP */}
        <NavLink
          to="/shop"
          className={({ isActive }) => `mobile-bottom-tab ${isActive ? 'active' : ''}`}
          style={({ isActive }) => ({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: isActive ? '#C6A15B' : 'rgba(255, 255, 255, 0.6)',
            textDecoration: 'none',
            fontSize: '0.65rem',
            fontWeight: 800,
            letterSpacing: '0.05em',
            gap: '3px',
            position: 'relative'
          })}
        >
          <ShoppingBag size={20} />
          <span>SHOP</span>
        </NavLink>

        {/* SEARCH */}
        <button
          onClick={onOpenSearch}
          aria-label="Search catalogue"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '0.65rem',
            fontWeight: 800,
            letterSpacing: '0.05em',
            gap: '3px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0
          }}
        >
          <Search size={20} />
          <span>SEARCH</span>
        </button>

        {/* WISHLIST */}
        <NavLink
          to="/wishlist"
          className={({ isActive }) => `mobile-bottom-tab ${isActive ? 'active' : ''}`}
          style={({ isActive }) => ({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: isActive ? '#C6A15B' : 'rgba(255, 255, 255, 0.6)',
            textDecoration: 'none',
            fontSize: '0.65rem',
            fontWeight: 800,
            letterSpacing: '0.05em',
            gap: '3px',
            position: 'relative'
          })}
        >
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Heart size={20} />
            {wishlistCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-8px',
                  backgroundColor: '#C6A15B',
                  color: '#000',
                  fontSize: '0.6rem',
                  fontWeight: 900,
                  width: '15px',
                  height: '15px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {wishlistCount}
              </span>
            )}
          </div>
          <span>WISHLIST</span>
        </NavLink>

        {/* CART */}
        <NavLink
          to="/cart"
          className={({ isActive }) => `mobile-bottom-tab ${isActive ? 'active' : ''}`}
          style={({ isActive }) => ({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: isActive ? '#C6A15B' : 'rgba(255, 255, 255, 0.6)',
            textDecoration: 'none',
            fontSize: '0.65rem',
            fontWeight: 800,
            letterSpacing: '0.05em',
            gap: '3px',
            position: 'relative'
          })}
        >
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-8px',
                  backgroundColor: '#C6A15B',
                  color: '#000',
                  fontSize: '0.6rem',
                  fontWeight: 900,
                  width: '15px',
                  height: '15px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {cartCount}
              </span>
            )}
          </div>
          <span>BAG</span>
        </NavLink>
      </div>
    </div>
  );
};

export default MobileBottomNav;
