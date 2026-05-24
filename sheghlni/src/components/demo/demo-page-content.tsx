"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Calendar,
  Camera,
  LayoutDashboard,
  MessageSquare,
  Search,
  Sparkles,
  User,
  Wallet,
} from "lucide-react";
import { SheghlniLogo } from "@/components/layout/sheghlni-logo";
import { getRoleHomePath, setDemoRole, type DemoRole } from "@/lib/demo/demo-role";

const FEATURES = [
  {
    title: "Discovery & search",
    description:
      "Hero search, category browse, filters, map pins, and sortable provider results.",
    icon: Search,
    href: "/search/?q=photography&city=Boston%2C+MA&demo=true",
  },
  {
    title: "Provider profiles",
    description:
      "Gallery, services, reviews, availability, credentials, FAQ, and sticky booking bar.",
    icon: Camera,
    href: "/p/sofia-reyes-photo/?demo=true",
  },
  {
    title: "Messaging & booking",
    description:
      "Inbox threads, quote requests, and booking status for customers and pros.",
    icon: MessageSquare,
    href: "/inbox/?demo=true",
  },
  {
    title: "Pro dashboard",
    description:
      "Overview of leads, upcoming jobs, and performance metrics for service providers.",
    icon: LayoutDashboard,
    href: "/pro/dashboard/?demo=true",
  },
  {
    title: "Calendar & earnings",
    description: "Availability management, payout history, and revenue summaries.",
    icon: Calendar,
    href: "/pro/calendar/?demo=true",
  },
  {
    title: "Onboarding",
    description: "Guided pro signup flow with verification and profile setup steps.",
    icon: Sparkles,
    href: "/pro/onboarding/?demo=true",
  },
] as const;

function RoleButton({
  role,
  label,
  description,
  icon: Icon,
  onSelect,
}: {
  role: DemoRole;
  label: string;
  description: string;
  icon: typeof User;
  onSelect: (role: DemoRole) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(role)}
      className="group flex flex-col items-start rounded-2xl border border-border bg-bg-elevated p-6 text-left transition hover:border-cta/40 hover:shadow-md"
    >
      <span className="inline-flex size-11 items-center justify-center rounded-full bg-cta/10 text-cta">
        <Icon className="size-5" />
      </span>
      <span className="mt-4 font-display text-h3 text-text-primary">{label}</span>
      <span className="mt-2 text-body-sm text-text-secondary">{description}</span>
      <span className="mt-4 text-sm font-medium text-cta group-hover:underline">
        Enter demo →
      </span>
    </button>
  );
}

export function DemoPageContent() {
  const router = useRouter();

  const enterAs = (role: DemoRole) => {
    setDemoRole(role);
    router.push(`${getRoleHomePath(role)}?demo=true`);
  };

  return (
    <div className="mx-auto max-w-[960px] px-6 py-12 lg:px-12">
      <div className="text-center">
        <div className="flex justify-center">
          <SheghlniLogo variant="light" />
        </div>
        <p className="mt-3 text-body-lg text-text-secondary">
          Two-sided services marketplace — frontend visualization demo
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <RoleButton
          role="customer"
          label="Explore as Customer"
          description="Browse pros, compare quotes, and manage bookings."
          icon={User}
          onSelect={enterAs}
        />
        <RoleButton
          role="pro"
          label="Explore as Pro"
          description="Manage leads, calendar, earnings, and your business profile."
          icon={Wallet}
          onSelect={enterAs}
        />
      </div>

      <section className="mt-14">
        <h2 className="font-display text-h2 text-text-primary">Feature areas</h2>
        <p className="mt-2 max-w-2xl text-body text-text-secondary">
          Every screen runs on mock data — no backend required. Use the demo navigation
          pill (bottom-left) to jump between flows.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {FEATURES.map((feature) => (
            <Link
              key={feature.title}
              href={feature.href}
              className="rounded-2xl border border-border bg-bg p-5 transition hover:border-cta/30 hover:bg-bg-elevated"
            >
              <feature.icon className="size-5 text-cta" />
              <h3 className="mt-3 font-semibold text-text-primary">{feature.title}</h3>
              <p className="mt-2 text-body-sm text-text-secondary">{feature.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <p className="mt-12 text-center text-body-sm text-text-tertiary">
        Static export · Next.js 14 · Deployed on GitHub Pages
      </p>
    </div>
  );
}
