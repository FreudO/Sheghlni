import { ProfileHeaderSkeleton } from "@/components/ui/skeletons/profile-header-skeleton";
import { ReviewCardSkeleton } from "@/components/ui/skeletons/review-card-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export function ProviderProfileSkeleton() {
  return (
    <div role="status" aria-live="polite" aria-label="Loading provider profile">
      <Skeleton className="-mx-4 aspect-[4/3] w-[calc(100%+2rem)] rounded-none md:aspect-[16/7] lg:mx-0 lg:w-full lg:rounded-xl" />
      <div className="mt-6 space-y-8 px-4 md:px-6 lg:px-0">
        <ProfileHeaderSkeleton />
        <div className="space-y-3">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-11/12" />
        </div>
        <div className="space-y-3">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-24 w-full rounded-2xl" />
          <Skeleton className="h-24 w-full rounded-2xl" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-7 w-40" />
          <ReviewCardSkeleton />
          <ReviewCardSkeleton />
        </div>
      </div>
    </div>
  );
}
