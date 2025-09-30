// src/context/WishlistContext.tsx
import { createContext, useContext, useState, type ReactNode } from "react";
import type { Product } from "../data/products";

interface WishlistContextType {
  wishlist: Product[];
  addToWishlist: (product: Product) => boolean; // true if newly added
  removeFromWishlist: (id: number) => boolean; // true if removed
  isInWishlist: (id: number) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<Product[]>([]);

  const addToWishlist = (product: Product): boolean => {
    let added = false;
    setWishlist((prev) => {
      if (prev.some((i) => i.id === product.id)) return prev;
      added = true;
      return [...prev, product];
    });
    return added;
  };

  const removeFromWishlist = (id: number): boolean => {
    let removed = false;
    setWishlist((prev) => {
      if (prev.some((i) => i.id === id)) removed = true;
      return prev.filter((i) => i.id !== id);
    });
    return removed;
  };

  const isInWishlist = (id: number) => wishlist.some((i) => i.id === id);

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used inside WishlistProvider");
  return ctx;
}
