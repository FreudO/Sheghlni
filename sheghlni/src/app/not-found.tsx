import Link from "next/link";
import { CompassIllustration } from "@/components/errors/compass-illustration";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
      <CompassIllustration className="size-28 text-bronze-500 md:size-32" />
      <h1 className="mt-8 font-display text-h2 text-text-primary md:text-h1">
        That page wandered off.
      </h1>
      <p className="mt-3 max-w-md text-body text-text-secondary">
        The link may be broken or the page may have moved. Let&apos;s get you back
        on track.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex h-11 items-center justify-center rounded-full bg-cta px-6 text-sm font-semibold text-white transition hover:bg-cta-hover"
        >
          Go home
        </Link>
        <Link
          href="/search/"
          className="inline-flex h-11 items-center justify-center rounded-full border border-border bg-bg-elevated px-6 text-sm font-semibold text-text-primary transition hover:border-bronze-500/40"
        >
          Search for pros
        </Link>
      </div>
    </div>
  );
}
