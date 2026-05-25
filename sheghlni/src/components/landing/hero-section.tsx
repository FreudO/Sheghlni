"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";
import { WhenPicker } from "@/components/landing/when-picker";
import { cn } from "@/lib/utils";

const TRENDING_CATEGORIES = [
  { label: "Cleaning", slug: "cleaning" },
  { label: "Painting", slug: "painting" },
  { label: "Dog Walking", slug: "dog-walking" },
  { label: "Photography", slug: "photography" },
] as const;

/** Hero search bar is always cream-50 — use ink tokens, not theme text colors. */
const HERO_FIELD_LABEL = "text-caption text-ink-500";
const HERO_FIELD_INPUT =
  "border-0 bg-transparent text-body text-ink-900 outline-none placeholder:text-ink-400";

const MOBILE_INPUT =
  "h-14 w-full rounded-2xl border border-ink-100 bg-cream-50 px-4 text-[0.9375rem] text-ink-900 outline-none placeholder:text-ink-400 focus-visible:ring-2 focus-visible:ring-cta/40 [color-scheme:light]";

function buildSearchUrl(service: string, city: string, when: string, date: string) {
  const params = new URLSearchParams();
  if (service.trim()) params.set("q", service.trim());
  if (city.trim()) params.set("city", city.trim());
  if (when) params.set("when", when);
  if (when === "Pick a date" && date) params.set("date", date);
  const query = params.toString();
  return query ? `/search/?${query}` : "/search/";
}

type SearchFieldsProps = {
  service: string;
  city: string;
  when: string;
  date: string;
  onServiceChange: (value: string) => void;
  onCityChange: (value: string) => void;
  onWhenChange: (value: string) => void;
  onDateChange: (value: string) => void;
};

function SearchFields({
  service,
  city,
  when,
  date,
  onServiceChange,
  onCityChange,
  onWhenChange,
  onDateChange,
}: SearchFieldsProps) {
  return (
    <div className="flex min-w-0 flex-1 items-center overflow-hidden">
      <label className="flex min-w-0 flex-1 flex-col gap-1 border-r px-4 py-3 border-ink-100">
        <span className={HERO_FIELD_LABEL}>Service</span>
        <input
          value={service}
          onChange={(event) => onServiceChange(event.target.value)}
          placeholder="Try 'house cleaner'"
          className={HERO_FIELD_INPUT}
        />
      </label>
      <label className="flex min-w-0 flex-1 flex-col gap-1 border-r px-4 py-3 border-ink-100">
        <span className={HERO_FIELD_LABEL}>Where</span>
        <input
          value={city}
          onChange={(event) => onCityChange(event.target.value)}
          placeholder="Boston, MA"
          className={HERO_FIELD_INPUT}
        />
      </label>
      <div className="flex w-[10.5rem] shrink-0 flex-col justify-center gap-1 px-4 py-3">
        <span className={HERO_FIELD_LABEL}>When</span>
        <WhenPicker
          when={when}
          date={date}
          onWhenChange={onWhenChange}
          onDateChange={onDateChange}
          variant="hero"
        />
      </div>
    </div>
  );
}

export function HeroSection() {
  const router = useRouter();
  const [service, setService] = useState("");
  const [city, setCity] = useState("Boston, MA");
  const [when, setWhen] = useState("");
  const [date, setDate] = useState("");
  const [showWhen, setShowWhen] = useState(false);

  const submitSearch = (event?: React.FormEvent) => {
    event?.preventDefault();
    router.push(buildSearchUrl(service, city, when, date));
  };

  return (
    <section className="relative flex min-h-[calc(100dvh-3.5rem)] flex-col items-center justify-center overflow-hidden bg-ink-900 px-4 pb-12 md:min-h-[calc(100dvh-4rem)] md:px-6 md:pb-16 lg:px-12">
      <div className="hero-bg pointer-events-none absolute inset-0" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,rgba(255,255,255,0.05),transparent_35%)]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-col items-center text-center">
        <h1 className="max-w-3xl font-display text-[clamp(2rem,8vw,4rem)] leading-[1.05] font-medium text-cream-50 md:text-display-xl">
          What do you need help with?
        </h1>
        <p className="mt-4 max-w-xl text-[0.9375rem] text-cream-50 md:text-body-lg [text-shadow:0_1px_3px_rgba(10,15,31,0.45)]">
          Connect with trusted local professionals.
        </p>

        <div className="mt-8 w-full max-w-[640px] md:mt-10">
          <form
            onSubmit={submitSearch}
            className="hidden md:flex md:items-center md:gap-2 md:rounded-full md:border md:border-white/10 md:bg-cream-50 md:p-1.5 md:pl-2 md:text-ink-900 md:shadow-2xl md:[color-scheme:light]"
          >
            <SearchFields
              service={service}
              city={city}
              when={when}
              date={date}
              onServiceChange={setService}
              onCityChange={setCity}
              onWhenChange={setWhen}
              onDateChange={setDate}
            />
            <button
              type="submit"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cta text-white transition ease-default duration-default hover:bg-cta-hover"
              aria-label="Search"
            >
              <Search className="h-5 w-5" strokeWidth={2.25} />
            </button>
          </form>

          <form
            onSubmit={submitSearch}
            className="flex flex-col gap-3 md:hidden [color-scheme:light]"
          >
            <label className="flex flex-col gap-1.5 text-left">
              <span className="text-caption font-medium text-cream-200">
                What service?
              </span>
              <div className="relative">
                <Search
                  className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-ink-400"
                  aria-hidden
                />
                <input
                  value={service}
                  onChange={(event) => setService(event.target.value)}
                  onFocus={() => setShowWhen(true)}
                  placeholder="Try 'house cleaner'"
                  className={cn(MOBILE_INPUT, "pl-12")}
                />
              </div>
            </label>

            <label className="flex flex-col gap-1.5 text-left">
              <span className="text-caption font-medium text-cream-200">Where?</span>
              <input
                value={city}
                onChange={(event) => setCity(event.target.value)}
                placeholder="Boston, MA"
                className={MOBILE_INPUT}
              />
            </label>

            {showWhen && (
              <div className="flex flex-col gap-1.5 text-left">
                <span className="text-caption font-medium text-cream-200">When?</span>
                <div className="rounded-2xl border border-ink-100 bg-cream-50 px-4 py-3">
                  <WhenPicker
                    when={when}
                    date={date}
                    onWhenChange={setWhen}
                    onDateChange={setDate}
                    variant="sheet"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="mt-1 inline-flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-cta text-base font-semibold text-white transition ease-default duration-default hover:bg-cta-hover"
            >
              <Search className="size-5" strokeWidth={2.25} />
              Search
            </button>
          </form>
        </div>

        <nav
          aria-label="Trending categories"
          className="mt-6 flex w-full max-w-[640px] gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] md:mt-6 md:flex-wrap md:justify-center md:overflow-visible md:pb-0 [&::-webkit-scrollbar]:hidden"
        >
          {TRENDING_CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              href={`/search/?category=${category.slug}`}
              className="inline-flex min-h-11 shrink-0 items-center rounded-full border border-white/15 bg-white/5 px-4 text-sm text-cream-100 transition ease-default duration-default hover:border-white/30 hover:bg-white/10 hover:text-cream-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              {category.label}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
