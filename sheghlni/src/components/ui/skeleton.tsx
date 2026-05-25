import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("shimmer rounded-md bg-bg-elevated-2", className)}
      aria-hidden
      {...props}
    />
  );
}

export { Skeleton };
