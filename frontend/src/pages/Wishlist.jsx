import React from 'react';
import { Link } from 'react-router-dom';
import AnnouncementBar from '../components/layout/AnnouncementBar';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Breadcrumbs from '../components/common/Breadcrumbs';
import ProductCard from '../components/common/ProductCard';
import SectionTitle from '../components/common/SectionTitle';
import Button from '../components/common/Button';
import { useWishlist } from '../context/WishlistContext';
import { Heart, Trash2 } from 'lucide-react';

const Wishlist = () => {
  const { wishlistItems, clearWishlist } = useWishlist();

  return (
    <div className="page-wrapper">
      <AnnouncementBar />
      <Navbar />

      <main className="section-padding">
        <div className="container">
          
          <Breadcrumbs items={[{ label: 'WISHLIST', path: '/wishlist' }]} />

          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="eyebrow">SAVED ITEMS</span>
              <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, textTransform: 'uppercase' }}>
                MY WISHLIST ({wishlistItems.length})
              </h1>
            </div>

            {wishlistItems.length > 0 && (
              <button
                onClick={clearWishlist}
                style={{ fontSize: '0.8rem', fontWeight: 700, color: '#999', display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}
              >
                <Trash2 size={14} />
                <span>CLEAR WISHLIST</span>
              </button>
            )}
          </div>

          {wishlistItems.length > 0 ? (
            <div className="trending-grid">
              {wishlistItems.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '5rem 2rem', backgroundColor: '#F5F5F3', borderRadius: '4px' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
                <Heart size={28} color="#C6A15B" />
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                YOUR WISHLIST IS EMPTY
              </h2>
              <p style={{ color: '#777', maxWidth: '450px', margin: '0 auto 2rem auto', fontSize: '0.95rem' }}>
                Discover modern menswear, luxury footwear, and lifestyle accessories worth saving.
              </p>
              <Button variant="primary" href="/shop">
                EXPLORE COLLECTION
              </Button>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Wishlist;
