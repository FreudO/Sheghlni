"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { BookingSummary } from "@/components/booking/booking-summary";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Provider, Service, User } from "@/lib/mock";
import {
  detectCardBrand,
  formatCardNumber,
  formatExpiry,
  formatQuoteTotal,
  isPaymentValid,
  type BookingQuote,
  type TimeSlot,
} from "@/lib/booking/utils";
import { cn } from "@/lib/utils";

export type PaymentStepData = {
  useSavedCard: boolean;
  cardNumber: string;
  expiry: string;
  cvv: string;
  cardName: string;
  billingSameAsService: boolean;
  billingAddress: string;
};

type PaymentStepProps = {
  provider: Provider;
  user: User;
  service: Service;
  description: string;
  location: string;
  isRemote: boolean;
  selectedDate: string;
  selectedTime: TimeSlot;
  quote: BookingQuote;
  data: PaymentStepData;
  onChange: (patch: Partial<PaymentStepData>) => void;
  onConfirm: () => void;
  isSubmitting: boolean;
  error?: string | null;
};

function CardBrandIcon({ brand }: { brand: "visa" | "mastercard" | "unknown" }) {
  if (brand === "visa") {
    return (
      <span className="text-xs font-bold tracking-wide text-[#1A1F71]">VISA</span>
    );
  }
  if (brand === "mastercard") {
    return (
      <span className="text-xs font-bold text-[#EB001B]">MC</span>
    );
  }
  return null;
}

export function PaymentStep({
  provider,
  user,
  service,
  description,
  location,
  isRemote,
  selectedDate,
  selectedTime,
  quote,
  data,
  onChange,
  onConfirm,
  isSubmitting,
  error,
}: PaymentStepProps) {
  const [summaryOpen, setSummaryOpen] = useState(false);
  const brand = detectCardBrand(data.cardNumber);

  const summaryProps = {
    provider,
    user,
    service,
    description,
    location,
    isRemote,
    selectedDate,
    selectedTime,
    quote,
  };

  return (
    <div className="lg:grid lg:grid-cols-[1fr_320px] lg:gap-10">
      <div className="space-y-6">
        <div>
          <h2 className="font-display text-h3 text-text-primary">Payment</h2>
          <p className="mt-1 text-sm text-text-secondary">
            Your card will be charged after the pro confirms availability.
          </p>
        </div>

        <div className="lg:hidden">
          <button
            type="button"
            onClick={() => setSummaryOpen((o) => !o)}
            className="flex w-full items-center justify-between rounded-2xl border border-border bg-bg-elevated px-4 py-3 text-sm font-medium text-text-primary"
          >
            Order summary
            <span className="font-semibold">
              {formatQuoteTotal(quote.totalCents)}
            </span>
          </button>
          {summaryOpen && (
            <BookingSummary {...summaryProps} className="mt-3 border-0" />
          )}
        </div>

        <fieldset className="space-y-3">
          <legend className="text-sm font-medium text-text-primary">
            Payment method
          </legend>

          <label
            className={cn(
              "flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3",
              data.useSavedCard
                ? "border-bronze-500 bg-bronze-500/5"
                : "border-border",
            )}
          >
            <input
              type="radio"
              name="payment"
              checked={data.useSavedCard}
              onChange={() => onChange({ useSavedCard: true })}
              className="accent-cta"
            />
            <span className="text-sm font-medium text-text-primary">
              Visa ending in 4242
            </span>
          </label>

          <label
            className={cn(
              "flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3",
              !data.useSavedCard
                ? "border-bronze-500 bg-bronze-500/5"
                : "border-border",
            )}
          >
            <input
              type="radio"
              name="payment"
              checked={!data.useSavedCard}
              onChange={() => onChange({ useSavedCard: false })}
              className="accent-cta"
            />
            <span className="text-sm font-medium text-text-primary">
              Pay with new card
            </span>
          </label>
        </fieldset>

        {!data.useSavedCard && (
          <div className="space-y-4 rounded-2xl border border-border bg-bg p-4">
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-text-primary">
                Card number
              </span>
              <div className="relative">
                <Input
                  value={data.cardNumber}
                  onChange={(e) =>
                    onChange({
                      cardNumber: formatCardNumber(e.target.value),
                    })
                  }
                  placeholder="1234 5678 9012 3456"
                  inputMode="numeric"
                  autoComplete="cc-number"
                  className="pr-14"
                />
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                  <CardBrandIcon brand={brand} />
                </span>
              </div>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-text-primary">
                  Expiry
                </span>
                <Input
                  value={data.expiry}
                  onChange={(e) =>
                    onChange({ expiry: formatExpiry(e.target.value) })
                  }
                  placeholder="MM/YY"
                  inputMode="numeric"
                  autoComplete="cc-exp"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-text-primary">
                  CVV
                </span>
                <Input
                  value={data.cvv}
                  onChange={(e) =>
                    onChange({
                      cvv: e.target.value.replace(/\D/g, "").slice(0, 4),
                    })
                  }
                  placeholder="123"
                  inputMode="numeric"
                  autoComplete="cc-csc"
                />
              </label>
            </div>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-text-primary">
                Name on card
              </span>
              <Input
                value={data.cardName}
                onChange={(e) => onChange({ cardName: e.target.value })}
                placeholder="Alex Morgan"
                autoComplete="cc-name"
              />
            </label>
          </div>
        )}

        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            disabled
            title="Available on supported devices"
            className="inline-flex h-11 flex-1 cursor-not-allowed items-center justify-center rounded-full bg-ink-300/20 text-sm font-medium text-ink-300"
          >
            Apple Pay
          </button>
          <button
            type="button"
            disabled
            title="Available on supported devices"
            className="inline-flex h-11 flex-1 cursor-not-allowed items-center justify-center rounded-full bg-ink-300/20 text-sm font-medium text-ink-300"
          >
            Google Pay
          </button>
        </div>

        <div>
          <label className="inline-flex items-center gap-2 text-sm text-text-primary">
            <input
              type="checkbox"
              checked={data.billingSameAsService}
              onChange={(e) =>
                onChange({ billingSameAsService: e.target.checked })
              }
              className="accent-cta"
            />
            Same as service address
          </label>
          {!data.billingSameAsService && (
            <Input
              className="mt-3"
              value={data.billingAddress}
              onChange={(e) => onChange({ billingAddress: e.target.value })}
              placeholder="Billing address"
            />
          )}
        </div>

        <p className="text-xs text-ink-300">
          By confirming, you agree to our{" "}
          <Link href="/legal/terms/" className="text-cta hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/legal/cancellation/" className="text-cta hover:underline">
            Cancellation Policy
          </Link>
          .
        </p>

        {error && (
          <p className="text-sm text-destructive" role="alert">
            {error}
          </p>
        )}

        <Button
          type="button"
          disabled={isSubmitting || !isPaymentValid(data)}
          onClick={onConfirm}
          className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-cta text-base font-semibold text-white hover:bg-cta-hover disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="size-5 animate-spin" />
              Processing…
            </>
          ) : (
            `Confirm booking — ${formatQuoteTotal(quote.totalCents)}`
          )}
        </Button>
      </div>

      <BookingSummary
        {...summaryProps}
        className="hidden lg:block lg:sticky lg:top-24 lg:self-start"
      />
    </div>
  );
}
