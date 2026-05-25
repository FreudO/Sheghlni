"use client";

import Link from "next/link";
import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Banknote,
  CalendarClock,
  CircleDollarSign,
  Sparkles,
  UserRound,
} from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/landing/reveal";
import { proTestimonials } from "@/lib/mock/pro-data";
import { ICON_STROKE, IconWell } from "@/components/ui/icon-well";
import { cn } from "@/lib/utils";

const BENEFITS: {
  title: string;
  description: string;
  icon: LucideIcon;
  iconClassName: string;
}[] = [
  {
    title: "Set your own rates",
    description:
      "You decide what each job is worth — no race to the bottom.",
    icon: CircleDollarSign,
    iconClassName: "text-bronze-500",
  },
  {
    title: "Work when you want",
    description:
      "Block off time, sync calendars, and accept only jobs that fit.",
    icon: CalendarClock,
    iconClassName: "text-sage-500",
  },
  {
    title: "Keep 88%+ of earnings",
    description:
      "Transparent fees. Most pros keep the vast majority of every booking.",
    icon: Banknote,
    iconClassName: "text-gold-500",
  },
];

const PROVIDER_STEPS: {
  step: string;
  title: string;
  description: string;
  icon: LucideIcon;
  iconClassName: string;
}[] = [
  {
    step: "1",
    title: "Create your profile",
    description:
      "Add services, photos, and pricing in about 15 minutes.",
    icon: UserRound,
    iconClassName: "text-bronze-500",
  },
  {
    step: "2",
    title: "Get discovered",
    description:
      "Show up in local search when customers need your skills.",
    icon: Sparkles,
    iconClassName: "text-sage-500",
  },
  {
    step: "3",
    title: "Get paid automatically",
    description:
      "Secure payouts after each job — no chasing invoices.",
    icon: Banknote,
    iconClassName: "text-gold-500",
  },
];

const STATS = [
  { value: "10,000+", label: "Active pros" },
  { value: "88%+", label: "You keep" },
  { value: "$285", label: "Avg. booking" },
] as const;

function SectionHeader({
  title,
  subtitle,
  className,
}: {
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <h2 className="font-display text-[1.375rem] font-medium text-text-primary md:text-h2">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-body-sm text-text-secondary md:text-body">
          {subtitle}
        </p>
      )}
    </div>
  );
}

function EarningsCalculator({ className }: { className?: string }) {
  const [jobsPerWeek, setJobsPerWeek] = useState(4);
  const projected = jobsPerWeek * 285 * 4;

  return (
    <div
      className={cn(
        "rounded-2xl border border-cream-200 bg-bg-elevated p-6 shadow-sm md:p-8",
        className,
      )}
    >
      <p className="text-caption font-semibold uppercase tracking-wider text-bronze-600">
        Earnings estimate
      </p>
      <h2 className="mt-1 font-display text-h3 text-text-primary">
        See what you could earn
      </h2>
      <p className="mt-2 text-sm text-text-secondary">
        Adjust jobs per week — based on a $285 average booking.
      </p>

      <div className="mt-6">
        <div className="flex items-baseline justify-between gap-3">
          <label htmlFor="jobs-per-week" className="text-sm font-medium text-text-primary">
            Jobs per week
          </label>
          <span className="tabular-nums text-sm font-semibold text-bronze-600">
            {jobsPerWeek}
          </span>
        </div>
        <input
          id="jobs-per-week"
          type="range"
          min={1}
          max={20}
          value={jobsPerWeek}
          onChange={(e) => setJobsPerWeek(Number(e.target.value))}
          className="mt-3 w-full accent-bronze-500"
        />
        <div className="mt-1 flex justify-between text-[11px] text-ink-300">
          <span>1</span>
          <span>20</span>
        </div>
      </div>

      <div className="mt-8 rounded-xl bg-bronze-500/10 px-4 py-5 text-center ring-1 ring-inset ring-bronze-300/40">
        <p className="text-caption text-bronze-600">Estimated monthly</p>
        <p className="mt-1 font-display text-display-lg text-bronze-600">
          ~${projected.toLocaleString()}
        </p>
      </div>
    </div>
  );
}

export function BecomeAProContent() {
  return (
    <div className="bg-bg text-text-primary">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cream-200/80 via-cream-100/40 to-bg"
          aria-hidden
        />
        <div className="relative mx-auto max-w-[1280px] px-4 py-12 md:px-6 md:py-16 lg:grid lg:grid-cols-[1fr_min(24rem,38%)] lg:items-center lg:gap-14 lg:px-12 lg:py-20">
          <Reveal>
            <p className="text-caption font-semibold uppercase tracking-wider text-bronze-600">
              For service professionals
            </p>
            <h1 className="mt-3 font-display text-[2rem] leading-[1.1] text-ink-900 md:text-display-lg lg:text-display-xl">
              Get paid for what you&apos;re good at.
            </h1>
            <p className="mt-4 max-w-xl text-body text-text-secondary md:text-body-lg">
              Join thousands of local pros on Sheghlni. Build a profile, get
              discovered, and get booked — without giving up half your pay.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Link
                href="/pro/onboarding/"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-cta px-8 text-sm font-semibold text-white transition ease-default duration-default hover:bg-cta-hover"
              >
                Start earning today
                <ArrowRight className="size-4" strokeWidth={ICON_STROKE} aria-hidden />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex h-12 items-center justify-center rounded-full border border-cream-200 bg-bg-elevated/80 px-6 text-sm font-medium text-text-primary transition hover:border-bronze-300/60 hover:bg-bg-elevated"
              >
                How it works
              </a>
            </div>

            <ul className="mt-10 flex flex-wrap gap-6 border-t border-cream-200 pt-8 sm:gap-10">
              {STATS.map((stat) => (
                <li key={stat.label}>
                  <p className="font-display text-h2 text-bronze-600">{stat.value}</p>
                  <p className="mt-0.5 text-caption text-text-secondary">{stat.label}</p>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.08} className="mt-10 lg:mt-0">
            <EarningsCalculator />
          </Reveal>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-bg-elevated py-12 md:py-16">
        <div className="mx-auto max-w-[1280px] px-4 md:px-6 lg:px-12">
          <Reveal>
            <SectionHeader
              title="Why pros choose Sheghlni"
              subtitle="Everything you need to run a local service business — without the overhead."
            />
          </Reveal>

          <RevealGroup className="mt-8 grid gap-4 md:grid-cols-3 md:gap-6">
            {BENEFITS.map((benefit) => (
              <RevealItem key={benefit.title}>
                <article className="flex h-full flex-col rounded-2xl border border-border bg-bg p-5 md:p-6">
                  <IconWell
                    icon={benefit.icon}
                    size="sm"
                    iconClassName={benefit.iconClassName}
                  />
                  <h3 className="mt-4 font-display text-h3 text-text-primary">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 flex-1 text-body-sm text-text-secondary">
                    {benefit.description}
                  </p>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        className="scroll-mt-20 border-y border-border py-12 md:py-16"
      >
        <div className="mx-auto max-w-[1280px] px-4 md:px-6 lg:px-12">
          <Reveal>
            <SectionHeader
              title="Three steps to your first booking"
              subtitle="Most pros finish setup in one sitting and start receiving leads within days."
            />
          </Reveal>

          <RevealGroup className="mt-8 grid gap-4 md:grid-cols-3 md:gap-6">
            {PROVIDER_STEPS.map((item) => (
              <RevealItem key={item.step}>
                <article className="relative overflow-hidden rounded-2xl border border-border bg-bg-elevated p-6">
                  <span className="font-display text-display-lg text-bronze-500/30">
                    {item.step}
                  </span>
                  <div className="mt-3">
                    <IconWell
                      icon={item.icon}
                      size="sm"
                      iconClassName={item.iconClassName}
                    />
                  </div>
                  <h3 className="mt-4 font-display text-h3 text-text-primary">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-body-sm text-text-secondary">
                    {item.description}
                  </p>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-bg-elevated py-12 md:py-16">
        <div className="mx-auto max-w-[1280px] px-4 md:px-6 lg:px-12">
          <Reveal>
            <SectionHeader
              title="Pros who made the switch"
              subtitle="Real stories from photographers, electricians, and pet care providers on the platform."
            />
          </Reveal>

          <RevealGroup className="mt-8 grid gap-4 lg:grid-cols-3 lg:gap-6">
            {proTestimonials.map((t) => (
              <RevealItem key={t.name}>
                <blockquote className="flex h-full flex-col rounded-2xl border border-border bg-bg p-6">
                  <p className="flex-1 text-body-sm leading-relaxed text-text-primary md:text-body">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <footer className="mt-6 flex items-center gap-3 border-t border-cream-200 pt-5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={t.avatar}
                      alt=""
                      className="size-11 rounded-full object-cover ring-2 ring-cream-200"
                    />
                    <div className="min-w-0">
                      <p className="font-semibold text-text-primary">{t.name}</p>
                      <p className="truncate text-caption text-text-secondary">
                        {t.category}
                      </p>
                      <p className="mt-0.5 text-sm font-medium text-bronze-600">
                        {t.earnings}
                      </p>
                    </div>
                  </footer>
                </blockquote>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-r from-bronze-600 to-bronze-500 py-12 md:py-16">
        <Reveal className="mx-auto max-w-[1280px] px-4 text-center md:px-6 lg:px-12">
          <h2 className="font-display text-[1.375rem] font-medium text-white md:text-display-lg">
            Ready to grow your business?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-body-sm text-white/90 md:text-body-lg">
            Set up your profile in minutes. No subscription required to get
            started.
          </p>
          <Link
            href="/pro/onboarding/"
            className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-8 text-sm font-semibold text-ink-900 transition ease-default duration-default hover:bg-cream-100"
          >
            Start earning today
            <ArrowRight className="size-4" strokeWidth={ICON_STROKE} aria-hidden />
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
