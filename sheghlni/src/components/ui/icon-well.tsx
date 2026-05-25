import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/** Matches trust band: rounded well + Lucide at strokeWidth 1.5 */
export const ICON_STROKE = 1.5;

export type IconWellSize = "sm" | "md" | "lg";
export type IconWellTone = "dark" | "light";

const SIZES: Record<IconWellSize, { well: string; icon: string }> = {
  sm: { well: "size-8", icon: "size-4" },
  md: { well: "size-10", icon: "size-6" },
  lg: { well: "size-12", icon: "size-7" },
};

const TONE_WELL: Record<IconWellTone, string> = {
  dark: "bg-white/10",
  light: "bg-bg-elevated border border-border/50",
};

type IconWellProps = {
  icon: LucideIcon;
  size?: IconWellSize;
  tone?: IconWellTone;
  iconClassName?: string;
  className?: string;
};

export function IconWell({
  icon: Icon,
  size = "md",
  tone = "light",
  iconClassName,
  className,
}: IconWellProps) {
  const dimensions = SIZES[size];

  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full",
        dimensions.well,
        TONE_WELL[tone],
        className,
      )}
    >
      <Icon
        className={cn(
          dimensions.icon,
          iconClassName ?? (tone === "dark" ? "text-cream-100" : "text-bronze-500"),
        )}
        strokeWidth={ICON_STROKE}
        aria-hidden
      />
    </span>
  );
}

/** Inline Lucide for metadata rows (distance, time, etc.) */
export function InlineIcon({
  icon: Icon,
  className,
}: {
  icon: LucideIcon;
  className?: string;
}) {
  return (
    <Icon
      className={cn("size-3.5 shrink-0", className)}
      strokeWidth={ICON_STROKE}
      aria-hidden
    />
  );
}
