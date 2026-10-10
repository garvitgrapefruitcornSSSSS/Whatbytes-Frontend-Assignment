"use client";

import { Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/types/product";

interface AddToCartButtonProps {
  product: Product;
  quantity?: number;
  className?: string;
}

export default function AddToCartButton({
  product,
  quantity = 1,
  className = "",
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const handleClick = () => {
    addItem(product.id, quantity);
    setAdded(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), 1200);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={`Add ${product.title} to cart`}
      className={`inline-flex items-center justify-center gap-1.5 rounded-md bg-brand-600 font-medium text-white transition hover:bg-brand-700 active:scale-[0.98] ${className}`}
    >
      {added ? (
        <>
          <Check className="size-4" strokeWidth={2.5} />
          Added
        </>
      ) : (
        "Add to Cart"
      )}
      <span className="sr-only" aria-live="polite">
        {added ? `${product.title} added to cart` : ""}
      </span>
    </button>
  );
}
