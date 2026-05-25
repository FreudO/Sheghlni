import { cn } from "@/lib/utils";

function GoogleLogo() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function AppleLogo() {
  return (
    <svg viewBox="0 0 24 24" className="size-5 fill-current" aria-hidden>
      <path d="M17.05 12.65c-.02-2.17 1.77-3.21 1.85-3.27-1.01-1.47-2.58-1.67-3.14-1.69-1.34-.14-2.61.79-3.29.79-.68 0-1.73-.77-2.84-.75-1.46.02-2.8.85-3.55 2.16-1.51 2.62-.39 6.49 1.09 8.61.72 1.04 1.58 2.21 2.71 2.17 1.09-.04 1.5-.71 2.82-.71 1.31 0 1.68.71 2.82.69 1.17-.02 1.9-1.06 2.61-2.1.82-1.2 1.16-2.36 1.18-2.42-.03-.01-2.27-.87-2.29-3.46zm-2.14-6.75c.6-.73 1.01-1.74.9-2.75-.87.04-1.93.58-2.56 1.31-.56.65-1.05 1.69-.92 2.69.97.08 1.96-.49 2.58-1.25z" />
    </svg>
  );
}

type SocialAuthButtonsProps = {
  onSocialClick?: (provider: "google" | "apple") => void;
};

export function SocialAuthButtons({ onSocialClick }: SocialAuthButtonsProps) {
  return (
    <div className="grid gap-3">
      <button
        type="button"
        onClick={() => onSocialClick?.("google")}
        className="flex h-11 w-full items-center justify-center gap-3 rounded-full border border-border bg-white text-sm font-medium text-ink-900 transition hover:bg-cream-50 dark:border-ink-100"
      >
        <GoogleLogo />
        Continue with Google
      </button>
      <button
        type="button"
        onClick={() => onSocialClick?.("apple")}
        className="flex h-11 w-full items-center justify-center gap-3 rounded-full border border-ink-900 bg-ink-900 text-sm font-medium text-white transition hover:bg-ink-800 dark:border-transparent"
      >
        <AppleLogo />
        Continue with Apple
      </button>
    </div>
  );
}

export function AuthDivider() {
  return (
    <div className="relative py-2">
      <div className="absolute inset-0 flex items-center" aria-hidden>
        <span className="w-full border-t border-border dark:border-white/15" />
      </div>
      <p
        className={cn(
          "relative mx-auto w-fit bg-bg-elevated px-3 text-caption text-text-tertiary",
          "dark:bg-ink-800 dark:text-cream-200/70",
        )}
      >
        or continue with email
      </p>
    </div>
  );
}
