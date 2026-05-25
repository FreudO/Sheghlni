"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Calendar, CreditCard, Link2, Trash2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  CHANNEL_LABELS,
  NOTIFICATION_EVENTS,
  type NotificationChannel,
  type NotificationEventId,
} from "@/lib/account/notification-preferences";
import { mockImageUrl } from "@/lib/mock/mock-image-url";
import { toast } from "@/lib/toast";
import { cn } from "@/lib/utils";
import { ICON_STROKE } from "@/components/ui/icon-well";

const MOCK_CARDS = [
  { id: "card-1", brand: "Visa", last4: "4242", exp: "08/28" },
  { id: "card-2", brand: "Mastercard", last4: "8210", exp: "03/27" },
];

const MOCK_SESSIONS = [
  { id: "s1", device: "Chrome on Windows", location: "Chicago, IL", current: true },
  { id: "s2", device: "Safari on iPhone", location: "Chicago, IL", current: false },
];

type PrefsState = Record<
  NotificationEventId,
  Record<NotificationChannel, boolean>
>;

function buildDefaultPrefs(): PrefsState {
  const prefs = {} as PrefsState;
  for (const event of NOTIFICATION_EVENTS) {
    prefs[event.id] = {
      inApp: event.channels.inApp ?? false,
      push: event.channels.push ?? false,
      email: event.channels.email ?? false,
      sms: event.channels.sms ?? false,
    };
  }
  return prefs;
}

export function AccountSettings() {
  const deleteDialogRef = useRef<HTMLDialogElement>(null);
  const [displayName, setDisplayName] = useState("Alex Morgan");
  const [email, setEmail] = useState("alex.morgan@example.com");
  const [phone, setPhone] = useState("+1 (312) 555-0142");
  const [avatarUrl] = useState(() =>
    mockImageUrl("professional,portrait", 96, 96),
  );
  const [prefs, setPrefs] = useState<PrefsState>(buildDefaultPrefs);
  const [twoFa, setTwoFa] = useState(false);
  const [sessions, setSessions] = useState(MOCK_SESSIONS);
  const [googleConnected, setGoogleConnected] = useState(true);
  const [appleConnected, setAppleConnected] = useState(false);
  const [calendarSync, setCalendarSync] = useState(true);
  const [analyticsCookies, setAnalyticsCookies] = useState(true);
  const [marketingCookies, setMarketingCookies] = useState(false);

  const togglePref = (
    eventId: NotificationEventId,
    channel: NotificationChannel,
    checked: boolean,
  ) => {
    setPrefs((p) => ({
      ...p,
      [eventId]: { ...p[eventId], [channel]: checked },
    }));
  };

  const saveAccount = () => {
    toast.success("Account details saved.");
  };

  const saveNotifications = () => {
    toast.success("Notification preferences saved.");
  };

  const handleDeleteAccount = () => {
    deleteDialogRef.current?.close();
    toast.success("Account deletion requested. We'll email you within 48 hours.");
  };

  const revokeSession = (id: string) => {
    setSessions((s) => s.filter((session) => session.id !== id));
    toast.success("Session revoked.");
  };

  return (
    <div>
      <header className="mb-6 md:mb-8">
        <h1 className="font-display text-h1 text-text-primary">Settings</h1>
        <p className="mt-2 text-body text-text-secondary">
          Manage your profile, notifications, payments, and security.
        </p>
      </header>

      <Tabs defaultValue="account" className="min-w-0">
        <TabsList className="h-auto min-h-11 w-full flex-wrap justify-start gap-1 p-1 md:flex-nowrap">
          <TabsTrigger value="account" className="flex-none px-3">
            Account
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex-none px-3">
            Notifications
          </TabsTrigger>
          <TabsTrigger value="payment" className="flex-none px-3">
            Payment
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex-none px-3">
            Privacy
          </TabsTrigger>
          <TabsTrigger value="security" className="flex-none px-3">
            Security
          </TabsTrigger>
          <TabsTrigger value="connected" className="flex-none px-3">
            Connected
          </TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <section className="rounded-2xl border border-border bg-bg-elevated p-5 md:p-6">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
              <div className="flex items-center gap-4">
                <Image
                  src={avatarUrl}
                  alt=""
                  width={72}
                  height={72}
                  className="size-[4.5rem] rounded-full object-cover ring-2 ring-cream-200"
                />
                <div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="rounded-full"
                    onClick={() => toast.info("Avatar upload is mocked in the demo.")}
                  >
                    Upload photo
                  </Button>
                  <p className="mt-2 text-caption text-ink-300">JPG or PNG, max 5MB</p>
                </div>
              </div>
              <div className="grid flex-1 gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Label htmlFor="display-name">Display name</Label>
                  <Input
                    id="display-name"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-1.5"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-border pt-6">
              <h3 className="font-display text-h3 text-text-primary">Password</h3>
              <p className="mt-1 text-body-sm text-text-secondary">
                Use a magic link to sign in, or set a password for backup access.
              </p>
              <Button
                type="button"
                variant="outline"
                className="mt-4 rounded-full"
                onClick={() => toast.success("Password reset link sent.")}
              >
                Send password reset email
              </Button>
            </div>

            <Button
              type="button"
              className="mt-6 rounded-full bg-cta text-white hover:bg-cta-hover"
              onClick={saveAccount}
            >
              Save changes
            </Button>
          </section>
        </TabsContent>

        <TabsContent value="notifications">
          <section className="overflow-hidden rounded-2xl border border-border bg-bg-elevated">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[36rem] text-left text-sm">
                <thead>
                  <tr className="border-b border-border bg-bg">
                    <th className="px-4 py-3 font-medium text-text-primary">Event</th>
                    {(Object.keys(CHANNEL_LABELS) as NotificationChannel[]).map(
                      (ch) => (
                        <th
                          key={ch}
                          className="px-3 py-3 text-center font-medium text-text-secondary"
                        >
                          {CHANNEL_LABELS[ch]}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody>
                  {NOTIFICATION_EVENTS.map((event) => (
                    <tr key={event.id} className="border-b border-border last:border-0">
                      <td className="px-4 py-3 font-medium text-text-primary">
                        {event.label}
                      </td>
                      {(Object.keys(CHANNEL_LABELS) as NotificationChannel[]).map(
                        (channel) => {
                          const available = event.channels[channel] !== null;
                          return (
                            <td key={channel} className="px-3 py-3 text-center">
                              {available ? (
                                <Checkbox
                                  checked={prefs[event.id][channel]}
                                  onCheckedChange={(v) =>
                                    togglePref(event.id, channel, v === true)
                                  }
                                  aria-label={`${event.label} ${CHANNEL_LABELS[channel]}`}
                                  className="mx-auto"
                                />
                              ) : (
                                <span className="text-ink-300">—</span>
                              )}
                            </td>
                          );
                        },
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="border-t border-border px-4 py-4">
              <Button
                type="button"
                className="rounded-full bg-cta text-white hover:bg-cta-hover"
                onClick={saveNotifications}
              >
                Save notification preferences
              </Button>
            </div>
          </section>
        </TabsContent>

        <TabsContent value="payment">
          <section className="space-y-6">
            <div className="rounded-2xl border border-border bg-bg-elevated p-5 md:p-6">
              <h3 className="font-display text-h3 text-text-primary">Saved cards</h3>
              <ul className="mt-4 space-y-3">
                {MOCK_CARDS.map((card) => (
                  <li
                    key={card.id}
                    className="flex items-center justify-between rounded-xl border border-border bg-bg px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <CreditCard
                        className="size-5 text-bronze-500"
                        strokeWidth={ICON_STROKE}
                      />
                      <span className="text-sm font-medium text-text-primary">
                        {card.brand} ···· {card.last4}
                      </span>
                      <span className="text-caption text-ink-300">Exp {card.exp}</span>
                    </div>
                    <button
                      type="button"
                      className="text-caption font-medium text-ink-300 hover:text-clay-500"
                      onClick={() => toast.success("Card removed.")}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
              <Button
                type="button"
                variant="outline"
                className="mt-4 rounded-full"
                onClick={() => toast.info("Add card flow is mocked in the demo.")}
              >
                Add card
              </Button>
            </div>
            <div className="rounded-2xl border border-border bg-bg-elevated p-5 md:p-6">
              <h3 className="font-display text-h3 text-text-primary">Billing address</h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Label htmlFor="street">Street</Label>
                  <Input id="street" defaultValue="1234 W Lake St" className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" defaultValue="Chicago" className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="zip">ZIP</Label>
                  <Input id="zip" defaultValue="60607" className="mt-1.5" />
                </div>
              </div>
              <Button
                type="button"
                className="mt-4 rounded-full bg-cta text-white hover:bg-cta-hover"
                onClick={() => toast.success("Billing address saved.")}
              >
                Save billing address
              </Button>
            </div>
          </section>
        </TabsContent>

        <TabsContent value="privacy">
          <section className="space-y-4 rounded-2xl border border-border bg-bg-elevated p-5 md:p-6">
            <div>
              <h3 className="font-display text-h3 text-text-primary">Download your data</h3>
              <p className="mt-1 text-body-sm text-text-secondary">
                Request a copy of your bookings, messages, and profile data (GDPR/CCPA).
              </p>
              <Button
                type="button"
                variant="outline"
                className="mt-3 rounded-full"
                onClick={() =>
                  toast.success("Export started. We'll email you when it's ready.")
                }
              >
                Request data export
              </Button>
            </div>
            <div className="border-t border-border pt-6">
              <h3 className="font-display text-h3 text-text-primary">Cookie preferences</h3>
              <div className="mt-4 space-y-3">
                <label className="flex items-center gap-3">
                  <Checkbox
                    checked={analyticsCookies}
                    onCheckedChange={(v) => setAnalyticsCookies(v === true)}
                  />
                  <span className="text-sm text-text-primary">Analytics cookies</span>
                </label>
                <label className="flex items-center gap-3">
                  <Checkbox
                    checked={marketingCookies}
                    onCheckedChange={(v) => setMarketingCookies(v === true)}
                  />
                  <span className="text-sm text-text-primary">Marketing cookies</span>
                </label>
              </div>
            </div>
            <div className="border-t border-border pt-6">
              <h3 className="font-display text-h3 text-clay-500">Delete account</h3>
              <p className="mt-1 text-body-sm text-text-secondary">
                Permanently remove your account and data. This cannot be undone.
              </p>
              <Button
                type="button"
                variant="destructive"
                className="mt-3 rounded-full"
                onClick={() => deleteDialogRef.current?.showModal()}
              >
                <Trash2 className="size-4" strokeWidth={ICON_STROKE} />
                Delete account
              </Button>
            </div>
          </section>
        </TabsContent>

        <TabsContent value="security">
          <section className="space-y-6 rounded-2xl border border-border bg-bg-elevated p-5 md:p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="font-display text-h3 text-text-primary">
                  Two-factor authentication
                </h3>
                <p className="mt-1 text-body-sm text-text-secondary">
                  Add an extra layer of security when signing in.
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={twoFa}
                onClick={() => {
                  setTwoFa((v) => !v);
                  toast.success(twoFa ? "2FA disabled." : "2FA enabled.");
                }}
                className={cn(
                  "relative h-7 w-12 shrink-0 rounded-full transition",
                  twoFa ? "bg-bronze-500" : "bg-ink-100",
                )}
              >
                <span
                  className={cn(
                    "absolute top-0.5 size-6 rounded-full bg-white shadow transition",
                    twoFa ? "left-[1.375rem]" : "left-0.5",
                  )}
                />
              </button>
            </div>
            <div className="border-t border-border pt-6">
              <h3 className="font-display text-h3 text-text-primary">Active sessions</h3>
              <ul className="mt-4 space-y-3">
                {sessions.map((session) => (
                  <li
                    key={session.id}
                    className="flex items-center justify-between gap-3 rounded-xl border border-border bg-bg px-4 py-3"
                  >
                    <div>
                      <p className="text-sm font-medium text-text-primary">
                        {session.device}
                        {session.current && (
                          <span className="ml-2 text-caption text-bronze-600">
                            This device
                          </span>
                        )}
                      </p>
                      <p className="text-caption text-ink-300">{session.location}</p>
                    </div>
                    {!session.current && (
                      <button
                        type="button"
                        className="text-sm font-medium text-cta hover:underline"
                        onClick={() => revokeSession(session.id)}
                      >
                        Revoke
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </TabsContent>

        <TabsContent value="connected">
          <section className="space-y-3 rounded-2xl border border-border bg-bg-elevated p-5 md:p-6">
            {[
              {
                id: "google",
                label: "Google",
                connected: googleConnected,
                setConnected: setGoogleConnected,
              },
              {
                id: "apple",
                label: "Apple",
                connected: appleConnected,
                setConnected: setAppleConnected,
              },
              {
                id: "calendar",
                label: "Calendar sync",
                connected: calendarSync,
                setConnected: setCalendarSync,
                icon: Calendar,
              },
            ].map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-xl border border-border bg-bg px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  {"icon" in item && item.icon ? (
                    <item.icon
                      className="size-5 text-bronze-500"
                      strokeWidth={ICON_STROKE}
                    />
                  ) : (
                    <Link2
                      className="size-5 text-bronze-500"
                      strokeWidth={ICON_STROKE}
                    />
                  )}
                  <span className="font-medium text-text-primary">{item.label}</span>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                  onClick={() => {
                    const next = !item.connected;
                    item.setConnected(next);
                    toast.success(
                      next ? `${item.label} connected.` : `${item.label} disconnected.`,
                    );
                  }}
                >
                  {item.connected ? "Disconnect" : "Connect"}
                </Button>
              </div>
            ))}
          </section>
        </TabsContent>
      </Tabs>

      <dialog
        ref={deleteDialogRef}
        className="w-[min(100vw-2rem,24rem)] rounded-2xl border border-border bg-bg-elevated p-6 shadow-xl backdrop:bg-ink-900/50 open:backdrop:bg-ink-900/50"
      >
        <h3 className="font-display text-h3 text-text-primary">Delete your account?</h3>
        <p className="mt-2 text-body-sm text-text-secondary">
          Your bookings and messages will be removed after a 14-day grace period.
        </p>
        <div className="mt-6 flex gap-3">
          <Button
            type="button"
            variant="outline"
            className="flex-1 rounded-full"
            onClick={() => deleteDialogRef.current?.close()}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            className="flex-1 rounded-full"
            onClick={handleDeleteAccount}
          >
            Delete
          </Button>
        </div>
      </dialog>
    </div>
  );
}
