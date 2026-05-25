import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProviderProfilePageClient } from "@/components/provider/provider-profile-page-client";
import {
  getProviderByHandle,
  getReviewsForProvider,
  providers,
} from "@/lib/mock";
import {
  getProviderCategoryLabel,
  getUserForProvider,
} from "@/lib/provider/profile-data";

type ProviderPageProps = {
  params: { handle: string };
};

export function generateStaticParams() {
  return providers.map((provider) => ({ handle: provider.handle }));
}

export function generateMetadata({ params }: ProviderPageProps): Metadata {
  const provider = getProviderByHandle(params.handle);
  if (!provider) {
    return { title: "Provider not found | Sheghlni" };
  }

  const category = getProviderCategoryLabel(provider.id);

  return {
    title: `${provider.businessName} — ${category} in ${provider.baseCity} | Sheghlni`,
    description: provider.bio,
  };
}

export default function ProviderProfilePage({ params }: ProviderPageProps) {
  const provider = getProviderByHandle(params.handle);

  if (!provider) {
    notFound();
  }

  const user = getUserForProvider(provider);
  if (!user) {
    notFound();
  }

  const reviews = getReviewsForProvider(provider.id);

  return (
    <div className="pb-[calc(4.5rem+env(safe-area-inset-bottom))] lg:pb-0">
      <ProviderProfilePageClient
        provider={provider}
        user={user}
        reviews={reviews}
      />
    </div>
  );
}
