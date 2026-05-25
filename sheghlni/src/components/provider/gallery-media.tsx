import { cn } from "@/lib/utils";

/** Neutral fallback behind photos when object-cover does not fill the frame. */
export const GALLERY_FRAME_CLASS = "relative overflow-hidden bg-stone-100";

export const GALLERY_IMAGE_CLASS = "block h-full w-full object-cover";

type GalleryMediaImageProps = {
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
  onClick?: () => void;
};

export function GalleryMediaImage({
  src,
  alt,
  className,
  loading = "lazy",
  onClick,
}: GalleryMediaImageProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading={loading}
      decoding="async"
      onClick={onClick}
      className={cn(GALLERY_IMAGE_CLASS, className)}
    />
  );
}
