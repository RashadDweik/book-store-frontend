function SkeletonPulse({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-zinc-100 dark:bg-zinc-800 ${className}`}
    />
  );
}

function BookCardSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      {/* Cover image */}
      <SkeletonPulse className="w-full aspect-2/3 rounded-lg" />
      {/* Title */}
      <SkeletonPulse className="h-4 w-3/4" />
      {/* Author */}
      <SkeletonPulse className="h-3 w-1/2" />
      {/* Price / badge row */}
      <div className="flex items-center gap-2">
        <SkeletonPulse className="h-3 w-12" />
        <SkeletonPulse className="h-3 w-16" />
      </div>
    </div>
  );
}

function FiltersPanelSkeleton() {
  return (
    // Mirrors the FiltersPanel trigger button size
    <SkeletonPulse className="h-10 w-24 shrink-0 rounded-lg" />
  );
}

function PaginationSkeleton() {
  return (
    <div className="mt-8 flex justify-center items-center gap-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <SkeletonPulse key={i} className="h-9 w-9 rounded-md" />
      ))}
    </div>
  );
}

export function CatalogueSkeleton() {
  return (
    <main className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50 transition-colors duration-200">
      <div className="max-w-6xl mx-auto py-12 sm:py-16">
        {/* Search + Filters row */}
        <div className="px-4 flex items-center gap-3">
          <div className="flex-1">
            {/* SearchBar skeleton */}
            <SkeletonPulse className="h-10 w-full rounded-lg" />
          </div>
          <FiltersPanelSkeleton />
        </div>

        {/* Book grid skeleton */}
        <div className="px-4 mt-8 flex flex-col">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {Array.from({ length: 20 }).map((_, i) => (
              <BookCardSkeleton key={i} />
            ))}
          </div>
          <PaginationSkeleton />
        </div>
      </div>
    </main>
  );
}
