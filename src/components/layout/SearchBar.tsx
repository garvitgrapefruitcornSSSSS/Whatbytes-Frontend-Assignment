"use client";

import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get("q") ?? "";
  const [value, setValue] = useState(urlQuery);
  const [syncedQuery, setSyncedQuery] = useState(urlQuery);

  // Keep the input in sync when the URL changes (e.g. back/forward navigation).
  if (urlQuery !== syncedQuery) {
    setSyncedQuery(urlQuery);
    setValue(urlQuery);
  }

  // Debounce typing into the `?q=` param of the listing page.
  useEffect(() => {
    const term = value.trim();
    if (term === urlQuery) return;
    if (pathname !== "/" && !term) return;

    const timer = setTimeout(() => {
      const params = new URLSearchParams(
        pathname === "/" ? searchParams.toString() : "",
      );
      if (term) params.set("q", term);
      else params.delete("q");
      const qs = params.toString();
      const href = qs ? `/?${qs}` : "/";
      if (pathname === "/") router.replace(href, { scroll: false });
      else router.push(href);
    }, 300);

    return () => clearTimeout(timer);
  }, [value, urlQuery, pathname, searchParams, router]);

  return (
    <form
      role="search"
      onSubmit={(e) => e.preventDefault()}
      className="relative w-full"
    >
      <Search
        className="pointer-events-none absolute top-1/2 left-3.5 size-[18px] -translate-y-1/2 text-white/85"
        strokeWidth={2}
      />
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search for products..."
        aria-label="Search for products"
        className="h-10 w-full rounded-lg border border-white/35 bg-white/5 pr-3 pl-10 text-sm text-white outline-none transition placeholder:text-white/85 focus:border-white/70 focus:bg-white/10"
      />
    </form>
  );
}

export function SearchBarFallback() {
  return (
    <div className="h-10 w-full rounded-lg border border-white/35 bg-white/5" />
  );
}
