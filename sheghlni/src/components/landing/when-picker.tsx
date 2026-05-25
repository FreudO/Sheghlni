"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { MiniCalendar } from "@/components/ui/mini-calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const WHEN_OPTIONS = ["Today", "This week", "Flexible"] as const;

const QUICK_CHOICES = [
  { value: "", label: "Any time" },
  ...WHEN_OPTIONS.map((option) => ({ value: option, label: option })),
] as const;

export function whenDisplayLabel(when: string, date?: string): string {
  if (when === "Pick a date" && date) {
    return new Date(`${date}T12:00:00`).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }
  return QUICK_CHOICES.find((choice) => choice.value === when)?.label ?? (when || "Any time");
}

type WhenPickerProps = {
  when: string;
  date: string;
  onWhenChange: (value: string) => void;
  onDateChange: (value: string) => void;
  variant?: "hero" | "sheet";
};

export function WhenPicker({
  when,
  date,
  onWhenChange,
  onDateChange,
  variant = "hero",
}: WhenPickerProps) {
  const isHero = variant === "hero";
  const [open, setOpen] = useState(false);

  const triggerLabel = whenDisplayLabel(when, date);

  const handleQuickPick = (value: string) => {
    onWhenChange(value);
    onDateChange("");
    setOpen(false);
  };

  const handleDatePick = (isoDate: string) => {
    onWhenChange("Pick a date");
    onDateChange(isoDate);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "flex w-full items-center justify-between gap-2 text-left outline-none focus-visible:ring-2 focus-visible:ring-cta/40",
            isHero
              ? "h-[1.375rem] rounded-md text-body leading-tight text-ink-900"
              : "rounded-xl border border-border bg-bg px-4 py-3 text-body text-text-primary",
          )}
        >
          <span className="truncate">{triggerLabel}</span>
          <ChevronDown
            className={cn("size-4 shrink-0", isHero ? "text-ink-400" : "text-text-tertiary")}
          />
        </button>
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        align="end"
        sideOffset={isHero ? 22 : 10}
        avoidCollisions={!isHero}
        className={cn(
          "z-[200] w-[17.5rem] overflow-visible",
          isHero
            ? "border-ink-100 bg-cream-50 shadow-2xl [color-scheme:light]"
            : "border-border bg-bg-elevated",
        )}
      >
        <div className="p-3 pt-3.5">
          <p
            className={cn(
              "text-caption font-medium",
              isHero ? "text-ink-500" : "text-text-tertiary",
            )}
          >
            Quick picks
          </p>
          <div className="mt-2 flex flex-wrap gap-1">
            {QUICK_CHOICES.map((choice) => {
              const isActive =
                choice.value === ""
                  ? when === "" || when === "Any time"
                  : when === choice.value;

              return (
                <button
                  key={choice.value || "any"}
                  type="button"
                  onClick={() => handleQuickPick(choice.value)}
                  className={cn(
                    "rounded-full px-2.5 py-1 text-[0.6875rem] font-medium transition",
                    isActive
                      ? "bg-cta text-white shadow-sm"
                      : isHero
                        ? "bg-cream-100 text-ink-700 hover:bg-cream-200"
                        : "bg-bg-elevated-2 text-text-secondary hover:bg-bg-elevated",
                  )}
                >
                  {choice.label}
                </button>
              );
            })}
          </div>

          <div
            className={cn(
              "my-3 h-px",
              isHero ? "bg-ink-100" : "bg-border",
            )}
          />

          <p
            className={cn(
              "mb-2 text-caption font-medium",
              isHero ? "text-ink-500" : "text-text-tertiary",
            )}
          >
            Or choose a date
          </p>
          <MiniCalendar
            tone={isHero ? "cream" : "default"}
            value={when === "Pick a date" ? date : undefined}
            onSelect={handleDatePick}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
