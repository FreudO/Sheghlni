"use client";

import { usePathname } from "next/navigation";
import { ConversationList } from "@/components/messaging/conversation-list";
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
    <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
      <p className="text-lg font-semibold text-text-primary">
        Select a conversation
      </p>
      <p className="mt-2 max-w-sm text-sm text-ink-300">
        Choose a pro from the list to view your messages, quotes, and bookings.
      </p>
    </div>
  );
}
