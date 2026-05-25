"use client";

import { BadgeCheck, CreditCard, Info, ShieldCheck } from "lucide-react";
import type { Provider, Service, User } from "@/lib/mock";
import { BookingStepActions } from "@/components/booking/booking-step-actions";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ICON_STROKE } from "@/components/ui/icon-well";
import type { BookingQuote } from "@/lib/booking/utils";
import { formatQuoteTotal } from "@/lib/booking/utils";
type QuoteReviewStepProps = {
  provider: Provider;
  user: User;
  service: Service;
  quote: BookingQuote;
  onContinue: () => void;
};

export function QuoteReviewStep({
  provider,
  user,
  service,
  quote,
  onContinue,
}: QuoteReviewStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-h3 text-text-primary">Review quote</h2>
        <p className="mt-1 text-sm text-text-secondary">
          Confirm the breakdown before payment.
        </p>
      </div>

      <div className="flex items-center gap-3 rounded-2xl border border-border bg-bg p-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={user.avatarUrl ?? provider.heroImageUrl}
          alt=""
          className="size-12 rounded-full object-cover"
        />
        <div className="min-w-0">
          <p className="font-semibold text-text-primary">
            {provider.businessName}
          </p>
          <p className="text-sm text-text-secondary">{service.title}</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-bg-elevated text-ink-300">
              <th className="px-4 py-2.5 font-medium">Description</th>
              <th className="px-4 py-2.5 font-medium">Qty</th>
              <th className="px-4 py-2.5 font-medium">Unit</th>
              <th className="px-4 py-2.5 text-right font-medium">Total</th>
            </tr>
          </thead>
          <tbody>
            {quote.lineItems.map((item) => (
              <tr key={item.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3 text-text-primary">{item.description}</td>
                <td className="px-4 py-3 text-text-secondary">{item.quantity}</td>
                <td className="px-4 py-3 capitalize text-text-secondary">
                  {item.unit}
                </td>
                <td className="px-4 py-3 text-right text-text-primary">
                  {formatQuoteTotal(item.totalCents)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="space-y-1 px-4 py-3 text-sm">
          <div className="flex justify-between text-text-secondary">
            <span>Subtotal</span>
            <span>{formatQuoteTotal(quote.subtotalCents)}</span>
          </div>
          <div className="flex items-center justify-between text-text-secondary">
            <span className="inline-flex items-center gap-1">
              Platform service fee (5%)
              <Popover>
                <PopoverTrigger
                  type="button"
                  className="inline-flex text-ink-300 hover:text-text-primary"
                  aria-label="Service fee info"
                >
                  <Info className="size-3.5" strokeWidth={ICON_STROKE} />
                </PopoverTrigger>
                <PopoverContent
                  side="top"
                  className="max-w-xs border-border bg-bg-elevated p-3 text-xs text-text-secondary"
                >
                  This fee supports secure payments, customer support, and dispute
                  resolution. It is shown upfront — no hidden charges.
                </PopoverContent>
              </Popover>
            </span>
            <span>{formatQuoteTotal(quote.platformFeeCents)}</span>
          </div>
          <div className="flex justify-between border-t border-border pt-2 font-display text-2xl font-medium text-text-primary">
            <span>Total</span>
            <span>{formatQuoteTotal(quote.totalCents)}</span>
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-cream-200 px-4 py-3 text-sm text-text-primary dark:bg-cream-200/15">
        <strong className="font-medium">Standard cancellation policy:</strong> Full
        refund if cancelled 48+ hours before the job.
      </div>

      <div className="flex flex-wrap gap-3">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-bg px-3 py-1.5 text-xs font-medium text-text-primary">
          <ShieldCheck className="size-4 text-sage-500" strokeWidth={ICON_STROKE} />
          Funds held in escrow
        </span>
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-bg px-3 py-1.5 text-xs font-medium text-text-primary">
          <BadgeCheck className="size-4 text-bronze-500" strokeWidth={ICON_STROKE} />
          Money-back guarantee
        </span>
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-bg px-3 py-1.5 text-xs font-medium text-text-primary">
          <CreditCard className="size-4 text-bronze-500" strokeWidth={ICON_STROKE} />
          Secure checkout
        </span>
      </div>

      <BookingStepActions>
        <Button
          type="button"
          onClick={onContinue}
          className="h-12 min-h-11 w-full rounded-full bg-cta text-base font-semibold text-white hover:bg-cta-hover"
        >
          Confirm & pay
        </Button>
      </BookingStepActions>
    </div>
  );
}
