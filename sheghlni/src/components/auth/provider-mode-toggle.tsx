"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getIsProMode,
  setIsProMode,
  subscribeProMode,
} from "@/lib/auth/pro-mode-store";
import { cn } from "@/lib/utils";

type ProviderModeToggleProps = {
  className?: string;
  variant?: "dark" | "light";
};

export function ProviderModeToggle({
  className,
  variant = "light",
}: ProviderModeToggleProps) {
  const router = useRouter();
  const [isProvider, setIsProvider] = useState(false);
  const isDark = variant === "dark";

  useEffect(() => {
    setIsProvider(getIsProMode());
    return subscribeProMode(() => setIsProvider(getIsProMode()));
  }, []);

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isProvider}
      aria-label={
        isProvider
          ? "Exit provider view"
          : "Switch to provider view (manage your business)"
      }
      onClick={() => {
        const next = !isProvider;
        setIsProMode(next);
        router.push(next ? "/pro/" : "/");
      }}
      className={cn(
        "inline-flex h-8 items-center gap-2 rounded-full border px-3.5 text-xs font-semibold transition ease-default duration-default",
        isProvider
          ? "border-bronze-600 bg-cta text-white shadow-sm hover:bg-cta-hover"
          : isDark
            ? "border-white/25 bg-white/10 text-cream-100 hover:border-white/40 hover:bg-white/15"
            : "border-border bg-bg-elevated text-text-secondary hover:border-bronze-500/30 hover:bg-bg",
        className,
      )}
    >
      <span
        className={cn(
          "relative size-4 shrink-0 rounded-full transition",
          isProvider ? "bg-white/35" : isDark ? "bg-white/25" : "bg-ink-300",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 size-3 rounded-full bg-white shadow transition",
            isProvider ? "left-[calc(100%-0.875rem)]" : "left-0.5",
          )}
        />
      </span>
      Provider view
    </button>
  );
}

/** @deprecated Use ProviderModeToggle */
export const ProModeToggle = ProviderModeToggle;
