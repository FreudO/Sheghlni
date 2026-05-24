import { cn } from "@/lib/utils";

type PageShellProps = {
  children: React.ReactNode;
  fullWidth?: boolean;
  reserveMobileTabBar?: boolean;
  flushTop?: boolean;
  className?: string;
};

export function PageShell({
  children,
  fullWidth = false,
  reserveMobileTabBar = true,
  flushTop = false,
  className,
}: PageShellProps) {
  return (
    <main
      className={cn(
        flushTop
          ? "min-h-dvh"
          : "min-h-[calc(100dvh-3.5rem)] pt-14 md:min-h-[calc(100dvh-4rem)] md:pt-16",
        reserveMobileTabBar &&
          "pb-[calc(4rem+env(safe-area-inset-bottom))] md:pb-0",
        className,
      )}
    >
      {fullWidth ? (
        children
      ) : (
        <div className="mx-auto w-full max-w-[1280px] px-6 lg:px-12">{children}</div>
      )}
    </main>
  );
}
