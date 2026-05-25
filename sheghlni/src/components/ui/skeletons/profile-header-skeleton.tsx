import { Skeleton } from "@/components/ui/skeleton";

export function ProfileHeaderSkeleton() {
  return (
    <div className="space-y-4" aria-busy="true" aria-label="Loading profile">
      <div className="flex flex-wrap items-start gap-4">
        <Skeleton className="size-16 rounded-full md:size-20" />
        <div className="min-w-0 flex-1 space-y-2">
          <Skeleton className="h-8 w-2/5 max-w-xs" />
          <Skeleton className="h-4 w-3/5 max-w-sm" />
          <Skeleton className="h-4 w-1/3" />
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <Skeleton className="h-8 w-24 rounded-full" />
        <Skeleton className="h-8 w-28 rounded-full" />
        <Skeleton className="h-8 w-20 rounded-full" />
      </div>
    </div>
  );
}
