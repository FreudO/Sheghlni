"use client";

import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/ui/theme-toggle";
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
};

const linkClass =
  "flex min-h-14 w-full items-center rounded-xl px-4 text-base font-medium transition ease-default duration-default";

export function MobileNavDrawer({
  open,
  onOpenChange,
  links,
  themeVariant,
  title = "Menu",
}: MobileNavDrawerProps) {
  const isDark = themeVariant === "dark";

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className={cn(
          "flex w-full max-w-full flex-col gap-0 border-0 p-0 sm:max-w-[20rem]",
          isDark ? "bg-ink-900 text-cream-50" : "bg-bg-elevated text-text-primary",
        )}
      >
        <SheetHeader className="border-b border-border/10 px-5 pb-4 pt-6">
          <div className="flex items-center gap-3 pr-10">
            <span
              aria-hidden
              className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-bronze-500 text-base font-semibold text-white"
            >
              A
            </span>
            <div>
              <SheetTitle
                className={cn(
                  "font-display text-lg font-semibold",
                  isDark ? "text-cream-50" : "text-text-primary",
                )}
              >
                Hi, Alex
              </SheetTitle>
              <p
                className={cn(
                  "text-sm",
                  isDark ? "text-cream-200/80" : "text-text-tertiary",
                )}
              >
                {title}
              </p>
            </div>
          </div>
        </SheetHeader>

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
