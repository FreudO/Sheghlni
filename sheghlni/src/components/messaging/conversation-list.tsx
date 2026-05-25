"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { useMessaging } from "@/components/messaging/messaging-context";
import { formatConversationTime, isProviderOnlineMock } from "@/lib/messaging/format";
import { ICON_STROKE } from "@/components/ui/icon-well";
import { cn } from "@/lib/utils";

type ConversationListProps = {
  activeConversationId?: string;
};

export function ConversationList({ activeConversationId }: ConversationListProps) {
  const { conversations } = useMessaging();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return conversations;
    return conversations.filter((c) =>
      c.providerName.toLowerCase().includes(needle),
    );
  }, [conversations, query]);

  return (
    <div className="flex h-full min-h-0 flex-col border-border bg-bg md:border-r">
      <div className="shrink-0 border-b border-border px-3 py-3">
        <h1 className="mb-3 text-lg font-semibold text-text-primary md:hidden">
          Messages
        </h1>
        <label className="relative block">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-300"
            strokeWidth={ICON_STROKE}
            aria-hidden
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search conversations"
            className="h-10 w-full rounded-full border border-border bg-bg-elevated-2 pl-9 pr-3 text-sm text-text-primary outline-none placeholder:text-ink-300 focus-visible:border-bronze-500 focus-visible:ring-2 focus-visible:ring-bronze-500/20"
          />
        </label>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        {filtered.length === 0 ? (
          <p className="px-4 py-12 text-center text-sm text-ink-300">
            {query
              ? "No conversations match your search."
              : "Your conversations will live here. Message a pro to start one."}
          </p>
        ) : (
          <ul>
            {filtered.map((conversation) => {
              const isActive = conversation.id === activeConversationId;
              const online = isProviderOnlineMock(conversation.id);

              return (
                <li key={conversation.id}>
                  <Link
                    href={`/inbox/${conversation.id}/`}
                    className={cn(
                      "relative flex gap-3 px-3 py-3 transition ease-default duration-default",
                      "hover:bg-bronze-500/5",
                      isActive &&
                        "border-l-2 border-l-bronze-500 bg-bronze-500/10 pl-[10px]",
                    )}
                  >
                    <div className="relative shrink-0">
                      <Image
                        src={conversation.providerAvatarUrl}
                        alt=""
                        width={48}
                        height={48}
                        className="size-12 rounded-full object-cover"
                        unoptimized
                      />
                      <span
                        className={cn(
                          "absolute bottom-0 right-0 size-3 rounded-full border-2 border-bg",
                          online ? "bg-sage-500" : "bg-ink-300",
                        )}
                        aria-hidden
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="truncate font-semibold text-text-primary">
                          {conversation.providerName}
                        </p>
                        <div className="flex shrink-0 flex-col items-end gap-1">
                          <time
                            className="text-xs text-ink-300"
                            dateTime={conversation.lastMessageAt}
                          >
                            {formatConversationTime(conversation.lastMessageAt)}
                          </time>
                          {conversation.customerUnreadCount > 0 && (
                            <span className="flex min-h-5 min-w-5 items-center justify-center rounded-full bg-bronze-500 px-1.5 text-[11px] font-semibold text-white">
                              {conversation.customerUnreadCount > 9
                                ? "9+"
                                : conversation.customerUnreadCount}
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="truncate text-sm text-ink-300">
                        {conversation.lastMessagePreview}
                      </p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
