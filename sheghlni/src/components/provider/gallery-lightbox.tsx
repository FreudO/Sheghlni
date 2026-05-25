"use client";

import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import {
  GALLERY_FRAME_CLASS,
  GalleryMediaImage,
} from "@/components/provider/gallery-media";
import { cn } from "@/lib/utils";

type GalleryLightboxProps = {
  images: string[];
  index: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onIndexChange: (index: number) => void;
  alt: string;
  /** When set, lightbox opens in this layout (grid = all photos visible at once). */
  initialView?: "carousel" | "grid";
};

export function GalleryLightbox({
  images,
  index,
  open,
  onOpenChange,
  onIndexChange,
  alt,
  initialView = "carousel",
}: GalleryLightboxProps) {
  const [view, setView] = useState<"carousel" | "grid">(initialView);

  useEffect(() => {
    if (open) setView(initialView);
  }, [open, initialView]);

  const hasPrev = index > 0;
  const hasNext = index < images.length - 1;

  useEffect(() => {
    if (!open || view !== "carousel") return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft" && hasPrev) onIndexChange(index - 1);
      if (event.key === "ArrowRight" && hasNext) onIndexChange(index + 1);
      if (event.key === "Escape") onOpenChange(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, view, index, hasPrev, hasNext, onIndexChange, onOpenChange]);

  const openCarouselAt = (thumbIndex: number) => {
    onIndexChange(thumbIndex);
    setView("carousel");
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[70] bg-ink-900/95" />
        <Dialog.Content className="fixed inset-0 z-[70] flex flex-col outline-none">
          <div className="flex items-center justify-between px-4 py-3 text-cream-50">
            <Dialog.Title className="text-sm font-medium">
              {view === "grid"
                ? `${images.length} photos`
                : `${index + 1} / ${images.length}`}
            </Dialog.Title>
            <div className="flex items-center gap-2">
              {view === "carousel" && images.length > 1 && (
                <button
                  type="button"
                  onClick={() => setView("grid")}
                  className="rounded-full px-3 py-1.5 text-sm font-medium hover:bg-white/10"
                >
                  Show all
                </button>
              )}
              {view === "grid" && (
                <button
                  type="button"
                  onClick={() => setView("carousel")}
                  className="rounded-full px-3 py-1.5 text-sm font-medium hover:bg-white/10"
                >
                  Slideshow
                </button>
              )}
              <Dialog.Close className="rounded-full p-2 hover:bg-white/10">
                <X className="size-5" />
                <span className="sr-only">Close</span>
              </Dialog.Close>
            </div>
          </div>

          {view === "grid" ? (
            <div className="flex-1 overflow-y-auto px-4 pb-6">
              <div className="mx-auto grid max-w-6xl grid-cols-2 gap-2 sm:grid-cols-3 md:gap-3 lg:grid-cols-4">
                {images.map((image, thumbIndex) => (
                  <button
                    key={`${image}-${thumbIndex}`}
                    type="button"
                    onClick={() => openCarouselAt(thumbIndex)}
                    className={cn(
                      GALLERY_FRAME_CLASS,
                      "aspect-[4/3] w-full rounded-xl border-0",
                    )}
                  >
                    <GalleryMediaImage
                      src={image}
                      alt={`${alt} photo ${thumbIndex + 1}`}
                      className="rounded-xl"
                    />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              <div className="relative flex flex-1 items-center justify-center px-4 pb-4">
                <button
                  type="button"
                  disabled={!hasPrev}
                  onClick={() => onIndexChange(index - 1)}
                  className="absolute left-4 z-10 rounded-full bg-black/40 p-2 text-white disabled:opacity-30"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="size-6" />
                </button>

                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={images[index]}
                  alt={`${alt} photo ${index + 1}`}
                  className="max-h-[calc(100dvh-10rem)] max-w-full rounded-xl object-contain"
                />

                <button
                  type="button"
                  disabled={!hasNext}
                  onClick={() => onIndexChange(index + 1)}
                  className="absolute right-4 z-10 rounded-full bg-black/40 p-2 text-white disabled:opacity-30"
                  aria-label="Next photo"
                >
                  <ChevronRight className="size-6" />
                </button>
              </div>

              <div className="border-t border-white/10 px-4 py-3">
                <div className="mx-auto flex max-w-3xl gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {images.map((image, thumbIndex) => (
                    <button
                      key={`${image}-${thumbIndex}`}
                      type="button"
                      onClick={() => onIndexChange(thumbIndex)}
                      className={cn(
                        GALLERY_FRAME_CLASS,
                        "h-14 w-20 shrink-0 rounded-lg border-2",
                        thumbIndex === index
                          ? "border-bronze-500"
                          : "border-transparent opacity-70",
                      )}
                    >
                      <GalleryMediaImage src={image} alt="" />
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
