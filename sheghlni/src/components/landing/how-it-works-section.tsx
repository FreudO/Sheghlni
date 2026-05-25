import type { LucideIcon } from "lucide-react";
import { CreditCard, MessageSquare, Search } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/landing/reveal";
import { cn } from "@/lib/utils";
import { ICON_STROKE, IconWell } from "@/components/ui/icon-well";

const STEPS: {
  step: string;
  title: string;
  description: string;
  icon: LucideIcon;
  iconClassName: string;
}[] = [
  {
    step: "1",
    title: "Search",
    description:
      "Browse profiles, photos, and real reviews from people in your city.",
    icon: Search,
    iconClassName: "text-bronze-500",
  },
  {
    step: "2",
    title: "Message",
    description:
      "Contact a pro for free. Get a custom quote for your job.",
    icon: MessageSquare,
    iconClassName: "text-sage-500",
  },
  {
    step: "3",
    title: "Book & Pay",
    description:
      "Pay securely on-platform. Funds held until the job is done.",
    icon: CreditCard,
    iconClassName: "text-gold-500",
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

        <RevealGroup className="mt-6 flex flex-col gap-2 md:hidden">
          {STEPS.map((item) => (
            <RevealItem key={item.step} className="w-full">
              <article className="flex flex-row items-center gap-4 rounded-2xl bg-cream-100 px-4 py-5">
                <div className="flex w-12 shrink-0 flex-col items-center justify-center gap-1">
                  <p className="text-[0.75rem] font-semibold leading-none text-bronze-500">
                    {item.step}
                  </p>
                  <IconWell
                    icon={item.icon}
                    size="sm"
                    iconClassName={item.iconClassName}
                  />
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

        <RevealGroup className="mt-10 hidden gap-6 md:grid md:grid-cols-3">
          {STEPS.map((item) => (
            <RevealItem key={item.step} className="w-full">
              <article className="rounded-2xl border border-border bg-bg p-6">
                <p className="font-display text-display-lg text-bronze-500">
                  {item.step}
                </p>
                <div className="mt-4">
                  <item.icon
                    className={cn("size-14", item.iconClassName)}
                    strokeWidth={ICON_STROKE}
                    aria-hidden
                  />
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
