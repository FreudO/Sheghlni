"use client";

import Link from "next/link";
import type { PricingUnit } from "@/lib/mock";

type StickyBookingBarProps = {
  priceLabel: string;
};

export function StickyBookingBar({ priceLabel }: StickyBookingBarProps) {
  return (
    <div className="fixed inset-x-0 bottom-[calc(4rem+env(safe-area-inset-bottom))] z-40 border-t border-border bg-bg-elevated lg:hidden">
      <div className="mx-auto flex h-[4.5rem] max-w-[1280px] items-center gap-3 px-4">
        <p className="min-w-0 flex-1 text-sm font-semibold text-text-primary">
          {priceLabel}
        </p>
        <Link
          href="/inbox/"
          className="inline-flex h-10 items-center justify-center rounded-full border border-border px-4 text-sm font-medium text-text-primary"
        >
          Message
        </Link>
        <Link
          href="/bookings/"
          className="inline-flex h-10 items-center justify-center rounded-full bg-cta px-4 text-sm font-semibold text-white"
        >
          Book now
        </Link>
      </div>
    </div>
  );
}

export function formatStartingPriceLabel(
  price: { cents: number; unit: PricingUnit } | null,
): string {
  if (!price) return "Request a quote";
  const dollars = Math.round(price.cents / 100);
  const unitLabel: Record<PricingUnit, string> = {
    hour: "hr",
    project: "project",
    visit: "visit",
    session: "session",
    custom: "job",
  };
  return `From $${dollars}/${unitLabel[price.unit]}`;
}




