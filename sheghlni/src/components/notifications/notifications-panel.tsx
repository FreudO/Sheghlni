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
import { toast } from "@/lib/toast";

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
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-2.5">
        <h2 className="text-sm font-semibold text-text-primary">Notifications</h2>
        <button
          type="button"
          onClick={() => {
            markAllNotificationsRead();
            toast.success("All notifications marked as read.");
          }}
          className="shrink-0 text-xs font-medium text-cta hover:underline"
        >
          Mark all as read
        </button>
      </div>

      <div className="scrollbar-subtle max-h-[min(22rem,55vh)] overflow-y-auto overscroll-contain py-1 pr-0.5">
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
                <div key={groupKey} className="mb-1 last:mb-0">
                  <p className="px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wider text-bronze-600/80">
                    {GROUP_LABELS[groupKey]}
                  </p>
                  <ul className="px-1">
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
        <div className="border-t border-border px-4 py-2.5">
          <Link
            href="/notifications/"
            onClick={onNavigate}
            className="block text-center text-xs font-medium text-cta hover:underline"
          >
            See all notifications
          </Link>
        </div>
      )}
    </div>
  );
}
