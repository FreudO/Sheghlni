"use client";

import { useState } from "react";
import Link from "next/link";
import type { Provider, Review, User } from "@/lib/mock";
import { getProviderStartingPrice } from "@/lib/mock";
import { AvailabilityPreview } from "@/components/provider/availability-preview";
import { Gallery } from "@/components/provider/gallery";
import { GalleryLightbox } from "@/components/provider/gallery-lightbox";
import { ProviderAbout } from "@/components/provider/provider-about";
import { ProviderCredentials } from "@/components/provider/provider-credentials";
import { ProviderFaqSection } from "@/components/provider/provider-faq";
import { ProviderHeader } from "@/components/provider/provider-header";
import { ProviderPortfolio } from "@/components/provider/provider-portfolio";
import { ProviderServiceArea } from "@/components/provider/provider-service-area";
import { ReviewsSection } from "@/components/provider/reviews-section";
import { ServicesTable } from "@/components/provider/services-table";
import {
  formatStartingPriceLabel,
  StickyBookingBar,
} from "@/components/provider/sticky-booking-bar";
import {
  getAvailabilityPreview,
  getProviderCredentials,
  getProviderFaqs,
  getProviderGalleryImages,
  getServicesForProvider,
} from "@/lib/provider/profile-data";

type ProviderProfileContentProps = {
  provider: Provider;
  user: User;
  reviews: Review[];
};

export function ProviderProfileContent({
  provider,
  user,
  reviews,
}: ProviderProfileContentProps) {
  const galleryImages = getProviderGalleryImages(provider);
  const portfolioImages = provider.mediaUrls.slice(2);
  const allLightboxImages = [...galleryImages, ...portfolioImages].filter(
    (url, index, all) => all.indexOf(url) === index,
  );

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const startingPrice = getProviderStartingPrice(provider.id);
  const priceLabel = formatStartingPriceLabel(startingPrice);

  return (
    <>
      <Gallery
        images={galleryImages}
        alt={provider.businessName}
        onOpenLightbox={openLightbox}
      />

      <ProviderHeader provider={provider} user={user} />
      <ProviderAbout provider={provider} user={user} />
      <ServicesTable
        services={getServicesForProvider(provider.id)}
        providerId={provider.id}
      />
      <AvailabilityPreview days={getAvailabilityPreview(provider.id)} />
      <ProviderPortfolio
        images={portfolioImages}
        alt={provider.businessName}
        onOpenLightbox={(index) => {
          const offset = galleryImages.length;
          openLightbox(offset + index);
        }}
      />
      <ReviewsSection provider={provider} reviews={reviews} />
      <ProviderCredentials credentials={getProviderCredentials(provider)} />
      <ProviderFaqSection faqs={getProviderFaqs(provider.id)} />
      <ProviderServiceArea provider={provider} />

      <p className="mt-8 border-t border-border pt-8 pb-8 text-center text-sm text-ink-300 md:mt-12 md:pb-10">
        <Link href="/report/" className="hover:text-text-secondary hover:underline">
          Report this listing
        </Link>
      </p>

      <StickyBookingBar priceLabel={priceLabel} providerId={provider.id} />

      <GalleryLightbox
        images={allLightboxImages}
        index={lightboxIndex}
        open={lightboxOpen}
        onOpenChange={setLightboxOpen}
        onIndexChange={setLightboxIndex}
        alt={provider.businessName}
      />
    </>
  );
}
