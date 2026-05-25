import Link from "next/link";
import { Reveal } from "@/components/landing/reveal";

export function BecomeProCtaSection() {
  return (
    <section className="bg-gradient-to-r from-bronze-600 to-bronze-500 py-8 md:py-14 lg:py-16">
      <div className="mx-auto max-w-[1280px] px-4 text-center md:px-6 lg:px-12">
        <Reveal>
          <h2 className="font-display text-[1.375rem] font-medium text-white md:text-display-lg">
            Turn your skills into income.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[0.9375rem] text-white/90 md:text-body-lg">
            Join 10,000+ pros earning on Sheghlni. Set your own rates. Keep 88%+
            of every booking.
          </p>
          <Link
            href="/become-a-pro/"
            className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-white px-8 text-sm font-semibold text-ink-900 transition ease-default duration-default hover:bg-cream-100"
          >
            Start earning today →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
