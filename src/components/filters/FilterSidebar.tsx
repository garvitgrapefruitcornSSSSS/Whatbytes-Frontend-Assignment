"use client";

import { ChevronsUpDown } from "lucide-react";
import { CATEGORIES, PRICE_MAX, PRICE_MIN } from "@/data/products";
import type { CategoryFilter, Filters } from "@/types/filters";
import PriceRangeSlider from "./PriceRangeSlider";

const OPTIONS: { value: CategoryFilter; label: string }[] = [
  { value: "all", label: "All" },
  ...CATEGORIES,
];

interface FilterSidebarProps {
  filters: Filters;
  onChange: (next: Partial<Filters>) => void;
}

export default function FilterSidebar({ filters, onChange }: FilterSidebarProps) {
  return (
    <aside className="flex flex-col gap-6">
      {/* Primary blue filter card */}
      <section className="rounded-xl bg-brand-600 px-4 pt-4 pb-5 text-white shadow-sm">
        <h2 className="text-lg font-semibold">Filters</h2>

        <fieldset className="mt-4">
          <legend className="text-[15px] font-medium">Category</legend>
          <div className="mt-2 space-y-2">
            {OPTIONS.map((opt) => (
              <CategoryRadio
                key={opt.value}
                name="category-primary"
                variant="dark"
                label={opt.label}
                checked={filters.category === opt.value}
                onSelect={() => onChange({ category: opt.value })}
              />
            ))}
          </div>
        </fieldset>

        <div className="mt-6">
          <h3 className="mb-3 text-[15px] font-medium">Price</h3>
          <PriceRangeSlider
            min={PRICE_MIN}
            max={PRICE_MAX}
            value={[filters.minPrice, filters.maxPrice]}
            onChange={([minPrice, maxPrice]) => onChange({ minPrice, maxPrice })}
          />
        </div>
      </section>

      {/* Secondary white filter card (desktop only, it mirrors the blue card) */}
      <section className="hidden rounded-xl bg-white px-4 pt-5 pb-6 shadow-sm lg:block">
        <fieldset>
          <legend className="text-[15px] font-semibold text-navy">Category</legend>
          <div className="mt-3 space-y-2">
            {OPTIONS.map((opt) => (
              <CategoryRadio
                key={opt.value}
                name="category-secondary"
                variant="light"
                label={opt.label}
                checked={filters.category === opt.value}
                onSelect={() => onChange({ category: opt.value })}
              />
            ))}
          </div>
        </fieldset>

        <div className="mt-5">
          <label
            htmlFor="max-price"
            className="text-[15px] font-semibold text-navy"
          >
            Price
          </label>
          <div className="relative mt-2">
            <input
              id="max-price"
              type="number"
              inputMode="numeric"
              min={PRICE_MIN}
              max={PRICE_MAX}
              step={10}
              value={filters.maxPrice}
              onChange={(e) => {
                const raw = Number(e.target.value);
                if (Number.isNaN(raw)) return;
                const maxPrice = Math.min(PRICE_MAX, Math.max(filters.minPrice, raw));
                onChange({ maxPrice });
              }}
              aria-label="Maximum price"
              className="no-spinner h-9 w-full rounded-lg border border-slate-200 bg-white pr-8 pl-3 text-sm text-navy outline-none focus:border-brand-500"
            />
            <ChevronsUpDown className="pointer-events-none absolute top-1/2 right-2.5 size-3.5 -translate-y-1/2 text-slate-500" />
          </div>
        </div>
      </section>
    </aside>
  );
}

interface CategoryRadioProps {
  name: string;
  label: string;
  checked: boolean;
  variant: "dark" | "light";
  onSelect: () => void;
}

function CategoryRadio({ name, label, checked, variant, onSelect }: CategoryRadioProps) {
  const dark = variant === "dark";
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-sm">
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onSelect}
        className="peer sr-only"
      />
      <span
        aria-hidden="true"
        className={[
          "size-[15px] shrink-0 rounded-full transition peer-focus-visible:ring-2 peer-focus-visible:ring-offset-1",
          dark
            ? checked
              ? "border-[3px] border-white"
              : "border border-white/45"
            : checked
              ? "border-[3px] border-brand-500"
              : "border border-slate-300",
        ].join(" ")}
      />
      <span className={dark ? "text-white/90" : "text-slate-700"}>{label}</span>
    </label>
  );
}
