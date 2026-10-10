import { CATEGORIES, PRICE_MAX, PRICE_MIN } from "@/data/products";
import type { CategoryFilter, Filters } from "@/types/filters";
import type { Product } from "@/types/product";

export const DEFAULT_FILTERS: Filters = {
  category: "all",
  minPrice: PRICE_MIN,
  maxPrice: PRICE_MAX,
};

type ParamsLike = { get(name: string): string | null };

const clampPrice = (n: number) => Math.min(PRICE_MAX, Math.max(PRICE_MIN, n));

/** Read filters from the URL, e.g. `?category=electronics&price=0-1000`. Invalid values fall back to defaults. */
export function parseFilters(params: ParamsLike): Filters {
  const rawCategory = params.get("category")?.toLowerCase();
  const category: CategoryFilter = CATEGORIES.some((c) => c.value === rawCategory)
    ? (rawCategory as CategoryFilter)
    : "all";

  let { minPrice, maxPrice } = DEFAULT_FILTERS;
  const match = params.get("price")?.match(/^(\d+)-(\d+)$/);
  if (match) {
    const [a, b] = [clampPrice(Number(match[1])), clampPrice(Number(match[2]))];
    minPrice = Math.min(a, b);
    maxPrice = Math.max(a, b);
  }

  return { category, minPrice, maxPrice };
}

/** Write filters into a copy of `params`, dropping values that equal the defaults. */
export function applyFiltersToParams(params: URLSearchParams, filters: Filters): URLSearchParams {
  const next = new URLSearchParams(params);

  if (filters.category === "all") next.delete("category");
  else next.set("category", filters.category);

  if (filters.minPrice === PRICE_MIN && filters.maxPrice === PRICE_MAX) next.delete("price");
  else next.set("price", `${filters.minPrice}-${filters.maxPrice}`);

  return next;
}

/** Case-insensitive match: every word of the query must appear in the title, category or brand. */
export function matchesSearch(product: Product, query: string): boolean {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return true;
  const haystack = `${product.title} ${product.category} ${product.brand}`.toLowerCase();
  return terms.every((term) => haystack.includes(term));
}

export function filterProducts(products: Product[], filters: Filters, query = ""): Product[] {
  return products.filter(
    (p) =>
      (filters.category === "all" || p.category === filters.category) &&
      p.price >= filters.minPrice &&
      p.price <= filters.maxPrice &&
      matchesSearch(p, query),
  );
}
