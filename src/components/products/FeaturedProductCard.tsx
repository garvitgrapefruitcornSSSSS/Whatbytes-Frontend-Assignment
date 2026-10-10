import Image from "next/image";
import Link from "next/link";
import { getCategoryLabel } from "@/data/products";
import type { Product } from "@/types/product";
import AddToCartButton from "./AddToCartButton";
import RatingStars from "./RatingStars";

/** Wide highlighted card that spans two grid columns (Smartphone in the design). */
export default function FeaturedProductCard({ product }: { product: Product }) {
  return (
    <article className="flex flex-col rounded-lg bg-white p-4 shadow-[0_1px_6px_rgba(15,40,90,0.06)] sm:col-span-2 sm:p-5">
      <div className="flex flex-1 flex-col gap-5 sm:flex-row sm:items-center">
        <Link
          href={`/product/${product.id}`}
          className="relative block aspect-[4/5] w-full shrink-0 overflow-hidden rounded-md sm:w-[44%]"
        >
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(min-width: 640px) 300px, 90vw"
            className="object-cover"
          />
        </Link>

        <div className="flex-1">
          <h3 className="text-[22px] font-semibold text-navy">
            <Link href={`/product/${product.id}`} className="hover:text-brand-600">
              {product.title}
            </Link>
          </h3>
          <p className="mt-1 text-xl font-semibold text-navy">${product.price}</p>
          <RatingStars rating={product.rating} size={17} className="mt-2" />
          <p className="mt-3 text-sm leading-relaxed text-slate-700">
            {product.description}
          </p>
          <dl className="mt-3 space-y-2 text-sm text-slate-700">
            <dt>Category</dt>
            <dd>{getCategoryLabel(product.category)}</dd>
          </dl>
        </div>
      </div>

      <AddToCartButton
        product={product}
        className="mt-4 h-11 w-full self-end text-base sm:w-[46%]"
      />
    </article>
  );
}
