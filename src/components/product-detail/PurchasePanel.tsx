"use client";

import { useState } from "react";
import AddToCartButton from "@/components/products/AddToCartButton";
import type { Product } from "@/types/product";
import QuantitySelector from "./QuantitySelector";

export default function PurchasePanel({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-slate-700">Quantity</span>
        <QuantitySelector value={quantity} onChange={setQuantity} />
      </div>
      <AddToCartButton
        product={product}
        quantity={quantity}
        className="h-12 w-full text-base sm:w-64"
      />
    </div>
  );
}
