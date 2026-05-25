export type PricingUnit =
  | "hour"
  | "project"
  | "visit"
  | "session"
  | "custom";

export type ProviderStatus = "pending" | "active" | "paused" | "suspended";

export type PremiumTier = "none" | "plus" | "pro";

export type ProviderBadge =
  | "verified-id"
  | "background-check"
  | "top-rated"
  | "quick-responder"
  | "premium"
  | "license-verified"
  | "insurance-verified";

export type QuoteStatus =
  | "pending"
  | "accepted"
  | "declined"
  | "expired"
  | "withdrawn";

export type BookingStatus =
  | "confirmed"
  | "in_progress"
  | "completed"
  | "cancelled"
  | "disputed";

export type ConversationStatus = "active" | "archived" | "blocked";

export type MessageKind = "text" | "image" | "quote" | "booking" | "system";

export type ReviewStatus = "published" | "hidden" | "pending";

export type NotificationKind =
  | "message"
  | "booking"
  | "quote"
  | "review"
  | "promotion"
  | "system";

export interface User {
  id: string;
  email: string;
  fullName: string;
  avatarUrl: string | null;
  isVerified: boolean;
  isPro: boolean;
  isCustomer: boolean;
  createdAt: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  iconName: string;
  parentId: string | null;
  requiresLicense: boolean;
  requiresBackgroundCheck: boolean;
  requiresInsuranceProof: boolean;
  defaultPricingUnit: PricingUnit;
  seoTitle: string | null;
  seoDescription: string | null;
  heroImageUrl: string | null;
  sortOrder: number;
  active: boolean;
}

export interface Provider {
  id: string;
  userId: string;
  handle: string;
  businessName: string;
  headline: string;
  bio: string;
  yearsExperience: number;
  languages: string[];
  serviceRadiusKm: number;
  baseCity: string;
  baseRegion: string;
  baseCountry: string;
  status: ProviderStatus;
  premiumTier: PremiumTier;
  responseTimeMinutes: number;
  responseRatePct: number;
  acceptanceRatePct: number;
  completedJobsCount: number;
  ratingAvg: number;
  ratingCount: number;
  rankScore: number;
  stripeChargesEnabled: boolean;
  stripePayoutsEnabled: boolean;
  /** Distance from mock customer location (Boston metro), in miles. */
  distanceMi: number;
  isTopRated: boolean;
  badges: ProviderBadge[];
  mediaUrls: string[];
  heroImageUrl: string;
}

export interface Service {
  id: string;
  providerId: string;
  categoryId: string;
  title: string;
  description: string;
  pricingUnit: PricingUnit;
  priceMinCents: number;
  priceMaxCents: number;
  currency: string;
  durationMinutes: number | null;
  active: boolean;
}

export interface Review {
  id: string;
  bookingId: string;
  reviewerId: string;
  revieweeProviderId: string;
  reviewerName: string;
  reviewerAvatarUrl: string;
  rating: number;
  body: string;
  photos: string[];
  responseBody: string | null;
  responseAt: string | null;
  status: ReviewStatus;
  createdAt: string;
}

export interface Conversation {
  id: string;
  customerId: string;
  providerId: string;
  providerName: string;
  providerAvatarUrl: string;
  lastMessagePreview: string;
  lastMessageAt: string;
  customerUnreadCount: number;
  providerUnreadCount: number;
  status: ConversationStatus;
  createdAt: string;
}

export interface MessageAttachment {
  id: string;
  url: string;
  mimeType: string;
  fileName: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  kind: MessageKind;
  body: string;
  attachments: MessageAttachment[];
  quoteId: string | null;
  bookingId: string | null;
  readAt: string | null;
  createdAt: string;
}

export interface QuoteLineItem {
  id: string;
  description: string;
  unit: string;
  quantity: number;
  unitPriceCents: number;
  totalCents: number;
  sortOrder: number;
}

export interface Quote {
  id: string;
  conversationId: string;
  providerId: string;
  customerId: string;
  currency: string;
  subtotalCents: number;
  taxCents: number;
  depositPct: number;
  totalCents: number;
  status: QuoteStatus;
  lineItems: QuoteLineItem[];
  expiresAt: string;
  createdAt: string;
}

export interface ServiceAddress {
  line1: string;
  line2?: string;
  city: string;
  region: string;
  postal: string;
  country: string;
  lat?: number;
  lng?: number;
}

export interface BookingLineItem {
  description: string;
  quantity: number;
  unit: string;
  totalCents: number;
}

export interface Booking {
  id: string;
  quoteId: string | null;
  customerId: string;
  providerId: string;
  providerName: string;
  providerAvatarUrl: string;
  serviceName: string;
  jobNotes: string;
  lineItems: BookingLineItem[];
  serviceAddress: ServiceAddress;
  startsAt: string;
  endsAt: string | null;
  status: BookingStatus;
  currency: string;
  subtotalCents: number;
  platformFeeCents: number;
  taxCents: number;
  totalCents: number;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  kind: NotificationKind;
  title: string;
  body: string;
  data: Record<string, string>;
  readAt: string | null;
  createdAt: string;
}

export type SearchSort =
  | "recommended"
  | "rating"
  | "price_asc"
  | "distance"
  | "newest";

export interface SearchFilters {
  categorySlug?: string;
  city?: string;
  minRating?: number;
  maxPriceCents?: number;
  verified?: boolean;
  premiumOnly?: boolean;
  radiusMi?: number;
  languages?: string[];
  sort?: SearchSort;
}

export function formatProviderLocation(provider: Provider): string {
  return `${provider.baseCity}, ${provider.baseRegion}`;
}
