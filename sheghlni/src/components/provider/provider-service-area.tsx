import type { Provider } from "@/lib/mock";
import { formatProviderLocation } from "@/lib/mock";

type ProviderServiceAreaProps = {
  provider: Provider;
};

function StreetGrid() {
  const lines: React.ReactNode[] = [];
  for (let i = 0; i <= 8; i += 1) {
    const pos = 12 + i * 9;
    lines.push(
      <line key={`v-${i}`} x1={`${pos}%`} y1="0%" x2={`${pos}%`} y2="100%" stroke="currentColor" strokeWidth="0.5" opacity="0.35" />,
      <line key={`h-${i}`} x1="0%" y1={`${pos}%`} x2="100%" y2={`${pos}%`} stroke="currentColor" strokeWidth="0.5" opacity="0.35" />,
    );
  }
  return (
    <svg className="absolute inset-0 size-full text-black/10 dark:text-white/10" preserveAspectRatio="none" aria-hidden>
      {lines}
    </svg>
  );
}

export function ProviderServiceArea({ provider }: ProviderServiceAreaProps) {
  const location = formatProviderLocation(provider);

  return (
    <section className="mt-12 border-t border-border pt-10">
      <h2 className="font-display text-h2 text-text-primary">Service area</h2>
      <p className="mt-2 text-body-sm text-text-secondary">
        Serves {location} and surrounding areas within {Math.round(provider.serviceRadiusKm * 0.621)} mi
      </p>
      <div className="relative mt-6 h-64 overflow-hidden rounded-2xl bg-[#E8E0D5] dark:bg-[#1A1F35]">
        <StreetGrid />
        <div className="absolute left-1/2 top-1/2 size-40 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-bronze-500/70 bg-bronze-500/10" />
        <div className="absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-bronze-500" />
        <p className="absolute bottom-4 left-4 rounded-full bg-bg/90 px-3 py-1 text-sm font-medium text-text-primary shadow">
          {location}
        </p>
      </div>
    </section>
  );
}

