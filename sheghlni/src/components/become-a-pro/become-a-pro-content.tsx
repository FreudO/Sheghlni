"use client";

import Link from "next/link";
import { useState } from "react";
import { proTestimonials } from "@/lib/mock/pro-data";
import { cn } from "@/lib/utils";

const BENEFITS = [
  {
    title: "Set your own rates",
    description: "You decide what each job is worth — no race to the bottom.",
  },
  {
    title: "Work when you want",
    description: "Block off time, sync calendars, and accept only the jobs that fit.",
  },
  {
    title: "Keep 88%+ of earnings",
    description: "Transparent fees. Most pros keep the vast majority of every booking.",
  },
];

const cardClass =
  "rounded-2xl border border-border bg-bg-elevated p-6 dark:border-white/10 dark:bg-white/5";

export function BecomeAProContent() {
  const [jobsPerWeek, setJobsPerWeek] = useState(4);
  const projected = jobsPerWeek * 285 * 4;

  return (
    <div className="bg-bg text-text-primary dark:bg-ink-900 dark:text-cream-50">
      <section className="relative overflow-hidden px-4 py-16 md:px-12 md:py-24 lg:py-28">
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-cream-200/90 via-cream-100/50 to-bg dark:hidden"
          aria-hidden
        />
        <div
          className="hero-bg pointer-events-none absolute inset-0 hidden dark:block"
          aria-hidden
        />
        <div className="relative mx-auto max-w-3xl text-center">
          <h1 className="font-display text-display-xl leading-tight text-ink-900 dark:text-cream-50">
            Get paid for what you&apos;re good at.
          </h1>
          <p className="mt-6 text-lg text-text-secondary dark:text-cream-200/90">
            Join thousands of local pros on Sheghlni. Build a profile, get
            discovered, and get booked — without the marketplace taking half your
            pay.
          </p>
          <Link
            href="/pro/onboarding/"
            className="mt-10 inline-flex h-12 items-center justify-center rounded-full bg-cta px-8 text-base font-semibold text-white transition hover:bg-cta-hover"
          >
            Start earning today
          </Link>
        </div>
      </section>

      <section className="border-t border-border px-4 py-14 dark:border-white/10 md:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {BENEFITS.map((benefit) => (
            <div key={benefit.title} className={cardClass}>
              <h2 className="font-display text-h3 text-text-primary dark:text-cream-50">
                {benefit.title}
              </h2>
              <p className="mt-2 text-sm text-text-secondary dark:text-cream-200/80">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border px-4 py-14 dark:border-white/10 md:px-12">
        <div className={cn("mx-auto max-w-xl p-8", cardClass)}>
          <h2 className="font-display text-h2 text-text-primary dark:text-cream-50">
            Earnings calculator
          </h2>
          <p className="mt-2 text-sm text-text-secondary dark:text-cream-200/80">
            How many jobs per week?
          </p>
          <input
            type="range"
            min={1}
            max={20}
            value={jobsPerWeek}
            onChange={(e) => setJobsPerWeek(Number(e.target.value))}
            className="mt-6 w-full accent-bronze-500"
          />
          <p className="mt-2 text-center text-sm text-text-secondary dark:text-cream-200">
            {jobsPerWeek} jobs / week
          </p>
          <p className="mt-6 text-center font-display text-h1 text-bronze-600 dark:text-bronze-400">
            ~${projected.toLocaleString()}/mo
          </p>
          <p className="mt-1 text-center text-caption text-ink-300 dark:text-cream-200/60">
            Estimated at $285 avg per booking
          </p>
        </div>
      </section>

      <section className="border-t border-border px-4 py-14 dark:border-white/10 md:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {proTestimonials.map((t) => (
            <blockquote key={t.name} className={cardClass}>
              <p className="text-sm leading-relaxed text-text-primary dark:text-cream-100">
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer className="mt-4 flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={t.avatar}
                  alt=""
                  className="size-10 rounded-full object-cover ring-2 ring-border dark:ring-white/10"
                />
                <div>
                  <p className="font-semibold text-text-primary dark:text-cream-50">
                    {t.name}
                  </p>
                  <p className="text-caption text-ink-300 dark:text-cream-200/70">
                    {t.category} · {t.earnings}
                  </p>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="border-t border-border px-4 py-16 text-center dark:border-white/10 md:px-12">
        <Link
          href="/pro/onboarding/"
          className="inline-flex h-12 items-center justify-center rounded-full bg-cta px-10 text-base font-semibold text-white hover:bg-cta-hover"
        >
          Start earning today
        </Link>
      </section>
    </div>
  );
}
