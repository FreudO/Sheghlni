"use client";

import type { Provider, Review, User } from "@/lib/mock";
import { ProviderProfileContent } from "@/components/provider/provider-profile-content";
import { ProviderProfileSkeleton } from "@/components/ui/skeletons/provider-profile-skeleton";
import { useDelayedReady } from "@/hooks/use-delayed-ready";

type ProviderProfilePageClientProps = {
  provider: Provider;
  user: User;
  reviews: Review[];
};

export function ProviderProfilePageClient({
  provider,
  user,
  reviews,
}: ProviderProfilePageClientProps) {
  const ready = useDelayedReady();

  if (!ready) {
    return <ProviderProfileSkeleton />;
  }

  return (
    <ProviderProfileContent provider={provider} user={user} reviews={reviews} />
  );
}
