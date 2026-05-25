"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Archive,
  Ban,
  Flag,
  MessageCircle,
  MoreVertical,
} from "lucide-react";
import { ICON_STROKE, IconWell } from "@/components/ui/icon-well";
import { MessageBubble } from "@/components/messaging/message-bubble";
import { MessageInput } from "@/components/messaging/message-input";
import { TypingIndicator } from "@/components/messaging/typing-indicator";
import { useMessaging } from "@/components/messaging/messaging-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatLastSeen } from "@/lib/messaging/format";
import type { Conversation } from "@/lib/mock";
import { cn } from "@/lib/utils";

type ThreadProps = {
  conversation: Conversation;
};

export function Thread({ conversation }: ThreadProps) {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const {
    getThreadMessages,
    sendMessage,
    isTyping,
    markConversationRead,
    safeNudgeConversationId,
    isNudgeDismissed,
    dismissSafeNudge,
  } = useMessaging();
  const [initialTyping, setInitialTyping] = useState(true);

  const messages = getThreadMessages(conversation.id);
  const typing = isTyping(conversation.id);
  const showNudge =
    !isNudgeDismissed &&
    safeNudgeConversationId === conversation.id;

  useEffect(() => {
    markConversationRead(conversation.id);
  }, [conversation.id, markConversationRead]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages.length, typing, initialTyping]);

  useEffect(() => {
    setInitialTyping(true);
    const timer = setTimeout(() => setInitialTyping(false), 3000);
    return () => clearTimeout(timer);
  }, [conversation.id]);

  const firstName = conversation.providerName.split(" ")[0];

  return (
    <div className="flex h-full min-h-0 flex-col bg-bg">
      <header className="flex shrink-0 items-center gap-3 border-b border-border px-3 py-2.5 md:px-4">
        <button
          type="button"
          className="flex size-9 shrink-0 items-center justify-center rounded-full text-text-primary hover:bg-bg-elevated-2 md:hidden"
          onClick={() => router.push("/inbox/")}
          aria-label="Back to conversations"
        >
          <ArrowLeft className="size-5" strokeWidth={ICON_STROKE} />
        </button>

        <Image
          src={conversation.providerAvatarUrl}
          alt=""
          width={40}
          height={40}
          className="size-10 shrink-0 rounded-full object-cover"
          unoptimized
        />

        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold text-text-primary">
            {conversation.providerName}
          </p>
          <p className="truncate text-xs text-ink-300">
            {formatLastSeen(conversation.id)}
          </p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger
            className="flex size-9 items-center justify-center rounded-full text-ink-300 hover:bg-bg-elevated-2 hover:text-text-primary"
            aria-label="Conversation actions"
          >
            <MoreVertical className="size-5" strokeWidth={ICON_STROKE} />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="gap-2">
              <Archive className="size-4" strokeWidth={ICON_STROKE} />
              Archive
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2">
              <Ban className="size-4" strokeWidth={ICON_STROKE} />
              Block
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2">
              <Flag className="size-4" strokeWidth={ICON_STROKE} />
              Report
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      <div
        ref={scrollRef}
        className="min-h-0 flex-1 space-y-3 overflow-y-auto px-3 py-4 md:px-4"
      >
        {messages.map((message, index) => (
          <div key={message.id} className="space-y-3">
            <MessageBubble message={message} conversation={conversation} />
            {showNudge && index === 0 && (
              <SafeMessagingNudge onDismiss={dismissSafeNudge} />
            )}
          </div>
        ))}

        {(typing || initialTyping) && (
          <div className="flex justify-start">
            <TypingIndicator />
          </div>
        )}
      </div>

      <MessageInput
        placeholder={`Message ${firstName}...`}
        onSend={(body) => sendMessage(conversation.id, body)}
      />
    </div>
  );
}

function SafeMessagingNudge({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-lg bg-cream-200 px-3 py-2.5 text-xs text-text-primary",
        "dark:bg-cream-200/15 dark:text-text-secondary",
      )}
      role="note"
    >
      <IconWell
        icon={MessageCircle}
        size="sm"
        iconClassName="text-bronze-500"
        className="mt-0.5"
      />
      <p className="flex-1 leading-relaxed">
        Keep conversations on Sheghlni for payment protection and dispute
        coverage.
      </p>
      <button
        type="button"
        onClick={onDismiss}
        className="shrink-0 text-xs font-medium text-ink-300 hover:text-text-primary"
      >
        Dismiss
      </button>
    </div>
  );
}
