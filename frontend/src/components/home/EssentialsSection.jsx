import React from 'react';
import SectionTitle from '../common/SectionTitle';
import ProductCard from '../common/ProductCard';
import ScrollReveal from '../common/ScrollReveal';
import { products } from '../../data/products';

const EssentialsSection = () => {
  const essentials = products.filter(p => p.category === 'footwear' || p.category === 'clothing').slice(4, 8);

  return (
    <section className="section-padding" style={{ backgroundColor: '#F5F5F3' }}>
      <div className="container">
        <ScrollReveal variant="slide-up">
          <SectionTitle 
            eyebrow="CORE CAPSULE"
            title="MEN'S ESSENTIALS"
            description="Timeless silhouettes and daily foundation pieces designed for effortless pairing."
            actionText="VIEW ESSENTIALS"
            actionHref="/shop"
          />
        </ScrollReveal>

        <div className="trending-grid">
          {essentials.map((product, index) => (
            <ScrollReveal key={product.id} variant="slide-up" delay={index * 0.1}>
              <ProductCard product={product} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EssentialsSection;
