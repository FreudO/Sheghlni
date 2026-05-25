"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { AuthCardShell } from "@/components/auth/auth-card-shell";
import {
  authFooterBorderClass,
  authInputClass,
  authLabelClass,
  authLinkClass,
  authMutedLinkClass,
  authRadioItemClass,
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

type AccountType = "customer" | "pro";

export function SignUpForm() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [accountType, setAccountType] = useState<AccountType>("customer");
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    const trimmedName = fullName.trim();
    if (!trimmedName) {
      toast.error("Enter your full name.");
      return;
    }
    if (!trimmedEmail.includes("@")) {
      toast.error("Enter a valid email address.");
      return;
    }
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      setSent(true);
      toast.success("Check your inbox to finish signing up.");
    }, 600);
  };

  const handleSocial = (provider: "google" | "apple") => {
    toast.info(
      provider === "google"
        ? "Google sign-up is not wired in the demo."
        : "Apple sign-up is not wired in the demo.",
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
            .
            {accountType === "pro"
              ? " After you verify, we'll take you to provider onboarding."
              : " Open it to finish creating your account."}
          </p>
          <Button
            type="button"
            className="mt-8 h-11 w-full rounded-full bg-cta font-semibold text-white hover:bg-cta-hover"
            onClick={() => {
              if (accountType === "pro") {
                router.push("/pro/onboarding/");
              } else {
                router.push("/");
              }
            }}
          >
            {accountType === "pro" ? "Continue to onboarding" : "Continue to home"}
          </Button>
        </div>
      </AuthCardShell>
    );
  }

  return (
    <AuthCardShell>
      <h1 className={authTitleClass}>Get started</h1>
      <p className={cn("mt-2", authSubtitleClass)}>
        Create your account in under a minute.
      </p>

      <div className="mt-8">
        <SocialAuthButtons onSocialClick={handleSocial} />
      </div>

      <AuthDivider />

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className={authLabelClass}>Full name</span>
          <Input
            type="text"
            autoComplete="name"
            placeholder="Alex Morgan"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className={authInputClass}
            required
          />
        </label>
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

        <fieldset>
          <legend className={cn("mb-2", authLabelClass)}>I&apos;m joining as</legend>
          <RadioGroup.Root
            value={accountType}
            onValueChange={(v) => setAccountType(v as AccountType)}
            className="grid grid-cols-2 gap-2"
          >
            {(
              [
                { value: "customer", label: "I need services" },
                { value: "pro", label: "I'm a Pro" },
              ] as const
            ).map((option) => (
              <RadioGroup.Item
                key={option.value}
                value={option.value}
                className={authRadioItemClass}
              >
                {option.label}
              </RadioGroup.Item>
            ))}
          </RadioGroup.Root>
        </fieldset>

        <Button
          type="submit"
          disabled={submitting}
          className="h-11 w-full rounded-full bg-cta text-sm font-semibold text-white hover:bg-cta-hover"
        >
          {submitting ? "Sending…" : "Send magic link"}
        </Button>
      </form>

      <p className={cn("mt-6 text-center text-sm", authSubtitleClass)}>
        Already have an account?{" "}
        <Link href="/sign-in/" className={authLinkClass}>
          Sign in
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
