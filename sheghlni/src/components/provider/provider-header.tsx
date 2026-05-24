"use client";

import Link from "next/link";
import { Star } from "lucide-react";
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
    <section className="mt-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex items-start gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={user.avatarUrl ?? provider.heroImageUrl}
              alt={user.fullName}
              className={cn(
                "size-[4.5rem] rounded-full object-cover",
                isVerified ? "border-2 border-bronze-500" : "border border-border",
              )}
            />
            <div className="min-w-0">
              <h1 className="font-display text-h1 text-text-primary">
                {provider.businessName}
              </h1>
              <p className="mt-1 text-body-lg text-ink-500">{provider.headline}</p>
            </div>
          </div>

          <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-body-sm text-text-secondary">
            <span className="inline-flex items-center gap-1">
              <Star className="size-4 fill-star text-star" />
              <span className="font-medium text-text-primary">
                {provider.ratingAvg.toFixed(1)}
              </span>
              <span>({provider.ratingCount} reviews)</span>
            </span>
            <span aria-hidden>·</span>
            <span>📍 {formatProviderLocation(provider)}</span>
            <span aria-hidden>·</span>
            <span>⏱ {formatResponseTime(provider.responseTimeMinutes)}</span>
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {provider.badges.map((badge) => {
              const config = getBadgeConfig(badge);
              if (!config) return null;
              return (
                <span
                  key={badge}
                  className={cn(
                    "inline-flex items-center rounded-full px-3 py-1 text-caption font-medium",
                    config.className,
                  )}
                >
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
          className="inline-flex h-11 w-full items-center justify-center rounded-full border border-border bg-background text-sm font-medium text-ink-900 hover:bg-muted"
        >
          Message {firstName}
        </Link>
        <Link
          href="/bookings/"
          className="inline-flex h-11 w-full items-center justify-center rounded-full bg-cta text-sm font-semibold text-white hover:bg-cta-hover"
        >
          Request booking
        </Link>
      </div>
    </section>
  );
}




