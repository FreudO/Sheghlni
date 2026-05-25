import {
  format,
  isToday,
  isTomorrow,
  isYesterday,
  parseISO,
} from "date-fns";
import type { Booking, BookingStatus } from "@/lib/mock";
import { reviews, conversations } from "@/lib/mock/data";
import { DEMO_USER_ID } from "@/lib/mock/constants";
import { formatUsdExact } from "@/lib/messaging/format";

export type BookingsTab = "upcoming" | "past" | "cancelled";

export function filterBookingsByTab(
  bookings: Booking[],
  tab: BookingsTab,
): Booking[] {
  const now = new Date();

  return bookings.filter((booking) => {
    const start = parseISO(booking.startsAt);

    switch (tab) {
      case "upcoming":
        return (
          (booking.status === "confirmed" || booking.status === "in_progress") &&
          start >= now
        );
      case "past":
        return booking.status === "completed";
      case "cancelled":
        return booking.status === "cancelled";
      default:
        return false;
    }
  });
}

export function customerHasReviewForBooking(bookingId: string): boolean {
  return reviews.some(
    (r) => r.reviewerId === DEMO_USER_ID && r.bookingId === bookingId,
  );
}

export function formatBookingTotal(cents: number): string {
  return formatUsdExact(cents);
}

export function formatBookingDateTime(startsAt: string): string {
  const date = parseISO(startsAt);
  return format(date, "EEEE, MMM d 'at' h:mm a");
}

export function formatBookingRelativeTime(startsAt: string): string {
  const date = parseISO(startsAt);
  const time = format(date, "h:mm a");

  if (isToday(date)) return `Today at ${time}`;
  if (isTomorrow(date)) return `Tomorrow at ${time}`;
  if (isYesterday(date)) return `Yesterday at ${time}`;

  const now = new Date();
  const diffDays = Math.floor(
    (date.getTime() - now.getTime()) / 86_400_000,
  );

  if (diffDays > 0 && diffDays < 7) {
    return `${format(date, "EEEE")} at ${time}`;
  }

  if (diffDays < 0 && diffDays > -7) {
    return `Last ${format(date, "EEEE")} at ${time}`;
  }

  return format(date, "MMM d 'at' h:mm a");
}

export function formatAddressLine(
  line1: string,
  city: string,
  region: string,
): string {
  return `${line1}, ${city}, ${region}`;
}

export type StatusChipConfig = {
  label: string;
  className: string;
};

export function getStatusChip(status: BookingStatus): StatusChipConfig {
  switch (status) {
    case "confirmed":
      return {
        label: "Confirmed",
        className: "bg-sage-500/15 text-sage-500",
      };
    case "in_progress":
      return {
        label: "In Progress",
        className: "bg-bronze-500/15 text-bronze-600",
      };
    case "completed":
      return {
        label: "Completed",
        className: "bg-bg-elevated text-ink-300",
      };
    case "cancelled":
      return {
        label: "Cancelled",
        className: "bg-clay-500/15 text-clay-500",
      };
    case "disputed":
      return {
        label: "Disputed",
        className: "bg-clay-500/15 text-clay-500",
      };
    default:
      return { label: status, className: "bg-bg-elevated text-ink-300" };
  }
}

export function getConversationIdForProvider(providerId: string): string {
  const match = conversations.find(
    (c) => c.providerId === providerId && c.customerId === DEMO_USER_ID,
  );
  return match?.id ?? "conv-1";
}
