import type { Notification } from "@/lib/mock";
import { notifications as seedNotifications } from "@/lib/mock/data";
import { DEMO_USER_ID } from "@/lib/mock/constants";

let items: Notification[] = seedNotifications
  .filter((n) => n.userId === DEMO_USER_ID)
  .map((n) => ({ ...n }));

const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((listener) => listener());
}

export function getNotificationsState(): Notification[] {
  return [...items].sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export function getUnreadCount(): number {
  return items.filter((n) => !n.readAt).length;
}

export function markNotificationRead(id: string): void {
  items = items.map((n) =>
    n.id === id ? { ...n, readAt: new Date().toISOString() } : n,
  );
  notify();
}

export function markAllNotificationsRead(): void {
  const now = new Date().toISOString();
  items = items.map((n) => (n.readAt ? n : { ...n, readAt: now }));
  notify();
}

export function subscribeNotifications(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
