"use client";

import { Toaster as Sonner } from "sonner";

export function Toaster() {
  return (
    <Sonner
      position="bottom-center"
      richColors
      closeButton
      toastOptions={{
        classNames: {
          toast:
            "rounded-xl border border-border bg-bg-elevated text-text-primary shadow-lg",
          title: "text-sm font-medium",
          description: "text-sm text-text-secondary",
          success: "border-sage-500/30",
          error: "border-clay-500/30",
        },
      }}
      // Sonner renders aria-live region for announcements
    />
  );
}
