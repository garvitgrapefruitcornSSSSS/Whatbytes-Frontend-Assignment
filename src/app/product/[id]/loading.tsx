// Suspense fallback for the product page while `params` resolves.
export default function ProductLoading() {
  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-8 sm:py-7">
      <div className="h-5 w-36 animate-pulse rounded bg-slate-200" />
      <div className="mt-4 grid gap-6 rounded-lg bg-white p-4 sm:p-6 lg:grid-cols-2 lg:gap-10">
        <div className="aspect-square animate-pulse rounded-lg bg-slate-100" />
        <div className="space-y-4">
          <div className="h-4 w-20 animate-pulse rounded bg-slate-100" />
          <div className="h-9 w-2/3 animate-pulse rounded bg-slate-100" />
          <div className="h-5 w-40 animate-pulse rounded bg-slate-100" />
          <div className="h-9 w-28 animate-pulse rounded bg-slate-100" />
          <div className="h-20 w-full animate-pulse rounded bg-slate-100" />
          <div className="h-12 w-64 animate-pulse rounded bg-slate-200" />
        </div>
      </div>
    </main>
  );
}
