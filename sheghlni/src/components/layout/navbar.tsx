"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, Search } from "lucide-react";
import { ProviderModeToggle } from "@/components/auth/provider-mode-toggle";
import { AccountMenu } from "@/components/layout/account-menu";
import { NotificationsDropdown } from "@/components/notifications/notifications-dropdown";
import { MobileNavDrawer } from "@/components/layout/mobile-nav-drawer";
import { SheghlniLogo } from "@/components/layout/sheghlni-logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { getIsProMode, subscribeProMode } from "@/lib/auth/pro-mode-store";
import { ICON_STROKE } from "@/components/ui/icon-well";
import { DEMO_PRO_HANDLE } from "@/lib/mock/pro-data";
import { cn } from "@/lib/utils";

type NavbarProps = {
  variant?: "dark" | "light";
  landing?: boolean;
};

const landingNavLinks = [
  { href: "/search/", label: "Browse" },
  { href: "/become-a-pro/", label: "Become a provider" },
  { href: "/sign-in/", label: "Sign in" },
  { href: "/sign-up/", label: "Get started", variant: "cta" as const },
];

const customerNavLinks = [
  { href: "/search/", label: "Browse" },
  { href: "/become-a-pro/", label: "Become a provider" },
  { href: "/inbox/", label: "Inbox" },
  { href: "/bookings/", label: "Bookings" },
  { href: "/account/", label: "Account" },
  { href: "/sign-in/", label: "Sign in" },
  { href: "/sign-up/", label: "Get started", variant: "cta" as const },
];

const providerNavLinks = [
  { href: "/pro/", label: "Dashboard" },
  { href: "/pro/calendar/", label: "Calendar" },
  { href: "/pro/earnings/", label: "Earnings" },
  { href: "/inbox/", label: "Messages" },
  { href: `/p/${DEMO_PRO_HANDLE}/`, label: "Public profile" },
  { href: "/search/", label: "Browse as customer" },
];

export function Navbar({ variant = "light", landing = false }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isProvider, setIsProvider] = useState(false);

  useEffect(() => {
    setIsProvider(getIsProMode());
    return subscribeProMode(() => setIsProvider(getIsProMode()));
  }, []);

  const isDark = variant === "dark";
  const mobileLinks = isProvider ? providerNavLinks : customerNavLinks;
  const mobileTitle = isProvider
    ? "Provider account"
    : landing
      ? "Explore Sheghlni"
      : "Your account";

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition ease-default duration-default",
        isDark
          ? cn("text-cream-50", landing ? "hero-bg bg-ink-900" : "bg-ink-900")
          : "border-b border-border bg-bg/90 text-text-primary backdrop-blur-sm",
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-[1280px] flex-col",
          landing ? "px-4 md:px-6 lg:px-12" : "px-4 md:px-6 lg:px-12",
        )}
      >
        <div className="flex h-14 items-center gap-3 md:h-16">
          <SheghlniLogo variant={variant} />

          {isDark ? (
            <>
              <nav className="ml-auto hidden items-center gap-6 md:flex">
                {landingNavLinks
                  .filter((link) => link.variant !== "cta")
                  .map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-sm font-medium text-cream-100 transition ease-default duration-default hover:text-cream-50"
                    >
                      {link.label}
                    </Link>
                  ))}
                <ProviderModeToggle variant="dark" />
                <Link
                  href="/sign-up/"
                  className="inline-flex h-8 shrink-0 items-center justify-center rounded-full bg-cta px-3.5 text-sm font-semibold leading-none text-white no-underline transition ease-default duration-default hover:bg-cta-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                >
                  Get started
                </Link>
                <ThemeToggle variant="dark" />
              </nav>

              <div className="ml-auto flex items-center gap-1 md:hidden">
                <ProviderModeToggle variant="dark" />
                <button
                  type="button"
                  onClick={() => setMobileOpen(true)}
                  className="inline-flex size-11 items-center justify-center rounded-full text-cream-100 hover:bg-white/10"
                  aria-label="Open menu"
                >
                  <Menu className="size-5" strokeWidth={ICON_STROKE} />
                </button>
              </div>
              <MobileNavDrawer
                open={mobileOpen}
                onOpenChange={setMobileOpen}
                links={mobileLinks}
                themeVariant="dark"
                title={mobileTitle}
                showProviderToggle
              />
            </>
          ) : (
            <>
              <div className="mx-4 hidden flex-1 md:block md:max-w-md lg:max-w-lg xl:max-w-xl">
                <div className="relative">
                  <Search
                    className="pointer-events-none absolute left-3.5 top-1/2 size-icon-md -translate-y-1/2 text-text-tertiary"
                    strokeWidth={ICON_STROKE}
                  />
                  <input
                    type="search"
                    placeholder="What do you need help with?"
                    className="h-10 w-full rounded-lg border border-border bg-bg-elevated pl-10 text-sm outline-none focus-visible:ring-2 focus-visible:ring-cta/40"
                    aria-label="Search services"
                  />
                </div>
              </div>

              <div className="ml-auto hidden items-center gap-1 sm:gap-2 md:flex">
                <ProviderModeToggle variant="light" />
                <NotificationsDropdown />
                <ThemeToggle variant="light" />
                <AccountMenu />
              </div>

              <div className="ml-auto flex items-center gap-1 md:hidden">
                <ProviderModeToggle variant="light" />
                <NotificationsDropdown />
                <button
                  type="button"
                  onClick={() => setMobileOpen(true)}
                  className="inline-flex size-11 items-center justify-center rounded-full text-text-secondary hover:bg-bg-elevated-2"
                  aria-label="Open menu"
                >
                  <Menu className="size-5" strokeWidth={ICON_STROKE} />
                </button>
              </div>
              <MobileNavDrawer
                open={mobileOpen}
                onOpenChange={setMobileOpen}
                links={mobileLinks}
                themeVariant="light"
                title={mobileTitle}
                showProviderToggle
              />
            </>
          )}
        </div>

        {!isDark && !landing && (
          <div className="pb-3 md:hidden">
            <Link
              href="/search/"
              className="flex min-h-11 w-full items-center gap-3 rounded-2xl border border-border bg-bg-elevated px-4 text-left text-text-tertiary shadow-sm transition hover:border-cta/30"
            >
              <Search className="size-5 shrink-0" strokeWidth={ICON_STROKE} />
              <span className="text-[0.9375rem] text-text-tertiary">
                What do you need help with?
              </span>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
