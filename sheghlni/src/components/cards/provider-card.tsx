"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Clock, Heart, MapPin, Shield, Star, User } from "lucide-react";
import { ICON_STROKE, InlineIcon } from "@/components/ui/icon-well";
import type { PricingUnit, Provider } from "@/lib/mock";
import { getProviderStartingPrice } from "@/lib/mock";
import {
  isProviderSaved,
  subscribeSaved,
  toggleProviderSaved,
} from "@/lib/saved/saved-store";
import { toast } from "@/lib/toast";
import { cn } from "@/lib/utils";

type ProviderCardProps = {
  provider: Provider;
  className?: string;
  layout?: "default" | "carousel";
};

function formatPrice(cents: number, unit: PricingUnit): string {
  const dollars = Math.round(cents / 100);
  const unitLabel: Record<PricingUnit, string> = {
    hour: "hr",
    project: "project",
    visit: "visit",
    session: "session",
    custom: "job",
  };
  return `From $${dollars}/${unitLabel[unit]}`;
}

function formatResponseTime(minutes: number): string {
  if (minutes < 60) {
    return `Responds in ~${minutes} min`;
  }
  const hours = Math.round(minutes / 60);
  return `Responds in ~${hours}hr`;
}

function formatDistance(miles: number): string {
  const formatted =
    miles < 10 ? miles.toFixed(1).replace(/\.0$/, "") : miles.toFixed(1);
  return `${formatted} mi away`;
}

export function ProviderCard({
  provider,
  className,
  layout = "default",
}: ProviderCardProps) {
  const [saved, setSaved] = useState(() => isProviderSaved(provider.id));
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setSaved(isProviderSaved(provider.id));
    return subscribeSaved(() => setSaved(isProviderSaved(provider.id)));
  }, [provider.id]);
  const startingPrice = getProviderStartingPrice(provider.id);
  const isFastResponder = provider.responseTimeMinutes < 60;
  const isCarousel = layout === "carousel";

  const badges = [
    provider.isTopRated && {
      key: "top-rated",
      label: "Top rated",
      icon: Star,
      className: "bg-gold-500/15 text-gold-500",
    },
    provider.badges.includes("verified-id") && {
      key: "verified",
      label: "Verified ID",
      icon: Shield,
      className: "bg-bg-elevated text-text-secondary",
    },
    (provider.premiumTier !== "none" ||
      provider.badges.includes("premium")) && {
      key: "premium",
      label: "Premium",
      icon: Star,
      className: "bg-bg-elevated text-text-secondary",
    },
  ].filter(Boolean) as {
    key: string;
    label: string;
    icon: typeof Shield;
    className: string;
  }[];

  return (
    <article
      className={cn(
        "group relative overflow-hidden border border-transparent bg-bg transition ease-default duration-default",
        isCarousel
          ? "rounded-2xl p-0 hover:shadow-lg"
          : "rounded-2xl p-3 hover:-translate-y-0.5 hover:border-border hover:shadow-lg",
        className,
      )}
    >
      <Link href={`/p/${provider.handle}/`} className="block">
        <div
          className={cn(
            "relative overflow-hidden bg-stone-100",
            isCarousel
              ? "aspect-video rounded-t-2xl"
              : "aspect-[4/3] rounded-xl",
          )}
        >
          {imageError ? (
            <div className="flex size-full flex-col items-center justify-center gap-2 text-text-tertiary">
              <User className="size-10 stroke-[1.25]" />
              <span className="text-caption">Photo unavailable</span>
            </div>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={provider.heroImageUrl}
              alt={provider.businessName}
              loading="lazy"
              decoding="async"
              onError={() => setImageError(true)}
              className="block h-full w-full object-cover transition ease-default duration-default group-hover:scale-[1.02]"
            />
          )}
        </div>

        <div className={cn(isCarousel ? "space-y-1 p-3.5" : "mt-3 space-y-1")}>
          <h3
            className={cn(
              "truncate font-semibold text-text-primary",
              isCarousel ? "text-base" : "",
            )}
          >
            {provider.businessName}
          </h3>
          <p
            className={cn(
              "truncate text-text-secondary",
              isCarousel ? "text-[0.8125rem]" : "text-body-sm",
            )}
          >
            {provider.headline}
          </p>
        </div>

        <div
          className={cn(
            "flex flex-wrap items-center gap-x-2 gap-y-0.5",
            isCarousel ? "px-3.5" : "mt-2",
          )}
        >
          <span className="inline-flex items-center gap-1 text-body-sm">
            <Star className="size-3.5 fill-star text-star" strokeWidth={ICON_STROKE} />
            <span className="font-medium text-text-primary">
              {provider.ratingAvg.toFixed(1)}
            </span>
            <span className="text-text-tertiary">({provider.ratingCount})</span>
          </span>
          <span
            className={cn(
              "inline-flex items-center gap-1 text-[0.8125rem]",
              isFastResponder ? "text-sage-500" : "text-text-tertiary",
            )}
          >
            <Clock className="size-3.5" strokeWidth={ICON_STROKE} />
            {formatResponseTime(provider.responseTimeMinutes)}
          </span>
          <span className="inline-flex items-center gap-1 text-[0.8125rem] text-ink-400">
            <InlineIcon icon={MapPin} />
            {formatDistance(provider.distanceMi)}
          </span>
        </div>

        {startingPrice && (
          <p
            className={cn(
              "font-medium text-text-primary",
              isCarousel
                ? "px-3.5 pb-3.5 text-body-sm"
                : "mt-2 text-body-sm",
            )}
          >
            {formatPrice(startingPrice.cents, startingPrice.unit)}
          </p>
        )}

        {!isCarousel && badges.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {badges.slice(0, 3).map((badge) => (
              <span
                key={badge.key}
                className={cn(
                  "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-caption",
                  badge.className,
                )}
              >
                {badge.key !== "top-rated" && (
                  <badge.icon className="size-3.5 shrink-0" strokeWidth={ICON_STROKE} />
                )}
                {badge.label}
              </span>
            ))}
          </div>
        )}
      </Link>

      <button
        type="button"
        aria-label={saved ? "Remove from saved" : "Save provider"}
        aria-pressed={saved}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          const nowSaved = toggleProviderSaved(provider.id);
          toast.success(
            nowSaved ? "Saved to your list." : "Removed from saved.",
          );
        }}
        className={cn(
          "absolute z-10 inline-flex size-8 items-center justify-center rounded-full border-0 bg-white/90 shadow-sm backdrop-blur-sm transition ease-default duration-default dark:bg-ink-900/75",
          isCarousel ? "right-2.5 top-2.5" : "right-4 top-4",
          saved
            ? "text-clay-500"
            : "text-ink-500 hover:text-text-primary dark:text-cream-200",
        )}
      >
        <Heart
          className={cn("size-3.5", saved && "fill-current")}
          strokeWidth={ICON_STROKE}
        />
      </button>
    </article>
  );
}
