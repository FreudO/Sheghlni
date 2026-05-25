import Link from "next/link";

export function SkipLink() {
  return (
    <Link
      href="#main-content"
      className="sr-only left-4 top-4 z-[100] rounded-lg bg-cta px-4 py-2 text-sm font-semibold text-white focus:not-sr-only focus:absolute focus:outline-none focus-visible:ring-2 focus-visible:ring-bronze-500 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
    >
      Skip to main content
    </Link>
  );
}
