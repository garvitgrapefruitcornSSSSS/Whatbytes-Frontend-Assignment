"use client";

import { useState } from "react";
import FilterSidebar from "@/components/filters/FilterSidebar";
import { PRICE_MAX, PRICE_MIN, products } from "@/data/products";
import type { Filters } from "@/types/filters";
import ProductGrid from "./ProductGrid";

export default function ProductListing() {
  const [filters, setFilters] = useState<Filters>({
    category: "all",
    minPrice: PRICE_MIN,
    maxPrice: PRICE_MAX,
  });

  return (
    <div className="grid gap-6 lg:grid-cols-[260px_1fr] lg:gap-8">
      <FilterSidebar
        filters={filters}
        onChange={(next) => setFilters((prev) => ({ ...prev, ...next }))}
      />
      <section>
        <h1 className="mb-4 text-[28px] font-bold text-brand-900">Product Listing</h1>
        <ProductGrid products={products} />
      </section>
    </div>
  );
}
