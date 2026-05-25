"use client";

import { useEffect, useState } from "react";
import { ProviderCard } from "@/components/cards/provider-card";
import { EmptyState } from "@/components/ui/empty-state";
import { SavedSkeleton } from "@/components/ui/skeletons/saved-skeleton";
import { useDelayedReady } from "@/hooks/use-delayed-ready";
import {
  getSavedLists,
  getSavedProvidersForList,
  subscribeSaved,
  type SavedListId,
} from "@/lib/saved/saved-store";

export function SavedPageContent() {
  const ready = useDelayedReady();
  const [lists, setLists] = useState(getSavedLists);

  useEffect(() => subscribeSaved(() => setLists(getSavedLists())), []);

  const totalCount = lists.reduce(
    (sum, list) => sum + list.providerIds.length,
    0,
  );

  if (!ready) {
    return <SavedSkeleton />;
  }

  if (totalCount === 0) {
    return (
      <EmptyState
        illustration="empty-saved"
        title="Nothing saved yet"
        subtitle="Heart pros you like to find them later."
        actionLabel="Browse pros"
        actionHref="/search/"
      />
    );
  }

  return (
    <div className="space-y-10">
      {lists.map((list) => {
        const providers = getSavedProvidersForList(list.id as SavedListId);
        if (providers.length === 0) return null;

        return (
          <section key={list.id}>
            <h2 className="font-display text-h3 text-text-primary">
              {list.name}
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {providers.map((provider) => (
                <ProviderCard key={provider.id} provider={provider} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
