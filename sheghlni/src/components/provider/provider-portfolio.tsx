"use client";

import {
  GALLERY_FRAME_CLASS,
  GalleryMediaImage,
} from "@/components/provider/gallery-media";
import { cn } from "@/lib/utils";

type ProviderPortfolioProps = {
  images: string[];
  alt: string;
  onOpenLightbox: (index: number) => void;
};

export function ProviderPortfolio({
  images,
  alt,
  onOpenLightbox,
}: ProviderPortfolioProps) {
  if (images.length === 0) return null;

  return (
    <section className="mt-12 border-t border-border pt-10">
      <h2 className="font-display text-h2 text-text-primary">Portfolio</h2>
      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
        {images.map((image, index) => (
          <button
            key={`${image}-${index}`}
            type="button"
            onClick={() => onOpenLightbox(index)}
            className={cn(GALLERY_FRAME_CLASS, "aspect-[4/3] w-full rounded-xl")}
          >
            <GalleryMediaImage
              src={image}
              alt={`${alt} portfolio ${index + 1}`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
