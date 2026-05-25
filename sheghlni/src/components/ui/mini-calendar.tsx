"use client";

import { useMemo, useState } from "react";
import {
  addMonths,
  format,
  isBefore,
  isSameDay,
  isSameMonth,
  startOfDay,
  startOfMonth,
  subMonths,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type MiniCalendarProps = {
  value?: string;
  onSelect: (isoDate: string) => void;
  minDate?: Date;
  className?: string;
  tone?: "cream" | "default";
};

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"] as const;

function toIsoDate(date: Date): string {
  return format(date, "yyyy-MM-dd");
}

export function MiniCalendar({
  value,
  onSelect,
  minDate,
  className,
  tone = "default",
}: MiniCalendarProps) {
  const selected = value ? new Date(`${value}T12:00:00`) : undefined;
  const today = useMemo(() => startOfDay(new Date()), []);
  const minimum = minDate ?? today;

  const [viewMonth, setViewMonth] = useState(() =>
    startOfMonth(selected ?? today),
  );

  const isCream = tone === "cream";

  const { days, padding } = useMemo(() => {
    const start = startOfMonth(viewMonth);
    const end = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 0);
    const count = end.getDate();
    const monthDays: Date[] = [];
    for (let day = 1; day <= count; day += 1) {
      monthDays.push(new Date(viewMonth.getFullYear(), viewMonth.getMonth(), day));
    }
    return { days: monthDays, padding: start.getDay() };
  }, [viewMonth]);

  const navBtn = cn(
    "inline-flex size-7 items-center justify-center rounded-full transition",
    isCream
      ? "text-ink-400 hover:bg-cream-100 hover:text-ink-700"
      : "text-text-tertiary hover:bg-bg-elevated hover:text-text-primary",
  );

  return (
    <div className={cn("select-none", className)}>
      <div className="mb-2 flex items-center justify-between gap-1 px-0.5">
        <button
          type="button"
          onClick={() => setViewMonth((month) => subMonths(month, 1))}
          className={navBtn}
          aria-label="Previous month"
        >
          <ChevronLeft className="size-3.5" />
        </button>
        <p
          className={cn(
            "font-display text-sm font-medium tracking-tight",
            isCream ? "text-ink-900" : "text-text-primary",
          )}
        >
          {format(viewMonth, "MMMM yyyy")}
        </p>
        <button
          type="button"
          onClick={() => setViewMonth((month) => addMonths(month, 1))}
          className={navBtn}
          aria-label="Next month"
        >
          <ChevronRight className="size-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-y-0.5 text-center">
        {WEEKDAYS.map((label) => (
          <span
            key={label}
            className={cn(
              "pb-1 text-[0.65rem] font-medium uppercase tracking-wide",
              isCream ? "text-ink-400" : "text-text-tertiary",
            )}
          >
            {label}
          </span>
        ))}
        {Array.from({ length: padding }).map((_, index) => (
          <span key={`pad-${index}`} className="h-7" aria-hidden />
        ))}
        {days.map((day) => {
          const disabled = isBefore(day, minimum);
          const isSelected = selected ? isSameDay(day, selected) : false;
          const isToday = isSameDay(day, today);
          const inMonth = isSameMonth(day, viewMonth);

          return (
            <button
              key={day.toISOString()}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(toIsoDate(day))}
              className={cn(
                "mx-auto flex size-7 items-center justify-center rounded-full text-[0.8125rem] tabular-nums leading-none transition",
                !inMonth && "opacity-45",
                disabled && "cursor-not-allowed opacity-30",
                !disabled &&
                  !isSelected &&
                  inMonth &&
                  (isCream ? "text-ink-800 hover:bg-cream-200" : "text-text-primary hover:bg-bg-elevated"),
                isSelected &&
                  "bg-cta font-medium text-white shadow-sm hover:bg-cta-hover",
                !isSelected &&
                  isToday &&
                  inMonth &&
                  !disabled &&
                  "font-semibold text-cta outline outline-1 -outline-offset-1 outline-cta/45",
              )}
            >
              {format(day, "d")}
            </button>
          );
        })}
      </div>
    </div>
  );
}
