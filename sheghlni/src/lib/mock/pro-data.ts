import { categories } from "@/lib/mock/categories-data";
import { mockImageUrl } from "@/lib/mock/mock-image-url";

export const DEMO_PRO_PROVIDER_ID = "prov-sofia-reyes";
export const DEMO_PRO_HANDLE = "sofia-reyes-photo";
export const DEMO_PRO_FIRST_NAME = "Sofia";

export const proDashboardStats = {
  profileViews: 127,
  profileViewsChangePct: 12,
  responseTimeMinutes: 45,
  bookingRatePct: 68,
  earningsThisMonthCents: 324_000,
};

export type ProScheduleItem = {
  id: string;
  startsAt: string;
  endsAt: string;
  customerName: string;
  serviceName: string;
  address: string;
};

export const proTodaysSchedule: ProScheduleItem[] = [
  {
    id: "sched-1",
    startsAt: "2026-05-24T10:00:00.000Z",
    endsAt: "2026-05-24T11:30:00.000Z",
    customerName: "Alex Morgan",
    serviceName: "Engagement Session",
    address: "Griffith Observatory, Los Angeles, CA",
  },
  {
    id: "sched-2",
    startsAt: "2026-05-24T15:00:00.000Z",
    endsAt: "2026-05-24T17:00:00.000Z",
    customerName: "Jamie Lee",
    serviceName: "Portrait Mini Session",
    address: "Santa Monica Pier, Santa Monica, CA",
  },
];

export type ProLead = {
  id: string;
  conversationId: string;
  customerName: string;
  preview: string;
  createdAt: string;
};

export const proNewLeads: ProLead[] = [
  {
    id: "lead-1",
    conversationId: "conv-1",
    customerName: "Alex Morgan",
    preview: "We're flexible on June 14 — can you include a second shooter?",
    createdAt: "2026-05-23T14:20:00.000Z",
  },
  {
    id: "lead-2",
    conversationId: "conv-lead-2",
    customerName: "Priya Shah",
    preview: "Looking for elopement coverage in Malibu — ~4 hours.",
    createdAt: "2026-05-23T09:10:00.000Z",
  },
  {
    id: "lead-3",
    conversationId: "conv-lead-3",
    customerName: "Marcus Chen",
    preview: "Do you have availability for a corporate headshot day next week?",
    createdAt: "2026-05-22T18:45:00.000Z",
  },
];

export const proBoostTasks = [
  {
    id: "photos",
    label: "Add portfolio photos",
    done: true,
    detail: "5/5 done",
    href: null,
  },
  {
    id: "calendar",
    label: "Connect Google Calendar",
    done: false,
    detail: null,
    href: "/pro/calendar/",
  },
  {
    id: "bio",
    label: "Write a bio",
    done: false,
    detail: null,
    href: "/pro/profile/edit/",
  },
] as const;

export const proTipOfTheDay =
  "Pros who reply within 1 hour are 3× more likely to get booked. Turn on push notifications to never miss a lead.";

export type ProCalendarBooking = {
  id: string;
  date: string;
  startsAt: string;
  endsAt: string;
  customerName: string;
  serviceName: string;
  isBuffer?: boolean;
};

export const proCalendarBookings: ProCalendarBooking[] = [
  {
    id: "cal-1",
    date: "2026-05-24",
    startsAt: "2026-05-24T10:00:00.000Z",
    endsAt: "2026-05-24T11:30:00.000Z",
    customerName: "Alex Morgan",
    serviceName: "Engagement Session",
  },
  {
    id: "cal-2",
    date: "2026-05-24",
    startsAt: "2026-05-24T15:00:00.000Z",
    endsAt: "2026-05-24T17:00:00.000Z",
    customerName: "Jamie Lee",
    serviceName: "Portrait Mini",
  },
  {
    id: "cal-3",
    date: "2026-05-27",
    startsAt: "2026-05-27T12:00:00.000Z",
    endsAt: "2026-05-27T18:00:00.000Z",
    customerName: "Taylor Brooks",
    serviceName: "Wedding Day Coverage",
  },
  {
    id: "cal-4",
    date: "2026-05-29",
    startsAt: "2026-05-29T14:00:00.000Z",
    endsAt: "2026-05-29T15:00:00.000Z",
    customerName: "Jordan Kim",
    serviceName: "Elopement Package",
  },
  {
    id: "cal-buffer",
    date: "2026-05-27",
    startsAt: "2026-05-27T11:00:00.000Z",
    endsAt: "2026-05-27T12:00:00.000Z",
    customerName: "Buffer",
    serviceName: "Travel buffer",
    isBuffer: true,
  },
];

export const proAvailabilityDates = [
  "2026-05-25",
  "2026-05-26",
  "2026-05-28",
  "2026-05-30",
  "2026-06-01",
  "2026-06-03",
];

export type EarningsMonth = {
  label: string;
  amountCents: number;
};

export const proEarningsByMonth: EarningsMonth[] = [
  { label: "Dec", amountCents: 248_000 },
  { label: "Jan", amountCents: 312_000 },
  { label: "Feb", amountCents: 285_000 },
  { label: "Mar", amountCents: 356_000 },
  { label: "Apr", amountCents: 298_000 },
  { label: "May", amountCents: 324_000 },
];

export type ProTransactionStatus = "paid" | "pending" | "refunded";

export type ProTransaction = {
  id: string;
  customerName: string;
  serviceName: string;
  date: string;
  grossCents: number;
  platformFeeCents: number;
  netCents: number;
  status: ProTransactionStatus;
};

export const proTransactions: ProTransaction[] = [
  {
    id: "txn-1",
    customerName: "Alex Morgan",
    serviceName: "Engagement Session",
    date: "2026-05-20",
    grossCents: 85000,
    platformFeeCents: 10200,
    netCents: 74800,
    status: "paid",
  },
  {
    id: "txn-2",
    customerName: "Jamie Lee",
    serviceName: "Portrait Mini Session",
    date: "2026-05-18",
    grossCents: 45000,
    platformFeeCents: 5400,
    netCents: 39600,
    status: "paid",
  },
  {
    id: "txn-3",
    customerName: "Taylor Brooks",
    serviceName: "Wedding Day Coverage",
    date: "2026-05-15",
    grossCents: 350000,
    platformFeeCents: 42000,
    netCents: 308000,
    status: "pending",
  },
  {
    id: "txn-4",
    customerName: "Jordan Kim",
    serviceName: "Elopement Package",
    date: "2026-05-10",
    grossCents: 220000,
    platformFeeCents: 26400,
    netCents: 193600,
    status: "paid",
  },
  {
    id: "txn-5",
    customerName: "Sam Rivera",
    serviceName: "Engagement Session",
    date: "2026-04-28",
    grossCents: 75000,
    platformFeeCents: 9000,
    netCents: 66000,
    status: "refunded",
  },
];

export const proEarningsSummary = {
  thisMonthCents: 324_000,
  pendingPayoutCents: 85_000,
  pendingPayoutDays: 2,
  allTimeCents: 2_854_000,
  avgPerBookingCents: 28_500,
  taxConfigured: false,
};

export const topLevelCategories = categories.filter((c) => !c.parentId);

export const proTestimonials = [
  {
    quote:
      "I set my own rates and filled my calendar within six weeks. Sheghlni handles the awkward payment conversations.",
    name: "Sofia Reyes",
    category: "Photography",
    earnings: "$4,200/mo",
    avatar: mockImageUrl("woman,photographer", 80, 80),
  },
  {
    quote:
      "Weekend electrician jobs used to mean chasing invoices. Now payouts land automatically after each visit.",
    name: "Marcus Thompson",
    category: "Electrical",
    earnings: "$5,800/mo",
    avatar: mockImageUrl("man,electrician", 80, 80),
  },
  {
    quote:
      "Dog walking clients book recurring visits. My response time badge alone brought 30% more leads.",
    name: "David Kim",
    category: "Pet Services",
    earnings: "$2,400/mo",
    avatar: mockImageUrl("man,dog-walker", 80, 80),
  },
];

export const ONBOARDING_STEPS = [
  "Category",
  "Service area",
  "Pricing",
  "Availability",
  "Photos",
  "Bio",
  "Verify ID",
  "Payout",
] as const;

export type OnboardingStepIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
