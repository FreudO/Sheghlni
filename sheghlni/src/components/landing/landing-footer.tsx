import Link from "next/link";
import { SheghlniLogo } from "@/components/layout/sheghlni-logo";
import { getTopLevelCategories } from "@/lib/mock";

const COMPANY_LINKS = [
  { label: "About", href: "/about/" },
  { label: "Blog", href: "/blog/" },
  { label: "Careers", href: "/careers/" },
  { label: "Press", href: "/press/" },
  { label: "Trust & Safety", href: "/trust/" },
  { label: "Help Center", href: "/help/" },
];

const LEGAL_LINKS = [
  { label: "Terms of Service", href: "/legal/terms/" },
  { label: "Privacy Policy", href: "/legal/privacy/" },
  { label: "Cookie Policy", href: "/legal/cookies/" },
  { label: "Do not sell my info", href: "/legal/do-not-sell/" },
];

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M6.5 8.5h3v9h-3v-9zm1.5-4.5a1.75 1.75 0 1 1 0 3.5 1.75 1.75 0 0 1 0-3.5zM10.5 8.5h2.9v1.2h.04c.4-.75 1.38-1.55 2.84-1.55 3.04 0 3.6 2 3.6 4.6v4.75h-3v-4.2c0-1-.02-2.3-1.4-2.3-1.42 0-1.64 1.1-1.64 2.24v4.26h-3V8.5z" />
    </svg>
  );
}

function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function AppStoreBadge(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 120 40" aria-hidden {...props}>
      <rect width="120" height="40" rx="6" fill="#000" />
      <path
        fill="#fff"
        d="M24.8 20.2c-.03-2.9 2.4-4.3 2.5-4.4-1.4-2-3.5-2.3-4.2-2.3-1.8-.2-3.5 1.1-4.4 1.1-.9 0-2.3-1-3.8-1-1.9 0-3.7 1.1-4.7 2.8-2 3.5-1.7 8.7 1.4 11.5.9 1 2 2.1 3.5 2.1 1.4-.1 1.9-.9 3.6-.9 1.7 0 2.2.9 3.6.9 1.5 0 2.4-1 3.3-2 1-1.5 1.5-3 1.5-3.1-.1 0-3-1.2-3-4.7zm-2.8-8.6c.8-1 1.3-2.3 1.2-3.7-1.2.1-2.6.7-3.4 1.6-.7.8-1.4 2.1-1.2 3.4 1.3.1 2.6-.6 3.4-1.3z"
      />
      <text
        x="44"
        y="15"
        fill="#fff"
        fontFamily="system-ui, sans-serif"
        fontSize="8"
        fontWeight="400"
      >
        Download on the
      </text>
      <text
        x="44"
        y="28"
        fill="#fff"
        fontFamily="system-ui, sans-serif"
        fontSize="13"
        fontWeight="600"
      >
        App Store
      </text>
    </svg>
  );
}

function GooglePlayBadge(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 135 40" aria-hidden {...props}>
      <rect width="135" height="40" rx="6" fill="#000" />
      <path fill="#00D7FF" d="M9.5 8.2 22.8 20 9.5 31.8V8.2z" />
      <path fill="#FFD300" d="M9.5 8.2 22.8 20l8.2-4.6L9.5 8.2z" />
      <path fill="#FF3A44" d="M9.5 31.8 22.8 20l8.2 4.6-21.5 7.2z" />
      <path fill="#00F076" d="M30.9 15.4 22.8 20l8.1 4.6 5.8-3.3-5.8-5.9z" />
      <text
        x="44"
        y="14"
        fill="#fff"
        fontFamily="system-ui, sans-serif"
        fontSize="7.5"
        fontWeight="400"
      >
        GET IT ON
      </text>
      <text
        x="44"
        y="28"
        fill="#fff"
        fontFamily="system-ui, sans-serif"
        fontSize="13"
        fontWeight="600"
      >
        Google Play
      </text>
    </svg>
  );
}

export function LandingFooter() {
  const categories = getTopLevelCategories().slice(0, 8);

  return (
    <footer className="bg-ink-900 pb-8 pt-12 text-cream-100">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <SheghlniLogo variant="dark" />
              <p className="mt-4 max-w-xs text-body-sm text-cream-200">
                Hire a skilled human as fast as hiring a ride.
              </p>
              <div className="mt-5 flex items-center gap-3">
                  <a
                    href="https://instagram.com"
                    aria-label="Instagram"
                    className="inline-flex size-icon items-center justify-center rounded-full text-cream-100 transition ease-default duration-default hover:bg-white/10"
                  >
                    <InstagramIcon className="size-icon-sm" />
                  </a>
                  <a
                    href="https://twitter.com"
                    aria-label="Twitter"
                    className="inline-flex size-icon items-center justify-center rounded-full text-cream-100 transition ease-default duration-default hover:bg-white/10"
                  >
                    <TwitterIcon className="size-icon-sm" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    aria-label="LinkedIn"
                    className="inline-flex size-icon items-center justify-center rounded-full text-cream-100 transition ease-default duration-default hover:bg-white/10"
                  >
                    <LinkedinIcon className="size-icon-sm" />
                  </a>
              </div>
            </div>

            <div>
              <h3 className="text-caption uppercase tracking-wide text-cream-200">
                Services
              </h3>
              <ul className="mt-4 space-y-2">
                {categories.map((category) => (
                  <li key={category.id}>
                    <Link
                      href={`/search/?category=${category.slug}`}
                      className="text-body-sm text-cream-100 transition ease-default duration-default hover:text-white"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-caption uppercase tracking-wide text-cream-200">
                Company
              </h3>
              <ul className="mt-4 space-y-2">
                {COMPANY_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-body-sm text-cream-100 transition ease-default duration-default hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-caption uppercase tracking-wide text-cream-200">
                Legal
              </h3>
              <ul className="mt-4 space-y-2">
                {LEGAL_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-body-sm text-cream-100 transition ease-default duration-default hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-body-sm text-cream-200">
            © 2025 Sheghlni Inc. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#"
              aria-label="Download on the App Store"
              className="inline-block transition ease-default duration-default hover:opacity-90"
            >
              <AppStoreBadge className="h-10 w-auto" />
            </a>
            <a
              href="#"
              aria-label="Get it on Google Play"
              className="inline-block transition ease-default duration-default hover:opacity-90"
            >
              <GooglePlayBadge className="h-10 w-auto" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

