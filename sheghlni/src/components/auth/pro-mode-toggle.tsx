"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getIsProMode,
  setIsProMode,
  subscribeProMode,
} from "@/lib/auth/pro-mode-store";
import { cn } from "@/lib/utils";

export function ProModeToggle({ className }: { className?: string }) {
  const router = useRouter();
  const [isPro, setIsPro] = useState(false);

  useEffect(() => {
    setIsPro(getIsProMode());
    return subscribeProMode(() => setIsPro(getIsProMode()));
  }, []);

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isPro}
      aria-label="Switch to Pro view"
      onClick={() => {
        const next = !isPro;
        setIsProMode(next);
        if (next) {
          router.push("/pro/");
        } else {
          router.push("/");
        }
      }}
      className={cn(
        "inline-flex h-8 items-center gap-2 rounded-full border px-3 text-xs font-medium transition",
        isPro
          ? "border-bronze-500/40 bg-bronze-500/10 text-bronze-600"
          : "border-border bg-bg-elevated text-text-secondary hover:border-bronze-500/30",
        className,
      )}
    >
      <span
        className={cn(
          "relative size-4 shrink-0 rounded-full transition",
          isPro ? "bg-bronze-500" : "bg-ink-300",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 size-3 rounded-full bg-white shadow transition",
            isPro ? "left-[calc(100%-0.875rem)]" : "left-0.5",
          )}
        />
      </span>
      Pro view
    </button>
  );
}
