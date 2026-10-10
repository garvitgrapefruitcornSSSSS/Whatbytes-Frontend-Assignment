import Link from "next/link";
import { Suspense } from "react";
import CartButton from "./CartButton";
import SearchBar, { SearchBarFallback } from "./SearchBar";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 bg-brand-700 text-white shadow-sm">
      <div className="mx-auto flex h-[66px] max-w-7xl items-center gap-4 px-4 sm:gap-6 sm:px-8">
        <Link
          href="/"
          className="shrink-0 text-[28px] leading-none font-semibold tracking-tight"
        >
          Logo
        </Link>

        <div className="mx-auto w-full max-w-[420px] min-w-0 flex-1">
          <Suspense fallback={<SearchBarFallback />}>
            <SearchBar />
          </Suspense>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <CartButton />

          <button
            type="button"
            aria-label="Profile"
            className="hidden size-10 items-center justify-center rounded-full border-2 border-white/40 bg-brand-500 text-sm font-semibold md:flex"
          >
            JD
          </button>
        </div>
      </div>
    </header>
  );
}
