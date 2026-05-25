"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getIsProMode, subscribeProMode } from "@/lib/auth/pro-mode-store";
import { DEMO_USER_ID, getConversations } from "@/lib/mock";
import {
  getUnreadTotal,
  subscribeUnread,
} from "@/lib/messaging/unread-store";
import {
  customerMobileTabs,
  providerMobileTabs,
  type MobileTabConfig,
} from "@/lib/navigation/mobile-tabs";
import { ICON_STROKE } from "@/components/ui/icon-well";
import { cn } from "@/lib/utils";

function useUnreadMessages() {
  const [unreadMessages, setUnreadMessages] = useState(() => {
    const fromStore = getUnreadTotal();
    if (fromStore > 0) return fromStore;
    return getConversations(DEMO_USER_ID).reduce(
      (sum, conversation) => sum + conversation.customerUnreadCount,
      0,
    );
  });

  useEffect(() => {
    return subscribeUnread(() => setUnreadMessages(getUnreadTotal()));
  }, []);

  return unreadMessages;
}

function MobileTabBarNav({ tabs }: { tabs: MobileTabConfig[] }) {
  const pathname = usePathname();
  const unreadMessages = useUnreadMessages();
  const normalizedPath =
    pathname.endsWith("/") && pathname.length > 1
      ? pathname.slice(0, -1)
      : pathname;

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-bg-elevated pb-[env(safe-area-inset-bottom)] md:hidden"
      aria-label="Primary"
    >
      <ul className="mx-auto flex h-16 max-w-[1280px] items-stretch px-1">
        {tabs.map((tab) => {
          const isActive = tab.match(normalizedPath);
          const Icon = tab.icon;
          const showBadge =
            tab.showUnreadBadge && unreadMessages > 0;

          return (
            <li key={tab.href} className="flex min-w-0 flex-1">
              <Link
                href={tab.href}
                className={cn(
                  "relative flex w-full min-w-0 flex-col items-center justify-center gap-1 px-0.5 transition ease-default duration-default",
                  isActive ? "text-bronze-500" : "text-ink-300",
                )}
              >
                <span className="relative">
                  <Icon
                    className={cn("size-icon-sm", isActive && "fill-bronze-500/15")}
                    strokeWidth={ICON_STROKE}
                  />
                  {showBadge && (
                    <span className="absolute -right-1.5 -top-1 flex min-h-4 min-w-4 items-center justify-center rounded-full bg-clay-500 px-1 text-[10px] font-semibold text-white">
                      {unreadMessages > 9 ? "9+" : unreadMessages}
                    </span>
                  )}
                </span>
                <span className="w-full truncate text-center text-[0.625rem] font-medium leading-none sm:text-[0.6875rem]">
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

export function MobileTabBar() {
  const [isProvider, setIsProvider] = useState(false);

  useEffect(() => {
    setIsProvider(getIsProMode());
    return subscribeProMode(() => setIsProvider(getIsProMode()));
  }, []);

  const tabs = isProvider ? providerMobileTabs : customerMobileTabs;
  return <MobileTabBarNav tabs={tabs} />;
}
