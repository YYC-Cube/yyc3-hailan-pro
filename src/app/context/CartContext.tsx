import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/app/data/mockData";
import { toast } from "sonner";

export interface CartItem extends Product {
  quantity: number;
  selectedColor?: string;
  selectedPackaging?: 'standard' | 'stealth' | 'premium';
  addedAccessories?: string[];
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity: number, color: string, packaging: 'standard' | 'stealth' | 'premium', accessories: string[]) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("hailan_cart");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("hailan_cart", JSON.stringify(items));
  }, [items]);

  const addToCart = (product: Product, quantity: number, color: string, packaging: 'standard' | 'stealth' | 'premium', accessories: string[]) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id && item.selectedColor === color);
      if (existing) {
        toast.success(`Updated quantity for ${product.name}`);
        return prev.map((item) =>
          item.id === product.id && item.selectedColor === color
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      toast.success(`Added ${product.name} to cart`);
      return [...prev, { ...product, quantity, selectedColor: color, selectedPackaging: packaging, addedAccessories: accessories }];
    });
  };

  const removeFromCart = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== productId));
    toast.info("Item removed from cart");
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    setItems((prev) => prev.map((item) => (item.id === productId ? { ...item, quantity } : item)));
  };

  const clearCart = () => {
    setItems([]);
  };

  const cartTotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, itemCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
