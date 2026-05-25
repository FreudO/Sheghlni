import { ProviderCardSkeleton } from "@/components/ui/skeletons/provider-card-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export function SavedSkeleton() {
  return (
    <div role="status" aria-live="polite" aria-label="Loading saved pros">
      <Skeleton className="h-8 w-48" />
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <ProviderCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
