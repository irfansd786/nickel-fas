import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AnnouncementBar from '../components/layout/AnnouncementBar';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Breadcrumbs from '../components/common/Breadcrumbs';
import Button from '../components/common/Button';
import SectionTitle from '../components/common/SectionTitle';
import { useCart } from '../context/CartContext';
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus, ShieldCheck, Truck } from 'lucide-react';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);

  const shippingCost = cartTotal > 150 || cartTotal === 0 ? 0 : 15;
  const estimatedTotal = cartTotal + shippingCost;

  return (
    <div className="page-wrapper">
      <AnnouncementBar />
      <Navbar />

      <main className="section-padding">
        <div className="container">
          
          <Breadcrumbs items={[{ label: 'BAG', path: '/cart' }]} />

          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="eyebrow">YOUR SELECTION</span>
              <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, textTransform: 'uppercase' }}>
                SHOPPING BAG ({cartItems.length})
              </h1>
            </div>

            {cartItems.length > 0 && (
              <button
                onClick={clearCart}
                style={{ fontSize: '0.8rem', fontWeight: 700, color: '#999', display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}
              >
                <Trash2 size={14} />
                <span>CLEAR ALL ITEMS</span>
              </button>
            )}
          </div>

          {cartItems.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'start' }}>
              
              {/* Cart Items Column */}
              <div>
                <AnimatePresence>
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0, marginBottom: 0, paddingBottom: 0, overflow: 'hidden' }}
                      transition={{ duration: 0.3 }}
                      style={{
                        display: 'flex',
                        gap: '1.5rem',
                        paddingBottom: '2rem',
                        marginBottom: '2rem',
                        borderBottom: '1px solid #E5E5E5',
                        alignItems: 'center'
                      }}
                    >
                      {/* Product Image */}
                      <Link to={`/product/${item.product.id}`}>
                        <div style={{ width: '110px', height: '140px', backgroundColor: '#F5F5F3', borderRadius: '2px', overflow: 'hidden', flexShrink: 0 }}>
                          <img src={item.product.images[0]} alt={item.product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                      </Link>

                      {/* Info & Options */}
                      <div style={{ flex: 1 }}>
                        <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#777', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                          {item.product.category}
                        </span>
                        <Link to={`/product/${item.product.id}`}>
                          <h3 style={{ fontSize: '1.05rem', fontWeight: 900, textTransform: 'uppercase', margin: '0.25rem 0 0.5rem 0' }}>
                            {item.product.name}
                          </h3>
                        </Link>

                        <div style={{ fontSize: '0.8rem', color: '#555', display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                          <span>SIZE: <strong style={{ color: '#0A0A0A' }}>{item.selectedSize}</strong></span>
                          <span>COLOR: <strong style={{ color: '#0A0A0A' }}>{item.selectedColor}</strong></span>
                        </div>

                        {/* Quantity Controls */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <div style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid #E5E5E5', borderRadius: '2px' }}>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              style={{ padding: '0.4rem 0.6rem', cursor: 'pointer' }}
                              aria-label="Decrease quantity"
                            >
                              <Minus size={12} />
                            </button>
                            <span style={{ padding: '0.4rem 0.8rem', fontWeight: 800, fontSize: '0.85rem' }}>
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              style={{ padding: '0.4rem 0.6rem', cursor: 'pointer' }}
                              aria-label="Increase quantity"
                            >
                              <Plus size={12} />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.id)}
                            style={{ color: '#999', cursor: 'pointer', transition: 'color 0.2s' }}
                            aria-label="Remove item"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>

                      {/* Price Subtotal */}
                      <div style={{ textAlign: 'right', flexShrink: 0 }}>
                        <span style={{ fontSize: '1.15rem', fontWeight: 900, color: '#0A0A0A' }}>
                          ${item.product.price * item.quantity}
                        </span>
                        {item.quantity > 1 && (
                          <span style={{ display: 'block', fontSize: '0.75rem', color: '#777' }}>
                            ${item.product.price} each
                          </span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Order Summary Sidebar */}
              <div style={{ backgroundColor: '#F5F5F3', padding: '2.5rem', borderRadius: '4px', position: 'sticky', top: '100px' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '1.75rem', borderBottom: '1px solid #E5E5E5', paddingBottom: '1rem' }}>
                  ORDER SUMMARY
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.75rem', fontSize: '0.9rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#555' }}>Subtotal</span>
                    <span style={{ fontWeight: 800 }}>${cartTotal}</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#555' }}>Estimated Express Courier</span>
                    {shippingCost === 0 ? (
                      <span style={{ fontWeight: 800, color: '#C6A15B' }}>COMPLIMENTARY</span>
                    ) : (
                      <span style={{ fontWeight: 800 }}>${shippingCost}</span>
                    )}
                  </div>

                  {shippingCost > 0 && (
                    <p style={{ fontSize: '0.75rem', color: '#777' }}>
                      Add ${(150 - cartTotal)} more to qualify for complimentary express shipping.
                    </p>
                  )}
                </div>

                <div style={{ borderTop: '2px solid #0A0A0A', paddingTop: '1.25rem', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 900 }}>
                  <span>TOTAL ESTIMATE</span>
                  <span style={{ color: '#0A0A0A' }}>${estimatedTotal}</span>
                </div>

                <button
                  onClick={() => setCheckoutModalOpen(true)}
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '1.1rem', justifyContent: 'center' }}
                >
                  PROCEED TO CHECKOUT
                </button>

                <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.75rem', color: '#777' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ShieldCheck size={16} color="#C6A15B" />
                    <span>256-Bit Encrypted Secure Checkout</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Truck size={16} color="#C6A15B" />
                    <span>Dispatched in 24–48 Hours</span>
                  </div>
                </div>
              </div>

            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '5rem 2rem', backgroundColor: '#F5F5F3', borderRadius: '4px' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
                <ShoppingBag size={28} color="#C6A15B" />
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                YOUR BAG IS EMPTY
              </h2>
              <p style={{ color: '#777', maxWidth: '450px', margin: '0 auto 2rem auto', fontSize: '0.95rem' }}>
                Discover something worth wearing in our latest seasonal footwear and clothing drops.
              </p>
              <Button variant="primary" href="/shop">
                CONTINUE SHOPPING
              </Button>
            </div>
          )}

        </div>
      </main>

      {/* Checkout Demo Modal */}
      <AnimatePresence>
        {checkoutModalOpen && (
          <div 
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(10,10,10,0.8)',
              backdropFilter: 'blur(6px)',
              zIndex: 1400,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem'
            }}
            onClick={() => setCheckoutModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              style={{
                backgroundColor: '#FFFFFF',
                padding: '3rem',
                borderRadius: '4px',
                maxWidth: '500px',
                textAlign: 'center',
                color: '#0A0A0A'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#F5F5F3', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
                <ShieldCheck size={32} color="#C6A15B" />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '1rem' }}>
                DEMO STORE CHECKOUT
              </h3>
              <p style={{ color: '#555', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                This is a commercial frontend demo for <strong>URBAN EDGE</strong>. Payment gateways (Stripe / Apple Pay / PayPal) and order processing will be integrated in the backend phase.
              </p>
              <button
                onClick={() => setCheckoutModalOpen(false)}
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                GOT IT, BACK TO BAG
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Cart;
