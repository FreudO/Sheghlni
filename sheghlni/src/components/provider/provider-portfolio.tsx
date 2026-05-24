"use client";

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
            className="aspect-[4/3] overflow-hidden rounded-xl"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image} alt={`${alt} portfolio ${index + 1}`} className="size-full object-cover" />
          </button>
        ))}
      </div>
    </section>
  );
}

