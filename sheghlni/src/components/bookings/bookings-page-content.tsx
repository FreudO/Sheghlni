"use client";

import { useMemo, useState } from "react";
import { EmptyState } from "@/components/ui/empty-state";
import { BookingsSkeleton } from "@/components/ui/skeletons/bookings-skeleton";
import { useDelayedReady } from "@/hooks/use-delayed-ready";
import { BookingCard } from "@/components/bookings/booking-card";
import { ReviewModal } from "@/components/bookings/review-modal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { DEMO_USER_ID, getBookings, type Booking } from "@/lib/mock";
import {
  customerHasReviewForBooking,
  filterBookingsByTab,
  type BookingsTab,
} from "@/lib/bookings/utils";
import { toast } from "@/lib/toast";

export function BookingsPageContent() {
  const ready = useDelayedReady();
  const allBookings = useMemo(() => getBookings(DEMO_USER_ID), []);
  const [tab, setTab] = useState<BookingsTab>("upcoming");
  const [reviewOverrides, setReviewOverrides] = useState<Set<string>>(
    new Set(),
  );
  const [reviewModalBooking, setReviewModalBooking] = useState<Booking | null>(
    null,
  );

  const reviewPromptBooking = useMemo(() => {
    return allBookings.find(
      (b) =>
        b.status === "completed" &&
        !customerHasReviewForBooking(b.id) &&
        !reviewOverrides.has(b.id),
    );
  }, [allBookings, reviewOverrides]);

  const counts = useMemo(
    () => ({
      upcoming: filterBookingsByTab(allBookings, "upcoming").length,
      past: filterBookingsByTab(allBookings, "past").length,
      cancelled: filterBookingsByTab(allBookings, "cancelled").length,
    }),
    [allBookings],
  );

  const handleReviewSubmit = () => {
    if (!reviewModalBooking) return;
    setReviewOverrides((prev) => new Set(prev).add(reviewModalBooking.id));
    toast.success("Review posted.");
  };

  if (!ready) {
    return <BookingsSkeleton />;
  }

  return (
    <div className="relative">
      <header className="mb-6 md:mb-8">
        <h1 className="font-display text-h1 text-text-primary">Bookings</h1>
        <p className="mt-2 text-body text-text-secondary">
          Manage upcoming jobs, past visits, and cancellations.
        </p>
      </header>

      {reviewPromptBooking && tab !== "cancelled" && (
        <div className="mb-6 rounded-2xl bg-cream-200 px-4 py-4 dark:bg-cream-200/15 md:px-5">
          <p className="text-sm leading-relaxed text-text-primary">
            You haven&apos;t reviewed{" "}
            <span className="font-semibold">
              {reviewPromptBooking.providerName}
            </span>{" "}
            yet. Help others find great pros.
          </p>
          <Button
            type="button"
            size="sm"
            className="mt-3 rounded-full bg-cta text-white hover:bg-cta-hover"
            onClick={() => setReviewModalBooking(reviewPromptBooking)}
          >
            Write a review
          </Button>
        </div>
      )}

      <Tabs
        value={tab}
        onValueChange={(value) => setTab(value as BookingsTab)}
      >
        <TabsList className="max-w-xl">
          <TabsTrigger value="upcoming">
            Upcoming ({counts.upcoming})
          </TabsTrigger>
          <TabsTrigger value="past">Past ({counts.past})</TabsTrigger>
          <TabsTrigger value="cancelled">
            Cancelled ({counts.cancelled})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          <BookingList
            bookings={filterBookingsByTab(allBookings, "upcoming")}
            reviewOverrides={reviewOverrides}
            onLeaveReview={setReviewModalBooking}
          />
        </TabsContent>
        <TabsContent value="past">
          <BookingList
            bookings={filterBookingsByTab(allBookings, "past")}
            reviewOverrides={reviewOverrides}
            onLeaveReview={setReviewModalBooking}
          />
        </TabsContent>
        <TabsContent value="cancelled">
          <BookingList
            bookings={filterBookingsByTab(allBookings, "cancelled")}
            reviewOverrides={reviewOverrides}
            onLeaveReview={setReviewModalBooking}
          />
        </TabsContent>
      </Tabs>

      {reviewModalBooking && (
        <ReviewModal
          open={Boolean(reviewModalBooking)}
          onOpenChange={(open) => !open && setReviewModalBooking(null)}
          proName={reviewModalBooking.providerName}
          onSubmit={handleReviewSubmit}
        />
      )}

    </div>
  );
}

function BookingList({
  bookings,
  reviewOverrides,
  onLeaveReview,
}: {
  bookings: Booking[];
  reviewOverrides: Set<string>;
  onLeaveReview: (booking: Booking) => void;
}) {
  if (bookings.length === 0) {
    return (
      <EmptyState
        illustration="empty-bookings"
        title="No bookings in this tab"
        subtitle="When you book a pro, your upcoming and past sessions will show up here."
        actionLabel="Find a pro"
        actionHref="/search/"
      />
    );
  }

  return (
    <ul className="space-y-4">
      {bookings.map((booking) => (
        <li key={booking.id}>
          <BookingCard
            booking={booking}
            hasReview={customerHasReviewForBooking(booking.id)}
            reviewSubmitted={reviewOverrides.has(booking.id)}
            onLeaveReview={() => onLeaveReview(booking)}
          />
        </li>
      ))}
    </ul>
  );
}
