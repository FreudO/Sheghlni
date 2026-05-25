import type { Service } from "@/lib/mock";
import { DEMO_USER_ID, conversations } from "@/lib/mock";
import { formatUsdExact } from "@/lib/messaging/format";

export const BOOKING_STEPS = [
  "Details",
  "Date & Time",
  "Quote Review",
  "Payment",
  "Confirmation",
] as const;

export type BookingStepIndex = 0 | 1 | 2 | 3 | 4;

export type Urgency = "flexible" | "this-week" | "asap";

export const TIME_SLOTS = [
  "9:00 AM",
  "11:00 AM",
  "2:00 PM",
  "4:00 PM",
] as const;

export type TimeSlot = (typeof TIME_SLOTS)[number];

/** Mon, Tue, Thu, Fri, Sat available */
const AVAILABLE_WEEKDAYS = new Set([1, 2, 4, 5, 6]);

export function isDateAvailable(date: Date): boolean {
  const day = date.getDay();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const candidate = new Date(date);
  candidate.setHours(0, 0, 0, 0);
  if (candidate < today) return false;
  return AVAILABLE_WEEKDAYS.has(day);
}

export type QuoteLineItem = {
  id: string;
  description: string;
  quantity: number;
  unit: string;
  totalCents: number;
};

export type BookingQuote = {
  lineItems: QuoteLineItem[];
  subtotalCents: number;
  platformFeeCents: number;
  totalCents: number;
};

export function buildQuoteForService(service: Service): BookingQuote {
  const lineItems: QuoteLineItem[] = [
    {
      id: "li-1",
      description: service.title,
      quantity: 1,
      unit: service.pricingUnit,
      totalCents: Math.round(
        (service.priceMinCents + service.priceMaxCents) / 2,
      ),
    },
  ];

  if (service.durationMinutes && service.durationMinutes >= 120) {
    lineItems.push({
      id: "li-2",
      description: "Extended coverage & editing",
      quantity: 1,
      unit: "add-on",
      totalCents: Math.round(lineItems[0].totalCents * 0.15),
    });
  }

  const subtotal = lineItems.reduce((sum, item) => sum + item.totalCents, 0);
  const platformFeeCentsFinal = Math.round(subtotal * 0.05);

  return {
    lineItems,
    subtotalCents: subtotal,
    platformFeeCents: platformFeeCentsFinal,
    totalCents: subtotal + platformFeeCentsFinal,
  };
}

export function getEstimatedDuration(service: Service): string {
  if (!service.durationMinutes) return "3–4 hours";
  const hours = service.durationMinutes / 60;
  if (hours <= 1) return "~1 hour";
  if (hours <= 2) return "1–2 hours";
  if (hours <= 4) return "3–4 hours";
  return `${Math.floor(hours)}–${Math.ceil(hours + 1)} hours`;
}

export function getConversationIdForProvider(providerId: string): string {
  const existing = conversations.find(
    (c) => c.providerId === providerId && c.customerId === DEMO_USER_ID,
  );
  return existing?.id ?? "conv-1";
}

export function generateBookingReference(): string {
  const suffix = Math.floor(1000 + Math.random() * 9000);
  return `#TRV-2026-${suffix}`;
}

export function detectCardBrand(
  number: string,
): "visa" | "mastercard" | "unknown" {
  const digits = number.replace(/\D/g, "");
  if (digits.startsWith("4")) return "visa";
  if (/^5[1-5]/.test(digits)) return "mastercard";
  return "unknown";
}

export function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
}

export function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

export function isPaymentValid(input: {
  useSavedCard: boolean;
  cardNumber: string;
  expiry: string;
  cvv: string;
  cardName: string;
}): boolean {
  if (input.useSavedCard) return true;
  const digits = input.cardNumber.replace(/\D/g, "");
  const expiryOk = /^\d{2}\/\d{2}$/.test(input.expiry.trim());
  const cvvOk = /^\d{3,4}$/.test(input.cvv.trim());
  const nameOk = input.cardName.trim().length >= 2;
  return digits.length >= 15 && expiryOk && cvvOk && nameOk;
}

export function formatQuoteTotal(cents: number): string {
  return formatUsdExact(cents);
}

export function downloadMockIcs(options: {
  title: string;
  start: Date;
  durationHours: number;
  location: string;
  reference: string;
}): void {
  const end = new Date(options.start);
  end.setHours(end.getHours() + options.durationHours);

  const formatIcs = (d: Date) =>
    d
      .toISOString()
      .replace(/[-:]/g, "")
      .split(".")[0] + "Z";

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Sheghlni//Booking//EN",
    "BEGIN:VEVENT",
    `UID:${options.reference}@sheghlni.com`,
    `DTSTAMP:${formatIcs(new Date())}`,
    `DTSTART:${formatIcs(options.start)}`,
    `DTEND:${formatIcs(end)}`,
    `SUMMARY:${options.title}`,
    `LOCATION:${options.location}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "sheghlni-booking.ics";
  anchor.click();
  URL.revokeObjectURL(url);
}

export function parseTimeSlotToDate(baseDate: string, slot: TimeSlot): Date {
  const [time, period] = slot.split(" ");
  const [hourStr, minuteStr] = time.split(":");
  let hour = parseInt(hourStr, 10);
  const minute = parseInt(minuteStr, 10);
  if (period === "PM" && hour !== 12) hour += 12;
  if (period === "AM" && hour === 12) hour = 0;
  const date = new Date(`${baseDate}T12:00:00`);
  date.setHours(hour, minute, 0, 0);
  return date;
}
