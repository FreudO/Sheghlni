"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarDays,
  Home,
  MessageCircle,
  Search,
  User,
} from "lucide-react";
import { DEMO_USER_ID, getConversations } from "@/lib/mock";
import { cn } from "@/lib/utils";

const tabs = [
  { href: "/", label: "Home", icon: Home, match: (path: string) => path === "/" },
  {
    href: "/search/",
    label: "Search",
    icon: Search,
    match: (path: string) => path.startsWith("/search"),
  },
  {
    href: "/inbox/",
    label: "Inbox",
    icon: MessageCircle,
    match: (path: string) => path.startsWith("/inbox"),
  },
  {
    href: "/bookings/",
    label: "Bookings",
    icon: CalendarDays,
    match: (path: string) => path.startsWith("/bookings"),
  },
  {
    href: "/account/",
    label: "Account",
    icon: User,
    match: (path: string) => path.startsWith("/account"),
  },
];

export function MobileTabBar() {
  const pathname = usePathname();
  const normalizedPath =
    pathname.endsWith("/") && pathname.length > 1
      ? pathname.slice(0, -1)
      : pathname;

  const unreadMessages = getConversations(DEMO_USER_ID).reduce(
    (sum, conversation) => sum + conversation.customerUnreadCount,
    0,
  );

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-bg-elevated pb-[env(safe-area-inset-bottom)] md:hidden"
      aria-label="Primary"
    >
      <ul className="mx-auto flex h-16 max-w-[1280px] items-stretch px-2">
        {tabs.map((tab) => {
          const isActive = tab.match(normalizedPath);
          const Icon = tab.icon;
          const showBadge = tab.label === "Inbox" && unreadMessages > 0;

          return (
            <li key={tab.href} className="flex flex-1">
              <Link
                href={tab.href}
                className={cn(
                  "relative flex flex-1 flex-col items-center justify-center gap-1 transition ease-default duration-default",
                  isActive ? "text-bronze-500" : "text-ink-300",
                )}
              >
                <span className="relative">
                  <Icon
                    className={cn("size-icon-sm", isActive && "fill-bronze-500/15")}
                    strokeWidth={isActive ? 2.25 : 1.75}
                  />
                  {showBadge && (
                    <span className="absolute -right-1.5 -top-1 flex min-h-4 min-w-4 items-center justify-center rounded-full bg-clay-500 px-1 text-[10px] font-semibold text-white">
                      {unreadMessages > 9 ? "9+" : unreadMessages}
                    </span>
                  )}
                </span>
                <span className="text-[0.6875rem] font-medium leading-none">
                  {tab.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
