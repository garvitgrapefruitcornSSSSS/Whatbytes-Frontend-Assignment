import type { Category } from "./product";

export type CategoryFilter = Category | "all";

export interface Filters {
  category: CategoryFilter;
  minPrice: number;
  maxPrice: number;
}
