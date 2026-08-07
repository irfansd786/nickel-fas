import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import NewArrivals from './pages/NewArrivals';
import Category from './pages/Category';
import ProductDetails from './pages/ProductDetails';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

// Global Styles
import './styles/variables.css';
import './styles/global.css';
import './styles/components.css';
import './styles/announcement.css';
import './styles/navbar.css';
import './styles/home.css';
import './styles/shop.css';
import './styles/responsive.css';

function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/new-arrivals" element={<NewArrivals />} />
            <Route path="/category/:category" element={<Category />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;
