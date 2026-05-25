"use client";

import { Bell } from "lucide-react";
import { NotificationsPanel } from "@/components/notifications/notifications-panel";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  getUnreadCount,
  subscribeNotifications,
} from "@/lib/notifications/notifications-store";
import { ICON_STROKE } from "@/components/ui/icon-well";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function NotificationsDropdown() {
  const [open, setOpen] = useState(false);
  const [unread, setUnread] = useState(getUnreadCount);

  useEffect(() => subscribeNotifications(() => setUnread(getUnreadCount())), []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        type="button"
        className={cn(
          "relative inline-flex size-icon shrink-0 items-center justify-center rounded-full text-text-secondary transition ease-default duration-default hover:bg-bg-elevated-2",
        )}
        aria-label={
          unread > 0 ? `Notifications, ${unread} unread` : "Notifications"
        }
      >
        <Bell className="size-icon-sm" strokeWidth={ICON_STROKE} />
        {unread > 0 && (
          <span className="absolute right-1.5 top-1.5 size-icon-xs rounded-full bg-clay-500 ring-2 ring-bg" />
        )}
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={8}
        className="w-[min(100vw-2rem,380px)] overflow-hidden rounded-2xl border-border bg-bg-elevated p-0 shadow-xl"
      >
        <NotificationsPanel
          onNavigate={() => setOpen(false)}
          showFooterLink
        />
      </PopoverContent>
    </Popover>
  );
}
