import React, { createContext, useContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((cart) => {
      const existingItem = cart.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        // Update quantity if item exists
        return cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: item.quantity } // Update quantity
            : cartItem
        );
      }

      // Add new item if quantity > 0
      return item.quantity > 0 ? [...cart, item] : cart;
    });
  };

  const removeFromCart = (id) => {
    setCart((cart) => cart.filter((cartItem) => cartItem.id !== id));
  };

  const getQuantity = (id) => {
    const item = cart.find((cartItem) => cartItem.id === id);
    return item ? item.quantity : 0;
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, getQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
