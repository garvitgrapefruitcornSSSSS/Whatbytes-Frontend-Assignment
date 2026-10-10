"use client";

import { SearchX } from "lucide-react";
import FilterSidebar from "@/components/filters/FilterSidebar";
import { products } from "@/data/products";
import { useUrlFilters } from "@/hooks/useUrlFilters";
import { filterProducts } from "@/lib/filters";
import ProductGrid from "./ProductGrid";

export default function ProductListing() {
  const { filters, query, updateFilters, resetAll } = useUrlFilters();
  const visible = filterProducts(products, filters, query);

  return (
    <div className="grid gap-6 lg:grid-cols-[260px_1fr] lg:gap-8">
      <FilterSidebar filters={filters} onChange={updateFilters} />

      <section>
        <h1 className="mb-4 text-[28px] font-bold text-brand-900">Product Listing</h1>

        {query && (
          <p className="mb-4 text-sm text-slate-600">
            {visible.length} result{visible.length === 1 ? "" : "s"} for{" "}
            <span className="font-semibold text-navy">&ldquo;{query}&rdquo;</span>
          </p>
        )}

        {visible.length > 0 ? (
          <ProductGrid products={visible} />
        ) : (
          <div className="flex flex-col items-center rounded-lg bg-white px-6 py-16 text-center shadow-[0_1px_6px_rgba(15,40,90,0.06)]">
            <SearchX className="size-12 text-brand-500" strokeWidth={1.5} />
            <h2 className="mt-4 text-lg font-semibold text-navy">No products found</h2>
            <p className="mt-1 max-w-sm text-sm text-slate-600">
              Try a different search term, another category or a wider price range.
            </p>
            <button
              type="button"
              onClick={resetAll}
              className="mt-5 h-10 rounded-md bg-brand-600 px-5 text-sm font-medium text-white transition hover:bg-brand-700"
            >
              Clear all filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

export function ProductListingFallback() {
  return (
    <div className="grid gap-6 lg:grid-cols-[260px_1fr] lg:gap-8">
      <div className="h-[330px] animate-pulse rounded-xl bg-brand-600/80" />
      <div>
        <div className="mb-4 h-9 w-56 animate-pulse rounded bg-slate-200" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="h-[280px] animate-pulse rounded-lg bg-white" />
          ))}
        </div>
      </div>
    </div>
  );
}
