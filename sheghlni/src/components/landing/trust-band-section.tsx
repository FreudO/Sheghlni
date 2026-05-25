import { RevealGroup, RevealItem } from "@/components/landing/reveal";

const TRUST_ITEMS = [
  {
    emoji: "🛡️",
    title: "Verified IDs",
    description: "Every pro passes identity verification",
  },
  {
    emoji: "💳",
    title: "Secure Payments",
    description: "Funds held in escrow until job completion",
  },
  {
    emoji: "⭐",
    title: "Real Reviews",
    description: "From real customers who booked on Sheghlni",
  },
  {
    emoji: "🔒",
    title: "Money-Back Guarantee",
    description: "Up to $1,000 coverage per booking",
  },
];

export function TrustBandSection() {
  return (
    <section className="bg-ink-900 py-8 md:py-12 lg:py-16">
      <div className="mx-auto max-w-[1280px] px-4 md:px-6 lg:px-12">
        {/* Mobile: compact horizontal rows */}
        <RevealGroup className="flex flex-col gap-2 sm:hidden">
          {TRUST_ITEMS.map((item) => (
            <RevealItem key={item.title} className="w-full">
              <div className="flex flex-row items-center gap-4 rounded-2xl bg-white/5 px-4 py-4">
                <div className="flex w-12 shrink-0 items-center justify-center">
                  <span className="text-2xl leading-none" aria-hidden>
                    {item.emoji}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-semibold leading-tight text-cream-50">
                    {item.title}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-sm leading-snug text-cream-200/90">
                    {item.description}
                  </p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* sm+: centered grid */}
        <RevealGroup className="hidden gap-8 sm:grid sm:grid-cols-2 lg:grid-cols-4">
          {TRUST_ITEMS.map((item) => (
            <RevealItem key={item.title}>
              <div className="text-center">
                <div className="text-3xl" aria-hidden>
                  {item.emoji}
                </div>
                <h3 className="mt-3 font-display text-[1.125rem] font-medium text-cream-50 md:text-h3">
                  {item.title}
                </h3>
                <p className="mt-2 text-body-sm text-cream-200">
                  {item.description}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
