import Link from "next/link";
import { Reveal } from "@/components/landing/reveal";

export function BecomeProCtaSection() {
  return (
    <section className="border-t border-cream-200 bg-cream-100 py-8 md:py-14 lg:py-16">
      <div className="mx-auto max-w-[1280px] px-4 text-center md:px-6 lg:px-12">
        <Reveal>
          <p className="text-caption font-semibold uppercase tracking-wider text-bronze-600">
            For service professionals
          </p>
          <h2 className="mt-3 font-display text-[1.375rem] font-medium text-ink-900 md:text-display-lg">
            Turn your skills into income.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-ink-500 md:text-body-lg">
            Join 10,000+ pros earning on Sheghlni. Set your own rates. Keep 88%+
            of every booking.
          </p>
          <Link
            href="/become-a-pro/"
            className="mt-8 inline-flex h-12 min-h-11 items-center justify-center rounded-full bg-cta px-8 text-sm font-semibold text-white transition ease-default duration-default hover:bg-cta-hover"
          >
            Start earning today →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
