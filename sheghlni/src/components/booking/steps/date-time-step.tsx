"use client";

import { BookingStepActions } from "@/components/booking/booking-step-actions";
import { CalendarPicker } from "@/components/booking/calendar-picker";
import { Button } from "@/components/ui/button";
import type { Service } from "@/lib/mock";
import {
  TIME_SLOTS,
  getEstimatedDuration,
  type TimeSlot,
} from "@/lib/booking/utils";
import { cn } from "@/lib/utils";

type DateTimeStepProps = {
  service: Service;
  selectedDate: string | null;
  selectedTime: TimeSlot | null;
  onDateChange: (iso: string) => void;
  onTimeChange: (slot: TimeSlot) => void;
  onContinue: () => void;
  error?: string | null;
};

export function DateTimeStep({
  service,
  selectedDate,
  selectedTime,
  onDateChange,
  onTimeChange,
  onContinue,
  error,
}: DateTimeStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-h3 text-text-primary">Date & time</h2>
        <p className="mt-1 text-sm text-text-secondary">
          Choose when you would like {service.title.toLowerCase()} to happen.
        </p>
      </div>

      <CalendarPicker value={selectedDate ?? undefined} onSelect={onDateChange} />

      {selectedDate && (
        <div>
          <p className="mb-3 text-sm font-medium text-text-primary">
            Available times
          </p>
          <div className="flex flex-wrap gap-2">
            {TIME_SLOTS.map((slot) => (
              <button
                key={slot}
                type="button"
                onClick={() => onTimeChange(slot)}
                className={cn(
                  "min-h-11 rounded-full border px-4 py-2 text-sm font-medium transition",
                  selectedTime === slot
                    ? "border-bronze-500 bg-bronze-500 text-cream-50"
                    : "border-border bg-bg text-text-primary hover:border-bronze-500/50",
                )}
              >
                {slot}
              </button>
            ))}
          </div>
          <p className="mt-3 text-sm text-ink-300">
            Estimated duration: {getEstimatedDuration(service)}
          </p>
        </div>
      )}

      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}

      <BookingStepActions>
        <Button
          type="button"
          onClick={onContinue}
          className="h-12 min-h-11 w-full rounded-full bg-cta text-base font-semibold text-white hover:bg-cta-hover"
        >
          Continue
        </Button>
      </BookingStepActions>
    </div>
  );
}
