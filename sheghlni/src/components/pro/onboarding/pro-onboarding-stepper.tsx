"use client";

import { Check } from "lucide-react";
import { ONBOARDING_STEPS, type OnboardingStepIndex } from "@/lib/mock/pro-data";
import { ICON_STROKE } from "@/components/ui/icon-well";
import { cn } from "@/lib/utils";

type ProOnboardingStepperProps = {
  currentStep: OnboardingStepIndex;
};

export function ProOnboardingStepper({ currentStep }: ProOnboardingStepperProps) {
  return (
    <nav aria-label="Onboarding progress" className="w-full overflow-x-auto">
      <ol className="flex min-w-[40rem] items-center gap-0 px-2 md:min-w-0 md:justify-between">
        {ONBOARDING_STEPS.map((label, index) => {
          const step = index as OnboardingStepIndex;
          const isComplete = step < currentStep;
          const isCurrent = step === currentStep;

          return (
            <li
              key={label}
              className="flex min-w-0 flex-1 flex-col items-center gap-1"
              aria-current={isCurrent ? "step" : undefined}
            >
              <div className="flex w-full items-center">
                {index > 0 && (
                  <div
                    className={cn(
                      "h-0.5 flex-1",
                      isComplete ? "bg-sage-500" : "bg-border",
                    )}
                    aria-hidden
                  />
                )}
                <span
                  className={cn(
                    "flex size-7 shrink-0 items-center justify-center rounded-full border-2 text-xs font-semibold md:size-8",
                    isComplete && "border-sage-500 bg-sage-500 text-white",
                    isCurrent && "border-bronze-500 bg-bronze-500 text-cream-50",
                    !isComplete &&
                      !isCurrent &&
                      "border-border bg-bg text-ink-300",
                  )}
                >
                  {isComplete ? (
                    <Check className="size-3.5" strokeWidth={ICON_STROKE} />
                  ) : (
                    index + 1
                  )}
                </span>
                {index < ONBOARDING_STEPS.length - 1 && (
                  <div
                    className={cn(
                      "h-0.5 flex-1",
                      step < currentStep ? "bg-sage-500" : "bg-border",
                    )}
                    aria-hidden
                  />
                )}
              </div>
              <span
                className={cn(
                  "hidden max-w-[4.5rem] truncate text-center text-[0.625rem] font-medium md:block",
                  isCurrent ? "text-bronze-600" : "text-ink-300",
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
