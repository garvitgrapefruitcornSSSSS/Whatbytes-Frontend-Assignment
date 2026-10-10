"use client";

import type { Product } from "@/types/product";

interface AddToCartButtonProps {
  product: Product;
  className?: string;
}

export default function AddToCartButton({ product, className = "" }: AddToCartButtonProps) {
  return (
    <button
      type="button"
      aria-label={`Add ${product.title} to cart`}
      className={`rounded-md bg-brand-600 font-medium text-white transition hover:bg-brand-700 active:scale-[0.98] ${className}`}
    >
      Add to Cart
    </button>
  );
}
