import type { Provider } from "@/lib/mock";

export type MapPin = {
  providerId: string;
  x: number;
  y: number;
  initials: string;
};

function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

export function getMapPins(providers: Provider[]): MapPin[] {
  return providers.map((provider, index) => {
    const hash = hashString(provider.id);
    const angle = (hash % 360) * (Math.PI / 180);
    const radius = 12 + (hash % 28);
    const baseX = 50 + Math.cos(angle + index * 0.35) * radius;
    const baseY = 50 + Math.sin(angle + index * 0.35) * radius;

    return {
      providerId: provider.id,
      x: Math.min(92, Math.max(8, baseX)),
      y: Math.min(88, Math.max(12, baseY)),
      initials: getInitials(provider.businessName),
    };
  });
}
