"use client";

import { useMemo, useState } from "react";
import {
  addDays,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameMonth,
  parseISO,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { Check, RefreshCw } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  proAvailabilityDates,
  proCalendarBookings,
  type ProCalendarBooking,
} from "@/lib/mock/pro-data";
import { cn } from "@/lib/utils";

const HOURS = Array.from({ length: 13 }, (_, i) => i + 8);

export function ProCalendar() {
  const [view, setView] = useState<"month" | "week" | "day">("month");
  const [cursor, setCursor] = useState(new Date(2026, 4, 1));
  const [selectedDate, setSelectedDate] = useState("2026-05-24");
  const [googleConnected] = useState(true);
  const [appleConnected] = useState(true);

  const monthStart = startOfMonth(cursor);
  const gridDays = eachDayOfInterval({
    start: startOfWeek(monthStart, { weekStartsOn: 1 }),
    end: endOfWeek(endOfMonth(monthStart), { weekStartsOn: 1 }),
  });

  const dayEvents = useMemo(
    () =>
      proCalendarBookings.filter(
        (b) => b.date === selectedDate && !b.isBuffer,
      ),
    [selectedDate],
  );

  const bookingsForDate = (dateStr: string) =>
    proCalendarBookings.filter((b) => b.date === dateStr && !b.isBuffer);

  return (
    <div className="space-y-6">
      <Tabs
        value={view}
        onValueChange={(v) => setView(v as "month" | "week" | "day")}
      >
      <header className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-h1 text-text-primary">Calendar</h1>
          <TabsList>
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="day">Day</TabsTrigger>
          </TabsList>
      </header>

      <section className="flex flex-wrap gap-3">
        <CalendarSyncButton
          label="Connect Google Calendar"
          connected={googleConnected}
          icon={
            <span className="flex size-5 items-center justify-center rounded bg-white text-xs font-bold text-blue-600">
              G
            </span>
          }
        />
        <CalendarSyncButton
          label="Connect Apple Calendar"
          connected={appleConnected}
          icon={
            <span className="flex size-5 items-center justify-center text-lg">
              
            </span>
          }
        />
      </section>

      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="min-w-0 flex-1">
            <TabsContent value="month" className="mt-0">
              <div className="rounded-xl border border-border bg-bg-elevated p-4">
                <div className="mb-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() =>
                      setCursor(
                        new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1),
                      )
                    }
                    className="text-sm text-cta"
                  >
                    ← Prev
                  </button>
                  <p className="font-semibold text-text-primary">
                    {format(cursor, "MMMM yyyy")}
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      setCursor(
                        new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1),
                      )
                    }
                    className="text-sm text-cta"
                  >
                    Next →
                  </button>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center text-caption text-ink-300">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                    <span key={d} className="py-1 font-medium">
                      {d}
                    </span>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {gridDays.map((day) => {
                    const dateStr = format(day, "yyyy-MM-dd");
                    const bookings = bookingsForDate(dateStr);
                    const available = proAvailabilityDates.includes(dateStr);
                    const selected = dateStr === selectedDate;
                    return (
                      <button
                        key={dateStr}
                        type="button"
                        onClick={() => setSelectedDate(dateStr)}
                        className={cn(
                          "min-h-[4.5rem] rounded-lg border p-1 text-left transition",
                          selected
                            ? "border-bronze-500 bg-bronze-500/10"
                            : "border-transparent hover:border-border hover:bg-bg",
                          !isSameMonth(day, cursor) && "opacity-40",
                        )}
                      >
                        <span className="text-xs font-medium text-text-primary">
                          {format(day, "d")}
                        </span>
                        {available && (
                          <span className="mt-0.5 block size-1.5 rounded-full bg-sage-500" />
                        )}
                        <div className="mt-1 space-y-0.5">
                          {bookings.slice(0, 2).map((b) => (
                            <span
                              key={b.id}
                              className="block truncate rounded-full bg-bronze-500/20 px-1.5 py-0.5 text-[0.625rem] font-medium text-bronze-600"
                            >
                              {b.customerName.split(" ")[0]}
                            </span>
                          ))}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="week" className="mt-0">
              <WeekView selectedDate={selectedDate} />
            </TabsContent>

            <TabsContent value="day" className="mt-0">
              <DayView date={selectedDate} />
            </TabsContent>
        </div>

        <aside className="w-full shrink-0 rounded-xl border border-border bg-bg-elevated p-4 lg:w-72">
          <h2 className="font-semibold text-text-primary">
            {format(parseISO(`${selectedDate}T12:00:00`), "EEEE, MMM d")}
          </h2>
          <ul className="mt-4 space-y-3">
            {dayEvents.length === 0 ? (
              <li className="text-sm text-ink-300">No bookings this day.</li>
            ) : (
              dayEvents.map((event) => (
                <li
                  key={event.id}
                  className="rounded-lg border border-border bg-bg px-3 py-2"
                >
                  <p className="text-sm font-medium text-bronze-600">
                    {format(parseISO(event.startsAt), "h:mm a")} –{" "}
                    {format(parseISO(event.endsAt), "h:mm a")}
                  </p>
                  <p className="font-medium text-text-primary">
                    {event.customerName}
                  </p>
                  <p className="text-sm text-text-secondary">
                    {event.serviceName}
                  </p>
                </li>
              ))
            )}
          </ul>
        </aside>
      </div>
      </Tabs>
    </div>
  );
}

function CalendarSyncButton({
  label,
  connected,
  icon,
}: {
  label: string;
  connected: boolean;
  icon: React.ReactNode;
}) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition",
        connected
          ? "border-sage-500/40 bg-sage-500/5"
          : "border-border bg-bg-elevated hover:border-cta/30",
      )}
    >
      {icon}
      <span className="flex-1">
        <span className="font-medium text-text-primary">{label}</span>
        {connected && (
          <span className="mt-0.5 flex items-center gap-1 text-caption text-sage-500">
            <Check className="size-3" />
            Connected
            <RefreshCw className="ml-1 size-3 animate-spin" />
            Syncing
          </span>
        )}
      </span>
    </button>
  );
}

function WeekView({ selectedDate }: { selectedDate: string }) {
  const start = startOfWeek(parseISO(`${selectedDate}T12:00:00`), {
    weekStartsOn: 1,
  });
  const days = Array.from({ length: 7 }, (_, i) => addDays(start, i));

  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <div
        className="grid min-w-[700px]"
        style={{ gridTemplateColumns: "4rem repeat(7, 1fr)" }}
      >
        <div className="border-b border-border" />
        {days.map((day) => (
          <div
            key={day.toISOString()}
            className="border-b border-l border-border px-2 py-2 text-center text-xs font-medium text-text-primary"
          >
            {format(day, "EEE d")}
          </div>
        ))}
        {HOURS.map((hour) => (
          <HourRow key={hour} hour={hour} days={days} />
        ))}
      </div>
    </div>
  );
}

function HourRow({ hour, days }: { hour: number; days: Date[] }) {
  return (
    <>
      <div className="border-b border-border py-4 pr-2 text-right text-caption text-ink-300">
        {hour > 12 ? hour - 12 : hour}
        {hour >= 12 ? "pm" : "am"}
      </div>
      {days.map((day) => {
        const dateStr = format(day, "yyyy-MM-dd");
        const slotBookings = proCalendarBookings.filter((b) => {
          if (b.date !== dateStr) return false;
          const h = parseISO(b.startsAt).getHours();
          return h === hour || (h < hour && parseISO(b.endsAt).getHours() > hour);
        });
        return (
          <SlotCell
            key={`${dateStr}-${hour}`}
            bookings={slotBookings}
            dateStr={dateStr}
            hour={hour}
          />
        );
      })}
    </>
  );
}

function SlotCell({
  bookings,
  dateStr,
  hour,
}: {
  bookings: ProCalendarBooking[];
  dateStr: string;
  hour: number;
}) {
  const hasBooking = bookings.length > 0;
  const buffer = bookings.some((b) => b.isBuffer);

  if (hasBooking) {
    const b = bookings[0];
    return (
      <div
        className={cn(
          "relative min-h-[3rem] border-b border-l border-border p-0.5",
          buffer
            ? "bg-[repeating-linear-gradient(45deg,transparent,transparent_4px,rgba(0,0,0,0.06)_4px,rgba(0,0,0,0.06)_8px)]"
            : "bg-bronze-500/20",
        )}
      >
        {!buffer && (
          <span className="block truncate px-1 text-[0.625rem] font-medium text-bronze-700">
            {b.customerName}
          </span>
        )}
      </div>
    );
  }

  return (
    <Popover>
      <PopoverTrigger
        type="button"
        className="min-h-[3rem] w-full border-b border-l border-border transition hover:bg-bg-elevated-2"
        aria-label={`${dateStr} ${hour}:00 slot`}
      />
      <PopoverContent className="w-48 p-2" align="start">
        <p className="mb-2 text-xs font-medium text-ink-300">Set availability</p>
        <div className="flex flex-col gap-1">
          <Button type="button" size="sm" variant="outline" className="rounded-lg">
            Mark as busy
          </Button>
          <Button type="button" size="sm" className="rounded-lg bg-sage-500 text-white">
            Mark as available
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function DayView({ date }: { date: string }) {
  const events = proCalendarBookings.filter((b) => b.date === date);
  return (
    <div className="space-y-2 rounded-xl border border-border p-4">
      {HOURS.map((hour) => {
        const match = events.find(
          (e) => parseISO(e.startsAt).getHours() === hour,
        );
        return (
          <div
            key={hour}
            className="flex gap-4 border-b border-border py-2 last:border-0"
          >
            <span className="w-14 shrink-0 text-caption text-ink-300">
              {hour > 12 ? hour - 12 : hour}:00 {hour >= 12 ? "PM" : "AM"}
            </span>
            {match ? (
              <div
                className={cn(
                  "flex-1 rounded-lg px-3 py-2",
                  match.isBuffer
                    ? "bg-[repeating-linear-gradient(45deg,transparent,transparent_4px,rgba(0,0,0,0.06)_4px,rgba(0,0,0,0.06)_8px)]"
                    : "bg-bronze-500/20",
                )}
              >
                <p className="font-medium text-text-primary">
                  {match.customerName}
                </p>
                <p className="text-sm text-text-secondary">{match.serviceName}</p>
              </div>
            ) : (
              <div className="min-h-[2.5rem] flex-1 rounded-lg border border-dashed border-border" />
            )}
          </div>
        );
      })}
    </div>
  );
}
