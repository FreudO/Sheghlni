"use client";

import { useState } from "react";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { Check, CheckCheck, X } from "lucide-react";
import { BookingCard } from "@/components/messaging/booking-card";
import { QuoteCard } from "@/components/messaging/quote-card";
import { useMessaging } from "@/components/messaging/messaging-context";
import {
  DEMO_USER_ID,
  getBookingById,
  type Conversation,
  type Message,
} from "@/lib/mock";
import { ICON_STROKE } from "@/components/ui/icon-well";
import { cn } from "@/lib/utils";

type MessageBubbleProps = {
  message: Message;
  conversation: Conversation;
};

type ReceiptState = "sent" | "delivered" | "read";

function getReceiptState(message: Message): ReceiptState | null {
  if (message.senderId !== DEMO_USER_ID) return null;
  if (message.readAt) return "read";
  const ageMs = Date.now() - new Date(message.createdAt).getTime();
  if (ageMs > 30_000) return "delivered";
  return "sent";
}

function ReadReceipt({ state }: { state: ReceiptState }) {
  const Icon = state === "sent" ? Check : CheckCheck;
  const color =
    state === "read"
      ? "text-bronze-500"
      : "text-ink-300";

  return (
    <Icon
      className={cn("size-3.5 shrink-0", color)}
      strokeWidth={ICON_STROKE}
      aria-label={
        state === "read"
          ? "Read"
          : state === "delivered"
            ? "Delivered"
            : "Sent"
      }
    />
  );
}

export function MessageBubble({ message, conversation }: MessageBubbleProps) {
  const { getQuote, updateQuoteStatus } = useMessaging();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const isCustomer = message.senderId === DEMO_USER_ID;
  const receipt = getReceiptState(message);

  if (message.kind === "system") {
    return (
      <p className="py-1 text-center text-xs text-ink-300">{message.body}</p>
    );
  }

  const quote =
    message.quoteId && message.kind === "quote"
      ? getQuote(message.quoteId)
      : undefined;

  const booking =
    message.bookingId && message.kind === "booking"
      ? getBookingById(message.bookingId)
      : undefined;

  const bubbleContent = () => {
    if (message.kind === "quote" && quote) {
      const linkedBooking = bookingsForQuote(quote.id);
      return (
        <QuoteCard
          quote={quote}
          proName={conversation.providerName}
          acceptedBookingDate={linkedBooking?.createdAt}
          onAccept={() => updateQuoteStatus(quote.id, "accepted")}
          onDecline={() => updateQuoteStatus(quote.id, "declined")}
        />
      );
    }

    if (message.kind === "booking" && booking) {
      return <BookingCard booking={booking} />;
    }

    if (message.kind === "image" && message.attachments[0]) {
      const attachment = message.attachments[0];
      return (
        <>
          <button
            type="button"
            className="block overflow-hidden rounded-lg"
            onClick={() => setLightboxOpen(true)}
          >
            <Image
              src={attachment.url}
              alt={attachment.fileName}
              width={280}
              height={186}
              className="max-h-48 w-auto object-cover"
              unoptimized
            />
          </button>
          {message.body ? (
            <p className="mt-1.5 break-words text-sm leading-relaxed">
              {message.body}
            </p>
          ) : null}
          <Dialog.Root open={lightboxOpen} onOpenChange={setLightboxOpen}>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-[80] bg-ink-900/90" />
              <Dialog.Content className="fixed inset-0 z-[80] flex items-center justify-center p-4 outline-none">
                <button
                  type="button"
                  className="absolute right-4 top-4 rounded-full p-2 text-cream-50 hover:bg-white/10"
                  onClick={() => setLightboxOpen(false)}
                  aria-label="Close"
                >
                  <X className="size-6" />
                </button>
                <Image
                  src={attachment.url}
                  alt={attachment.fileName}
                  width={900}
                  height={600}
                  className="max-h-[85vh] max-w-full object-contain"
                  unoptimized
                />
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </>
      );
    }

    return (
      <p className="break-words text-sm leading-relaxed whitespace-pre-wrap">
        {message.body}
      </p>
    );
  };

  const isCard =
    message.kind === "quote" ||
    message.kind === "booking" ||
    message.kind === "image";

  const textBubbleMax = "max-w-[min(100%,18rem)] sm:max-w-[20rem]";

  return (
    <div
      className={cn(
        "flex w-full",
        isCustomer ? "justify-end" : "justify-start",
      )}
    >
      <div
        className={cn(
          "flex w-fit min-w-0 flex-col gap-0.5",
          isCard ? "max-w-[min(100%,20rem)]" : textBubbleMax,
          isCustomer ? "items-end" : "items-start",
        )}
      >
        <div
          className={cn(
            isCard
              ? "w-full"
              : cn(
                  "w-fit max-w-full rounded-2xl px-3.5 py-2.5",
                  isCustomer
                    ? "rounded-br-md bg-cta text-white"
                    : "rounded-bl-md bg-bg-elevated-2 text-text-primary",
                ),
          )}
        >
          {bubbleContent()}
        </div>
        {receipt && (
          <div className="flex items-center gap-0.5 pr-0.5">
            <ReadReceipt state={receipt} />
          </div>
        )}
      </div>
    </div>
  );
}

function bookingsForQuote(quoteId: string) {
  if (quoteId === "quote-conv-3") return getBookingById("book-upcoming-1");
  return undefined;
}
