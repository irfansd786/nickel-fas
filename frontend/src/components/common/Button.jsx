import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Button = ({
  children,
  variant = 'primary',
  href,
  onClick,
  icon = true,
  className = '',
  type = 'button',
  ...props
}) => {
  const baseClass = `btn btn-${variant} ${className}`;

  const content = (
    <>
      <span>{children}</span>
      {icon && <ArrowRight className="btn-icon-arrow" size={16} />}
    </>
  );

  if (href) {
    if (href.startsWith('http')) {
      return (
        <a 
          href={href} 
          className={baseClass} 
          target="_blank" 
          rel="noopener noreferrer"
          {...props}
        >
          {content}
        </a>
      );
    }
    return (
      <Link to={href} className={baseClass} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} className={baseClass} onClick={onClick} {...props}>
      {content}
    </button>
  );
};

export default Button;
