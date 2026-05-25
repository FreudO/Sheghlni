"use client";

import Link from "next/link";
import { format } from "date-fns";
import { CalendarPlus, Check, ClipboardList, MessageCircle } from "lucide-react";
import type { Provider, User } from "@/lib/mock";
import {
  downloadMockIcs,
  parseTimeSlotToDate,
  type TimeSlot,
} from "@/lib/booking/utils";
import { ICON_STROKE } from "@/components/ui/icon-well";

type ConfirmationStepProps = {
  provider: Provider;
  user: User;
  selectedDate: string;
  selectedTime: TimeSlot;
  location: string;
  isRemote: boolean;
  bookingReference: string;
  bookingId: string;
  conversationId: string;
};

export function ConfirmationStep({
  provider,
  user,
  selectedDate,
  selectedTime,
  location,
  isRemote,
  bookingReference,
  bookingId,
  conversationId,
}: ConfirmationStepProps) {
  const firstName = user.fullName.split(" ")[0] ?? user.fullName;
  const start = parseTimeSlotToDate(selectedDate, selectedTime);
  const dateLabel = format(start, "EEEE, MMMM d");
  const timeLabel = selectedTime;

  const handleCalendar = () => {
    downloadMockIcs({
      title: `${provider.businessName} — Sheghlni booking`,
      start,
      durationHours: 3,
      location: isRemote ? "Online" : location,
      reference: bookingReference,
    });
  };

  return (
    <div className="mx-auto max-w-lg py-4 text-center md:py-8">
      <div
        className="mx-auto flex size-20 items-center justify-center rounded-full bg-sage-500 text-white motion-safe:animate-booking-pop"
      >
        <Check className="size-10" strokeWidth={2} aria-hidden />
      </div>

      <h2 className="mt-8 font-display text-display-lg font-medium text-text-primary">
        Booked. {firstName} is set for {dateLabel} at {timeLabel}.
      </h2>

      <p className="mt-3 font-mono text-caption text-ink-300">
        {bookingReference}
      </p>

      <div className="mt-10 grid gap-3 sm:grid-cols-3">
        <button
          type="button"
          onClick={handleCalendar}
          className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-bg p-4 text-sm font-medium text-text-primary transition hover:bg-bg-elevated"
        >
          <CalendarPlus className="size-6 text-bronze-500" strokeWidth={ICON_STROKE} />
          Add to Calendar
        </button>
        <Link
          href={`/inbox/${conversationId}/`}
          className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-bg p-4 text-sm font-medium text-text-primary transition hover:bg-bg-elevated"
        >
          <MessageCircle className="size-6 text-bronze-500" strokeWidth={ICON_STROKE} />
          Message {firstName}
        </Link>
        <Link
          href="/bookings/"
          className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-bg p-4 text-sm font-medium text-text-primary transition hover:bg-bg-elevated"
        >
          <ClipboardList
            className="size-6 text-bronze-500"
            strokeWidth={ICON_STROKE}
          />
          View booking
        </Link>
      </div>

      <Link
        href="/search/"
        className="mt-10 inline-flex h-11 items-center justify-center rounded-full border border-border bg-background px-8 text-sm font-medium text-text-primary transition hover:bg-muted"
      >
        Find more pros
      </Link>

      <p className="sr-only">Booking id {bookingId}</p>
    </div>
  );
}
