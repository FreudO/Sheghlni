"use client";

import { useEffect, useState } from "react";
import { DEMO_LOADING_MS } from "@/lib/motion";

export function useDelayedReady(delayMs = DEMO_LOADING_MS): boolean {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), delayMs);
    return () => window.clearTimeout(timer);
  }, [delayMs]);

  return ready;
}
