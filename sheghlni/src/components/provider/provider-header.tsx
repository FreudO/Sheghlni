"use client";

import Link from "next/link";
import { Clock, MapPin, Star } from "lucide-react";
import { ICON_STROKE, InlineIcon } from "@/components/ui/icon-well";
import type { Provider, User } from "@/lib/mock";
import { formatProviderLocation } from "@/lib/mock";
import {
  formatResponseTime,
  getBadgeConfig,
  getFirstName,
} from "@/lib/provider/profile-data";
import { cn } from "@/lib/utils";

type ProviderHeaderProps = {
  provider: Provider;
  user: User;
};

export function ProviderHeader({ provider, user }: ProviderHeaderProps) {
  const isVerified = provider.badges.includes("verified-id");
  const firstName = getFirstName(user.fullName);

  return (
    <section className="mt-6 md:mt-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex items-start gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={user.avatarUrl ?? provider.heroImageUrl}
              alt={user.fullName}
              className={cn(
                "size-14 shrink-0 rounded-full object-cover md:size-[4.5rem]",
                isVerified ? "border-2 border-bronze-500" : "border border-border",
              )}
            />
            <div className="min-w-0 text-left">
              <h1 className="font-display text-[1.375rem] font-medium text-text-primary md:text-h1">
                {provider.businessName}
              </h1>
              <p className="mt-1 text-[0.9375rem] text-ink-500 md:text-body-lg">
                {provider.headline}
              </p>
            </div>
          </div>

          <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-text-secondary md:text-body-sm">
            <span className="inline-flex items-center gap-1">
              <Star className="size-4 fill-star text-star" strokeWidth={ICON_STROKE} />
              <span className="font-medium text-text-primary">
                {provider.ratingAvg.toFixed(1)}
              </span>
              <span>({provider.ratingCount} reviews)</span>
            </span>
            <span aria-hidden className="hidden sm:inline">
              ·
            </span>
            <span className="inline-flex items-center gap-1">
              <InlineIcon icon={MapPin} className="text-ink-400" />
              {formatProviderLocation(provider)}
            </span>
            <span aria-hidden className="hidden sm:inline">
              ·
            </span>
            <span className="inline-flex items-center gap-1">
              <InlineIcon icon={Clock} className="text-ink-400" />
              {formatResponseTime(provider.responseTimeMinutes)}
            </span>
          </p>

          <div className="-mx-4 mt-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] md:mx-0 md:flex-wrap md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden">
            {provider.badges.map((badge) => {
              const config = getBadgeConfig(badge);
              if (!config) return null;
              const BadgeIcon = config.icon;
              return (
                <span
                  key={badge}
                  className={cn(
                    "inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-caption font-medium",
                    config.className,
                  )}
                >
                  <BadgeIcon
                    className={cn("size-3.5 shrink-0", config.iconClassName)}
                    strokeWidth={ICON_STROKE}
                    aria-hidden
                  />
                  {config.label}
                </span>
              );
            })}
          </div>
        </div>

        <div className="hidden w-full max-w-sm shrink-0 flex-col gap-3 lg:flex">
          <Link
            href="/inbox/"
            className="inline-flex h-11 items-center justify-center rounded-full border border-border bg-background text-sm font-medium text-ink-900 hover:bg-muted"
          >
            Message {firstName}
          </Link>
          <Link
            href="/bookings/"
            className="inline-flex h-11 items-center justify-center rounded-full bg-cta text-sm font-semibold text-white hover:bg-cta-hover"
          >
            Request booking
          </Link>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 lg:hidden">
        <Link
          href="/inbox/"
          className="inline-flex h-[3.25rem] w-full items-center justify-center rounded-full border border-border bg-background text-sm font-medium text-ink-900 hover:bg-muted"
        >
          Message {firstName}
        </Link>
        <Link
          href="/bookings/"
          className="inline-flex h-[3.25rem] w-full items-center justify-center rounded-full bg-cta text-sm font-semibold text-white hover:bg-cta-hover"
        >
          Request booking
        </Link>
      </div>
    </section>
  );
}
