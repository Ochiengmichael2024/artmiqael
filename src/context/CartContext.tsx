import React, { createContext, useCallback, useEffect, useState, type ReactNode } from "react";
import type { CartItem, Coupon } from "@/types";
import { storageService } from "@/services/storage.service";
import { findArtwork } from "@/data/artworks.data";
import { useToast } from "@/hooks/useToast";

interface CartContextValue {
  cart: CartItem[];
  savedForLater: string[];
  wishlist: string[];
  recentSearches: string[];
  coupon: Coupon | null;
  couponError: string;
  addToCart: (id: string, qty?: number) => void;
  updateQty: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
  saveForLater: (id: string) => void;
  moveToCart: (id: string) => void;
  toggleWishlist: (id: string) => void;
  addRecentSearch: (term: string) => void;
  applyCoupon: (code: string) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextValue | null>(null);

const SHOPPING_KEY = "shopping";
const VALID_COUPONS: Record<string, number> = { ART10: 0.1 };

interface PersistedShopping {
  cart: CartItem[];
  wishlist: string[];
  savedForLater: string[];
  recentSearches: string[];
}

export function CartProvider({ children }: { children: ReactNode }) {
  const { pushToast } = useToast();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [savedForLater, setSavedForLater] = useState<string[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState("");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const persisted = storageService.get<PersistedShopping>(SHOPPING_KEY, {
      cart: [],
      wishlist: [],
      savedForLater: [],
      recentSearches: [],
    });
    setCart(persisted.cart);
    setWishlist(persisted.wishlist);
    setSavedForLater(persisted.savedForLater);
    setRecentSearches(persisted.recentSearches);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    storageService.set(SHOPPING_KEY, { cart, wishlist, savedForLater, recentSearches });
  }, [cart, wishlist, savedForLater, recentSearches, hydrated]);

  const addToCart = useCallback(
    (id: string, qty = 1) => {
      setCart((c) => {
        const existing = c.find((x) => x.id === id);
        if (existing) return c.map((x) => (x.id === id ? { ...x, qty: x.qty + qty } : x));
        return [...c, { id, qty }];
      });
      setSavedForLater((s) => s.filter((x) => x !== id));
      const artwork = findArtwork(id);
      pushToast(`${artwork ? artwork.title : "Item"} added to cart`);
    },
    [pushToast]
  );

  const updateQty = useCallback((id: string, qty: number) => {
    setCart((c) => c.map((x) => (x.id === id ? { ...x, qty } : x)));
  }, []);

  const removeFromCart = useCallback(
    (id: string) => {
      setCart((c) => c.filter((x) => x.id !== id));
      pushToast("Removed from cart");
    },
    [pushToast]
  );

  const saveForLater = useCallback((id: string) => {
    setSavedForLater((s) => Array.from(new Set([...s, id])));
    setCart((c) => c.filter((x) => x.id !== id));
  }, []);

  const moveToCart = useCallback(
    (id: string) => {
      setSavedForLater((s) => s.filter((x) => x !== id));
      addToCart(id, 1);
    },
    [addToCart]
  );

  const toggleWishlist = useCallback(
    (id: string) => {
      setWishlist((w) => {
        const has = w.includes(id);
        const artwork = findArtwork(id);
        pushToast(has ? "Removed from wishlist" : `${artwork ? artwork.title : "Item"} saved to wishlist`);
        return has ? w.filter((x) => x !== id) : [...w, id];
      });
    },
    [pushToast]
  );

  const addRecentSearch = useCallback((term: string) => {
    setRecentSearches((r) => [term, ...r.filter((x) => x.toLowerCase() !== term.toLowerCase())].slice(0, 5));
  }, []);

  const applyCoupon = useCallback((code: string) => {
    const normalized = code.trim().toUpperCase();
    const pct = VALID_COUPONS[normalized];
    if (pct) {
      setCoupon({ code: normalized, pct });
      setCouponError("");
    } else {
      setCoupon(null);
      setCouponError("Invalid or expired code");
    }
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
    setCoupon(null);
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        savedForLater,
        wishlist,
        recentSearches,
        coupon,
        couponError,
        addToCart,
        updateQty,
        removeFromCart,
        saveForLater,
        moveToCart,
        toggleWishlist,
        addRecentSearch,
        applyCoupon,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
