export function formatUsd(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

export function formatUsdExact(cents: number): string {
  const dollars = cents / 100;
  const hasCents = cents % 100 !== 0;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: hasCents ? 2 : 0,
    maximumFractionDigits: 2,
  }).format(dollars);
}

/** Relative label for conversation list rows */
export function formatConversationTime(iso: string): string {
  const date = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60_000);

  if (diffMin < 1) return "Just now";
  if (diffMin < 60) return `${diffMin} min ago`;

  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) return `${diffHours}h ago`;

  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  );
  const startOfYesterday = new Date(startOfToday);
  startOfYesterday.setDate(startOfYesterday.getDate() - 1);

  if (date >= startOfToday) {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  }
  if (date >= startOfYesterday) return "Yesterday";

  const diffDays = Math.floor(diffMs / 86_400_000);
  if (diffDays < 7) {
    return date.toLocaleDateString("en-US", { weekday: "short" });
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function formatBookingDateTime(startsAt: string): string {
  const date = new Date(startsAt);
  return date.toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function formatQuoteExpiry(expiresAt: string): string {
  const expires = new Date(expiresAt);
  const now = new Date();
  const diffDays = Math.ceil(
    (expires.getTime() - now.getTime()) / 86_400_000,
  );

  if (diffDays <= 0) return "Expired";
  if (diffDays === 1) return "Expires in 1 day";
  return `Expires in ${diffDays} days`;
}

export function formatAddressLine(
  line1: string,
  city: string,
  region: string,
): string {
  return `${line1}, ${city}, ${region}`;
}

/** ~30% of conversations show as online (deterministic from id) */
export function isProviderOnlineMock(conversationId: string): boolean {
  let hash = 0;
  for (let i = 0; i < conversationId.length; i++) {
    hash = (hash + conversationId.charCodeAt(i) * (i + 1)) % 100;
  }
  return hash < 30;
}

export function formatLastSeen(conversationId: string): string {
  if (isProviderOnlineMock(conversationId)) return "Active now";
  const hours = 2 + (conversationId.charCodeAt(conversationId.length - 1) % 5);
  return `Last seen ${hours}h ago`;
}
