import { mockImageUrl } from "./mock-image-url";
import type { Provider, Review } from "./types";

const REVIEWER_NAMES = [
  "Emily Watson",
  "Jason Park",
  "Maria Santos",
  "Brian O'Connor",
  "Aisha Patel",
  "Daniel Lee",
  "Nicole Freeman",
  "Robert Hughes",
  "Laura Kim",
  "Chris Anderson",
  "Hannah Miller",
  "Kevin Brooks",
  "Stephanie Wu",
  "Mark Johnson",
  "Olivia Carter",
  "Ryan Mitchell",
];

const POSITIVE_BODIES = [
  "Absolutely fantastic experience from start to finish. Showed up on time, communicated clearly, and the quality exceeded our expectations. Would hire again without hesitation.",
  "Professional, friendly, and incredibly skilled. We got exactly what we asked for and the attention to detail was impressive. Already recommended to two friends.",
  "This was our third time booking and they never disappoint. Reliable, fair pricing, and genuinely cares about doing great work. A+ service.",
  "Great communication throughout the project. Took time to understand what we needed and delivered ahead of schedule. Very happy with the results.",
  "We interviewed several providers and this was the clear winner. Knowledgeable, patient with our questions, and the final result speaks for itself.",
  "Exceeded expectations in every way. Punctual, prepared, and left everything cleaner than they found it. Will definitely be a repeat customer.",
  "Responsive, professional, and fairly priced. Handled a tricky situation with ease and kept us updated the whole time. Highly recommend.",
];

const MIXED_BODIES = [
  "Good work overall and arrived on schedule. Minor miscommunication about scope at the start but they corrected it quickly. Would consider booking again.",
  "Solid job and fair price. Took a bit longer than estimated but the quality was worth the wait. Communication could have been slightly more proactive.",
  "Happy with the outcome though scheduling took an extra week due to their calendar. Once on site, everything went smoothly.",
  "Quality met our expectations. One small detail needed a touch-up visit which they handled at no charge. Overall a positive experience.",
];

const PRO_RESPONSES = [
  "Thank you so much for the kind words! It was a pleasure working with you — don't hesitate to reach out for future projects.",
  "We really appreciate the feedback and are glad we could help. Looking forward to serving you again!",
  "Thanks for trusting us with this job. Your review means a lot to our small business!",
];

function avatarFor(name: string): string {
  const keyword = name.split(" ")[0].toLowerCase();
  return mockImageUrl(`portrait,${keyword}`, 200, 200);
}

function ratingForIndex(index: number, avg: number): number {
  if (index === 0 && avg < 4.9) return 4;
  if (index === 1 && avg < 4.75) return 4;
  if (avg >= 4.95) return 5;
  return index % 4 === 0 ? 4 : 5;
}

export function buildMockReviews(providers: Provider[]): Review[] {
  const reviews: Review[] = [];
  let globalIdx = 0;

  providers.forEach((provider, pIdx) => {
    const count = 5 + (pIdx % 4);
    for (let i = 0; i < count; i++) {
      const reviewerName = REVIEWER_NAMES[(pIdx * 3 + i) % REVIEWER_NAMES.length];
      const rating = ratingForIndex(i, provider.ratingAvg);
      const bodyPool = rating === 4 ? MIXED_BODIES : POSITIVE_BODIES;
      const body = bodyPool[(pIdx + i) % bodyPool.length];
      const hasResponse =
        (pIdx === 0 && i === 0) ||
        (pIdx === 2 && i === 1) ||
        (pIdx === 6 && i === 0);

      const daysAgo = 10 + pIdx * 7 + i * 12;
      const createdAt = new Date("2026-05-23T12:00:00.000Z");
      createdAt.setUTCDate(createdAt.getUTCDate() - daysAgo);

      const responseBody = hasResponse
        ? PRO_RESPONSES[pIdx % PRO_RESPONSES.length]
        : null;

      reviews.push({
        id: `rev-${provider.id}-${i + 1}`,
        bookingId: `book-${provider.id}-${i + 1}`,
        reviewerId: `user-reviewer-${globalIdx + 1}`,
        revieweeProviderId: provider.id,
        reviewerName,
        reviewerAvatarUrl: avatarFor(reviewerName),
        rating,
        body,
        photos:
          i === 0 && pIdx % 3 === 0
            ? [mockImageUrl("review,service", 400, 300)]
            : [],
        responseBody,
        responseAt: responseBody
          ? new Date(createdAt.getTime() + 86400000).toISOString()
          : null,
        status: "published",
        createdAt: createdAt.toISOString(),
      });
      globalIdx++;
    }
  });

  return reviews;
}
