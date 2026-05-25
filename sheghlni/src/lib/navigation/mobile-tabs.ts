import type { LucideIcon } from "lucide-react";
import {
  CalendarDays,
  DollarSign,
  Home,
  LayoutDashboard,
  MessageCircle,
  Search,
  User,
} from "lucide-react";

export type MobileTabConfig = {
  href: string;
  label: string;
  icon: LucideIcon;
  match: (path: string) => boolean;
  showUnreadBadge?: boolean;
};

export const customerMobileTabs: MobileTabConfig[] = [
  { href: "/", label: "Home", icon: Home, match: (path) => path === "/" },
  {
    href: "/search/",
    label: "Search",
    icon: Search,
    match: (path) => path.startsWith("/search"),
  },
  {
    href: "/inbox/",
    label: "Inbox",
    icon: MessageCircle,
    match: (path) => path.startsWith("/inbox"),
    showUnreadBadge: true,
  },
  {
    href: "/bookings/",
    label: "Bookings",
    icon: CalendarDays,
    match: (path) => path.startsWith("/bookings"),
  },
  {
    href: "/account/",
    label: "Account",
    icon: User,
    match: (path) => path.startsWith("/account"),
  },
];

export const providerMobileTabs: MobileTabConfig[] = [
  {
    href: "/pro/",
    label: "Dashboard",
    icon: LayoutDashboard,
    match: (path) => path === "/pro" || path === "/pro/dashboard",
  },
  {
    href: "/pro/calendar/",
    label: "Calendar",
    icon: CalendarDays,
    match: (path) => path.startsWith("/pro/calendar"),
  },
  {
    href: "/inbox/",
    label: "Inbox",
    icon: MessageCircle,
    match: (path) => path.startsWith("/inbox"),
    showUnreadBadge: true,
  },
  {
    href: "/pro/earnings/",
    label: "Earnings",
    icon: DollarSign,
    match: (path) => path.startsWith("/pro/earnings"),
  },
  {
    href: "/pro/profile/edit/",
    label: "Profile",
    icon: User,
    match: (path) => path.startsWith("/pro/profile"),
  },
];
