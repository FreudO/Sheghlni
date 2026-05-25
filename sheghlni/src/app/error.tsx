"use client";

import { useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const reference = useMemo(
    () => error.digest ?? `ERR-${Date.now().toString(36).toUpperCase()}`,
    [error.digest],
  );

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
      <h1 className="font-display text-h2 text-text-primary md:text-h1">
        Something on our end glitched.
      </h1>
      <p className="mt-3 max-w-md text-body text-text-secondary">
        We&apos;ve been notified and are looking into it. Try again in a moment.
      </p>
      <p className="mt-4 font-mono text-caption text-ink-300">
        Reference: {reference}
      </p>
      <Button
        type="button"
        className="mt-8 rounded-full bg-cta px-8 text-white hover:bg-cta-hover"
        onClick={() => reset()}
      >
        Try again
      </Button>
    </div>
  );
}
