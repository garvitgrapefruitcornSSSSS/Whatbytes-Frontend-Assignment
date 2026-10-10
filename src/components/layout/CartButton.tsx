"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartButton() {
  const { totalItems } = useCart();

  return (
    <Link
      href="/cart"
      aria-label={totalItems > 0 ? `Cart, ${totalItems} items` : "Cart"}
      className="relative flex h-10 items-center gap-2 rounded-lg bg-brand-900 px-3 text-sm font-semibold transition hover:bg-navy sm:px-5"
    >
      <ShoppingCart className="size-[18px]" strokeWidth={2.2} />
      <span className="hidden sm:inline">Cart</span>
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-[11px] font-bold text-brand-700 shadow ring-2 ring-brand-700">
          {totalItems > 99 ? "99+" : totalItems}
        </span>
      )}
    </Link>
  );
}
