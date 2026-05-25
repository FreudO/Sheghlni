import { Skeleton } from "@/components/ui/skeleton";

export function ConversationListSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="space-y-1 p-3" aria-busy="true" aria-label="Loading conversations">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex gap-3 rounded-xl px-3 py-3">
          <Skeleton className="size-12 shrink-0 rounded-full" />
          <div className="min-w-0 flex-1 space-y-2">
            <Skeleton className="h-4 w-2/5" />
            <Skeleton className="h-3 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
