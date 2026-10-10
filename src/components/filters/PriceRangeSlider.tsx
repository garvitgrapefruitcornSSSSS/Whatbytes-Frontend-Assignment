"use client";

interface PriceRangeSliderProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  step?: number;
}

/** Dual-thumb range slider built from two overlapping native range inputs. */
export default function PriceRangeSlider({
  min,
  max,
  value,
  onChange,
  step = 10,
}: PriceRangeSliderProps) {
  const [low, high] = value;
  const lowPct = ((low - min) / (max - min)) * 100;
  const highPct = ((high - min) / (max - min)) * 100;

  return (
    <div>
      <div className="relative h-4">
        <div className="absolute top-1/2 right-0 left-0 h-[3px] -translate-y-1/2 rounded-full bg-white/35" />
        <div
          className="absolute top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-white"
          style={{ left: `${lowPct}%`, right: `${100 - highPct}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={low}
          aria-label="Minimum price"
          onChange={(e) => onChange([Math.min(Number(e.target.value), high), high])}
          className="range-thumb absolute inset-0"
          style={{ zIndex: low > max - step * 2 ? 5 : 3 }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={high}
          aria-label="Maximum price"
          onChange={(e) => onChange([low, Math.max(Number(e.target.value), low)])}
          className="range-thumb absolute inset-0"
          style={{ zIndex: 4 }}
        />
      </div>
      <div className="mt-1.5 flex justify-between text-xs text-white/90">
        <span>{low}</span>
        <span>{high}</span>
      </div>
    </div>
  );
}
