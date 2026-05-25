import { NotificationsPanel } from "@/components/notifications/notifications-panel";

export default function NotificationsPage() {
  return (
    <div className="mx-auto w-full max-w-xl px-4 py-6 md:px-6 md:py-10 lg:max-w-2xl lg:px-12">
      <header className="mb-6">
        <h1 className="font-display text-h1 text-text-primary">
          Notifications
        </h1>
      </header>
      <div className="overflow-hidden rounded-2xl border border-border bg-bg">
        <NotificationsPanel showFooterLink={false} />
      </div>
    </div>
  );
}
