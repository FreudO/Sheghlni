"use client";

import Link from "next/link";
import { format } from "date-fns";
import {
  ArrowUpRight,
  CalendarDays,
  Check,
  Circle,
  Clock,
  Lightbulb,
  MessageCircle,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ICON_STROKE } from "@/components/ui/icon-well";
import {
  DEMO_PRO_FIRST_NAME,
  proBoostTasks,
  proDashboardStats,
  proNewLeads,
  proTipOfTheDay,
  proTodaysSchedule,
} from "@/lib/mock/pro-data";
import { cn } from "@/lib/utils";

function formatCents(cents: number): string {
  return `$${Math.round(cents / 100).toLocaleString()}`;
}

export function ProDashboard() {
  const today = format(new Date(), "EEEE, MMMM d");

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-6 border-b border-border pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-bronze-600">Pro dashboard</p>
          <h1 className="mt-1 font-display text-h1 text-text-primary">
            Good morning, {DEMO_PRO_FIRST_NAME}
          </h1>
          <p className="mt-1 text-sm text-ink-300">{today}</p>
        </div>
        <Link
          href="/pro/calendar/"
          className="inline-flex h-10 items-center gap-2 self-start rounded-full border border-border bg-bg-elevated px-4 text-sm font-medium text-text-primary transition hover:border-bronze-500/40 hover:bg-bg"
        >
          <CalendarDays className="size-4 text-bronze-500" strokeWidth={ICON_STROKE} />
          View calendar
        </Link>
      </header>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Profile views"
          sublabel="This week"
          value={String(proDashboardStats.profileViews)}
          trend={
            <span className="inline-flex items-center gap-0.5 text-sage-500">
              <TrendingUp className="size-3.5" strokeWidth={ICON_STROKE} />+
              {proDashboardStats.profileViewsChangePct}%
            </span>
          }
        />
        <StatCard
          label="Response time"
          sublabel="Average"
          value={`${proDashboardStats.responseTimeMinutes}m`}
          badge="Quick responder"
        />
        <StatCard
          label="Booking rate"
          sublabel="Last 30 days"
          value={`${proDashboardStats.bookingRatePct}%`}
        />
        <StatCard
          label="Earnings"
          sublabel="This month"
          value={formatCents(proDashboardStats.earningsThisMonthCents)}
          highlight
        />
      </section>

      <div className="grid gap-6 xl:grid-cols-[1fr_20rem] xl:gap-8">
        <div className="space-y-8 min-w-0">
          <section>
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="font-display text-h3 text-text-primary">
                Today&apos;s schedule
              </h2>
              <span className="text-caption text-ink-300">
                {proTodaysSchedule.length} jobs
              </span>
            </div>
            <ul className="space-y-2">
              {proTodaysSchedule.map((item) => (
                <li key={item.id}>
                  <ScheduleRow item={item} />
                </li>
              ))}
            </ul>
          </section>

          <section>
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="font-display text-h3 text-text-primary">
                New leads
              </h2>
              <Link
                href="/inbox/"
                className="inline-flex items-center gap-1 text-sm font-medium text-cta hover:underline"
              >
                Inbox
                <ArrowUpRight className="size-3.5" strokeWidth={ICON_STROKE} />
              </Link>
            </div>
            <ul className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-bg-elevated">
              {proNewLeads.map((lead) => (
                <li key={lead.id}>
                  <LeadRow lead={lead} />
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="space-y-4 xl:sticky xl:top-24 xl:self-start">
          <section className="rounded-2xl border border-border bg-bg-elevated p-5">
            <h2 className="text-sm font-semibold text-text-primary">
              Boost your profile
            </h2>
            <ul className="mt-4 space-y-3">
              {proBoostTasks.map((task) => (
                <li key={task.id}>
                  <div className="flex items-start gap-3">
                    {task.done ? (
                      <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-sage-500/15">
                        <Check
                          className="size-3 text-sage-500"
                          strokeWidth={ICON_STROKE}
                        />
                      </span>
                    ) : (
                      <Circle
                        className="mt-0.5 size-5 shrink-0 text-ink-300"
                        strokeWidth={ICON_STROKE}
                      />
                    )}
                    <div className="min-w-0 flex-1">
                      <p
                        className={cn(
                          "text-sm font-medium leading-snug",
                          task.done
                            ? "text-ink-300 line-through"
                            : "text-text-primary",
                        )}
                      >
                        {task.label}
                        {task.detail && (
                          <span className="ml-1 font-normal text-sage-500">
                            {task.detail}
                          </span>
                        )}
                      </p>
                      {task.href && !task.done && (
                        <Link
                          href={task.href}
                          className="mt-1 inline-block text-xs font-medium text-cta hover:underline"
                        >
                          Complete →
                        </Link>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <div className="rounded-2xl bg-cream-200/80 p-5 dark:bg-cream-200/10">
            <div className="flex items-center gap-2 text-bronze-600">
              <Lightbulb className="size-4" strokeWidth={ICON_STROKE} />
              <span className="text-sm font-semibold">Pro tip</span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">
              {proTipOfTheDay}
            </p>
          </div>

          <div className="flex items-start gap-3 rounded-2xl border border-gold-500/20 bg-gold-500/5 px-4 py-3.5">
            <Sparkles
              className="mt-0.5 size-4 shrink-0 text-gold-500"
              strokeWidth={ICON_STROKE}
            />
            <p className="text-sm leading-snug text-text-secondary">
              <span className="font-medium text-text-primary">Premium</span>{" "}
              pros get 2× profile visibility in search results.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function StatCard({
  label,
  sublabel,
  value,
  trend,
  badge,
  highlight,
}: {
  label: string;
  sublabel: string;
  value: string;
  trend?: React.ReactNode;
  badge?: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-4 transition",
        highlight
          ? "border-bronze-500/25 bg-gradient-to-br from-bronze-500/8 to-bg-elevated"
          : "border-border bg-bg-elevated",
      )}
    >
      <p className="text-caption font-medium uppercase tracking-wide text-ink-300">
        {sublabel}
      </p>
      <p className="mt-2 font-display text-[1.75rem] leading-none tracking-tight text-text-primary">
        {value}
      </p>
      <p className="mt-1.5 text-sm text-text-secondary">{label}</p>
      {trend && <div className="mt-2 text-caption">{trend}</div>}
      {badge && (
        <span className="mt-2 inline-flex rounded-full bg-sage-500/15 px-2 py-0.5 text-caption font-medium text-sage-500">
          {badge}
        </span>
      )}
    </div>
  );
}

function ScheduleRow({
  item,
}: {
  item: (typeof proTodaysSchedule)[number];
}) {
  return (
    <div className="group flex gap-4 rounded-2xl border border-border bg-bg-elevated p-4 transition hover:border-bronze-500/30 hover:shadow-sm">
      <div className="flex w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-bronze-500/10 py-2 text-center">
        <span className="text-xs font-semibold uppercase text-bronze-600">
          {format(new Date(item.startsAt), "a")}
        </span>
        <span className="font-display text-lg leading-none text-bronze-600">
          {format(new Date(item.startsAt), "h")}
        </span>
        <span className="mt-1 text-[0.625rem] text-ink-300">
          {format(new Date(item.endsAt), "h:mm")}
        </span>
      </div>
      <div className="min-w-0 flex-1 border-l border-border pl-4">
        <p className="font-semibold text-text-primary">{item.customerName}</p>
        <p className="text-sm text-text-secondary">{item.serviceName}</p>
        <p className="mt-1 flex items-center gap-1 text-caption text-ink-300">
          <Clock className="size-3 shrink-0" strokeWidth={ICON_STROKE} />
          <span className="truncate">{item.address}</span>
        </p>
      </div>
    </div>
  );
}

function LeadRow({ lead }: { lead: (typeof proNewLeads)[number] }) {
  const initials = lead.customerName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  return (
    <div className="flex items-center gap-3 px-4 py-3.5 transition hover:bg-bg">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-bronze-500/15 text-sm font-semibold text-bronze-600">
        {initials}
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-medium text-text-primary">{lead.customerName}</p>
        <p className="line-clamp-1 text-sm text-text-secondary">
          {lead.preview}
        </p>
      </div>
      <Button
        render={<Link href={`/inbox/${lead.conversationId}/`} />}
        nativeButton={false}
        size="sm"
        variant="ghost"
        className="shrink-0 rounded-full text-cta hover:bg-bronze-500/10"
      >
        <MessageCircle className="size-4" strokeWidth={ICON_STROKE} />
        <span className="sr-only">Reply</span>
      </Button>
    </div>
  );
}
