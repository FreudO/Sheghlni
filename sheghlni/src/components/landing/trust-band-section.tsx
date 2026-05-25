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
        <RevealGroup className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
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
