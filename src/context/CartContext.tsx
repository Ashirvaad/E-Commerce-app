// src/context/CartContext.tsx
import { createContext, useContext, useState, type ReactNode } from "react";
import type { Product } from "../data/products";

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, qty?: number) => boolean; // true = new item added
  decreaseQuantity: (id: number, qty?: number) => boolean; // true = updated
  removeFromCart: (id: number) => boolean; // true = removed
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product, qty: number = 1): boolean => {
    let addedNew = false;
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + qty } : i
        );
      }
      addedNew = true;
      return [...prev, { ...product, quantity: qty }];
    });
    return addedNew;
  };

  const decreaseQuantity = (id: number, qty: number = 1): boolean => {
    let updated = false;
    setCart((prev) =>
      prev
        .map((i) =>
          i.id === id ? { ...i, quantity: Math.max(i.quantity - qty, 0) } : i
        )
        .filter((i) => {
          if (i.id === id) updated = true;
          return i.quantity > 0;
        })
    );
    return updated;
  };

  const removeFromCart = (id: number): boolean => {
    let removed = false;
    setCart((prev) => {
      if (prev.some((i) => i.id === id)) removed = true;
      return prev.filter((i) => i.id !== id);
    });
    return removed;
  };

  const clearCart = () => setCart([]);

  const getCartTotal = () => cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const getCartCount = () => cart.reduce((s, i) => s + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
