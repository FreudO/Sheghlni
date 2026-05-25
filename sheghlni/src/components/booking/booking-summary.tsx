"use client";

import { format, parseISO } from "date-fns";
import type { Provider, Service, User } from "@/lib/mock";
import type { BookingQuote, TimeSlot } from "@/lib/booking/utils";
import { formatQuoteTotal } from "@/lib/booking/utils";
import { cn } from "@/lib/utils";

type BookingSummaryProps = {
  provider: Provider;
  user: User;
  service: Service;
  description: string;
  location: string;
  isRemote: boolean;
  selectedDate: string | null;
  selectedTime: TimeSlot | null;
  quote: BookingQuote;
  className?: string;
};

export function BookingSummary({
  provider,
  user,
  service,
  description,
  location,
  isRemote,
  selectedDate,
  selectedTime,
  quote,
  className,
}: BookingSummaryProps) {
  const dateLabel =
    selectedDate && selectedTime
      ? `${format(parseISO(selectedDate), "EEE, MMM d")} · ${selectedTime}`
      : "Select date & time";

  return (
    <aside
      className={cn(
        "rounded-2xl border border-border bg-bg-elevated p-5",
        className,
      )}
    >
      <h3 className="text-sm font-semibold text-text-primary">Order summary</h3>
      <div className="mt-4 flex items-center gap-3 border-b border-border pb-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={user.avatarUrl ?? provider.heroImageUrl}
          alt=""
          className="size-12 rounded-full object-cover"
        />
        <div className="min-w-0">
          <p className="truncate font-medium text-text-primary">
            {provider.businessName}
          </p>
          <p className="truncate text-sm text-text-secondary">{service.title}</p>
        </div>
      </div>
      <dl className="mt-4 space-y-2 text-sm">
        <div>
          <dt className="text-ink-300">When</dt>
          <dd className="text-text-primary">{dateLabel}</dd>
        </div>
        <div>
          <dt className="text-ink-300">Where</dt>
          <dd className="text-text-primary">
            {isRemote ? "Online / Remote" : location || "—"}
          </dd>
        </div>
        <div>
          <dt className="text-ink-300">Job details</dt>
          <dd className="line-clamp-3 text-text-primary">{description || "—"}</dd>
        </div>
      </dl>
      <div className="mt-4 space-y-1 border-t border-border pt-4 text-sm">
        <div className="flex justify-between text-text-secondary">
          <span>Subtotal</span>
          <span>{formatQuoteTotal(quote.subtotalCents)}</span>
        </div>
        <div className="flex justify-between text-text-secondary">
          <span>Service fee (5%)</span>
          <span>{formatQuoteTotal(quote.platformFeeCents)}</span>
        </div>
        <div className="flex justify-between font-display text-xl font-medium text-text-primary">
          <span>Total</span>
          <span>{formatQuoteTotal(quote.totalCents)}</span>
        </div>
      </div>
    </aside>
  );
}
