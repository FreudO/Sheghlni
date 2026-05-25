import {
  format,
  isThisWeek,
  isToday,
  parseISO,
} from "date-fns";
import type { Notification } from "@/lib/mock";

export type NotificationGroup = "today" | "this_week" | "earlier";

export function getNotificationGroup(
  createdAt: string,
): NotificationGroup {
  const date = parseISO(createdAt);
  if (isToday(date)) return "today";
  if (isThisWeek(date, { weekStartsOn: 0 })) return "this_week";
  return "earlier";
}

export function groupNotifications(
  notifications: Notification[],
): Record<NotificationGroup, Notification[]> {
  const groups: Record<NotificationGroup, Notification[]> = {
    today: [],
    this_week: [],
    earlier: [],
  };

  for (const notification of notifications) {
    groups[getNotificationGroup(notification.createdAt)].push(notification);
  }

  return groups;
}

export function formatNotificationTime(createdAt: string): string {
  const date = parseISO(createdAt);
  const now = new Date();
  const diffMin = Math.floor((now.getTime() - date.getTime()) / 60_000);

  if (diffMin < 1) return "Just now";
  if (diffMin < 60) return `${diffMin}m ago`;

  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24 && isToday(date)) return `${diffHours}h ago`;

  if (isToday(date)) return format(date, "h:mm a");
  if (isThisWeek(date, { weekStartsOn: 0 })) {
    return format(date, "EEE");
  }

  return format(date, "MMM d");
}

export function getNotificationHref(notification: Notification): string {
  const { data } = notification;

  if (data.conversationId) {
    return `/inbox/${data.conversationId}/`;
  }
  if (data.bookingId) {
    return "/bookings/";
  }
  if (data.quoteId && data.conversationId) {
    return `/inbox/${data.conversationId}/`;
  }
  return "/notifications/";
}
