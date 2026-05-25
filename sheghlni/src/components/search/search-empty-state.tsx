"use client";

import { EmptyState } from "@/components/ui/empty-state";

type SearchEmptyStateProps = {
  onClearFilters: () => void;
};

export function SearchEmptyState({ onClearFilters }: SearchEmptyStateProps) {
  return (
    <EmptyState
      illustration="empty-search"
      title="No pros found"
      subtitle="Try broadening your search or adjusting filters. Be the first to request — we'll find them for you."
      actionLabel="Clear filters"
      onAction={onClearFilters}
    />
  );
}
