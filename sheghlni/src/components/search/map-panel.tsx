"use client";

import type { Provider } from "@/lib/mock";
import type { MapPin } from "@/lib/search/map-positions";
import { cn } from "@/lib/utils";

type MapPanelProps = {
  providers: Provider[];
  pins: MapPin[];
  highlightedProviderId: string | null;
  onPinHover: (providerId: string | null) => void;
  onPinClick?: (providerId: string) => void;
  className?: string;
  cityLabel?: string;
  overlay?: boolean;
};

function StreetGrid() {
  const lines: React.ReactNode[] = [];
  for (let i = 0; i <= 10; i += 1) {
    const pos = 10 + i * 8;
    lines.push(
      <line
        key={`v-${i}`}
        x1={`${pos}%`}
        y1="0%"
        x2={`${pos}%`}
        y2="100%"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.35"
      />,
      <line
        key={`h-${i}`}
        x1="0%"
        y1={`${pos}%`}
        x2="100%"
        y2={`${pos}%`}
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.35"
      />,
    );
  }
  return (
    <svg
      className="absolute inset-0 size-full text-black/10 dark:text-white/10"
      preserveAspectRatio="none"
      aria-hidden
    >
      {lines}
    </svg>
  );
}

export function MapPanel({
  providers,
  pins,
  highlightedProviderId,
  onPinHover,
  onPinClick,
  className,
  cityLabel = "Boston",
  overlay = false,
}: MapPanelProps) {
  const mapsQuery = encodeURIComponent(`${cityLabel}, MA`);

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-[#E8E0D5] dark:bg-[#1A1F35]",
        className,
      )}
    >
      <StreetGrid />

      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_45%),radial-gradient(circle_at_70%_80%,rgba(0,0,0,0.06),transparent_40%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.04),transparent_45%),radial-gradient(circle_at_70%_80%,rgba(0,0,0,0.25),transparent_40%)]"
        aria-hidden
      />

      {pins.map((pin) => {
        const provider = providers.find((p) => p.id === pin.providerId);
        const active = highlightedProviderId === pin.providerId;

        return (
          <button
            key={pin.providerId}
            type="button"
            aria-label={provider?.businessName ?? "Provider location"}
            className={cn(
              "absolute z-10 flex size-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border text-[0.625rem] font-semibold leading-none transition ease-default duration-default",
              active
                ? "scale-110 border-cream-50 bg-bronze-500 text-cream-50 shadow-lg"
                : "border-cream-50/90 bg-bronze-600 text-cream-50 hover:scale-105 hover:bg-bronze-500",
            )}
            style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
            onMouseEnter={() => onPinHover(pin.providerId)}
            onMouseLeave={() => onPinHover(null)}
            onFocus={() => onPinHover(pin.providerId)}
            onBlur={() => onPinHover(null)}
            onClick={() => onPinClick?.(pin.providerId)}
          >
            {pin.initials}
          </button>
        );
      })}

      <div
        className={cn(
          "absolute inset-x-0 bottom-0 flex justify-center p-4",
          overlay && "pb-6",
        )}
      >
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-bg/95 px-4 py-2 text-sm font-medium text-text-primary shadow-lg backdrop-blur-sm transition hover:bg-bg"
        >
          🗺 View live map
        </a>
      </div>
    </div>
  );
}
