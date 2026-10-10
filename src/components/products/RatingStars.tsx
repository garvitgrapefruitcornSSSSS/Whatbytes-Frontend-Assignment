import { Star } from "lucide-react";

interface RatingStarsProps {
  rating: number;
  size?: number;
  className?: string;
}

/** Five stars with fractional fill, e.g. 4.5 renders four and a half stars. */
export default function RatingStars({ rating, size = 16, className = "" }: RatingStarsProps) {
  return (
    <div
      className={`flex items-center gap-0.5 ${className}`}
      role="img"
      aria-label={`Rated ${rating} out of 5`}
    >
      {Array.from({ length: 5 }, (_, i) => {
        const fill = Math.max(0, Math.min(1, rating - i));
        return (
          <span key={i} className="relative inline-flex" style={{ width: size, height: size }}>
            <Star className="absolute inset-0 text-slate-300" fill="currentColor" strokeWidth={0} size={size} />
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <Star className="text-brand-800" fill="currentColor" strokeWidth={0} size={size} />
            </span>
          </span>
        );
      })}
    </div>
  );
}
