"use client";

import Link from "next/link";
import { useState } from "react";
import { Clock, Heart, Shield, Star, User } from "lucide-react";
import type { PricingUnit, Provider } from "@/lib/mock";
import { getProviderStartingPrice } from "@/lib/mock";
import { cn } from "@/lib/utils";

type ProviderCardProps = {
  provider: Provider;
  className?: string;
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

export function ProviderCard({ provider, className }: ProviderCardProps) {
  const [saved, setSaved] = useState(false);
  const [imageError, setImageError] = useState(false);
  const startingPrice = getProviderStartingPrice(provider.id);
  const isFastResponder = provider.responseTimeMinutes < 60;

  const badges = [
    provider.isTopRated && {
      key: "top-rated",
      label: "⭐ Top rated",
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
        "group relative rounded-2xl border border-transparent bg-bg p-3 transition ease-default duration-default",
        "hover:-translate-y-0.5 hover:border-border hover:shadow-lg",
        className,
      )}
    >
      <Link href={`/p/${provider.handle}/`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-bg-elevated-2">
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
              className="size-full object-cover transition ease-default duration-default group-hover:scale-[1.02]"
            />
          )}
        </div>

        <div className="mt-3 space-y-1">
          <h3 className="truncate font-semibold text-text-primary">
            {provider.businessName}
          </h3>
          <p className="truncate text-body-sm text-text-secondary">
            {provider.headline}
          </p>
        </div>

        <div className="mt-2 flex items-center gap-1.5 text-body-sm">
          <Star className="size-icon-sm fill-star text-star" />
          <span className="font-medium text-text-primary">
            {provider.ratingAvg.toFixed(1)}
          </span>
          <span className="text-text-tertiary">({provider.ratingCount})</span>
        </div>

        <div
          className={cn(
            "mt-2 inline-flex items-center gap-1 text-caption",
            isFastResponder ? "text-sage-500" : "text-text-tertiary",
          )}
        >
          <Clock className="size-3.5" />
          {formatResponseTime(provider.responseTimeMinutes)}
        </div>

        <p className="mt-1 inline-flex items-center gap-1 text-caption text-ink-400">
          <span aria-hidden>📍</span>
          {formatDistance(provider.distanceMi)}
        </p>

        {startingPrice && (
          <p className="mt-2 text-body-sm font-medium text-text-primary">
            {formatPrice(startingPrice.cents, startingPrice.unit)}
          </p>
        )}

        {badges.length > 0 && (
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
                  <badge.icon className="size-3 shrink-0" />
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
        onClick={() => setSaved((current) => !current)}
        className={cn(
          "absolute right-5 top-5 z-10 inline-flex h-[2rem] w-[2rem] items-center justify-center rounded-full border-0 bg-bg/90 backdrop-blur-sm transition ease-default duration-default",
          saved
            ? "text-clay-500"
            : "text-text-secondary hover:text-text-primary",
        )}
      >
        <Heart className={cn("size-icon-sm", saved && "fill-current")} />
      </button>
    </article>
  );
}

