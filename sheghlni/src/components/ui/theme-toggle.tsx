"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { ICON_STROKE } from "@/components/ui/icon-well";
import { cn } from "@/lib/utils";

type ThemeToggleProps = {
  className?: string;
  variant?: "dark" | "light";
};

export function ThemeToggle({ className, variant = "light" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        "inline-flex size-icon shrink-0 items-center justify-center rounded-full border-0 transition ease-default duration-default",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1",
        variant === "dark"
          ? "text-cream-100 hover:bg-white/10 focus-visible:ring-white/30 focus-visible:ring-offset-ink-900"
          : "text-text-secondary hover:bg-bg-elevated-2 focus-visible:ring-cta/60 focus-visible:ring-offset-bg",
        className,
      )}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? (
        <Sun className="size-[1.125rem]" strokeWidth={ICON_STROKE} />
      ) : (
        <Moon className="size-[1.125rem]" strokeWidth={ICON_STROKE} />
      )}
    </button>
  );
}
