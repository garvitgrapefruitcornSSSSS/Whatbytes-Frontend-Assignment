import RatingStars from "@/components/products/RatingStars";
import type { Review } from "@/types/product";

const dateFormat = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
});

export default function ReviewsSection({
  reviews,
  rating,
}: {
  reviews: Review[];
  rating: number;
}) {
  return (
    <section className="rounded-lg bg-white p-5 shadow-[0_1px_6px_rgba(15,40,90,0.06)] sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-semibold text-navy">Customer Reviews</h2>
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <RatingStars rating={rating} />
          <span>
            {rating.toFixed(1)} · {reviews.length} review{reviews.length === 1 ? "" : "s"}
          </span>
        </div>
      </div>

      {reviews.length === 0 ? (
        <p className="mt-4 text-sm text-slate-600">No reviews yet.</p>
      ) : (
        <ul className="mt-4 divide-y divide-slate-100">
          {reviews.map((review) => (
            <li key={review.id} className="py-4 first:pt-0 last:pb-0">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="flex size-8 items-center justify-center rounded-full bg-brand-50 text-xs font-semibold text-brand-700">
                  {review.author.charAt(0)}
                </span>
                <span className="font-medium text-navy">{review.author}</span>
                <RatingStars rating={review.rating} size={14} />
                <time dateTime={review.date} className="text-xs text-slate-500">
                  {dateFormat.format(new Date(review.date))}
                </time>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">{review.comment}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
