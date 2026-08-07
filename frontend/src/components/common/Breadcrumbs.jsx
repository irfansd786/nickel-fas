import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const Breadcrumbs = ({ items = [] }) => {
  return (
    <nav aria-label="Breadcrumb" style={{ marginBottom: '1.5rem' }}>
      <ol style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#777' }}>
        <li>
          <Link to="/" style={{ color: '#0A0A0A', transition: 'color 0.2s' }}>HOME</Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ChevronRight size={12} color="#AAAAAA" />
              {isLast ? (
                <span style={{ color: '#C6A15B', fontWeight: 800 }}>{item.label}</span>
              ) : (
                <Link to={item.path} style={{ color: '#0A0A0A', transition: 'color 0.2s' }}>
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
