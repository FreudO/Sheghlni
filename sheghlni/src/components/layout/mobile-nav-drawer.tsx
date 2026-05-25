"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ProviderModeToggle } from "@/components/auth/provider-mode-toggle";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import {
  getIsProMode,
  setIsProMode,
  subscribeProMode,
} from "@/lib/auth/pro-mode-store";
import {
  DEMO_CUSTOMER_IDENTITY,
  DEMO_PROVIDER_IDENTITY,
} from "@/lib/mock/pro-data";
import { cn } from "@/lib/utils";

type NavLink = {
  href: string;
  label: string;
  variant?: "default" | "cta";
};

type MobileNavDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  links: NavLink[];
  themeVariant: "dark" | "light";
  title?: string;
  showProviderToggle?: boolean;
};

const linkClass =
  "flex min-h-14 w-full items-center rounded-xl px-4 text-base font-medium transition ease-default duration-default";

export function MobileNavDrawer({
  open,
  onOpenChange,
  links,
  themeVariant,
  title = "Menu",
  showProviderToggle = false,
}: MobileNavDrawerProps) {
  const router = useRouter();
  const isDark = themeVariant === "dark";
  const [isProvider, setIsProvider] = useState(false);

  useEffect(() => {
    setIsProvider(getIsProMode());
    return subscribeProMode(() => setIsProvider(getIsProMode()));
  }, [open]);

  const identity = isProvider
    ? DEMO_PROVIDER_IDENTITY
    : DEMO_CUSTOMER_IDENTITY;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className={cn(
          "flex w-full max-w-full flex-col gap-0 border-0 p-0 sm:max-w-[20rem]",
          isDark ? "bg-ink-900 text-cream-50" : "bg-bg-elevated text-text-primary",
        )}
      >
        <SheetHeader
          className={cn(
            "border-b px-5 pb-4 pt-6",
            isDark ? "border-white/10" : "border-border",
          )}
        >
          <div className="flex items-center gap-3 pr-10">
            <span
              aria-hidden
              className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-bronze-500 text-base font-semibold text-white"
            >
              {identity.initial}
            </span>
            <div className="min-w-0">
              <SheetTitle
                className={cn(
                  "font-display text-lg font-semibold",
                  isDark ? "text-cream-50" : "text-text-primary",
                )}
              >
                Hi, {identity.firstName}
              </SheetTitle>
              <p
                className={cn(
                  "truncate text-sm",
                  isDark ? "text-cream-200/80" : "text-text-tertiary",
                )}
              >
                {isProvider
                  ? DEMO_PROVIDER_IDENTITY.businessName
                  : title}
              </p>
            </div>
          </div>
        </SheetHeader>

        {showProviderToggle && (
          <div
            className={cn(
              "border-b px-4 py-4",
              isDark ? "border-white/10" : "border-border",
            )}
          >
            <ProviderModeToggle
              variant={themeVariant}
              className="w-full justify-center"
            />
          </div>
        )}

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => onOpenChange(false)}
              className={cn(
                linkClass,
                link.variant === "cta"
                  ? "mt-2 justify-center rounded-full bg-cta text-white hover:bg-cta-hover"
                  : isDark
                    ? "text-cream-100 hover:bg-white/10"
                    : "text-text-primary hover:bg-bg-elevated-2",
              )}
            >
              {link.label}
            </Link>
          ))}
          {isProvider && (
            <button
              type="button"
              onClick={() => {
                setIsProMode(false);
                onOpenChange(false);
                router.push("/");
              }}
              className={cn(
                linkClass,
                "mt-2 text-left",
                isDark
                  ? "text-cream-200/90 hover:bg-white/10"
                  : "text-text-secondary hover:bg-bg-elevated-2",
              )}
            >
              Switch to customer view
            </button>
          )}
        </nav>

        <div
          className={cn(
            "mt-auto border-t px-5 py-5",
            isDark ? "border-white/10" : "border-border",
          )}
        >
          <div className="flex items-center justify-between">
            <span
              className={cn(
                "text-sm font-medium",
                isDark ? "text-cream-200" : "text-text-secondary",
              )}
            >
              Dark mode
            </span>
            <ThemeToggle variant={themeVariant} />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
