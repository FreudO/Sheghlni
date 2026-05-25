"use client";

import Link from "next/link";
import { useState } from "react";
import { AuthCardShell } from "@/components/auth/auth-card-shell";
import {
  authFooterBorderClass,
  authInputClass,
  authLabelClass,
  authLinkClass,
  authMutedLinkClass,
  authSubtitleClass,
  authTitleClass,
} from "@/components/auth/auth-styles";
import { EnvelopeIllustration } from "@/components/auth/envelope-illustration";
import {
  AuthDivider,
  SocialAuthButtons,
} from "@/components/auth/social-auth-buttons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/lib/toast";
import { cn } from "@/lib/utils";

export function SignInForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleMagicLink = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes("@")) {
      toast.error("Enter a valid email address.");
      return;
    }
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      setSent(true);
      toast.success("Magic link sent.");
    }, 600);
  };

  const handleSocial = (provider: "google" | "apple") => {
    toast.info(
      provider === "google"
        ? "Google sign-in is not wired in the demo."
        : "Apple sign-in is not wired in the demo.",
    );
  };

  if (sent) {
    return (
      <AuthCardShell>
        <div className="text-center">
          <EnvelopeIllustration className="mx-auto h-24 w-28" />
          <h1 className={cn("mt-6", authTitleClass)}>Check your email</h1>
          <p className={cn("mt-3", authSubtitleClass)}>
            We sent a link to{" "}
            <span className="font-medium text-text-primary dark:text-cream-50">
              {email.trim()}
            </span>
            . Tap it to sign in — the link expires in 15 minutes.
          </p>
          <Button
            type="button"
            variant="outline"
            className="mt-8 h-11 w-full rounded-full border-border text-text-primary hover:bg-bg-elevated-2 dark:border-white/20 dark:bg-transparent dark:text-cream-50 dark:hover:bg-white/10"
            onClick={() => setSent(false)}
          >
            Use a different email
          </Button>
        </div>
      </AuthCardShell>
    );
  }

  return (
    <AuthCardShell>
      <h1 className={authTitleClass}>Welcome back</h1>
      <p className={cn("mt-2", authSubtitleClass)}>
        Sign in to manage bookings, messages, and your profile.
      </p>

      <div className="mt-8">
        <SocialAuthButtons onSocialClick={handleSocial} />
      </div>

      <AuthDivider />

      <form onSubmit={handleMagicLink} className="space-y-4">
        <label className="block">
          <span className={authLabelClass}>Email</span>
          <Input
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={authInputClass}
            required
          />
        </label>
        <Button
          type="submit"
          disabled={submitting}
          className="h-11 w-full rounded-full bg-cta text-sm font-semibold text-white hover:bg-cta-hover"
        >
          {submitting ? "Sending…" : "Send magic link"}
        </Button>
      </form>

      <p className={cn("mt-6 text-center text-sm", authSubtitleClass)}>
        Don&apos;t have an account?{" "}
        <Link href="/sign-up/" className={authLinkClass}>
          Sign up
        </Link>
      </p>

      <div className={authFooterBorderClass}>
        <Link href="/" className={authMutedLinkClass}>
          Continue as guest
        </Link>
      </div>
    </AuthCardShell>
  );
}
