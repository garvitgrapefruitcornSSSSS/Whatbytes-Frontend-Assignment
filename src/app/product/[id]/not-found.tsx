import { PackageX } from "lucide-react";
import Link from "next/link";

export default function ProductNotFound() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-4 py-20 text-center">
      <PackageX className="size-14 text-brand-500" strokeWidth={1.5} />
      <h1 className="mt-4 text-2xl font-bold text-navy">Product not found</h1>
      <p className="mt-2 text-slate-600">
        The product you&apos;re looking for doesn&apos;t exist or was removed.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex h-10 items-center rounded-md bg-brand-600 px-5 text-sm font-medium text-white hover:bg-brand-700"
      >
        Browse products
      </Link>
    </main>
  );
}
