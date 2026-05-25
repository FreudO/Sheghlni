export type HelpCategory = {
  id: string;
  title: string;
  description: string;
  articles: { slug: string; title: string }[];
};

export const HELP_CATEGORIES: HelpCategory[] = [
  {
    id: "getting-started",
    title: "Getting started",
    description: "New to Sheghlni? Start here.",
    articles: [
      { slug: "create-account", title: "Creating your account" },
      { slug: "find-a-pro", title: "How to find a pro" },
      { slug: "first-message", title: "Sending your first message" },
    ],
  },
  {
    id: "booking",
    title: "Booking a pro",
    description: "Quotes, scheduling, and confirmations.",
    articles: [
      { slug: "request-quote", title: "Requesting a quote" },
      { slug: "book-and-pay", title: "Booking and paying securely" },
      { slug: "reschedule-cancel", title: "Reschedule or cancel" },
      { slug: "leave-review", title: "Leaving a review" },
    ],
  },
  {
    id: "for-pros",
    title: "For pros",
    description: "Grow your business on Sheghlni.",
    articles: [
      { slug: "become-a-pro", title: "Becoming a provider" },
      { slug: "set-rates", title: "Setting your rates" },
      { slug: "calendar-availability", title: "Calendar and availability" },
    ],
  },
  {
    id: "payments",
    title: "Payments",
    description: "Charges, refunds, and payouts.",
    articles: [
      { slug: "how-payments-work", title: "How payments work" },
      { slug: "refunds", title: "Refunds and cancellations" },
      { slug: "pro-payouts", title: "Provider payouts" },
    ],
  },
  {
    id: "trust",
    title: "Trust & Safety",
    description: "Verification, disputes, and guarantees.",
    articles: [
      { slug: "verified-pros", title: "Verified pros" },
      { slug: "disputes", title: "Opening a dispute" },
      { slug: "guarantee", title: "Money-back guarantee" },
    ],
  },
  {
    id: "account",
    title: "Account",
    description: "Profile, notifications, and security.",
    articles: [
      { slug: "update-profile", title: "Updating your profile" },
      { slug: "notification-settings", title: "Notification settings" },
      { slug: "delete-account", title: "Deleting your account" },
    ],
  },
];

export function getHelpArticle(slug: string) {
  for (const category of HELP_CATEGORIES) {
    const article = category.articles.find((a) => a.slug === slug);
    if (article) {
      return { ...article, category: category.title };
    }
  }
  return null;
}

export function getAllHelpSlugs() {
  return HELP_CATEGORIES.flatMap((c) =>
    c.articles.map((a) => a.slug),
  );
}
