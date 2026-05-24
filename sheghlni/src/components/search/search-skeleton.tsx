export function SearchSkeletonList({ count = 6 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <article
          key={index}
          className="flex gap-4 rounded-2xl border border-border bg-bg p-4"
        >
          <div
            className="shimmer size-[120px] shrink-0 rounded-xl md:h-[120px] md:w-[160px]"
            aria-hidden
          />
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <div className="shimmer h-5 w-2/5 rounded-md" aria-hidden />
            <div className="shimmer h-4 w-3/5 rounded-md" aria-hidden />
            <div className="shimmer mt-1 h-4 w-1/4 rounded-md" aria-hidden />
            <div className="shimmer h-4 w-1/3 rounded-md" aria-hidden />
            <div className="mt-auto flex gap-2">
              <div className="shimmer h-9 w-24 rounded-lg" aria-hidden />
              <div className="shimmer h-9 w-28 rounded-lg" aria-hidden />
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export function SearchPageSkeleton() {
  return (
    <div className="mx-auto max-w-[1280px] px-6 py-8 lg:px-12">
      <div className="mb-6 h-10 w-full max-w-md rounded-lg shimmer" aria-hidden />
      <SearchSkeletonList count={5} />
    </div>
  );
}
