"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { applyFiltersToParams, DEFAULT_FILTERS, parseFilters } from "@/lib/filters";
import type { Filters } from "@/types/filters";

const filtersEqual = (a: Filters, b: Filters) =>
  a.category === b.category && a.minPrice === b.minPrice && a.maxPrice === b.maxPrice;

/**
 * Filters backed by the URL query string. The returned `filters` update instantly
 * (so the slider stays smooth) while the URL is written after a short debounce.
 */
export function useUrlFilters(debounceMs = 250) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const urlFilters = parseFilters(searchParams);
  const query = searchParams.get("q")?.trim() ?? "";

  const [filters, setFilters] = useState<Filters>(urlFilters);
  const [lastUrlFilters, setLastUrlFilters] = useState<Filters>(urlFilters);

  // Pick up external URL changes (back/forward, footer links).
  if (!filtersEqual(urlFilters, lastUrlFilters)) {
    setLastUrlFilters(urlFilters);
    setFilters(urlFilters);
  }

  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  const writeUrl = useCallback(
    (next: Filters) => {
      // Read the live URL so a search typed meanwhile isn't overwritten.
      const current = new URLSearchParams(window.location.search);
      const qs = applyFiltersToParams(current, next).toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [router, pathname],
  );

  const updateFilters = useCallback(
    (patch: Partial<Filters>) => {
      const next = { ...filters, ...patch };
      setFilters(next);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => writeUrl(next), debounceMs);
    },
    [filters, writeUrl, debounceMs],
  );

  const resetAll = useCallback(() => {
    clearTimeout(timer.current);
    setFilters(DEFAULT_FILTERS);
    router.replace(pathname, { scroll: false });
  }, [router, pathname]);

  return { filters, query, updateFilters, resetAll };
}
