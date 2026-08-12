import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnnouncementBar from '../components/layout/AnnouncementBar';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Breadcrumbs from '../components/common/Breadcrumbs';
import { Package, Search, Truck, CheckCircle2, Clock, MapPin, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import '../styles/shop.css';

const SAMPLE_ORDERS = {
  'NIK-2026-8941': {
    orderId: 'NIK-2026-8941',
    customerName: 'Alexander Vance',
    email: 'a.vance@example.com',
    orderDate: 'August 10, 2026',
    estimatedDelivery: 'August 14, 2026',
    carrier: 'FedEx Air Priority Express',
    trackingNumber: 'FX-8849-2910-US',
    statusStep: 3, // Dispatched
    statusText: 'In Transit - On Schedule',
    deliveryAddress: '742 Evergreen Terrace, Suite 400, New York, NY 10001',
    items: [
      { id: 'prod-001', name: 'Apex Stealth Runner Sneakers', size: '42', color: 'Onyx Black', price: 185, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80', qty: 1 },
      { id: 'prod-045', name: 'Chronos Matte Steel Mesh Watch', size: 'One Size', color: 'Matte Black / Gold', price: 340, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80', qty: 1 }
    ],
    timeline: [
      { title: 'Order Placed', time: 'Aug 10, 09:30 AM', completed: true, desc: 'Order confirmed and registered in system.' },
      { title: 'Payment Verified', time: 'Aug 10, 09:32 AM', completed: true, desc: 'Payment authorized via Encrypted Stripe.' },
      { title: 'Processing & Quality Check', time: 'Aug 11, 02:15 PM', completed: true, desc: 'Garments inspected and packaged in luxury box.' },
      { title: 'Dispatched via Air Express', time: 'Aug 12, 06:40 AM', completed: true, desc: 'Departed sorting facility. En route to hub.' },
      { title: 'Out for Delivery', time: 'Expected Aug 14', completed: false, desc: 'Courier will deliver to specified address.' },
      { title: 'Delivered', time: 'Expected Aug 14', completed: false, desc: 'Recipient signature required.' }
    ]
  },
  'NIK-2026-7203': {
    orderId: 'NIK-2026-7203',
    customerName: 'Marcus Sterling',
    email: 'm.sterling@example.com',
    orderDate: 'August 11, 2026',
    estimatedDelivery: 'August 15, 2026',
    carrier: 'DHL Global Express',
    trackingNumber: 'DHL-9920-1123',
    statusStep: 2, // Processing
    statusText: 'Fulfillment & Quality Inspection',
    deliveryAddress: '100 Ocean Drive, Penthouse 12, Miami, FL 33139',
    items: [
      { id: 'prod-039', name: 'Vanguard Tailored Bomber Jacket', size: 'L', color: 'Midnight Black', price: 290, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80', qty: 1 },
      { id: 'prod-033', name: 'Raw Selvedge Tapered Denim Jeans', size: 'L', color: 'Dark Indigo', price: 165, image: 'https://images.unsplash.com/photo-1542272604-780c36856d62?auto=format&fit=crop&w=800&q=80', qty: 1 }
    ],
    timeline: [
      { title: 'Order Placed', time: 'Aug 11, 11:15 AM', completed: true, desc: 'Order received.' },
      { title: 'Payment Verified', time: 'Aug 11, 11:16 AM', completed: true, desc: 'Payment approved.' },
      { title: 'Processing & Quality Check', time: 'Aug 12, 10:00 AM', completed: true, desc: 'Handcrafted packing in progress.' },
      { title: 'Dispatched via Air Express', time: 'Expected Aug 13', completed: false, desc: 'Awaiting courier pickup.' },
      { title: 'Out for Delivery', time: 'Expected Aug 15', completed: false, desc: 'Local delivery.' },
      { title: 'Delivered', time: 'Expected Aug 15', completed: false, desc: 'Final arrival.' }
    ]
  },
  'NIK-2026-5510': {
    orderId: 'NIK-2026-5510',
    customerName: 'Jonathan Hayes',
    email: 'j.hayes@example.com',
    orderDate: 'August 08, 2026',
    estimatedDelivery: 'August 11, 2026',
    carrier: 'UPS Worldwide Saver',
    trackingNumber: '1Z9999999999999999',
    statusStep: 5, // Delivered
    statusText: 'Delivered & Signed',
    deliveryAddress: '55 Wall Street, Apt 8B, New York, NY 10005',
    items: [
      { id: 'prod-046', name: 'Apex Skeleton Automatic Timepiece', size: 'One Size', color: 'Gunmetal Steel', price: 490, image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80', qty: 1 }
    ],
    timeline: [
      { title: 'Order Placed', time: 'Aug 08, 02:20 PM', completed: true, desc: 'Order placed.' },
      { title: 'Payment Verified', time: 'Aug 08, 02:21 PM', completed: true, desc: 'Payment verified.' },
      { title: 'Processing & Quality Check', time: 'Aug 09, 09:00 AM', completed: true, desc: 'Quality approved.' },
      { title: 'Dispatched via Air Express', time: 'Aug 09, 04:30 PM', completed: true, desc: 'Dispatched.' },
      { title: 'Out for Delivery', time: 'Aug 11, 08:15 AM', completed: true, desc: 'Out on courier vehicle.' },
      { title: 'Delivered', time: 'Aug 11, 01:45 PM', completed: true, desc: 'Delivered and signed by J. Hayes.' }
    ]
  }
};

const TrackOrder = () => {
  const [inputOrderId, setInputOrderId] = useState('NIK-2026-8941');
  const [activeOrder, setActiveOrder] = useState(SAMPLE_ORDERS['NIK-2026-8941']);
  const [searchError, setSearchError] = useState('');

  const handleSearch = (e) => {
    e?.preventDefault();
    const query = inputOrderId.trim().toUpperCase();
    if (!query) {
      setSearchError('Please enter your Order ID.');
      return;
    }

    if (SAMPLE_ORDERS[query]) {
      setActiveOrder(SAMPLE_ORDERS[query]);
      setSearchError('');
    } else {
      // Dynamic fallback for any custom order ID user types
      setActiveOrder({
        orderId: query,
        customerName: 'Valued Client',
        email: 'client@nikhilfashions.com',
        orderDate: 'August 12, 2026',
        estimatedDelivery: 'August 16, 2026',
        carrier: 'FedEx Express Courier',
        trackingNumber: `FX-${Math.floor(1000 + Math.random() * 9000)}-2026`,
        statusStep: 2,
        statusText: 'Processing & Custom Inspection',
        deliveryAddress: 'Client Primary Shipping Address',
        items: [
          { id: 'prod-001', name: 'Apex Stealth Runner Sneakers', size: '42', color: 'Onyx Black', price: 185, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80', qty: 1 }
        ],

        timeline: [
          { title: 'Order Placed', time: 'Aug 12, 10:00 AM', completed: true, desc: 'Order registered.' },
          { title: 'Payment Verified', time: 'Aug 12, 10:01 AM', completed: true, desc: 'Payment verified.' },
          { title: 'Processing & Quality Check', time: 'Aug 12, 02:00 PM', completed: true, desc: 'Preparing luxury packaging.' },
          { title: 'Dispatched via Air Express', time: 'Expected Aug 13', completed: false, desc: 'Scheduled for flight dispatch.' },
          { title: 'Out for Delivery', time: 'Expected Aug 16', completed: false, desc: 'Local courier delivery.' },
          { title: 'Delivered', time: 'Expected Aug 16', completed: false, desc: 'Hand delivery.' }
        ]
      });
      setSearchError('');
    }
  };

  return (
    <div className="page-wrapper" style={{ overflowX: 'hidden', width: '100%' }}>
      <AnnouncementBar />
      <Navbar />

      <main className="shop-main-content">
        <div className="shop-container" style={{ maxWidth: '1100px', margin: '0 auto', paddingBottom: '5rem' }}>
          
          <Breadcrumbs items={[{ label: 'TRACK ORDER', path: '/track-order' }]} />

          {/* PAGE HEADER */}
          <div style={{ textAlign: 'center', margin: '2rem 0 3.5rem 0' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#C6A15B', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              <Package size={16} />
              <span>REAL-TIME COURIER DISPATCH TRACKER</span>
            </div>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, textTransform: 'uppercase', color: '#0A0A0A', letterSpacing: '-0.02em', margin: 0 }}>
              TRACK YOUR SHIPMENT
            </h1>
            <p style={{ color: '#666', fontSize: '1rem', maxWidth: '540px', margin: '0.75rem auto 0 auto' }}>
              Enter your unique order tracking number to monitor real-time shipping status and delivery updates.
            </p>
          </div>

          {/* SEARCH BOX & DEMO BUTTONS */}
          <div style={{ backgroundColor: '#090909', borderRadius: '6px', padding: '2.5rem', color: '#FFF', marginBottom: '3rem', boxShadow: '0 15px 35px rgba(0,0,0,0.15)', border: '1px solid rgba(198,161,91,0.2)' }}>
            <form onSubmit={handleSearch} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              <div style={{ flex: 1, minWidth: '260px', position: 'relative' }}>
                <input 
                  type="text" 
                  value={inputOrderId}
                  onChange={(e) => setInputOrderId(e.target.value)}
                  placeholder="Enter Order ID (e.g. NIK-2026-8941)"
                  style={{
                    width: '100%',
                    padding: '1.1rem 1.25rem 1.1rem 3rem',
                    backgroundColor: '#161616',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '3px',
                    color: '#FFF',
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                    outline: 'none'
                  }}
                />
                <Search size={20} color="#C6A15B" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
              </div>

              <button 
                type="submit"
                style={{
                  backgroundColor: '#C6A15B',
                  color: '#0A0A0A',
                  padding: '1.1rem 2.5rem',
                  fontWeight: 900,
                  fontSize: '0.85rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  border: 'none',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  transition: 'opacity 0.2s'
                }}
              >
                <span>TRACK SHIPMENT</span>
                <ArrowRight size={18} />
              </button>
            </form>

            {searchError && (
              <p style={{ color: '#E63946', fontSize: '0.85rem', fontWeight: 700, marginTop: '-0.5rem', marginBottom: '1rem' }}>{searchError}</p>
            )}

            {/* Quick Demo Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', fontSize: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.25rem' }}>
              <span style={{ color: '#888', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>TRY SAMPLE ORDERS:</span>
              {Object.keys(SAMPLE_ORDERS).map(id => (
                <button
                  key={id}
                  type="button"
                  onClick={() => { setInputOrderId(id); setActiveOrder(SAMPLE_ORDERS[id]); setSearchError(''); }}
                  style={{
                    backgroundColor: activeOrder?.orderId === id ? '#C6A15B' : 'rgba(255,255,255,0.08)',
                    color: activeOrder?.orderId === id ? '#0A0A0A' : '#CCC',
                    border: 'none',
                    padding: '0.4rem 0.85rem',
                    borderRadius: '2px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    fontSize: '0.75rem',
                    letterSpacing: '0.05em'
                  }}
                >
                  {id}
                </button>
              ))}
            </div>
          </div>

          {/* ACTIVE ORDER DISPLAY PANEL */}
          {activeOrder && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2.5rem' }}
            >
              {/* STATUS SUMMARY CARD */}
              <div style={{ backgroundColor: '#F8F9FA', border: '1px solid #E5E5E5', borderRadius: '6px', padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid #E5E5E5', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#C6A15B', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block' }}>ORDER NUMBER</span>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#0A0A0A', margin: 0 }}>{activeOrder.orderId}</h2>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#666', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block' }}>CURRENT STATUS</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#0A0A0A', color: '#C6A15B', padding: '0.4rem 1rem', borderRadius: '2px', fontWeight: 900, fontSize: '0.85rem', letterSpacing: '0.05em', textTransform: 'uppercase', marginTop: '0.25rem' }}>
                      <Truck size={16} />
                      <span>{activeOrder.statusText}</span>
                    </span>
                  </div>
                </div>

                {/* Details Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', fontSize: '0.85rem' }}>
                  <div>
                    <strong style={{ display: 'block', color: '#888', textTransform: 'uppercase', fontSize: '0.7rem', letterSpacing: '0.1em' }}>ESTIMATED DELIVERY</strong>
                    <span style={{ color: '#0A0A0A', fontWeight: 900, fontSize: '1.05rem' }}>{activeOrder.estimatedDelivery}</span>
                  </div>
                  <div>
                    <strong style={{ display: 'block', color: '#888', textTransform: 'uppercase', fontSize: '0.7rem', letterSpacing: '0.1em' }}>CARRIER / SERVICE</strong>
                    <span style={{ color: '#0A0A0A', fontWeight: 800 }}>{activeOrder.carrier}</span>
                  </div>
                  <div>
                    <strong style={{ display: 'block', color: '#888', textTransform: 'uppercase', fontSize: '0.7rem', letterSpacing: '0.1em' }}>TRACKING NUMBER</strong>
                    <span style={{ color: '#0A0A0A', fontWeight: 800, fontFamily: 'monospace' }}>{activeOrder.trackingNumber}</span>
                  </div>
                  <div>
                    <strong style={{ display: 'block', color: '#888', textTransform: 'uppercase', fontSize: '0.7rem', letterSpacing: '0.1em' }}>SHIPPING DESTINATION</strong>
                    <span style={{ color: '#0A0A0A', fontWeight: 700 }}>{activeOrder.deliveryAddress}</span>
                  </div>
                </div>
              </div>

              {/* LIVE TRACKING TIMELINE */}
              <div style={{ backgroundColor: '#FFF', border: '1px solid #E5E5E5', borderRadius: '6px', padding: '2.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '2rem', color: '#0A0A0A', letterSpacing: '0.02em' }}>
                  SHIPMENT TIMELINE & MILESTONES
                </h3>

                <div style={{ position: 'relative', paddingLeft: '2.5rem' }}>
                  {/* Vertical connecting line */}
                  <div style={{ position: 'absolute', left: '15px', top: '15px', bottom: '30px', width: '3px', backgroundColor: '#E5E5E5' }} />

                  {activeOrder.timeline.map((step, idx) => {
                    return (
                      <div key={idx} style={{ position: 'relative', marginBottom: '2rem' }}>
                        {/* Bullet Icon */}
                        <div 
                          style={{
                            position: 'absolute',
                            left: '-2.5rem',
                            top: '2px',
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            backgroundColor: step.completed ? '#0A0A0A' : '#F5F5F3',
                            border: step.completed ? '2px solid #C6A15B' : '2px solid #D1D5DB',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: step.completed ? '#C6A15B' : '#9CA3AF',
                            zIndex: 2
                          }}
                        >
                          {step.completed ? <CheckCircle2 size={18} /> : <Clock size={16} />}
                        </div>

                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                            <h4 style={{ fontSize: '1rem', fontWeight: 900, color: step.completed ? '#0A0A0A' : '#888', margin: 0, textTransform: 'uppercase' }}>
                              {step.title}
                            </h4>
                            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#C6A15B', backgroundColor: '#0A0A0A', padding: '0.2rem 0.6rem', borderRadius: '2px' }}>
                              {step.time}
                            </span>
                          </div>
                          <p style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.4rem', margin: '0.4rem 0 0 0' }}>
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* ITEMS IN THIS SHIPMENT */}
              <div style={{ backgroundColor: '#FFF', border: '1px solid #E5E5E5', borderRadius: '6px', padding: '2.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '1.5rem', color: '#0A0A0A' }}>
                  ITEMS IN THIS SHIPMENT ({activeOrder.items.length})
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {activeOrder.items.map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', borderBottom: '1px solid #F0F0F0', paddingBottom: '1.25rem' }}>
                      <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px', backgroundColor: '#111' }} />
                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: '1rem', fontWeight: 900, textTransform: 'uppercase', margin: 0, color: '#0A0A0A' }}>{item.name}</h4>
                        <span style={{ fontSize: '0.8rem', color: '#666', display: 'block', marginTop: '0.25rem' }}>
                          SIZE: <strong>{item.size}</strong> | COLOR: <strong>{item.color}</strong> | QTY: <strong>{item.qty}</strong>
                        </span>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '1.15rem', fontWeight: 900, color: '#0A0A0A' }}>${item.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </motion.div>
          )}

          {/* HELP & SUPPORT BANNER */}
          <div style={{ marginTop: '4rem', padding: '2rem', backgroundColor: '#F5F5F3', borderRadius: '6px', border: '1px solid #E5E5E5', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <ShieldCheck size={32} color="#C6A15B" />
              <div>
                <strong style={{ display: 'block', fontSize: '0.95rem', fontWeight: 900, textTransform: 'uppercase', color: '#0A0A0A' }}>NEED ASSISTANCE WITH YOUR SHIPMENT?</strong>
                <span style={{ fontSize: '0.85rem', color: '#666' }}>Our priority customer care team is available 24/7 to resolve shipping or courier inquiries.</span>
              </div>
            </div>

            <a 
              href="/#contact"
              style={{
                backgroundColor: '#0A0A0A',
                color: '#FFF',
                padding: '0.85rem 1.75rem',
                borderRadius: '2px',
                fontWeight: 900,
                fontSize: '0.75rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                textDecoration: 'none'
              }}
            >
              CONTACT CLIENT SUPPORT
            </a>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TrackOrder;
