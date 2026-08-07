import React from 'react';
import { Link } from 'react-router-dom';
import AnnouncementBar from '../components/layout/AnnouncementBar';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/common/Button';
import { Compass, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="page-wrapper">
      <AnnouncementBar />
      <Navbar />

      <main className="section-padding" style={{ minHeight: '65vh', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#F5F5F3', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
            <Compass size={40} color="#C6A15B" />
          </div>

          <span className="eyebrow" style={{ textAlign: 'center' }}>ERROR 404</span>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, textTransform: 'uppercase', marginBottom: '1rem' }}>
            PAGE NOT FOUND.
          </h1>

          <p style={{ color: '#777', maxWidth: '500px', margin: '0 auto 2.5rem auto', fontSize: '1rem', lineHeight: 1.6 }}>
            The destination you are looking for doesn't exist, has been removed, or is temporarily unavailable.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button variant="primary" href="/" icon={false} className="gap-2">
              <ArrowLeft size={16} />
              <span>RETURN TO HOME</span>
            </Button>
            <Button variant="outline" href="/shop">
              BROWSE CATALOGUE
            </Button>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
