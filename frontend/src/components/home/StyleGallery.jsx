import React from 'react';
import SectionTitle from '../common/SectionTitle';
import ScrollReveal from '../common/ScrollReveal';
import imgFootwear from '../../assets/images/category-footwear.jpg';
import imgClothing from '../../assets/images/category-clothing.jpg';
import imgAccessories from '../../assets/images/category-accessories.jpg';
import imgHero from '../../assets/images/hero-slide-1.jpg';

const StyleGallery = () => {
  const galleryItems = [
    { id: 1, title: 'URBAN RUNNER', img: imgFootwear },
    { id: 2, title: 'MINIMAL OUTERWEAR', img: imgClothing },
    { id: 3, title: 'LUXURY TIMEPIECES', img: imgAccessories },
    { id: 4, title: 'EDITORIAL LOOKBOOK', img: imgHero }
  ];

  return (
    <section className="section-padding">
      <div className="container">
        <ScrollReveal variant="slide-up">
          <SectionTitle 
            eyebrow="#NIKHILFASHIONS"
            title="STYLE GALLERY"
            description="Tag your street style on Instagram for a chance to be featured in our seasonal lookbook."
            center
          />
        </ScrollReveal>

        <div className="gallery-grid">
          {galleryItems.map((item, index) => (
            <ScrollReveal key={item.id} variant="fade" delay={index * 0.1}>
              <div className="gallery-item">
                <img src={item.img} alt={item.title} className="gallery-image" loading="lazy" />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(0,0,0,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontWeight: 800,
                  fontSize: '0.8rem',
                  letterSpacing: '0.15em',
                  opacity: 0,
                  transition: 'opacity 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}
                >
                  <span>{item.title}</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StyleGallery;
