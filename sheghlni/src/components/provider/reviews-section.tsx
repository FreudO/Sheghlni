"use client";

import { useMemo, useState } from "react";
import { Star } from "lucide-react";
import type { Provider, Review } from "@/lib/mock";
import { mockImageUrl } from "@/lib/mock/mock-image-url";
import { getReviewDistribution } from "@/lib/provider/profile-data";
import { cn } from "@/lib/utils";

type ReviewsSectionProps = {
  provider: Provider;
  reviews: Review[];
};

type SortKey = "recent" | "highest" | "lowest" | "photos";

const EXTRA_REVIEWS: Review[] = [
  {
    id: "extra-review-1",
    bookingId: "booking-extra-1",
    reviewerId: "user-extra-1",
    revieweeProviderId: "",
    reviewerName: "Jennifer Walsh",
    reviewerAvatarUrl: mockImageUrl("portrait,jennifer", 200, 200),
    rating: 5,
    body: "We booked on short notice and everything still went perfectly. Photos were delivered ahead of schedule and the editing style matched exactly what we wanted for our album.",
    photos: [],
    responseBody: null,
    responseAt: null,
    status: "published",
    createdAt: "2025-11-08T14:00:00.000Z",
  },
  {
    id: "extra-review-2",
    bookingId: "booking-extra-2",
    reviewerId: "user-extra-2",
    revieweeProviderId: "",
    reviewerName: "David Chen",
    reviewerAvatarUrl: mockImageUrl("portrait,david", 200, 200),
    rating: 5,
    body: "Clear pricing, no surprises, and great energy on the wedding day. Our families commented on how easy it was to work with the team from start to finish.",
    photos: [],
    responseBody:
      "Thank you, David — it was an honor to capture your day. Wishing you both the best!",
    responseAt: "2025-10-22T10:00:00.000Z",
    status: "published",
    createdAt: "2025-10-20T16:30:00.000Z",
  },
  {
    id: "extra-review-3",
    bookingId: "booking-extra-3",
    reviewerId: "user-extra-3",
    revieweeProviderId: "",
    reviewerName: "Sarah Mitchell",
    reviewerAvatarUrl: mockImageUrl("portrait,sarah", 200, 200),
    rating: 4,
    body: "Beautiful photos and very professional throughout the engagement session. We needed one rescheduled date because of weather, but communication was quick and flexible.",
    photos: [],
    responseBody: null,
    responseAt: null,
    status: "published",
    createdAt: "2025-09-14T11:15:00.000Z",
  },
];

function barColor(stars: number): string {
  if (stars === 5) return "bg-gold-500";
  if (stars === 4) return "bg-bronze-500";
  if (stars === 3) return "bg-sage-500";
  return "bg-border";
}

function formatRelativeDate(iso: string): string {
  const date = new Date(iso);
  const diffDays = Math.floor((Date.now() - date.getTime()) / 86400000);
  if (diffDays < 1) return "Today";
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function ReviewCard({ review }: { review: Review }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = review.body.length > 220;

  return (
    <article className="rounded-2xl border border-border bg-bg p-5">
      <div className="flex items-start gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={review.reviewerAvatarUrl}
          alt={review.reviewerName}
          className="size-10 rounded-full object-cover"
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-medium text-text-primary">{review.reviewerName}</p>
            <p className="text-caption text-text-tertiary">
              {formatRelativeDate(review.createdAt)}
            </p>
          </div>
          <div className="mt-1 flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                className={cn(
                  "size-3.5",
                  index < review.rating ? "fill-star text-star" : "text-border",
                )}
              />
            ))}
          </div>
          <p className={`mt-3 text-body-sm text-text-secondary ${!expanded && isLong ? "line-clamp-4" : ""}`}>
            {review.body}
          </p>
          {isLong && (
            <button
              type="button"
              onClick={() => setExpanded((value) => !value)}
              className="mt-2 text-sm font-medium text-cta hover:underline"
            >
              {expanded ? "Show less" : "Read more"}
            </button>
          )}
          {review.photos.length > 0 && (
            <div className="mt-3 flex gap-2">
              {review.photos.map((photo) => (
                // eslint-disable-next-line @next/next/no-img-element
                <div
                  key={photo}
                  className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-stone-100"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo}
                    alt=""
                    className="block h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
          {review.responseBody && (
            <div className="mt-4 rounded-xl border border-border bg-bg-elevated p-4">
              <p className="text-caption font-medium text-text-primary">Pro response</p>
              <p className="mt-1 text-body-sm text-text-secondary">{review.responseBody}</p>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export function ReviewsSection({ provider, reviews }: ReviewsSectionProps) {
  const [sort, setSort] = useState<SortKey>("recent");
  const [visibleCount, setVisibleCount] = useState(5);
  const distribution = getReviewDistribution(provider.ratingCount, provider.ratingAvg);

  const sorted = useMemo(() => {
    const copy = [...reviews];
    switch (sort) {
      case "highest":
        return copy.sort((a, b) => b.rating - a.rating);
      case "lowest":
        return copy.sort((a, b) => a.rating - b.rating);
      case "photos":
        return copy.sort((a, b) => b.photos.length - a.photos.length);
      default:
        return copy.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
    }
  }, [reviews, sort]);

  const extraReviews = useMemo(
    () =>
      EXTRA_REVIEWS.map((review) => ({
        ...review,
        revieweeProviderId: provider.id,
      })),
    [provider.id],
  );

  const visible = useMemo(() => {
    const fromMock = sorted.slice(0, Math.min(visibleCount, sorted.length));
    if (visibleCount <= sorted.length) return fromMock;
    const extraCount = visibleCount - sorted.length;
    return [...fromMock, ...extraReviews.slice(0, extraCount)];
  }, [sorted, visibleCount, extraReviews]);

  const totalAvailable = sorted.length + extraReviews.length;
  const canLoadMore = visibleCount < totalAvailable;

  return (
    <section className="mt-8 border-t border-border pt-8 md:mt-12 md:pt-10">
      <h2 className="font-display text-[1.375rem] font-medium text-text-primary md:text-h2">
        Reviews
      </h2>

      <div className="mt-6 grid gap-8 lg:grid-cols-[16rem_1fr]">
        <div>
          <p className="font-display text-display-lg text-text-primary">
            {provider.ratingAvg.toFixed(1)}
          </p>
          <div className="mt-2 flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} className="size-4 fill-star text-star" />
            ))}
          </div>
          <p className="mt-2 text-body-sm text-text-secondary">
            {provider.ratingCount} reviews
          </p>
          <div className="mt-4 space-y-2.5">
            {distribution.map((row) => (
              <div key={row.stars} className="flex items-center gap-2 text-caption">
                <span className="w-4 shrink-0 text-text-tertiary">{row.stars}</span>
                <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-border/60">
                  <div
                    className={cn("h-full rounded-full transition-all", barColor(row.stars))}
                    style={{ width: `${Math.max(row.pct, row.pct > 0 ? 3 : 0)}%` }}
                  />
                </div>
                <span className="w-8 shrink-0 text-right text-text-tertiary">{row.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] md:mx-0 md:flex-wrap md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden">
            {(
              [
                ["recent", "Most recent"],
                ["highest", "Highest"],
                ["lowest", "Lowest"],
                ["photos", "With photos"],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setSort(key)}
                className={cn(
                  "shrink-0 rounded-full border px-3 py-2 text-sm",
                  sort === key
                    ? "border-cta bg-cta/10 text-cta"
                    : "border-border text-text-secondary",
                )}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="mt-6 space-y-4">
            {visible.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>

          {canLoadMore && (
            <button
              type="button"
              onClick={() => setVisibleCount((count) => count + 3)}
              className="mt-6 inline-flex h-11 items-center justify-center rounded-full border border-border px-6 text-sm font-medium text-text-primary hover:bg-bg-elevated"
            >
              Load more reviews
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
