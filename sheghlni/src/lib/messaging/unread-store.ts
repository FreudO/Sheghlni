import { DEMO_USER_ID, getConversations } from "@/lib/mock";

let totalUnread = getConversations(DEMO_USER_ID).reduce(
  (sum, c) => sum + c.customerUnreadCount,
  0,
);
const listeners = new Set<() => void>();

export function getUnreadTotal(): number {
  return totalUnread;
}

export function setUnreadTotal(next: number): void {
  totalUnread = next;
  listeners.forEach((listener) => listener());
}

export function subscribeUnread(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
