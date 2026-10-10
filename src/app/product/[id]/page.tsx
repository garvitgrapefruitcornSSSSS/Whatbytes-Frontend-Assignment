import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ImageCarousel from "@/components/product-detail/ImageCarousel";
import PurchasePanel from "@/components/product-detail/PurchasePanel";
import ReviewsSection from "@/components/product-detail/ReviewsSection";
import RatingStars from "@/components/products/RatingStars";
import { getCategoryLabel, getProductById, products } from "@/data/products";

export function generateStaticParams() {
  return products.map((p) => ({ id: String(p.id) }));
}

export async function generateMetadata({
  params,
}: PageProps<"/product/[id]">): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(Number(id));
  return product
    ? { title: `${product.title} | Whatbytes Store`, description: product.description }
    : { title: "Product not found | Whatbytes Store" };
}

export default async function ProductPage({ params }: PageProps<"/product/[id]">) {
  const { id } = await params;
  const product = getProductById(Number(id));
  if (!product) notFound();

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-8 sm:py-7">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-800"
      >
        <ArrowLeft className="size-4" />
        Back to products
      </Link>

      <div className="mt-4 grid gap-6 rounded-lg bg-white p-4 shadow-[0_1px_6px_rgba(15,40,90,0.06)] sm:p-6 lg:grid-cols-2 lg:gap-10">
        <ImageCarousel images={product.images} alt={product.title} />

        <div className="flex flex-col">
          <p className="text-xs font-semibold tracking-wider text-brand-600 uppercase">
            {product.brand}
          </p>
          <h1 className="mt-1 text-3xl font-bold text-navy">{product.title}</h1>
          <div className="mt-2 flex items-center gap-2 text-sm text-slate-600">
            <RatingStars rating={product.rating} />
            <span>
              {product.rating.toFixed(1)} ({product.reviews.length} review
              {product.reviews.length === 1 ? "" : "s"})
            </span>
          </div>
          <p className="mt-4 text-3xl font-semibold text-navy">${product.price}</p>

          <p className="mt-4 leading-relaxed text-slate-700">{product.description}</p>

          <dl className="mt-5 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
            <dt className="text-slate-500">Category</dt>
            <dd>
              <Link
                href={`/?category=${product.category}`}
                className="font-medium text-navy hover:text-brand-600"
              >
                {getCategoryLabel(product.category)}
              </Link>
            </dd>
            <dt className="text-slate-500">Brand</dt>
            <dd className="font-medium text-navy">{product.brand}</dd>
          </dl>

          <div className="mt-6 border-t border-slate-100 pt-6">
            <PurchasePanel product={product} />
          </div>
        </div>
      </div>

      <div className="mt-6">
        <ReviewsSection reviews={product.reviews} rating={product.rating} />
      </div>
    </main>
  );
}
