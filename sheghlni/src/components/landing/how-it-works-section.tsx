import { Reveal, RevealGroup, RevealItem } from "@/components/landing/reveal";

const STEPS = [
  {
    step: "1",
    title: "Search",
    description:
      "Browse profiles, photos, and real reviews from people in your city.",
    icon: (
      <svg viewBox="0 0 64 64" aria-hidden>
        <circle cx="28" cy="28" r="14" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <line x1="38" y1="38" x2="52" y2="52" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    step: "2",
    title: "Message",
    description:
      "Contact a pro for free. Get a custom quote for your job.",
    icon: (
      <svg viewBox="0 0 64 64" aria-hidden>
        <rect x="8" y="14" width="48" height="32" rx="8" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <path d="M8 20 L32 34 L56 20" fill="none" stroke="currentColor" strokeWidth="2.5" />
      </svg>
    ),
  },
  {
    step: "3",
    title: "Book & Pay",
    description:
      "Pay securely on-platform. Funds held until the job is done.",
    icon: (
      <svg viewBox="0 0 64 64" aria-hidden>
        <rect x="10" y="12" width="44" height="40" rx="6" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <line x1="10" y1="24" x2="54" y2="24" stroke="currentColor" strokeWidth="2.5" />
        <rect x="18" y="32" width="8" height="8" rx="1" fill="currentColor" />
      </svg>
    ),
  },
];

export function HowItWorksSection() {
  return (
    <section className="bg-bg-elevated py-8 md:py-12 lg:py-16">
      <div className="mx-auto max-w-[1280px] px-4 md:px-6 lg:px-12">
        <Reveal>
          <h2 className="font-display text-[1.375rem] font-medium text-text-primary md:text-h2">
            How it works
          </h2>
        </Reveal>

        {/* Mobile: compact horizontal rows, 8px apart */}
        <RevealGroup className="mt-6 flex flex-col gap-2 md:hidden">
          {STEPS.map((item) => (
            <RevealItem key={item.step} className="w-full">
              <article className="flex flex-row items-center gap-4 rounded-2xl bg-cream-100 px-4 py-5">
                <div className="flex w-12 shrink-0 flex-col items-center justify-center gap-1">
                  <p className="text-[0.75rem] font-semibold leading-none text-bronze-500">
                    {item.step}
                  </p>
                  <div className="text-text-secondary [&_svg]:size-6">
                    {item.icon}
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-semibold leading-tight text-ink-900">
                    {item.title}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-sm leading-snug text-ink-500">
                    {item.description}
                  </p>
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* Desktop: original vertical cards */}
        <RevealGroup className="mt-10 hidden gap-6 md:grid md:grid-cols-3">
          {STEPS.map((item) => (
            <RevealItem key={item.step} className="w-full">
              <article className="rounded-2xl border border-border bg-bg p-6">
                <p className="font-display text-display-lg text-bronze-500">
                  {item.step}
                </p>
                <div className="mt-4 text-text-secondary [&_svg]:size-14">
                  {item.icon}
                </div>
                <h3 className="mt-4 font-display text-h3 text-text-primary">
                  {item.title}
                </h3>
                <p className="mt-2 text-body text-text-secondary">
                  {item.description}
                </p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
