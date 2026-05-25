export type NotificationChannel = "inApp" | "push" | "email" | "sms";

export type NotificationEventId =
  | "new_message"
  | "quote_received"
  | "booking_confirmed"
  | "reminder_24h"
  | "reminder_2h"
  | "review_request"
  | "payout_sent"
  | "dispute_opened"
  | "marketing";

export type NotificationEvent = {
  id: NotificationEventId;
  label: string;
  channels: Record<NotificationChannel, boolean | null>;
};

/** Defaults aligned with spec §21.2 */
export const NOTIFICATION_EVENTS: NotificationEvent[] = [
  {
    id: "new_message",
    label: "New message",
    channels: { inApp: true, push: true, email: true, sms: null },
  },
  {
    id: "quote_received",
    label: "Quote received",
    channels: { inApp: true, push: true, email: true, sms: null },
  },
  {
    id: "booking_confirmed",
    label: "Booking confirmed",
    channels: { inApp: true, push: true, email: true, sms: true },
  },
  {
    id: "reminder_24h",
    label: "Reminder 24h before",
    channels: { inApp: true, push: true, email: true, sms: true },
  },
  {
    id: "reminder_2h",
    label: "Reminder 2h before",
    channels: { inApp: true, push: true, email: false, sms: true },
  },
  {
    id: "review_request",
    label: "Review request",
    channels: { inApp: true, push: true, email: true, sms: null },
  },
  {
    id: "payout_sent",
    label: "Payout sent",
    channels: { inApp: true, push: true, email: true, sms: null },
  },
  {
    id: "dispute_opened",
    label: "Dispute opened",
    channels: { inApp: true, push: true, email: true, sms: true },
  },
  {
    id: "marketing",
    label: "Marketing",
    channels: { inApp: false, push: false, email: true, sms: null },
  },
];

export const CHANNEL_LABELS: Record<NotificationChannel, string> = {
  inApp: "In-app",
  push: "Push",
  email: "Email",
  sms: "SMS",
};
