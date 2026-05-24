export type DemoRole = "customer" | "pro";

const ROLE_KEY = "sheghlni-demo-role";
const DEMO_MODE_KEY = "sheghlni-demo-mode";

export function getDemoRole(): DemoRole {
  if (typeof window === "undefined") return "customer";
  return (localStorage.getItem(ROLE_KEY) as DemoRole | null) ?? "customer";
}

export function setDemoRole(role: DemoRole): void {
  localStorage.setItem(ROLE_KEY, role);
}

export function isDemoModeEnabled(): boolean {
  if (typeof window === "undefined") return false;
  if (process.env.NODE_ENV === "development") return true;
  if (sessionStorage.getItem(DEMO_MODE_KEY) === "true") return true;
  return new URLSearchParams(window.location.search).get("demo") === "true";
}

export function enableDemoModeFromUrl(): void {
  if (typeof window === "undefined") return;
  if (new URLSearchParams(window.location.search).get("demo") === "true") {
    sessionStorage.setItem(DEMO_MODE_KEY, "true");
  }
}

export function getRoleHomePath(role: DemoRole): string {
  return role === "pro" ? "/pro/dashboard/" : "/";
}
