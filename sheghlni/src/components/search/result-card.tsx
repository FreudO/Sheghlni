"use client";

import Link from "next/link";
import { useState } from "react";
import { Clock, Shield, Star, User } from "lucide-react";
import type { PricingUnit, Provider } from "@/lib/mock";
import {
  getProviderPrimaryCategoryName,
  getProviderStartingPrice,
} from "@/lib/mock";
import { cn } from "@/lib/utils";

type ResultCardProps = {
  provider: Provider;
  highlighted?: boolean;
  onHover?: (providerId: string | null) => void;
  compact?: boolean;
  layout?: "default" | "mobile";
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
  if (minutes < 60) return `Responds in ~${minutes} min`;
  return `Responds in ~${Math.round(minutes / 60)}hr`;
}

function formatDistance(miles: number): string {
  const formatted =
    miles < 10 ? miles.toFixed(1).replace(/\.0$/, "") : miles.toFixed(1);
  return `${formatted} mi away`;
}

export function ResultCard({
  provider,
  highlighted = false,
  onHover,
  compact = false,
  layout = "default",
}: ResultCardProps) {
  const [imageError, setImageError] = useState(false);
  const startingPrice = getProviderStartingPrice(provider.id);
  const categoryLabel = getProviderPrimaryCategoryName(provider.id);
  const isFastResponder = provider.responseTimeMinutes < 60;
  const isMobile = layout === "mobile";

  const badges = [
    provider.isTopRated && "⭐ Top rated",
    provider.badges.includes("verified-id") && "Verified ID",
    (provider.premiumTier !== "none" || provider.badges.includes("premium")) &&
      "Premium",
  ].filter(Boolean) as string[];

  return (
    <article
      id={`result-${provider.id}`}
      className={cn(
        "overflow-hidden rounded-2xl border bg-bg transition ease-default duration-default",
        highlighted
          ? "border-bronze-500 shadow-md ring-1 ring-bronze-500/30"
          : "border-border hover:border-border hover:shadow-sm",
        compact ? "p-3" : isMobile ? "p-0" : "p-4",
      )}
      onMouseEnter={() => onHover?.(provider.id)}
      onMouseLeave={() => onHover?.(null)}
    >
      <div
        className={cn(
          "flex gap-4",
          compact ? "flex-col" : isMobile ? "flex-col" : "flex-col md:flex-row md:items-start",
        )}
      >
        <Link
          href={`/p/${provider.handle}/`}
          className={cn(
            "relative shrink-0 overflow-hidden bg-stone-100",
            isMobile || compact
              ? "aspect-video w-full rounded-t-2xl"
              : "aspect-[4/3] w-full md:h-[120px] md:w-[160px] md:aspect-auto md:rounded-xl",
          )}
        >
          {imageError ? (
            <div className="flex size-full flex-col items-center justify-center gap-2 text-text-tertiary">
              <User className="size-8 stroke-[1.25]" />
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
              className="block h-full w-full object-cover"
            />
          )}
        </Link>

        <div className={cn("min-w-0 flex-1", (isMobile || compact) && "p-4")}>
          <Link href={`/p/${provider.handle}/`} className="group block">
            <h3
              className={cn(
                "font-semibold text-text-primary group-hover:text-cta",
                isMobile && "text-base",
              )}
            >
              {provider.businessName}
            </h3>
            <p
              className={cn(
                "mt-0.5 text-text-secondary",
                isMobile ? "line-clamp-1 text-[0.8125rem]" : "line-clamp-2 text-body-sm",
              )}
            >
              {provider.headline}
            </p>
          </Link>

          {badges.length > 0 && !isMobile && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {badges.slice(0, 3).map((badge) => (
                <span
                  key={badge}
                  className={cn(
                    "inline-flex items-center rounded-full px-2 py-0.5 text-caption",
                    badge.includes("Top rated")
                      ? "bg-gold-500/15 text-gold-500"
                      : "bg-bg-elevated text-text-secondary",
                  )}
                >
                  {badge.includes("Verified") && (
                    <Shield className="mr-1 size-3" />
                  )}
                  {badge}
                </span>
              ))}
            </div>
          )}

          <div
            className={cn(
              "mt-2 flex flex-wrap items-center gap-x-2 gap-y-0.5",
              isMobile ? "text-[0.8125rem]" : "gap-x-3 text-body-sm",
            )}
          >
            <span className="inline-flex items-center gap-1">
              <Star className="size-3.5 fill-star text-star" />
              <span className="font-medium text-text-primary">
                {provider.ratingAvg.toFixed(1)}
              </span>
              <span className="text-text-tertiary">({provider.ratingCount})</span>
            </span>
            <span
              className={cn(
                "inline-flex items-center gap-1",
                isFastResponder ? "text-sage-500" : "text-text-tertiary",
              )}
            >
              <Clock className="size-3.5" />
              {formatResponseTime(provider.responseTimeMinutes)}
            </span>
            <span className="text-ink-400">📍 {formatDistance(provider.distanceMi)}</span>
          </div>

          {!isMobile && (
            <p className="mt-1 text-caption text-text-tertiary">{categoryLabel}</p>
          )}

          {startingPrice && (
            <p className="mt-2 text-body-sm font-medium text-text-primary">
              {formatPrice(startingPrice.cents, startingPrice.unit)}
            </p>
          )}

          {!isMobile && (
            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                href="/inbox/"
                className="inline-flex min-h-11 items-center justify-center rounded-full px-4 text-[0.8rem] font-medium text-text-primary transition hover:bg-muted"
              >
                Message
              </Link>
              <Link
                href={`/p/${provider.handle}/`}
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-border bg-background px-4 text-[0.8rem] font-medium text-text-primary transition hover:bg-muted"
              >
                View profile
              </Link>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
