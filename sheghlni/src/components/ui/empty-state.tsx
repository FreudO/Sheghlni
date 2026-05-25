import Link from "next/link";
import { EMPTY_ILLUSTRATIONS } from "@/components/ui/empty-state-illustrations";
import { cn } from "@/lib/utils";

export type EmptyStateIllustration =
  | "empty-inbox"
  | "empty-bookings"
  | "empty-saved"
  | "empty-search"
  | "empty-reviews";

type EmptyStateProps = {
  illustration: EmptyStateIllustration;
  title: string;
  subtitle: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
  className?: string;
};

export function EmptyState({
  illustration,
  title,
  subtitle,
  actionLabel,
  actionHref,
  onAction,
  className,
}: EmptyStateProps) {
  const Illustration = EMPTY_ILLUSTRATIONS[illustration];

  const action =
    actionLabel &&
    (onAction ? (
      <button
        type="button"
        onClick={onAction}
        className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full border border-border bg-bg-elevated px-6 text-sm font-semibold text-text-primary transition hover:border-bronze-500/40 hover:text-cta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze-500 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
      >
        {actionLabel}
      </button>
    ) : actionHref ? (
      <Link
        href={actionHref}
        className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full bg-cta px-6 text-sm font-semibold text-white transition hover:bg-cta-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze-500 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
      >
        {actionLabel}
      </Link>
    ) : null);

  return (
    <div
      className={cn(
        "flex flex-col items-center px-6 py-16 text-center",
        className,
      )}
    >
      <Illustration className="mx-auto size-28 text-ink-300 dark:text-cream-200/50" />
      <h2 className="mt-6 font-display text-h2 text-text-primary">{title}</h2>
      <p className="mt-3 max-w-md text-sm text-text-secondary md:text-body">
        {subtitle}
      </p>
      {action}
    </div>
  );
}
