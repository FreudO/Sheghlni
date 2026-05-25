"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { MagicLinkSentContent } from "@/components/auth/magic-link-sent-content";

function MagicLinkSentInner() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "you@example.com";
  return <MagicLinkSentContent email={email} />;
}

export default function MagicLinkSentPage() {
  return (
    <Suspense fallback={<MagicLinkSentContent />}>
      <MagicLinkSentInner />
    </Suspense>
  );
}
