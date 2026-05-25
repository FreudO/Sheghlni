"use client";

import { useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Star, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ICON_STROKE } from "@/components/ui/icon-well";
import { cn } from "@/lib/utils";

const MAX_CHARS = 2000;
const MAX_PHOTOS = 5;

type ReviewModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  proName: string;
  onSubmit: (rating: number, body: string) => void;
};

export function ReviewModal({
  open,
  onOpenChange,
  proName,
  onSubmit,
}: ReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [body, setBody] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  const displayRating = hoverRating || rating;

  const handleSubmit = () => {
    if (rating < 1) return;
    onSubmit(rating, body.trim());
    setRating(0);
    setHoverRating(0);
    setBody("");
    setPhotos([]);
    onOpenChange(false);
  };

  const addPhotos = (files: FileList | null) => {
    if (!files) return;
    const urls = Array.from(files)
      .filter((f) => f.type.startsWith("image/"))
      .map((f) => URL.createObjectURL(f));
    setPhotos((prev) => [...prev, ...urls].slice(0, MAX_PHOTOS));
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[80] bg-ink-900/50" />
        <Dialog.Content className="fixed inset-x-4 top-[10%] z-[80] mx-auto max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-border bg-bg p-6 shadow-xl outline-none md:inset-x-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
          <div className="flex items-start justify-between gap-4">
            <Dialog.Title className="font-display text-h3 text-text-primary">
              Write a review
            </Dialog.Title>
            <Dialog.Close
              className="rounded-full p-1 text-ink-300 hover:bg-bg-elevated-2"
              aria-label="Close"
            >
              <X className="size-5" strokeWidth={ICON_STROKE} />
            </Dialog.Close>
          </div>

          <p className="mt-2 text-sm text-text-secondary">
            Tell others about your experience with {proName}
          </p>

          <div
            className="mt-6 flex gap-1"
            role="radiogroup"
            aria-label="Star rating"
          >
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                className="rounded p-0.5 transition"
                onMouseEnter={() => setHoverRating(value)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(value)}
                aria-label={`${value} stars`}
              >
                <Star
                  className={cn(
                    "size-9 transition",
                    value <= displayRating
                      ? "fill-star text-star"
                      : "text-ink-300",
                  )}
                  strokeWidth={ICON_STROKE}
                />
              </button>
            ))}
          </div>

          <label className="mt-6 block">
            <textarea
              value={body}
              onChange={(e) =>
                setBody(e.target.value.slice(0, MAX_CHARS))
              }
              rows={5}
              placeholder={`Tell others about your experience with ${proName}`}
              className="w-full resize-y rounded-2xl border border-border bg-bg-elevated px-4 py-3 text-sm text-text-primary outline-none placeholder:text-ink-300 focus-visible:ring-2 focus-visible:ring-bronze-500/30"
            />
            <span className="mt-1 block text-right text-xs text-ink-300">
              {body.length}/{MAX_CHARS}
            </span>
          </label>

          <div className="mt-4">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-border py-6 text-sm text-text-secondary hover:border-bronze-500/50"
            >
              <Upload className="size-4" strokeWidth={ICON_STROKE} />
              Add photos (up to {MAX_PHOTOS})
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              multiple
              className="sr-only"
              onChange={(e) => addPhotos(e.target.files)}
            />
            {photos.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {photos.map((url) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={url}
                    src={url}
                    alt=""
                    className="size-16 rounded-lg object-cover"
                  />
                ))}
              </div>
            )}
          </div>

          <Button
            type="button"
            disabled={rating < 1}
            onClick={handleSubmit}
            className="mt-6 h-12 w-full rounded-full bg-cta text-base font-semibold text-white hover:bg-cta-hover disabled:opacity-50"
          >
            Submit review
          </Button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
