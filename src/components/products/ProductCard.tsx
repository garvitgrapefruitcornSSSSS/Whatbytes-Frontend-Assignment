import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import AddToCartButton from "./AddToCartButton";

interface ProductCardProps {
  product: Product;
  /** Load the image eagerly (first row, above the fold). */
  eager?: boolean;
}

export default function ProductCard({ product, eager = false }: ProductCardProps) {
  return (
    <article className="flex flex-col rounded-lg bg-white p-3 shadow-[0_1px_6px_rgba(15,40,90,0.06)] transition hover:shadow-[0_4px_16px_rgba(15,40,90,0.12)]">
      <Link
        href={`/product/${product.id}`}
        className="relative block aspect-[5/4] overflow-hidden rounded-md bg-white"
      >
        <Image
          src={product.image}
          alt={product.title}
          fill
          loading={eager ? "eager" : "lazy"}
          sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 90vw"
          className="object-cover transition duration-300 hover:scale-105"
        />
      </Link>

      <div className="mt-3 flex flex-1 flex-col">
        <h3 className="text-[15px] leading-snug font-medium text-navy">
          <Link href={`/product/${product.id}`} className="hover:text-brand-600">
            {product.title}
          </Link>
        </h3>
        <p className="mt-0.5 text-[15px] font-semibold text-navy">${product.price}</p>
        <AddToCartButton product={product} className="mt-3 h-9 w-full text-sm" />
      </div>
    </article>
  );
}
