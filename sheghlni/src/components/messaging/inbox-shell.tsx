"use client";

import { usePathname } from "next/navigation";
import { ConversationList } from "@/components/messaging/conversation-list";
import { EmptyState } from "@/components/ui/empty-state";
import { cn } from "@/lib/utils";

type InboxShellProps = {
  children: React.ReactNode;
};

function getActiveConversationId(pathname: string): string | undefined {
  const match = pathname.match(/\/inbox\/([^/]+)\/?$/);
  return match?.[1];
}

export function InboxShell({ children }: InboxShellProps) {
  const pathname = usePathname();
  const activeId = getActiveConversationId(pathname);
  const isThreadRoute = Boolean(activeId);

  return (
    <div
      className={cn(
        "flex min-h-0 w-full overflow-hidden",
        "h-[calc(100dvh-3.5rem-4rem-env(safe-area-inset-bottom))] md:h-[calc(100dvh-4rem)]",
      )}
    >
      <aside
        className={cn(
          "h-full w-full shrink-0 md:w-[360px]",
          isThreadRoute && "hidden md:block",
        )}
      >
        <ConversationList activeConversationId={activeId} />
      </aside>

      <section
        className={cn(
          "flex min-h-0 min-w-0 flex-1 flex-col bg-bg",
          !isThreadRoute && "hidden md:flex",
        )}
      >
        {children}
      </section>
    </div>
  );
}

export function InboxEmptyState() {
  return (
    <EmptyState
      illustration="empty-inbox"
      title="Select a conversation"
      subtitle="Choose a pro from the list to view your messages, quotes, and bookings."
      className="flex-1 py-12"
    />
  );
}
