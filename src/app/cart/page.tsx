import type { Metadata } from "next";
import CartView from "@/components/cart/CartView";

export const metadata: Metadata = {
  title: "Your Cart | Whatbytes Store",
};

export default function CartPage() {
  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-8 sm:py-7">
      <h1 className="mb-4 text-[28px] font-bold text-brand-900">Shopping Cart</h1>
      <CartView />
    </main>
  );
}
