import type { Product } from "@/types/product";
import FeaturedProductCard from "./FeaturedProductCard";
import ProductCard from "./ProductCard";

export default function ProductGrid({ products }: { products: Product[] }) {
  // Featured products always go last so the wide card closes out the grid.
  const ordered = [
    ...products.filter((p) => !p.featured),
    ...products.filter((p) => p.featured),
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {ordered.map((product, index) =>
        product.featured ? (
          <FeaturedProductCard key={product.id} product={product} />
        ) : (
          <ProductCard key={product.id} product={product} eager={index < 3} />
        ),
      )}
    </div>
  );
}
