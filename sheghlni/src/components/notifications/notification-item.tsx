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
import { ICON_STROKE } from "@/components/ui/icon-well";
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
        "flex gap-3 rounded-xl px-3 py-3 transition hover:bg-bg-elevated-2",
        unread && "bg-bronze-500/5",
      )}
    >
      <span className="relative flex size-9 shrink-0 items-center justify-center rounded-full bg-bg-elevated">
        <Icon className={cn("size-4", config.className)} strokeWidth={ICON_STROKE} />
        {unread && (
          <span className="absolute right-0 top-0 size-2 rounded-full bg-bronze-500 ring-2 ring-bg" />
        )}
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-start justify-between gap-2">
          <span className="font-medium text-text-primary line-clamp-1">
            {notification.title}
          </span>
          <time className="shrink-0 text-xs text-ink-300">
            {formatNotificationTime(notification.createdAt)}
          </time>
        </span>
        <span className="mt-0.5 line-clamp-2 text-sm text-text-secondary">
          {notification.body}
        </span>
      </span>
    </Link>
  );
}
