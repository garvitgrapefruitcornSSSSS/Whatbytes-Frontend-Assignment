"use client";

import { Minus, Plus } from "lucide-react";
import { MAX_QUANTITY } from "@/store/cartStore";

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md";
}

export default function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = MAX_QUANTITY,
  size = "md",
}: QuantitySelectorProps) {
  const btn = size === "sm" ? "size-8" : "size-10";
  const clamp = (n: number) => Math.max(min, Math.min(max, n));

  return (
    <div className="inline-flex items-center rounded-lg border border-slate-200 bg-white">
      <button
        type="button"
        onClick={() => onChange(clamp(value - 1))}
        disabled={value <= min}
        aria-label="Decrease quantity"
        className={`${btn} flex items-center justify-center rounded-l-lg text-navy transition hover:bg-brand-50 disabled:cursor-not-allowed disabled:opacity-40`}
      >
        <Minus className="size-4" />
      </button>
      <input
        type="number"
        inputMode="numeric"
        min={min}
        max={max}
        value={value}
        onChange={(e) => {
          const n = Number(e.target.value);
          if (!Number.isNaN(n) && e.target.value !== "") onChange(clamp(Math.floor(n)));
        }}
        aria-label="Quantity"
        className={`no-spinner ${size === "sm" ? "h-8 w-9 text-sm" : "h-10 w-12"} border-x border-slate-200 text-center font-medium text-navy outline-none`}
      />
      <button
        type="button"
        onClick={() => onChange(clamp(value + 1))}
        disabled={value >= max}
        aria-label="Increase quantity"
        className={`${btn} flex items-center justify-center rounded-r-lg text-navy transition hover:bg-brand-50 disabled:cursor-not-allowed disabled:opacity-40`}
      >
        <Plus className="size-4" />
      </button>
    </div>
  );
}
