"use client";

import { Check } from "lucide-react";
import { BOOKING_STEPS, type BookingStepIndex } from "@/lib/booking/utils";
import { ICON_STROKE } from "@/components/ui/icon-well";
import { cn } from "@/lib/utils";

type BookingStepperProps = {
  currentStep: BookingStepIndex;
};

export function BookingStepper({ currentStep }: BookingStepperProps) {
  return (
    <nav aria-label="Booking progress" className="w-full">
      <ol className="flex items-center justify-between gap-1 md:gap-2">
        {BOOKING_STEPS.map((label, index) => {
          const step = index as BookingStepIndex;
          const isComplete = step < currentStep;
          const isCurrent = step === currentStep;

          return (
            <li
              key={label}
              className="flex min-w-0 flex-1 flex-col items-center gap-1.5"
              aria-current={isCurrent ? "step" : undefined}
            >
              <div className="flex w-full items-center">
                {index > 0 && (
                  <div
                    className={cn(
                      "h-0.5 flex-1 transition-colors",
                      isComplete ? "bg-sage-500" : "bg-border",
                    )}
                    aria-hidden
                  />
                )}
                <span
                  className={cn(
                    "relative z-[1] flex size-8 shrink-0 items-center justify-center rounded-full border-2 transition md:size-9",
                    isComplete &&
                      "border-sage-500 bg-sage-500 text-white",
                    isCurrent &&
                      "border-bronze-500 bg-bronze-500 text-cream-50",
                    !isComplete &&
                      !isCurrent &&
                      "border-border bg-bg text-ink-300",
                  )}
                >
                  {isComplete ? (
                    <Check className="size-4" strokeWidth={ICON_STROKE} />
                  ) : isCurrent ? (
                    <span
                      className="size-2 rounded-full bg-cream-50 md:hidden"
                      aria-hidden
                    />
                  ) : (
                    <>
                      <span
                        className="size-2 rounded-full bg-ink-300 md:hidden"
                        aria-hidden
                      />
                      <span className="hidden text-xs font-semibold text-ink-300 md:inline">
                        {index + 1}
                      </span>
                    </>
                  )}
                  {isCurrent && (
                    <span className="hidden text-xs font-semibold text-cream-50 md:inline">
                      {index + 1}
                    </span>
                  )}
                </span>
                {index < BOOKING_STEPS.length - 1 && (
                  <div
                    className={cn(
                      "h-0.5 flex-1 transition-colors",
                      step < currentStep ? "bg-sage-500" : "bg-border",
                    )}
                    aria-hidden
                  />
                )}
              </div>
              <span
                className={cn(
                  "hidden max-w-[5.5rem] truncate text-center text-[0.6875rem] font-medium leading-tight md:block",
                  isCurrent ? "text-bronze-600" : "text-ink-300",
                  isComplete && "text-sage-500",
                )}
              >
                {label}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
