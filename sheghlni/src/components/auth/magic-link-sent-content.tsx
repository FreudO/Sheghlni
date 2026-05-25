"use client";

import Link from "next/link";
import { useState } from "react";
import { AuthCardShell } from "@/components/auth/auth-card-shell";
import {
  authLinkClass,
  authSubtitleClass,
  authTitleClass,
} from "@/components/auth/auth-styles";
import { EnvelopeIllustration } from "@/components/auth/envelope-illustration";
import { toast } from "@/lib/toast";
import { cn } from "@/lib/utils";

type MagicLinkSentContentProps = {
  email?: string;
};

export function MagicLinkSentContent({
  email = "you@example.com",
}: MagicLinkSentContentProps) {
  const [resending, setResending] = useState(false);

  const handleResend = () => {
    setResending(true);
    window.setTimeout(() => {
      setResending(false);
      toast.success("Email resent.");
    }, 800);
  };

  return (
    <AuthCardShell>
      <div className="text-center">
        <EnvelopeIllustration className="mx-auto h-28 w-32" />
        <h1 className={cn("mt-6", authTitleClass)}>Check your inbox</h1>
        <p className={cn("mt-3", authSubtitleClass)}>
          We sent a sign-in link to{" "}
          <span className="font-medium text-text-primary dark:text-cream-50">
            {email}
          </span>
          . Open it on this device to continue. Links expire in 15 minutes.
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <a
            href="https://mail.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center justify-center rounded-full border border-border bg-white text-sm font-semibold text-ink-900 transition hover:bg-cream-50 dark:border-white/20"
          >
            Open Gmail
          </a>
          <a
            href="https://outlook.live.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center justify-center rounded-full border border-ink-900 bg-ink-900 text-sm font-semibold text-white transition hover:bg-ink-800 dark:border-white/20"
          >
            Open Outlook
          </a>
        </div>

        <button
          type="button"
          onClick={handleResend}
          disabled={resending}
          className={cn("mt-6 text-sm hover:underline disabled:opacity-60", authLinkClass)}
        >
          {resending ? "Sending…" : "Resend email"}
        </button>

        <p className={cn("mt-8 text-sm", authSubtitleClass)}>
          Wrong address?{" "}
          <Link href="/sign-in/" className={authLinkClass}>
            Try again
          </Link>
        </p>
      </div>
    </AuthCardShell>
  );
}
