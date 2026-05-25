import { Suspense } from "react";
import { notFound } from "next/navigation";
import { BookingFlowContent } from "@/components/booking/booking-flow-content";
import { getProviderById, providers } from "@/lib/mock";
import {
  getServicesForProvider,
  getUserForProvider,
} from "@/lib/provider/profile-data";

type BookPageProps = {
  params: { providerId: string };
};

export function generateStaticParams() {
  return providers.map((provider) => ({
    providerId: provider.id,
  }));
}

function BookingFlowFallback() {
  return (
    <div className="mx-auto max-w-3xl animate-pulse px-4 py-10">
      <div className="mb-8 h-10 rounded-full bg-bg-elevated-2" />
      <div className="space-y-4">
        <div className="h-32 rounded-2xl bg-bg-elevated-2" />
        <div className="h-24 rounded-2xl bg-bg-elevated-2" />
      </div>
    </div>
  );
}

export default function BookPage({ params }: BookPageProps) {
  const provider = getProviderById(params.providerId);

  if (!provider) {
    notFound();
  }

  const user = getUserForProvider(provider);
  if (!user) {
    notFound();
  }

  const services = getServicesForProvider(provider.id);

  return (
    <Suspense fallback={<BookingFlowFallback />}>
      <BookingFlowContent
        provider={provider}
        user={user}
        services={services}
      />
    </Suspense>
  );
}
