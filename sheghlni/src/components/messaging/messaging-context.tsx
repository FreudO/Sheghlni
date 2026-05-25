"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  DEMO_USER_ID,
  customerHasBookingWithProvider,
  getConversations,
  getMessages,
  getProviderUserId,
  getQuoteById,
  type Conversation,
  type Message,
  type Quote,
  type QuoteStatus,
} from "@/lib/mock";
import { toast } from "@/lib/toast";
import { setUnreadTotal } from "@/lib/messaging/unread-store";

const CANNED_REPLIES = [
  "Thanks for reaching out! When are you looking to book?",
  "Happy to help — let me know if you have any questions.",
  "Sounds good! I'll get back to you shortly.",
  "Got it — I'll take a look and follow up soon.",
];

const NUDGE_DISMISS_KEY = "sheghlni-messaging-nudge-dismissed";

type MessagingContextValue = {
  conversations: Conversation[];
  getThreadMessages: (conversationId: string) => Message[];
  getQuote: (quoteId: string) => Quote | undefined;
  updateQuoteStatus: (quoteId: string, status: QuoteStatus) => void;
  sendMessage: (conversationId: string, body: string) => void;
  isTyping: (conversationId: string) => boolean;
  markConversationRead: (conversationId: string) => void;
  safeNudgeConversationId: string | null;
  isNudgeDismissed: boolean;
  dismissSafeNudge: () => void;
};

const MessagingContext = createContext<MessagingContextValue | null>(null);

function buildInitialMessages(): Record<string, Message[]> {
  const map: Record<string, Message[]> = {};
  for (const conversation of getConversations(DEMO_USER_ID)) {
    map[conversation.id] = getMessages(conversation.id);
  }
  return map;
}

function buildInitialQuotes(): Record<string, Quote> {
  const map: Record<string, Quote> = {};
  for (const conversation of getConversations(DEMO_USER_ID)) {
    for (const message of getMessages(conversation.id)) {
      if (message.quoteId) {
        const quote = getQuoteById(message.quoteId);
        if (quote) map[quote.id] = { ...quote };
      }
    }
  }
  return map;
}

export function MessagingProvider({ children }: { children: ReactNode }) {
  const [conversations, setConversations] = useState<Conversation[]>(() =>
    getConversations(DEMO_USER_ID),
  );
  const [messagesByConversation, setMessagesByConversation] = useState(
    buildInitialMessages,
  );
  const [quotesById, setQuotesById] = useState(buildInitialQuotes);
  const [typingIds, setTypingIds] = useState<Set<string>>(new Set());
  const [nudgeDismissed, setNudgeDismissed] = useState(false);
  const replyTimers = useRef<Map<string, ReturnType<typeof setTimeout>>>(
    new Map(),
  );
  const typingTimers = useRef<Map<string, ReturnType<typeof setTimeout>>>(
    new Map(),
  );

  useEffect(() => {
    const total = conversations.reduce(
      (sum, c) => sum + c.customerUnreadCount,
      0,
    );
    setUnreadTotal(total);
  }, [conversations]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setNudgeDismissed(
      window.sessionStorage.getItem(NUDGE_DISMISS_KEY) === "1",
    );
  }, []);

  const safeNudgeConversationId = useMemo(() => {
    for (const conversation of conversations) {
      if (
        !customerHasBookingWithProvider(
          DEMO_USER_ID,
          conversation.providerId,
        )
      ) {
        return conversation.id;
      }
    }
    return null;
  }, [conversations]);

  const syncConversationMeta = useCallback(
    (conversationId: string, lastBody: string, fromCustomer: boolean) => {
      setConversations((prev) =>
        prev.map((c) => {
          if (c.id !== conversationId) return c;
          return {
            ...c,
            lastMessagePreview: lastBody,
            lastMessageAt: new Date().toISOString(),
            customerUnreadCount: fromCustomer
              ? c.customerUnreadCount
              : c.customerUnreadCount + 1,
            providerUnreadCount: fromCustomer
              ? c.providerUnreadCount + 1
              : c.providerUnreadCount,
          };
        }),
      );
    },
    [],
  );

  const markConversationRead = useCallback((conversationId: string) => {
    setConversations((prev) =>
      prev.map((c) =>
        c.id === conversationId ? { ...c, customerUnreadCount: 0 } : c,
      ),
    );
  }, []);

  const appendMessage = useCallback(
    (conversationId: string, message: Message) => {
      setMessagesByConversation((prev) => ({
        ...prev,
        [conversationId]: [...(prev[conversationId] ?? []), message],
      }));
      syncConversationMeta(
        conversationId,
        message.body,
        message.senderId === DEMO_USER_ID,
      );
    },
    [syncConversationMeta],
  );

  const markCustomerMessagesRead = useCallback((conversationId: string) => {
    const now = new Date().toISOString();
    setMessagesByConversation((prev) => ({
      ...prev,
      [conversationId]: (prev[conversationId] ?? []).map((m) =>
        m.senderId === DEMO_USER_ID && !m.readAt ? { ...m, readAt: now } : m,
      ),
    }));
  }, []);

  const simulateProReply = useCallback(
    (conversationId: string) => {
      const conversation = conversations.find((c) => c.id === conversationId);
      if (!conversation) return;

      const providerUserId = getProviderUserId(conversation.providerId);
      if (!providerUserId) return;

      setTypingIds((prev) => new Set(prev).add(conversationId));

      const typingTimer = setTimeout(() => {
        setTypingIds((prev) => {
          const next = new Set(prev);
          next.delete(conversationId);
          return next;
        });

        const reply =
          CANNED_REPLIES[
            Math.floor(Math.random() * CANNED_REPLIES.length)
          ] ?? CANNED_REPLIES[0];

        const message: Message = {
          id: `msg-live-${Date.now()}`,
          conversationId,
          senderId: providerUserId,
          kind: "text",
          body: reply,
          attachments: [],
          quoteId: null,
          bookingId: null,
          readAt: null,
          createdAt: new Date().toISOString(),
        };

        appendMessage(conversationId, message);
        markCustomerMessagesRead(conversationId);
        markConversationRead(conversationId);
      }, 2000);

      typingTimers.current.set(conversationId, typingTimer);
    },
    [
      appendMessage,
      conversations,
      markConversationRead,
      markCustomerMessagesRead,
    ],
  );

  const sendMessage = useCallback(
    (conversationId: string, body: string) => {
      const trimmed = body.trim();
      if (!trimmed) return;

      const optimistic: Message = {
        id: `msg-live-${Date.now()}`,
        conversationId,
        senderId: DEMO_USER_ID,
        kind: "text",
        body: trimmed,
        attachments: [],
        quoteId: null,
        bookingId: null,
        readAt: null,
        createdAt: new Date().toISOString(),
      };

      appendMessage(conversationId, optimistic);
      markConversationRead(conversationId);
      toast.success("Message sent.");

      const existing = replyTimers.current.get(conversationId);
      if (existing) clearTimeout(existing);

      const replyTimer = setTimeout(() => {
        simulateProReply(conversationId);
      }, 2000);
      replyTimers.current.set(conversationId, replyTimer);
    },
    [appendMessage, markConversationRead, simulateProReply],
  );

  const updateQuoteStatus = useCallback(
    (quoteId: string, status: QuoteStatus) => {
      setQuotesById((prev) => {
        const quote = prev[quoteId];
        if (!quote) return prev;
        return { ...prev, [quoteId]: { ...quote, status } };
      });
    },
    [],
  );

  const getThreadMessages = useCallback(
    (conversationId: string) => messagesByConversation[conversationId] ?? [],
    [messagesByConversation],
  );

  const getQuote = useCallback(
    (quoteId: string) => quotesById[quoteId],
    [quotesById],
  );

  const isTyping = useCallback(
    (conversationId: string) => typingIds.has(conversationId),
    [typingIds],
  );

  const dismissSafeNudge = useCallback(() => {
    setNudgeDismissed(true);
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(NUDGE_DISMISS_KEY, "1");
    }
  }, []);

  useEffect(() => {
    const replies = replyTimers.current;
    const typings = typingTimers.current;
    return () => {
      replies.forEach(clearTimeout);
      typings.forEach(clearTimeout);
    };
  }, []);

  const value = useMemo(
    () => ({
      conversations,
      getThreadMessages,
      getQuote,
      updateQuoteStatus,
      sendMessage,
      isTyping,
      markConversationRead,
      safeNudgeConversationId,
      isNudgeDismissed: nudgeDismissed,
      dismissSafeNudge,
    }),
    [
      conversations,
      dismissSafeNudge,
      getQuote,
      getThreadMessages,
      isTyping,
      markConversationRead,
      nudgeDismissed,
      safeNudgeConversationId,
      sendMessage,
      updateQuoteStatus,
    ],
  );

  return (
    <MessagingContext.Provider value={value}>
      {children}
    </MessagingContext.Provider>
  );
}

export function useMessaging(): MessagingContextValue {
  const ctx = useContext(MessagingContext);
  if (!ctx) {
    throw new Error("useMessaging must be used within MessagingProvider");
  }
  return ctx;
}
