import type { ComponentType } from "react";
import type { EmptyStateIllustration } from "@/components/ui/empty-state";

type IllustrationProps = { className?: string };

export function EmptyInboxIllustration({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden>
      <rect x="20" y="28" width="80" height="64" rx="10" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M20 38 L60 68 L100 38" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="88" cy="52" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function EmptyBookingsIllustration({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden>
      <rect x="28" y="24" width="64" height="72" rx="8" fill="none" stroke="currentColor" strokeWidth="2" />
      <line x1="40" y1="44" x2="80" y2="44" stroke="currentColor" strokeWidth="2" />
      <line x1="40" y1="58" x2="72" y2="58" stroke="currentColor" strokeWidth="2" />
      <line x1="40" y1="72" x2="64" y2="72" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function EmptySavedIllustration({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden>
      <path
        d="M60 88 L34 62 C26 54 24 42 32 34 C40 26 52 28 60 36 C68 28 80 26 88 34 C96 42 94 54 86 62 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function EmptySearchIllustration({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden>
      <circle cx="52" cy="52" r="28" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <line x1="72" y1="72" x2="96" y2="96" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function EmptyReviewsIllustration({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden>
      <path
        d="M60 78 L44 92 L48 72 L32 58 L54 56 L60 38 L66 56 L88 58 L72 72 L76 92 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export const EMPTY_ILLUSTRATIONS: Record<
  EmptyStateIllustration,
  React.ComponentType<IllustrationProps>
> = {
  "empty-inbox": EmptyInboxIllustration,
  "empty-bookings": EmptyBookingsIllustration,
  "empty-saved": EmptySavedIllustration,
  "empty-search": EmptySearchIllustration,
  "empty-reviews": EmptyReviewsIllustration,
};
