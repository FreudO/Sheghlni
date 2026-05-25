import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  CreditCard,
  ShieldCheck,
  Star,
} from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/landing/reveal";
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
    iconClassName: "text-bronze-600",
  },
];

function TrustItemCard({
  title,
  description,
  icon,
  iconClassName,
}: (typeof TRUST_ITEMS)[number]) {
  return (
    <article className="flex flex-col items-center rounded-2xl border border-border bg-bg-elevated px-4 py-5 text-center shadow-sm sm:py-6">
      <IconWell icon={icon} tone="light" iconClassName={iconClassName} />
      <h3 className="mt-3 text-base font-semibold leading-tight text-text-primary sm:font-display sm:text-[1.125rem] sm:font-medium md:text-h3">
        {title}
      </h3>
      <p className="mt-1 line-clamp-2 text-sm leading-snug text-text-secondary sm:line-clamp-none sm:text-body-sm">
        {description}
      </p>
    </article>
  );
}

export function TrustBandSection() {
  return (
    <section className="border-t border-border bg-bg py-8 md:py-12 lg:py-16">
      <div className="mx-auto max-w-[1280px] px-4 md:px-6 lg:px-12">
        <RevealGroup className="flex flex-col gap-4 sm:gap-5">
          <RevealItem>
            <div className="text-center">
              <h2 className="font-display text-[1.375rem] font-medium text-text-primary md:text-h2">
                Book with confidence
              </h2>
              <p className="mx-auto mt-1.5 max-w-md text-sm text-text-secondary md:text-body-sm">
                Every booking is protected by verification, secure payments, and real reviews.
              </p>
            </div>
          </RevealItem>
          <RevealItem className="grid w-full grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4 lg:gap-8">
            {TRUST_ITEMS.map((item) => (
              <TrustItemCard key={item.title} {...item} />
            ))}
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}
