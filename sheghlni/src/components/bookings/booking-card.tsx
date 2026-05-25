"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import type { Booking } from "@/lib/mock";
import { Button, buttonVariants } from "@/components/ui/button";
import { ICON_STROKE } from "@/components/ui/icon-well";
import {
  formatAddressLine,
  formatBookingRelativeTime,
  formatBookingTotal,
  getConversationIdForProvider,
  getStatusChip,
} from "@/lib/bookings/utils";
import { cn } from "@/lib/utils";

type BookingCardProps = {
  booking: Booking;
  hasReview?: boolean;
  reviewSubmitted?: boolean;
  onLeaveReview?: () => void;
};

export function BookingCard({
  booking,
  hasReview = false,
  reviewSubmitted = false,
  onLeaveReview,
}: BookingCardProps) {
  const [expanded, setExpanded] = useState(false);
  const chip = getStatusChip(booking.status);
  const conversationId = getConversationIdForProvider(booking.providerId);

  const showReviewCta =
    booking.status === "completed" && !hasReview && !reviewSubmitted;

  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-bg">
      <div className="p-4 md:p-5">
        <div className="flex gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={booking.providerAvatarUrl}
            alt=""
            className="size-12 shrink-0 rounded-full object-cover"
          />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="font-semibold text-text-primary">
                  {booking.providerName}
                </p>
                <p className="text-sm text-text-secondary">
                  {booking.serviceName}
                </p>
              </div>
              <span
                className={cn(
                  "shrink-0 rounded-full px-2.5 py-0.5 text-caption font-medium capitalize",
                  chip.className,
                )}
              >
                {chip.label}
              </span>
            </div>
            <p className="mt-2 font-semibold text-text-primary">
              {formatBookingRelativeTime(booking.startsAt)}
            </p>
            <p className="mt-0.5 text-sm font-medium text-ink-300">
              {formatBookingTotal(booking.totalCents)}
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {booking.status === "confirmed" ||
          booking.status === "in_progress" ? (
            <>
              <Button
                render={<Link href={`/inbox/${conversationId}/`} />}
                nativeButton={false}
                variant="outline"
                size="sm"
                className="rounded-full border-border bg-background px-4 hover:bg-muted"
              >
                Message
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full border-border bg-background px-4 hover:bg-muted"
              >
                Reschedule
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full border-destructive/35 bg-background px-4 text-destructive hover:border-destructive/50 hover:bg-destructive/10"
              >
                Cancel
              </Button>
            </>
          ) : null}

          {booking.status === "completed" && (
            <div className="flex w-full flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <Link
                  href={`/book/${booking.providerId}/`}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "sm" }),
                    "rounded-full border-border bg-background px-4 transition-colors hover:border-cta/30 hover:bg-muted",
                  )}
                >
                  Book again
                </Link>
                {(hasReview || reviewSubmitted) && (
                  <span className="inline-flex h-7 items-center rounded-full bg-sage-500/15 px-3 text-sm font-medium text-sage-500">
                    Review submitted
                  </span>
                )}
              </div>
              {showReviewCta && onLeaveReview && (
                <Button
                  type="button"
                  size="sm"
                  onClick={onLeaveReview}
                  className="shrink-0 rounded-full bg-cta text-white hover:bg-cta-hover"
                >
                  Leave a review
                </Button>
              )}
            </div>
          )}

          {booking.status === "cancelled" && (
            <Link
              href="/search/"
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "rounded-full border-border bg-background px-4 transition-colors hover:border-cta/30 hover:bg-muted",
              )}
            >
              Book similar pro
            </Link>
          )}
        </div>

        <button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          className="mt-4 flex w-full items-center justify-between text-sm font-medium text-ink-300 hover:text-text-primary"
        >
          {expanded ? "Hide details" : "View details"}
          <ChevronDown
            className={cn(
              "size-4 transition",
              expanded && "rotate-180",
            )}
            strokeWidth={ICON_STROKE}
          />
        </button>
      </div>

      {expanded && (
        <div className="border-t border-border bg-bg-elevated px-4 py-4 text-sm md:px-5">
          <p className="font-medium text-text-primary">Address</p>
          <p className="mt-1 text-text-secondary">
            {formatAddressLine(
              booking.serviceAddress.line1,
              booking.serviceAddress.city,
              booking.serviceAddress.region,
            )}
          </p>
          <p className="mt-4 font-medium text-text-primary">Job notes</p>
          <p className="mt-1 text-text-secondary">{booking.jobNotes}</p>
          {booking.lineItems.length > 0 && (
            <div className="mt-4">
              <p className="font-medium text-text-primary">Quote line items</p>
              <ul className="mt-2 space-y-2">
                {booking.lineItems.map((item, index) => (
                  <li
                    key={`${item.description}-${index}`}
                    className="flex justify-between gap-4 text-text-secondary"
                  >
                    <span>
                      {item.description} × {item.quantity}
                    </span>
                    <span className="shrink-0 text-text-primary">
                      {formatBookingTotal(item.totalCents)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </article>
  );
}
