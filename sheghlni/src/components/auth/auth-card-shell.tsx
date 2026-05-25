import { SheghlniLogo } from "@/components/layout/sheghlni-logo";
import { cn } from "@/lib/utils";

type AuthCardShellProps = {
  children: React.ReactNode;
  className?: string;
};

export function AuthCardShell({ children, className }: AuthCardShellProps) {
  return (
    <div
      className={cn(
        "flex min-h-[calc(100dvh-3.5rem)] flex-col items-center justify-center px-4 py-10 md:min-h-[calc(100dvh-4rem)] md:py-14",
        "bg-gradient-to-b from-cream-200/70 via-bg to-bg dark:from-ink-900 dark:via-ink-900 dark:to-ink-900",
      )}
    >
      <div className={cn("w-full max-w-[480px]", className)}>
        <div className="mb-8 flex justify-center">
          <span className="dark:hidden">
            <SheghlniLogo variant="light" />
          </span>
          <span className="hidden dark:inline">
            <SheghlniLogo variant="dark" />
          </span>
        </div>
        <div
          className={cn(
            "rounded-2xl border border-border bg-bg-elevated p-6 shadow-lg md:p-8",
            "dark:border-white/10 dark:bg-ink-800/90 dark:shadow-xl dark:backdrop-blur-sm",
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
