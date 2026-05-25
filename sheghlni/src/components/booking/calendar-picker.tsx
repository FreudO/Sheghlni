"use client";

import { useMemo, useState } from "react";
import {
  addMonths,
  format,
  isSameDay,
  isSameMonth,
  startOfDay,
  startOfMonth,
  subMonths,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { isDateAvailable } from "@/lib/booking/utils";
import { ICON_STROKE } from "@/components/ui/icon-well";
import { cn } from "@/lib/utils";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"] as const;

type CalendarPickerProps = {
  value?: string;
  onSelect: (isoDate: string) => void;
  className?: string;
};

function toIsoDate(date: Date): string {
  return format(date, "yyyy-MM-dd");
}

export function CalendarPicker({
  value,
  onSelect,
  className,
}: CalendarPickerProps) {
  const selected = value ? new Date(`${value}T12:00:00`) : undefined;
  const today = useMemo(() => startOfDay(new Date()), []);
  const [viewMonth, setViewMonth] = useState(() =>
    startOfMonth(selected ?? today),
  );

  const { days, padding } = useMemo(() => {
    const start = startOfMonth(viewMonth);
    const end = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 0);
    const count = end.getDate();
    const monthDays: Date[] = [];
    for (let day = 1; day <= count; day += 1) {
      monthDays.push(
        new Date(viewMonth.getFullYear(), viewMonth.getMonth(), day),
      );
    }
    return { days: monthDays, padding: start.getDay() };
  }, [viewMonth]);

  return (
    <div className={cn("select-none", className)}>
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setViewMonth((m) => subMonths(m, 1))}
          className="inline-flex size-9 items-center justify-center rounded-full text-ink-400 transition hover:bg-bg-elevated-2 hover:text-text-primary"
          aria-label="Previous month"
        >
          <ChevronLeft className="size-5" strokeWidth={ICON_STROKE} />
        </button>
        <p className="font-display text-lg font-medium text-text-primary">
          {format(viewMonth, "MMMM yyyy")}
        </p>
        <button
          type="button"
          onClick={() => setViewMonth((m) => addMonths(m, 1))}
          className="inline-flex size-9 items-center justify-center rounded-full text-ink-400 transition hover:bg-bg-elevated-2 hover:text-text-primary"
          aria-label="Next month"
        >
          <ChevronRight className="size-5" strokeWidth={ICON_STROKE} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-ink-300">
        {WEEKDAYS.map((day) => (
          <span key={day} className="py-1">
            {day}
          </span>
        ))}
      </div>

      <div className="mt-1 grid grid-cols-7 gap-1">
        {Array.from({ length: padding }).map((_, i) => (
          <span key={`pad-${i}`} />
        ))}
        {days.map((day) => {
          const available = isDateAvailable(day);
          const isSelected = selected ? isSameDay(day, selected) : false;
          const inMonth = isSameMonth(day, viewMonth);

          return (
            <button
              key={toIsoDate(day)}
              type="button"
              disabled={!available}
              onClick={() => onSelect(toIsoDate(day))}
              className={cn(
                "relative mx-auto flex size-9 items-center justify-center rounded-full text-sm transition",
                !inMonth && "opacity-40",
                !available &&
                  "cursor-not-allowed text-ink-300/60 line-through opacity-50",
                available &&
                  !isSelected &&
                  "bg-cream-200 text-text-primary hover:bg-cream-200/80",
                isSelected &&
                  "bg-bronze-500 font-semibold text-cream-50",
              )}
            >
              {format(day, "d")}
              {available && !isSelected && (
                <span
                  className="absolute bottom-1 left-1/2 size-1 -translate-x-1/2 rounded-full bg-bronze-500"
                  aria-hidden
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
