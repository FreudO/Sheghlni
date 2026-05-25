import { MessagingProvider } from "@/components/messaging/messaging-context";
import { InboxShell } from "@/components/messaging/inbox-shell";

export default function InboxLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MessagingProvider>
      <InboxShell>{children}</InboxShell>
    </MessagingProvider>
  );
}
