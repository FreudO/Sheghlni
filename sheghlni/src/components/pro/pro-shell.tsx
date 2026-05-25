"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarDays,
  DollarSign,
  LayoutDashboard,
  Pencil,
  ExternalLink,
} from "lucide-react";
import { ICON_STROKE } from "@/components/ui/icon-well";
import { DEMO_PRO_HANDLE } from "@/lib/mock/pro-data";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  {
    href: "/pro/",
    label: "Dashboard",
    icon: LayoutDashboard,
    match: (p: string) => p === "/pro" || p === "/pro/dashboard",
  },
  {
    href: "/pro/calendar/",
    label: "Calendar",
    icon: CalendarDays,
    match: (p: string) => p.startsWith("/pro/calendar"),
  },
  {
    href: "/pro/earnings/",
    label: "Earnings",
    icon: DollarSign,
    match: (p: string) => p.startsWith("/pro/earnings"),
  },
  {
    href: "/pro/profile/edit/",
    label: "Edit profile",
    icon: Pencil,
    match: (p: string) => p.startsWith("/pro/profile"),
  },
];

type ProShellProps = {
  children: React.ReactNode;
};

export function ProShell({ children }: ProShellProps) {
  const pathname = usePathname();
  const normalized =
    pathname.endsWith("/") && pathname.length > 1
      ? pathname.slice(0, -1)
      : pathname;

  const isOnboarding = normalized.startsWith("/pro/onboarding");

  if (isOnboarding) {
    return <div className="min-h-screen bg-bg">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-bg">
      <div className="mx-auto max-w-6xl px-4 py-6 md:px-6 md:py-8 lg:px-8">
        <nav
          aria-label="Pro navigation"
          className="mb-8 hidden gap-1 overflow-x-auto border-b border-border pb-px [-ms-overflow-style:none] [scrollbar-width:none] md:flex md:gap-0 [&::-webkit-scrollbar]:hidden"
        >
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = item.match(normalized);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative inline-flex shrink-0 items-center gap-2 px-4 py-3 text-sm font-medium transition",
                  active
                    ? "text-bronze-600 after:absolute after:inset-x-2 after:bottom-0 after:h-0.5 after:rounded-full after:bg-bronze-500"
                    : "text-text-secondary hover:text-text-primary",
                )}
              >
                <Icon className="size-4" strokeWidth={ICON_STROKE} />
                {item.label}
              </Link>
            );
          })}
          <Link
            href={`/p/${DEMO_PRO_HANDLE}/`}
            className="ml-auto inline-flex shrink-0 items-center gap-1.5 px-4 py-3 text-sm font-medium text-ink-300 transition hover:text-cta"
          >
            View profile
            <ExternalLink className="size-3.5" strokeWidth={ICON_STROKE} />
          </Link>
        </nav>
        <main className="min-w-0">{children}</main>
      </div>
    </div>
  );
}
