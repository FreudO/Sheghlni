import { Button } from "@/components/ui/button";

function EmptyIllustration() {
  return (
    <svg
      viewBox="0 0 120 120"
      className="mx-auto size-28 text-text-tertiary"
      aria-hidden
    >
      <circle cx="52" cy="52" r="28" fill="none" stroke="currentColor" strokeWidth="3" />
      <line
        x1="72"
        y1="72"
        x2="98"
        y2="98"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="44" cy="48" r="3" fill="currentColor" />
      <circle cx="60" cy="48" r="3" fill="currentColor" />
      <path
        d="M42 62 Q52 56 62 62"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

type SearchEmptyStateProps = {
  onClearFilters: () => void;
};

export function SearchEmptyState({ onClearFilters }: SearchEmptyStateProps) {
  return (
    <div className="flex flex-col items-center px-6 py-16 text-center">
      <EmptyIllustration />
      <h2 className="mt-6 font-display text-h2 text-text-primary">No pros found</h2>
      <p className="mt-3 max-w-md text-body text-text-secondary">
        Try broadening your search or adjusting filters. Be the first to request
        — we&apos;ll find them for you.
      </p>
      <Button
        type="button"
        variant="outline"
        className="mt-8 h-11 rounded-full px-6"
        onClick={onClearFilters}
      >
        Clear filters
      </Button>
    </div>
  );
}
