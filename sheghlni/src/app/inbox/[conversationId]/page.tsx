import { notFound } from "next/navigation";
import { Thread } from "@/components/messaging/thread";
import { conversations } from "@/lib/mock";

type ConversationPageProps = {
  params: { conversationId: string };
};

export function generateStaticParams() {
  return conversations.map((conversation) => ({
    conversationId: conversation.id,
  }));
}

export default function ConversationPage({ params }: ConversationPageProps) {
  const conversation = conversations.find((c) => c.id === params.conversationId);

  if (!conversation) {
    notFound();
  }

  return <Thread conversation={conversation} />;
}
