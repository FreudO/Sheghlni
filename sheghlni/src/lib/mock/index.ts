import type {
  Booking,
  Conversation,
  Message,
  Notification,
  Provider,
  Quote,
  Review,
  SearchFilters,
} from "./types";
import { formatProviderLocation } from "./types";
import {
  bookings,
  categories,
  conversations,
  messages,
  notifications,
  providers,
  quotes,
  reviews,
  services,
} from "./data";

export * from "./types";
export * from "./constants";
export {
  users,
  categories,
  providers,
  services,
  reviews,
  conversations,
  messages,
  bookings,
  notifications,
  quotes,
} from "./data";
function getCategoryIdsForSlug(slug: string): Set<string> {
  const match = categories.find((c) => c.slug === slug);
  if (!match) return new Set();

  const ids = new Set<string>([match.id]);
  categories
    .filter((c) => c.parentId === match.id)
    .forEach((c) => ids.add(c.id));
  return ids;
}

function getProviderCategorySlugs(providerId: string): string[] {
  const categoryIds = new Set(
    services
      .filter((s) => s.providerId === providerId)
      .map((s) => s.categoryId),
  );

  const slugs: string[] = [];
  for (const category of categories) {
    if (categoryIds.has(category.id)) {
      slugs.push(category.slug);
      if (category.parentId) {
        const parent = categories.find((c) => c.id === category.parentId);
        if (parent) slugs.push(parent.slug);
      }
    }
  }
  return slugs;
}

function providerMatchesCategory(providerId: string, categorySlug: string): boolean {
  const allowedIds = getCategoryIdsForSlug(categorySlug);
  if (allowedIds.size === 0) return false;

  return services.some(
    (s) => s.providerId === providerId && allowedIds.has(s.categoryId),
  );
}

function getProviderMinPrice(providerId: string): number {
  const prices = services
    .filter((s) => s.providerId === providerId)
    .map((s) => s.priceMinCents);
  return prices.length > 0 ? Math.min(...prices) : Infinity;
}

function isProviderVerified(provider: Provider): boolean {
  return (
    provider.badges.includes("verified-id") ||
    provider.badges.includes("background-check") ||
    provider.badges.includes("license-verified")
  );
}

export function getTopLevelCategories() {
  return categories
    .filter((c) => c.parentId === null)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getProviderStartingPrice(providerId: string) {
  const providerServices = services.filter(
    (s) => s.providerId === providerId && s.active,
  );
  if (providerServices.length === 0) return null;

  const cheapest = providerServices.reduce((min, service) =>
    service.priceMinCents < min.priceMinCents ? service : min,
  );

  return {
    cents: cheapest.priceMinCents,
    unit: cheapest.pricingUnit,
  };
}

export function getProvidersByCategory(categorySlug: string): Provider[] {
  return providers.filter((p) =>
    providerMatchesCategory(p.id, categorySlug),
  );
}

export function getProviderByHandle(handle: string): Provider | undefined {
  return providers.find((p) => p.handle === handle);
}

function providerMatchesCity(provider: Provider, city: string): boolean {
  const needle = city.trim().toLowerCase();
  if (!needle) return true;
  return formatProviderLocation(provider).toLowerCase().includes(needle);
}

function providerMatchesLanguages(
  provider: Provider,
  languages: string[],
): boolean {
  if (languages.length === 0) return true;
  return languages.some((lang) => provider.languages.includes(lang));
}

export function sortProviders(
  list: Provider[],
  sort: SearchFilters["sort"] = "recommended",
): Provider[] {
  const sorted = [...list];

  switch (sort) {
    case "rating":
      return sorted.sort((a, b) => b.ratingAvg - a.ratingAvg);
    case "price_asc":
      return sorted.sort(
        (a, b) => getProviderMinPrice(a.id) - getProviderMinPrice(b.id),
      );
    case "distance":
      return sorted.sort((a, b) => a.distanceMi - b.distanceMi);
    case "newest":
      return sorted.sort((a, b) => b.completedJobsCount - a.completedJobsCount);
    case "recommended":
    default:
      return sorted.sort((a, b) => b.rankScore - a.rankScore);
  }
}

export function getCategoryTree() {
  return getTopLevelCategories().map((top) => ({
    ...top,
    children: categories
      .filter((c) => c.parentId === top.id)
      .sort((a, b) => a.sortOrder - b.sortOrder),
  }));
}

export function getProviderPrimaryCategoryName(providerId: string): string {
  const providerServices = services.filter(
    (s) => s.providerId === providerId && s.active,
  );
  if (providerServices.length === 0) return "Services";

  const category = categories.find(
    (c) => c.id === providerServices[0].categoryId,
  );
  if (!category) return "Services";

  if (category.parentId) {
    const parent = categories.find((c) => c.id === category.parentId);
    return parent ? `${parent.name} · ${category.name}` : category.name;
  }

  return category.name;
}

export function searchProviders(
  query: string,
  filters: SearchFilters = {},
): Provider[] {
  const normalizedQuery = query.trim().toLowerCase();

  const filtered = providers.filter((provider) => {
    if (
      filters.categorySlug &&
      !providerMatchesCategory(provider.id, filters.categorySlug)
    ) {
      return false;
    }

    if (filters.city && !providerMatchesCity(provider, filters.city)) {
      return false;
    }

    if (
      filters.radiusMi !== undefined &&
      provider.distanceMi > filters.radiusMi
    ) {
      return false;
    }

    if (filters.minRating !== undefined && provider.ratingAvg < filters.minRating) {
      return false;
    }

    if (filters.maxPriceCents !== undefined) {
      const minPrice = getProviderMinPrice(provider.id);
      if (minPrice > filters.maxPriceCents) return false;
    }

    if (filters.verified && !isProviderVerified(provider)) {
      return false;
    }

    if (filters.premiumOnly && provider.premiumTier === "none") {
      return false;
    }

    if (
      filters.languages &&
      !providerMatchesLanguages(provider, filters.languages)
    ) {
      return false;
    }

    if (!normalizedQuery) return true;

    const categorySlugs = getProviderCategorySlugs(provider.id);
    const categoryNames = categorySlugs
      .map((slug) => categories.find((c) => c.slug === slug)?.name ?? "")
      .join(" ");

    const haystack = [
      provider.businessName,
      provider.headline,
      provider.bio,
      formatProviderLocation(provider),
      categoryNames,
      ...categorySlugs,
    ]
      .join(" ")
      .toLowerCase();

    const tokens = normalizedQuery.split(/\s+/).filter(Boolean);
    return tokens.every((token) => {
      if (haystack.includes(token)) return true;
      if (token.length >= 4) {
        const stem = token.slice(0, 4);
        return haystack.includes(stem);
      }
      return false;
    });
  });

  return sortProviders(filtered, filters.sort);
}

export function getReviewsForProvider(providerId: string): Review[] {
  return reviews.filter((r) => r.revieweeProviderId === providerId);
}

export function getFeaturedProviders(cityFilter?: string): Provider[] {
  const ranked = [...providers].sort((a, b) => b.rankScore - a.rankScore);

  if (!cityFilter) {
    return ranked.slice(0, 8);
  }

  const city = cityFilter.toLowerCase();
  const local = ranked.filter((p) =>
    formatProviderLocation(p).toLowerCase().includes(city),
  );

  if (local.length >= 8) {
    return local.slice(0, 8);
  }

  const localIds = new Set(local.map((p) => p.id));
  const backfill = ranked.filter((p) => !localIds.has(p.id));

  return [...local, ...backfill].slice(0, 8);
}

export function getConversations(userId: string): Conversation[] {
  return conversations
    .filter((c) => c.customerId === userId)
    .sort(
      (a, b) =>
        new Date(b.lastMessageAt).getTime() -
        new Date(a.lastMessageAt).getTime(),
    );
}

export function getMessages(conversationId: string): Message[] {
  return messages
    .filter((m) => m.conversationId === conversationId)
    .sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    );
}

export function getConversationById(
  conversationId: string,
): Conversation | undefined {
  return conversations.find((c) => c.id === conversationId);
}

export function getQuoteById(quoteId: string): Quote | undefined {
  return quotes.find((q) => q.id === quoteId);
}

export function getBookingById(bookingId: string): Booking | undefined {
  return bookings.find((b) => b.id === bookingId);
}

export function getProviderById(providerId: string): Provider | undefined {
  return providers.find((p) => p.id === providerId);
}

export function getProviderUserId(providerId: string): string | undefined {
  return providers.find((p) => p.id === providerId)?.userId;
}

export function customerHasBookingWithProvider(
  customerId: string,
  providerId: string,
): boolean {
  return bookings.some(
    (b) => b.customerId === customerId && b.providerId === providerId,
  );
}

export function getBookings(userId: string): Booking[] {
  return bookings
    .filter((b) => b.customerId === userId)
    .sort(
      (a, b) =>
        new Date(b.startsAt).getTime() - new Date(a.startsAt).getTime(),
    );
}

export function getNotifications(userId: string): Notification[] {
  return notifications
    .filter((n) => n.userId === userId)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
}
