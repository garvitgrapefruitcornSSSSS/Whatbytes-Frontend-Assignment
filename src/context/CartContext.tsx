"use client";

import { createContext, useContext, useMemo, useSyncExternalStore } from "react";
import { getProductById } from "@/data/products";
import { cartStore } from "@/store/cartStore";
import type { Product } from "@/types/product";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  addItem: (productId: number, quantity?: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  removeItem: (productId: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const lines = useSyncExternalStore(
    cartStore.subscribe,
    cartStore.getSnapshot,
    cartStore.getServerSnapshot,
  );

  const value = useMemo<CartContextValue>(() => {
    // Drop lines whose product no longer exists in the catalogue.
    const items = lines.flatMap((line) => {
      const product = getProductById(line.productId);
      return product ? [{ product, quantity: line.quantity }] : [];
    });

    return {
      items,
      totalItems: items.reduce((sum, i) => sum + i.quantity, 0),
      subtotal: items.reduce((sum, i) => sum + i.quantity * i.product.price, 0),
      addItem: cartStore.add,
      updateQuantity: cartStore.setQuantity,
      removeItem: cartStore.remove,
      clearCart: cartStore.clear,
    };
  }, [lines]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
