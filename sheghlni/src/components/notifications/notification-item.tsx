"use client";

import Link from "next/link";
import {
  Bell,
  CalendarDays,
  FileText,
  MessageCircle,
  Star,
  Tag,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Notification, NotificationKind } from "@/lib/mock";
import { formatNotificationTime, getNotificationHref } from "@/lib/notifications/format";
import { markNotificationRead } from "@/lib/notifications/notifications-store";
import { IconWell } from "@/components/ui/icon-well";
import { cn } from "@/lib/utils";

const ICONS: Record<NotificationKind, { icon: LucideIcon; className: string }> = {
  message: { icon: MessageCircle, className: "text-bronze-500" },
  booking: { icon: CalendarDays, className: "text-sage-500" },
  quote: { icon: FileText, className: "text-bronze-500" },
  review: { icon: Star, className: "text-gold-500" },
  promotion: { icon: Tag, className: "text-gold-500" },
  system: { icon: Bell, className: "text-ink-300" },
};

type NotificationItemProps = {
  notification: Notification;
  onNavigate?: () => void;
};

export function NotificationItem({
  notification,
  onNavigate,
}: NotificationItemProps) {
  const config = ICONS[notification.kind] ?? ICONS.system;
  const Icon = config.icon;
  const unread = !notification.readAt;

  return (
    <Link
      href={getNotificationHref(notification)}
      onClick={() => {
        if (unread) markNotificationRead(notification.id);
        onNavigate?.();
      }}
      className={cn(
        "flex items-start gap-2.5 rounded-lg px-2.5 py-2 transition ease-default duration-default hover:bg-bg-elevated-2",
        unread && "bg-bronze-500/5",
      )}
    >
      <IconWell
        icon={Icon}
        size="sm"
        className={cn(
          "mt-0.5 !size-7 border-cream-200",
          unread && "border-bronze-300/60 bg-bronze-500/10",
        )}
        iconClassName={cn("!size-3.5", config.className)}
      />
      <span className="min-w-0 flex-1">
        <span className="flex items-baseline gap-2">
          <span className="flex min-w-0 flex-1 items-center gap-1.5">
            {unread && (
              <span
                className="size-1.5 shrink-0 rounded-full bg-bronze-500"
                aria-hidden
              />
            )}
            <span className="truncate font-medium text-text-primary">
              {notification.title}
            </span>
          </span>
          <time className="shrink-0 text-[11px] tabular-nums text-ink-300">
            {formatNotificationTime(notification.createdAt)}
          </time>
        </span>
        <p className="mt-0.5 line-clamp-2 text-sm leading-snug text-text-secondary">
          {notification.body}
        </p>
      </span>
    </Link>
  );
}
