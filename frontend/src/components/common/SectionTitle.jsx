import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const SectionTitle = ({
  eyebrow,
  title,
  description,
  actionText,
  actionHref,
  center = false,
  className = ''
}) => {
  return (
    <div className={`section-title-wrapper ${center ? 'center' : ''} ${className}`}>
      <div className="section-title-left">
        {eyebrow && <span className="section-eyebrow">{eyebrow}</span>}
        {title && <h2 className="section-main-heading">{title}</h2>}
        {description && <p className="section-description">{description}</p>}
      </div>

      {actionText && actionHref && (
        <Link to={actionHref} className="section-action-link">
          <span>{actionText}</span>
          <ArrowRight size={16} />
        </Link>
      )}
    </div>
  );
};

export default SectionTitle;
