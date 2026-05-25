"use client";

import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IconWell } from "@/components/ui/icon-well";
import {
  formatQuoteExpiry,
  formatUsd,
  formatUsdExact,
} from "@/lib/messaging/format";
import type { Quote } from "@/lib/mock";
import { cn } from "@/lib/utils";

type QuoteCardProps = {
  quote: Quote;
  proName: string;
  acceptedBookingDate?: string;
  onAccept?: () => void;
  onDecline?: () => void;
};

export function QuoteCard({
  quote,
  proName,
  acceptedBookingDate,
  onAccept,
  onDecline,
}: QuoteCardProps) {
  const isAccepted = quote.status === "accepted";
  const isDeclined =
    quote.status === "declined" || quote.status === "expired";

  return (
    <div
      className={cn(
        "w-full max-w-[min(100%,20rem)] overflow-hidden rounded-xl border border-border bg-bg-elevated",
        "border-l-[3px] border-l-bronze-500",
      )}
    >
      <div className="flex items-center gap-2.5 border-b border-border px-3 py-2.5">
        <IconWell icon={FileText} size="sm" iconClassName="text-bronze-500" />
        <p className="text-sm font-semibold text-text-primary">
          Quote from {proName}
        </p>
      </div>

      <div className="overflow-x-auto px-3 py-2">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="text-ink-300">
              <th className="pb-1.5 pr-2 font-medium">Description</th>
              <th className="pb-1.5 pr-2 font-medium">Qty</th>
              <th className="pb-1.5 pr-2 font-medium">Unit</th>
              <th className="pb-1.5 font-medium text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {quote.lineItems.map((item) => (
              <tr key={item.id} className="text-text-primary">
                <td className="py-1 pr-2 align-top">{item.description}</td>
                <td className="py-1 pr-2 align-top">{item.quantity}</td>
                <td className="py-1 pr-2 align-top capitalize">{item.unit}</td>
                <td className="py-1 text-right align-top">
                  {formatUsd(item.totalCents)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-0.5 border-t border-border px-3 py-2 text-sm">
        <div className="flex justify-between text-text-secondary">
          <span>Subtotal</span>
          <span>{formatUsdExact(quote.subtotalCents)}</span>
        </div>
        {quote.taxCents > 0 && (
          <div className="flex justify-between text-text-secondary">
            <span>Taxes</span>
            <span>{formatUsdExact(quote.taxCents)}</span>
          </div>
        )}
        <div className="flex justify-between font-semibold text-text-primary">
          <span>Total</span>
          <span>{formatUsdExact(quote.totalCents)}</span>
        </div>
      </div>

      <p className="px-3 pb-2 text-xs text-ink-300">
        {isAccepted
          ? acceptedBookingDate
            ? `Booked ${new Date(acceptedBookingDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`
            : null
          : isDeclined
            ? quote.status === "expired"
              ? "Quote expired"
              : "Declined"
            : formatQuoteExpiry(quote.expiresAt)}
      </p>

      {isAccepted ? (
        <p className="border-t border-border px-3 py-2.5 text-sm font-medium text-sage-500">
          ✓ Accepted
          {acceptedBookingDate
            ? ` · ${new Date(acceptedBookingDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`
            : ""}
        </p>
      ) : !isDeclined ? (
        <div className="flex flex-col gap-2 border-t border-border px-3 py-3 sm:flex-row">
          <Button
            type="button"
            className="h-11 w-full flex-1 rounded-full bg-cta text-sm font-semibold text-white hover:bg-cta-hover"
            onClick={onAccept}
          >
            Accept quote
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="h-11 w-full flex-1 rounded-full text-sm font-medium text-destructive hover:bg-destructive/10"
            onClick={onDecline}
          >
            Decline
          </Button>
        </div>
      ) : null}
    </div>
  );
}
