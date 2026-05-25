import { BLUR_DATA_URL } from "@/lib/image-placeholder";
import { cn } from "@/lib/utils";

/** Neutral fallback behind photos when object-cover does not fill the frame. */
export const GALLERY_FRAME_CLASS = "relative overflow-hidden bg-stone-100";

export const GALLERY_IMAGE_CLASS = "block h-full w-full object-cover";

type GalleryMediaImageProps = {
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
  priority?: boolean;
  width?: number;
  height?: number;
  onClick?: () => void;
};

export function GalleryMediaImage({
  src,
  alt,
  className,
  loading = "lazy",
  priority = false,
  width = 1200,
  height = 800,
  onClick,
}: GalleryMediaImageProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : loading}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      onClick={onClick}
      className={cn(GALLERY_IMAGE_CLASS, className)}
      style={{ backgroundImage: `url(${BLUR_DATA_URL})`, backgroundSize: "cover" }}
    />
  );
}
