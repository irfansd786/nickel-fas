import React, { useState } from 'react';
import { X, Sparkles, Truck, ShieldCheck } from 'lucide-react';
import '../../styles/announcement.css';

const AnnouncementBar = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="announcement-bar">
      <div className="announcement-container">
        <div className="announcement-content">
          <div className="announcement-item">
            <Sparkles size={12} className="text-gold" />
            <span>NEW SEASON 2026</span>
          </div>

          <div className="announcement-divider" />

          <div className="announcement-item">
            <span>PREMIUM MEN'S COLLECTION</span>
          </div>

          <div className="announcement-divider" />

          <div className="announcement-item">
            <Truck size={12} />
            <span>COMPLIMENTARY EXPRESS SHIPPING OVER ₹1,500</span>
          </div>
        </div>

        <button 
          className="announcement-close" 
          onClick={() => setVisible(false)}
          aria-label="Close announcement"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
};

export default AnnouncementBar;
