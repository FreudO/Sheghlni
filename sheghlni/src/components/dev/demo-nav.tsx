"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Compass, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { enableDemoModeFromUrl, isDemoModeEnabled } from "@/lib/demo/demo-role";
import { cn } from "@/lib/utils";

const DEMO_LINKS = [
  { label: "App overview", href: "/demo/?demo=true" },
  { label: "Landing", href: "/?demo=true" },
  {
    label: "Search results",
    href: "/search/?q=house+cleaner&city=Boston%2C+MA&demo=true",
  },
  { label: "Provider profile (Sofia Reyes)", href: "/p/sofia-reyes-photo/?demo=true" },
  {
    label: "Booking flow",
    href: "/inbox/?provider=sofia-reyes-photo&service=svc-sr-1&demo=true",
  },
  { label: "Inbox", href: "/inbox/?demo=true" },
  { label: "Customer bookings", href: "/bookings/?demo=true" },
  { label: "Pro dashboard", href: "/pro/dashboard/?demo=true" },
  { label: "Pro calendar", href: "/pro/calendar/?demo=true" },
  { label: "Pro earnings", href: "/pro/earnings/?demo=true" },
  { label: "Sign in", href: "/sign-in/?demo=true" },
  { label: "Pro onboarding", href: "/pro/onboarding/?demo=true" },
] as const;

export function DemoNav() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    enableDemoModeFromUrl();
    setVisible(isDemoModeEnabled());
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-20 left-4 z-[60] md:bottom-6">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          className={cn(
            "inline-flex items-center gap-2 rounded-full border border-ink-700 bg-ink-900 px-4 py-2",
            "text-sm font-medium text-cream-50 shadow-lg transition hover:bg-ink-800",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta/50",
          )}
        >
          <Compass className="size-4 text-gold-500" aria-hidden />
          Demo mode
        </SheetTrigger>
        <SheetContent side="right" className="w-[min(100vw-2rem,22rem)] bg-bg">
          <SheetHeader className="flex-row items-center justify-between space-y-0">
            <SheetTitle>Demo navigation</SheetTitle>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-md p-1 text-text-tertiary hover:text-text-primary"
              aria-label="Close demo navigation"
            >
              <X className="size-5" />
            </button>
          </SheetHeader>
          <p className="mt-2 text-body-sm text-text-secondary">
            Quick links for stakeholder walkthroughs. Add{" "}
            <code className="rounded bg-bg-elevated px-1 py-0.5 text-caption">?demo=true</code>{" "}
            to any URL to show this panel on GitHub Pages.
          </p>
          <nav className="mt-6 flex flex-col gap-1" aria-label="Demo pages">
            {DEMO_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm text-text-primary transition hover:bg-bg-elevated"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
