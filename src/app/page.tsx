import { Suspense } from "react";
import ProductListing, {
  ProductListingFallback,
} from "@/components/products/ProductListing";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-8 sm:py-7">
      {/* Filters live in the URL, so the listing reads search params on the client. */}
      <Suspense fallback={<ProductListingFallback />}>
        <ProductListing />
      </Suspense>
    </main>
  );
}
