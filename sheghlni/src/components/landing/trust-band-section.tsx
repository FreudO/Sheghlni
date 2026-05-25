import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  CreditCard,
  ShieldCheck,
  Star,
} from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/landing/reveal";
import { IconWell } from "@/components/ui/icon-well";

const TRUST_ITEMS: {
  title: string;
  description: string;
  icon: LucideIcon;
  iconClassName: string;
}[] = [
  {
    title: "Verified IDs",
    description: "Every pro passes identity verification",
    icon: ShieldCheck,
    iconClassName: "text-sage-500",
  },
  {
    title: "Secure Payments",
    description: "Funds held in escrow until job completion",
    icon: CreditCard,
    iconClassName: "text-bronze-500",
  },
  {
    title: "Real Reviews",
    description: "From real customers who booked on Sheghlni",
    icon: Star,
    iconClassName: "text-gold-500",
  },
  {
    title: "Money-Back Guarantee",
    description: "Up to $1,000 coverage per booking",
    icon: BadgeCheck,
    iconClassName: "text-cream-100",
  },
];

function TrustItemCard({
  title,
  description,
  icon,
  iconClassName,
}: (typeof TRUST_ITEMS)[number]) {
  return (
    <article className="flex flex-col items-center rounded-2xl bg-white/5 px-4 py-5 text-center sm:py-6">
      <IconWell icon={icon} tone="dark" iconClassName={iconClassName} />
      <h3 className="mt-3 text-base font-semibold leading-tight text-cream-50 sm:font-display sm:text-[1.125rem] sm:font-medium md:text-h3">
        {title}
      </h3>
      <p className="mt-1 line-clamp-2 text-sm leading-snug text-cream-200/90 sm:line-clamp-none sm:text-body-sm">
        {description}
      </p>
    </article>
  );
}

export function TrustBandSection() {
  return (
    <section className="bg-ink-900 py-8 md:py-12 lg:py-16">
      <div className="mx-auto max-w-[1280px] px-4 md:px-6 lg:px-12">
        <Reveal>
          <div className="text-center">
            <h2 className="font-display text-[1.375rem] font-medium text-cream-50 md:text-h2">
              Book with confidence
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-cream-200/80">
              Every booking is protected by verification, secure payments, and real reviews.
            </p>
          </div>
        </Reveal>

        <RevealGroup className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:gap-6 lg:grid-cols-4 lg:gap-8">
          {TRUST_ITEMS.map((item) => (
            <RevealItem key={item.title} className="w-full">
              <TrustItemCard {...item} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
