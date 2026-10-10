"use client";

import { ArrowLeft, ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSyncExternalStore } from "react";
import QuantitySelector from "@/components/product-detail/QuantitySelector";
import { useCart } from "@/context/CartContext";
import { getCategoryLabel } from "@/data/products";
import { FREE_SHIPPING_THRESHOLD, formatPrice, getOrderSummary } from "@/lib/pricing";

const noopSubscribe = () => () => {};

/** False during SSR and hydration, true afterwards, so we don't flash an empty cart. */
function useHydrated() {
  return useSyncExternalStore(noopSubscribe, () => true, () => false);
}

const card = "rounded-lg bg-white shadow-[0_1px_6px_rgba(15,40,90,0.06)]";

export default function CartView() {
  const hydrated = useHydrated();
  const { items, totalItems, subtotal, updateQuantity, removeItem, clearCart } = useCart();
  const summary = getOrderSummary(subtotal);

  if (!hydrated) return <CartSkeleton />;

  if (items.length === 0) {
    return (
      <div className={`${card} flex flex-col items-center px-6 py-16 text-center`}>
        <ShoppingBag className="size-14 text-brand-500" strokeWidth={1.5} />
        <h2 className="mt-4 text-xl font-semibold text-navy">Your cart is empty</h2>
        <p className="mt-1 text-sm text-slate-600">
          Looks like you haven&apos;t added anything yet.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex h-10 items-center rounded-md bg-brand-600 px-5 text-sm font-medium text-white transition hover:bg-brand-700"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  const toFreeShipping = FREE_SHIPPING_THRESHOLD - subtotal;

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[1fr_340px]">
      <section className={card} aria-label="Cart items">
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 sm:px-6">
          <p className="text-sm text-slate-600">
            {totalItems} item{totalItems === 1 ? "" : "s"}
          </p>
          <button
            type="button"
            onClick={clearCart}
            className="text-sm font-medium text-slate-500 transition hover:text-red-600"
          >
            Clear cart
          </button>
        </div>

        <ul className="divide-y divide-slate-100">
          {items.map(({ product, quantity }) => (
            <li key={product.id} className="flex gap-4 px-4 py-4 sm:px-6">
              <Link
                href={`/product/${product.id}`}
                className="relative size-20 shrink-0 overflow-hidden rounded-md bg-slate-50 sm:size-24"
              >
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </Link>

              <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-center">
                <div className="min-w-0 flex-1">
                  <Link
                    href={`/product/${product.id}`}
                    className="font-medium text-navy hover:text-brand-600"
                  >
                    {product.title}
                  </Link>
                  <p className="text-xs text-slate-500">{getCategoryLabel(product.category)}</p>
                  <p className="mt-1 text-sm text-slate-700">{formatPrice(product.price)} each</p>
                </div>

                <div className="flex items-center justify-between gap-4 sm:justify-end">
                  <QuantitySelector
                    size="sm"
                    value={quantity}
                    onChange={(q) => updateQuantity(product.id, q)}
                  />
                  <p className="w-20 text-right font-semibold text-navy">
                    {formatPrice(product.price * quantity)}
                  </p>
                  <button
                    type="button"
                    onClick={() => removeItem(product.id)}
                    aria-label={`Remove ${product.title} from cart`}
                    className="flex size-8 items-center justify-center rounded-md text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <aside className={`${card} p-5 sm:p-6 lg:sticky lg:top-[86px]`} aria-label="Order summary">
        <h2 className="text-lg font-semibold text-navy">Price Summary</h2>
        <dl className="mt-4 space-y-3 text-sm">
          <SummaryRow label={`Subtotal (${totalItems} item${totalItems === 1 ? "" : "s"})`} value={formatPrice(summary.subtotal)} />
          <SummaryRow
            label="Shipping"
            value={summary.shipping === 0 ? "Free" : formatPrice(summary.shipping)}
          />
          <SummaryRow label="Estimated tax (8%)" value={formatPrice(summary.tax)} />
          <div className="flex justify-between border-t border-slate-100 pt-3 text-base font-semibold text-navy">
            <dt>Total</dt>
            <dd>{formatPrice(summary.total)}</dd>
          </div>
        </dl>

        {toFreeShipping > 0 && (
          <p className="mt-4 rounded-md bg-brand-50 px-3 py-2 text-xs text-brand-800">
            Add {formatPrice(toFreeShipping)} more for free shipping.
          </p>
        )}

        <button
          type="button"
          className="mt-5 h-12 w-full rounded-md bg-brand-600 font-medium text-white transition hover:bg-brand-700"
        >
          Proceed to Checkout
        </button>
        <Link
          href="/"
          className="mt-3 flex items-center justify-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-800"
        >
          <ArrowLeft className="size-4" />
          Continue shopping
        </Link>
      </aside>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-slate-700">
      <dt>{label}</dt>
      <dd className="font-medium text-navy">{value}</dd>
    </div>
  );
}

function CartSkeleton() {
  return (
    <div className="grid items-start gap-6 lg:grid-cols-[1fr_340px]">
      <div className={`${card} space-y-4 p-6`}>
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} className="flex gap-4">
            <div className="size-24 animate-pulse rounded-md bg-slate-100" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-1/2 animate-pulse rounded bg-slate-100" />
              <div className="h-3 w-1/4 animate-pulse rounded bg-slate-100" />
            </div>
          </div>
        ))}
      </div>
      <div className={`${card} h-72 animate-pulse`} />
    </div>
  );
}
