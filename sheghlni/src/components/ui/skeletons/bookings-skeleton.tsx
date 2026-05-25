import { Skeleton } from "@/components/ui/skeleton";

export function BookingsSkeleton() {
  return (
    <div role="status" aria-live="polite" aria-label="Loading bookings">
      <Skeleton className="h-9 w-40" />
      <Skeleton className="mt-2 h-4 w-64" />
      <Skeleton className="mt-6 h-11 w-full max-w-md rounded-full" />
      <div className="mt-8 space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-36 w-full rounded-2xl" />
        ))}
      </div>
    </div>
  );
}
