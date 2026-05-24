"use client";

import { useState } from "react";
import { motion, useMotionValue, animate, type PanInfo } from "framer-motion";
import { cn } from "@/lib/utils";

type GalleryProps = {
  images: string[];
  alt: string;
  onOpenLightbox: (index: number) => void;
};

export function Gallery({ images, alt, onOpenLightbox }: GalleryProps) {
  const [mobileIndex, setMobileIndex] = useState(0);
  const x = useMotionValue(0);

  const hero = images[0];
  const gridImages = images.slice(1, 5);
  const paddedGrid = [...gridImages];
  while (paddedGrid.length < 4) {
    paddedGrid.push(hero);
  }

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const threshold = 80;
    if (info.offset.x < -threshold && mobileIndex < images.length - 1) {
      setMobileIndex((current) => current + 1);
    } else if (info.offset.x > threshold && mobileIndex > 0) {
      setMobileIndex((current) => current - 1);
    }
    animate(x, 0, { duration: 0.2 });
  };

  return (
    <section className="-mx-6 lg:mx-0">
      <div className="relative hidden h-[28rem] lg:block">
        <div className="grid h-full grid-cols-[1.2fr_1fr] gap-2">
          <button
            type="button"
            onClick={() => onOpenLightbox(0)}
            className="relative overflow-hidden rounded-xl"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={hero} alt={alt} className="size-full object-cover" />
          </button>
          <div className="grid grid-cols-2 grid-rows-2 gap-2">
            {paddedGrid.map((image, index) => (
              <button
                key={`${image}-${index}`}
                type="button"
                onClick={() => onOpenLightbox(Math.min(index + 1, images.length - 1))}
                className="relative overflow-hidden rounded-xl"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image}
                  alt={`${alt} ${index + 2}`}
                  className="size-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
        <button
          type="button"
          onClick={() => onOpenLightbox(0)}
          className="absolute bottom-4 right-4 rounded-full bg-bg px-4 py-2 text-sm font-medium text-text-primary shadow-lg"
        >
          Show all photos
        </button>
      </div>

      <div className="relative lg:hidden">
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          style={{ x }}
          onDragEnd={handleDragEnd}
          className="relative aspect-[4/3] overflow-hidden"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images[mobileIndex]}
            alt={`${alt} ${mobileIndex + 1}`}
            className="size-full object-cover"
            onClick={() => onOpenLightbox(mobileIndex)}
          />
        </motion.div>
        <div className="absolute right-4 top-4 rounded-full bg-ink-900/70 px-3 py-1 text-caption text-cream-50">
          {mobileIndex + 1} / {images.length}
        </div>
        <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to photo ${index + 1}`}
              onClick={() => setMobileIndex(index)}
              className={cn(
                "size-2 rounded-full",
                index === mobileIndex ? "bg-cream-50" : "bg-cream-50/40",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}








