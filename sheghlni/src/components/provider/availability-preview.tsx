"use client";

import { useMemo, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { AvailabilityDay } from "@/lib/provider/profile-data";
import { cn } from "@/lib/utils";

type AvailabilityPreviewProps = {
  days: AvailabilityDay[];
};

function formatWeekday(date: Date): string {
  return date.toLocaleDateString("en-US", { weekday: "short" });
}

export function AvailabilityPreview({ days }: AvailabilityPreviewProps) {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const today = useMemo(() => {
    const value = new Date();
    value.setHours(0, 0, 0, 0);
    return value;
  }, []);

  const monthDays = useMemo(() => {
    const end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const result: Date[] = [];
    for (let day = 1; day <= end.getDate(); day += 1) {
      result.push(new Date(today.getFullYear(), today.getMonth(), day));
    }
    return result;
  }, [today]);

  return (
    <section className="mt-8 border-t border-border pt-8 md:mt-12 md:pt-10">
      <div className="flex items-center justify-between gap-4">
        <h2 className="font-display text-[1.375rem] font-medium text-text-primary md:text-h2">
          Availability
        </h2>
        <button
          type="button"
          onClick={() => setCalendarOpen(true)}
          className="text-sm font-medium text-cta hover:underline"
        >
          View full calendar
        </button>
      </div>

      <div className="-mx-4 mt-6 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-7 md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden">
        {days.map((day) => {
          const isToday = day.date.getTime() === today.getTime();
          return (
            <div
              key={day.date.toISOString()}
              className={cn(
                "min-w-12 shrink-0 rounded-xl border px-2 py-3 text-center md:min-w-0 md:shrink",
                isToday
                  ? "border-bronze-500 bg-bronze-500/10"
                  : "border-border bg-bg-elevated",
              )}
            >
              <p className="text-caption text-text-tertiary">{formatWeekday(day.date)}</p>
              <p className="mt-1 text-body font-semibold text-text-primary">
                {day.date.getDate()}
              </p>
              {day.available ? (
                <div className="mt-2 flex justify-center gap-1">
                  {Array.from({ length: Math.min(day.slotCount, 3) }).map((_, index) => (
                    <span
                      key={index}
                      className="size-1.5 rounded-full bg-sage-500"
                    />
                  ))}
                </div>
              ) : (
                <p className="mt-2 text-[0.65rem] text-text-tertiary">Unavailable</p>
              )}
            </div>
          );
        })}
      </div>

      <Dialog.Root open={calendarOpen} onOpenChange={setCalendarOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[60] bg-ink-900/40" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-[60] w-[min(92vw,28rem)] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-border bg-bg-elevated p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <Dialog.Title className="font-display text-h3 text-text-primary">
                {today.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </Dialog.Title>
              <Dialog.Close className="rounded-md p-1 text-text-tertiary hover:text-text-primary">
                <X className="size-4" />
              </Dialog.Close>
            </div>
            <div className="mt-4 grid grid-cols-7 gap-2 text-center text-caption">
              {monthDays.map((date) => {
                const available = date.getDay() !== 0 && date.getDay() !== 3;
                return (
                  <div
                    key={date.toISOString()}
                    className={cn(
                      "rounded-lg py-2",
                      available ? "bg-sage-500/10 text-sage-500" : "bg-bg-elevated-2 text-text-tertiary",
                    )}
                  >
                    {date.getDate()}
                  </div>
                );
              })}
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
}


