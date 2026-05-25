"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { NotificationItem } from "@/components/notifications/notification-item";
import {
  getNotificationsState,
  markAllNotificationsRead,
  subscribeNotifications,
} from "@/lib/notifications/notifications-store";
import {
  groupNotifications,
  type NotificationGroup,
} from "@/lib/notifications/format";

const GROUP_LABELS: Record<NotificationGroup, string> = {
  today: "Today",
  this_week: "This week",
  earlier: "Earlier",
};

type NotificationsPanelProps = {
  onNavigate?: () => void;
  showFooterLink?: boolean;
  className?: string;
};

export function NotificationsPanel({
  onNavigate,
  showFooterLink = true,
  className,
}: NotificationsPanelProps) {
  const [notifications, setNotifications] = useState(getNotificationsState);

  useEffect(() => subscribeNotifications(() => {
    setNotifications(getNotificationsState());
  }), []);

  const groups = groupNotifications(notifications);

  return (
    <div className={className}>
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <h2 className="font-semibold text-text-primary">Notifications</h2>
        <button
          type="button"
          onClick={() => {
            markAllNotificationsRead();
          }}
          className="text-sm font-medium text-cta hover:underline"
        >
          Mark all as read
        </button>
      </div>

      <div className="max-h-[min(24rem,60vh)] overflow-y-auto px-2 py-2">
        {notifications.length === 0 ? (
          <p className="px-3 py-8 text-center text-sm text-ink-300">
            You&apos;re all caught up.
          </p>
        ) : (
          (["today", "this_week", "earlier"] as NotificationGroup[]).map(
            (groupKey) => {
              const items = groups[groupKey];
              if (items.length === 0) return null;
              return (
                <div key={groupKey} className="mb-2">
                  <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-ink-300">
                    {GROUP_LABELS[groupKey]}
                  </p>
                  <ul>
                    {items.map((notification) => (
                      <li key={notification.id}>
                        <NotificationItem
                          notification={notification}
                          onNavigate={onNavigate}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              );
            },
          )
        )}
      </div>

      {showFooterLink && (
        <div className="border-t border-border px-4 py-3">
          <Link
            href="/notifications/"
            onClick={onNavigate}
            className="block text-center text-sm font-medium text-cta hover:underline"
          >
            See all notifications
          </Link>
        </div>
      )}
    </div>
  );
}
