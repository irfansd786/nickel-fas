import React from 'react';
import SectionTitle from '../common/SectionTitle';
import ProductCard from '../common/ProductCard';
import ScrollReveal from '../common/ScrollReveal';
import { products } from '../../data/products';

const TrendingSection = () => {
  const trendingProducts = products.filter(p => p.isFeatured).slice(0, 4);

  return (
    <section className="section-padding">
      <div className="container">
        <ScrollReveal variant="slide-up">
          <SectionTitle 
            eyebrow="MUST-HAVE PIECES"
            title="TRENDING NOW"
            description="Our most requested essentials, engineered for high versatility and everyday impact."
            actionText="EXPLORE ALL PRODUCTS"
            actionHref="/shop"
          />
        </ScrollReveal>

        <div className="trending-grid">
          {trendingProducts.map((product, index) => (
            <ScrollReveal key={product.id} variant="slide-up" delay={index * 0.1}>
              <ProductCard product={product} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingSection;
