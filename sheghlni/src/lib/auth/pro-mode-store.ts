const STORAGE_KEY = "sheghlni-pro-mode";

const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((listener) => listener());
}

export function getIsProMode(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(STORAGE_KEY) === "true";
}

export function setIsProMode(enabled: boolean): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, enabled ? "true" : "false");
  notify();
}

export function toggleProMode(): boolean {
  const next = !getIsProMode();
  setIsProMode(next);
  return next;
}

export function subscribeProMode(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
