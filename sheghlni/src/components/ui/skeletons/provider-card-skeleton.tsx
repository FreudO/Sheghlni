import { Skeleton } from "@/components/ui/skeleton";

export function ProviderCardSkeleton({ layout = "default" }: { layout?: "default" | "carousel" }) {
  const isCarousel = layout === "carousel";

  return (
    <article
      className="overflow-hidden rounded-2xl border border-border bg-bg-elevated"
      aria-busy="true"
      aria-label="Loading provider"
    >
      <Skeleton className={isCarousel ? "aspect-[4/3] w-full rounded-none" : "aspect-[16/10] w-full rounded-none"} />
      <div className="space-y-2 p-4">
        <Skeleton className="h-5 w-3/5" />
        <Skeleton className="h-4 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
        <div className="flex gap-2 pt-1">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
    </article>
  );
}
