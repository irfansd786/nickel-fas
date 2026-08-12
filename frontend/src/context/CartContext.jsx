import React, { createContext, useContext, useState, useMemo } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [notification, setNotification] = useState(null);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const addToCart = (product, quantity = 1, selectedSize = null, selectedColor = null, selectedImage = null) => {
    if (!product) return;
    
    // Check size requirement if product has sizes
    const sizeToUse = selectedSize || (product.sizes && product.sizes.length > 0 ? product.sizes[0] : 'Standard');
    const colorToUse = selectedColor || (product.colors && product.colors.length > 0 ? product.colors[0] : 'Standard');
    const imageToUse = selectedImage || (product.images && product.images.length > 0 ? product.images[0] : '');

    setCartItems(prevItems => {
      const existingIndex = prevItems.findIndex(
        item => item.product.id === product.id && 
                item.selectedSize === sizeToUse && 
                item.selectedColor === colorToUse &&
                item.selectedImage === imageToUse
      );

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prevItems, {
          id: `${product.id}-${sizeToUse}-${colorToUse}-${encodeURIComponent(imageToUse)}`,
          product,
          quantity,
          selectedSize: sizeToUse,
          selectedColor: colorToUse,
          selectedImage: imageToUse
        }];
      }
    });

    showNotification(`ADDED "${product.name.toUpperCase()}" TO CART`);
  };

  const removeFromCart = (itemId) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCartItems(prev => prev.map(item => {
      if (item.id === itemId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  }, [cartItems]);

  const cartCount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartTotal,
      cartCount,
      notification
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
