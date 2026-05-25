"use client";

import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { IconWell } from "@/components/ui/icon-well";
import {
  formatAddressLine,
  formatBookingDateTime,
  formatUsdExact,
} from "@/lib/messaging/format";
import type { Booking } from "@/lib/mock";

type BookingCardProps = {
  booking: Booking;
};

export function BookingCard({ booking }: BookingCardProps) {
  const address = formatAddressLine(
    booking.serviceAddress.line1,
    booking.serviceAddress.city,
    booking.serviceAddress.region,
  );

  return (
    <div className="w-full max-w-[min(100%,20rem)] overflow-hidden rounded-xl border border-border bg-bg-elevated">
      <div className="flex items-center gap-2.5 border-b border-border px-3 py-2.5">
        <IconWell icon={CalendarDays} size="sm" iconClassName="text-sage-500" />
        <p className="text-sm font-semibold text-text-primary">
          Booking confirmed
        </p>
      </div>
      <div className="space-y-1 px-3 py-2.5 text-sm text-text-primary">
        <p className="font-medium">{formatBookingDateTime(booking.startsAt)}</p>
        <p className="text-text-secondary">{address}</p>
        <p className="font-semibold">{formatUsdExact(booking.totalCents)}</p>
      </div>
      <div className="border-t border-border px-3 py-3">
        <Link
          href="/bookings/"
          className="inline-flex h-11 w-full items-center justify-center rounded-full border border-border bg-background text-sm font-medium text-ink-900 transition hover:bg-muted dark:text-text-primary"
        >
          View booking
        </Link>
      </div>
    </div>
  );
}
