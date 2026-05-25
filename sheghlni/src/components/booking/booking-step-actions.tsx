import { cn } from "@/lib/utils";

type BookingStepActionsProps = {
  children: React.ReactNode;
  className?: string;
};

/** Sticky primary actions at the bottom on mobile for thumb reach. */
export function BookingStepActions({
  children,
  className,
}: BookingStepActionsProps) {
  return (
    <div
      className={cn(
        "sticky bottom-0 z-10 -mx-4 mt-6 border-t border-border bg-bg/95 px-4 py-4 backdrop-blur-sm",
        "pb-[max(1rem,env(safe-area-inset-bottom))]",
        "md:static md:mx-0 md:mt-8 md:border-0 md:bg-transparent md:p-0 md:backdrop-blur-none",
        className,
      )}
    >
      {children}
    </div>
  );
}
