"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChevronDown, ChevronLeft, Search } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const WHEN_OPTIONS = [
  "Today",
  "This week",
  "Pick a date",
  "Flexible",
] as const;

const WHEN_CHOICES = [
  { value: "", label: "Any time" },
  ...WHEN_OPTIONS.map((option) => ({ value: option, label: option })),
] as const;

const TRENDING_CATEGORIES = [
  { label: "Cleaning", slug: "cleaning" },
  { label: "Painting", slug: "painting" },
  { label: "Dog Walking", slug: "dog-walking" },
  { label: "Photography", slug: "photography" },
] as const;

const MOBILE_STEPS = ["Service", "Where", "When"] as const;

/** Hero search bar is always cream-50 — use ink tokens, not theme text colors. */
const HERO_FIELD_LABEL = "text-caption text-ink-500";
const HERO_FIELD_INPUT =
  "border-0 bg-transparent text-body text-ink-900 outline-none placeholder:text-ink-400";
const HERO_DIVIDER = "border-ink-100";
const HERO_DROPDOWN_PANEL =
  "min-w-[11rem] rounded-xl border border-ink-100 bg-cream-50 p-1 shadow-xl [color-scheme:light]";
const HERO_DROPDOWN_ITEM =
  "rounded-lg px-3 py-2 text-sm text-ink-900 focus:bg-cream-100 data-[highlighted]:bg-cream-100";

function whenLabel(value: string): string {
  return WHEN_CHOICES.find((choice) => choice.value === value)?.label ?? "Any time";
}

type WhenFieldProps = {
  when: string;
  date: string;
  onWhenChange: (value: string) => void;
  onDateChange: (value: string) => void;
  variant?: "hero" | "sheet";
};

function WhenField({
  when,
  date,
  onWhenChange,
  onDateChange,
  variant = "hero",
}: WhenFieldProps) {
  const isHero = variant === "hero";

  return (
    <div className="flex flex-col gap-1">
      {isHero ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="flex w-full items-center justify-between gap-2 text-left text-body text-ink-900 outline-none focus-visible:ring-2 focus-visible:ring-cta/40 rounded-md"
            >
              <span className="truncate">{whenLabel(when)}</span>
              <ChevronDown className="size-4 shrink-0 text-ink-400" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className={HERO_DROPDOWN_PANEL}>
            {WHEN_CHOICES.map((choice) => (
              <DropdownMenuItem
                key={choice.value || "any-time"}
                onClick={() => onWhenChange(choice.value)}
                className={cn(
                  HERO_DROPDOWN_ITEM,
                  when === choice.value && "bg-cream-100 font-medium",
                )}
              >
                {choice.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger className="flex w-full items-center justify-between gap-2 rounded-xl border border-border bg-bg px-4 py-3 text-left text-body text-text-primary outline-none focus-visible:ring-2 focus-visible:ring-cta">
            <span className="truncate">{whenLabel(when)}</span>
            <ChevronDown className="size-4 shrink-0 text-text-tertiary" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="min-w-[var(--radix-dropdown-menu-trigger-width)]">
            {WHEN_CHOICES.map((choice) => (
              <DropdownMenuItem
                key={choice.value || "any-time"}
                onClick={() => onWhenChange(choice.value)}
                className={cn(when === choice.value && "font-medium")}
              >
                {choice.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      {when === "Pick a date" && (
        <input
          type="date"
          value={date}
          onChange={(event) => onDateChange(event.target.value)}
          className={cn(
            "rounded-lg border px-3 py-2 text-body outline-none focus-visible:ring-2 focus-visible:ring-cta",
            isHero
              ? "mt-1 border-ink-100 bg-white text-ink-900"
              : "border-border bg-bg text-text-primary",
          )}
        />
      )}
    </div>
  );
}

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
  layout?: "horizontal" | "stacked";
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
  layout = "horizontal",
}: SearchFieldsProps) {
  const isStacked = layout === "stacked";

  return (
    <div className={cn("flex min-w-0", isStacked ? "flex-col gap-4" : "min-w-0 flex-1 items-stretch overflow-hidden")}>
      <label
        className={cn(
          "flex min-w-0 flex-col gap-1",
          !isStacked && cn("min-w-0 flex-1 border-r px-4 py-3", HERO_DIVIDER),
        )}
      >
        <span className={HERO_FIELD_LABEL}>Service</span>
        <input
          value={service}
          onChange={(event) => onServiceChange(event.target.value)}
          placeholder="Try 'house cleaner'"
          className={HERO_FIELD_INPUT}
        />
      </label>
      <label
        className={cn(
          "flex min-w-0 flex-col gap-1",
          !isStacked && cn("min-w-0 flex-1 border-r px-4 py-3", HERO_DIVIDER),
        )}
      >
        <span className={HERO_FIELD_LABEL}>Where</span>
        <input
          value={city}
          onChange={(event) => onCityChange(event.target.value)}
          placeholder="Boston, MA"
          className={HERO_FIELD_INPUT}
        />
      </label>
      <div
        className={cn(
          "flex flex-col gap-1",
          !isStacked && "w-[9.5rem] shrink-0 px-4 py-3",
        )}
      >
        <span className={HERO_FIELD_LABEL}>When</span>
        <WhenField
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

function MobileSearchStep({
  step,
  service,
  city,
  when,
  date,
  onServiceChange,
  onCityChange,
  onWhenChange,
  onDateChange,
}: {
  step: number;
  service: string;
  city: string;
  when: string;
  date: string;
  onServiceChange: (value: string) => void;
  onCityChange: (value: string) => void;
  onWhenChange: (value: string) => void;
  onDateChange: (value: string) => void;
}) {
  if (step === 0) {
    return (
      <label className="flex flex-col gap-2">
        <span className="text-caption text-text-tertiary">What service do you need?</span>
        <input
          autoFocus
          value={service}
          onChange={(event) => onServiceChange(event.target.value)}
          placeholder="Try 'house cleaner'"
          className="rounded-xl border border-border bg-bg px-4 py-3 text-body text-text-primary outline-none focus-visible:ring-2 focus-visible:ring-cta"
        />
      </label>
    );
  }

  if (step === 1) {
    return (
      <label className="flex flex-col gap-2">
        <span className="text-caption text-text-tertiary">Where do you need it?</span>
        <input
          autoFocus
          value={city}
          onChange={(event) => onCityChange(event.target.value)}
          placeholder="Boston, MA"
          className="rounded-xl border border-border bg-bg px-4 py-3 text-body text-text-primary outline-none focus-visible:ring-2 focus-visible:ring-cta"
        />
      </label>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <span className="text-caption text-text-tertiary">When do you need it?</span>
      <WhenField
        when={when}
        date={date}
        onWhenChange={onWhenChange}
        onDateChange={onDateChange}
        variant="sheet"
      />
    </div>
  );
}

export function HeroSection() {
  const router = useRouter();
  const [service, setService] = useState("");
  const [city, setCity] = useState("Boston, MA");
  const [when, setWhen] = useState("");
  const [date, setDate] = useState("");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [mobileStep, setMobileStep] = useState(0);

  const resetMobileSearch = () => {
    setMobileStep(0);
  };

  const submitSearch = () => {
    router.push(buildSearchUrl(service, city, when, date));
    setSheetOpen(false);
    resetMobileSearch();
  };

  const handleSheetChange = (open: boolean) => {
    setSheetOpen(open);
    if (!open) resetMobileSearch();
  };

  return (
    <section className="relative flex min-h-[calc(100dvh-3.5rem)] flex-col items-center justify-center overflow-hidden bg-ink-900 px-6 pb-16 md:min-h-[calc(100dvh-4rem)] lg:px-12">
      <div className="hero-bg pointer-events-none absolute inset-0" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,rgba(255,255,255,0.05),transparent_35%)]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-col items-center text-center">
        <h1 className="max-w-3xl font-display text-[2.25rem] leading-[1.05] font-medium text-cream-50 md:text-display-xl">
          What do you need help with?
        </h1>
        <p className="mt-4 max-w-xl text-body-lg text-cream-50 [text-shadow:0_1px_3px_rgba(10,15,31,0.45)]">
          Connect with trusted local professionals.
        </p>

        <div className="mt-10 w-full max-w-[640px]">
          <div className="hidden md:block">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                submitSearch();
              }}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-cream-50 p-1.5 pl-2 text-ink-900 shadow-2xl [color-scheme:light]"
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
          </div>

          <div className="md:hidden">
              <Sheet open={sheetOpen} onOpenChange={handleSheetChange}>
                <SheetTrigger className="flex min-h-11 w-full items-center gap-3 rounded-full border border-white/10 bg-cream-50 px-5 py-3 text-left text-ink-500 shadow-xl [color-scheme:light]">
                  <Search className="size-icon-sm shrink-0 text-ink-400" />
                  <span className="text-body text-ink-400">
                    What do you need help with?
                  </span>
                </SheetTrigger>
                <SheetContent side="bottom" className="bg-bg">
                  <SheetHeader>
                    <SheetTitle>
                      {MOBILE_STEPS[mobileStep]} ({mobileStep + 1} of {MOBILE_STEPS.length})
                    </SheetTitle>
                  </SheetHeader>
                  <div className="mt-4 space-y-4">
                    <MobileSearchStep
                      step={mobileStep}
                      service={service}
                      city={city}
                      when={when}
                      date={date}
                      onServiceChange={setService}
                      onCityChange={setCity}
                      onWhenChange={setWhen}
                      onDateChange={setDate}
                    />
                    <div className="flex gap-2">
                      {mobileStep > 0 && (
                        <button
                          type="button"
                          onClick={() => setMobileStep((s) => s - 1)}
                          className="inline-flex h-11 flex-1 items-center justify-center gap-1 rounded-full border border-border text-sm font-medium text-text-primary"
                        >
                          <ChevronLeft className="size-4" />
                          Back
                        </button>
                      )}
                      {mobileStep < MOBILE_STEPS.length - 1 ? (
                        <button
                          type="button"
                          onClick={() => setMobileStep((s) => s + 1)}
                          className="inline-flex h-11 flex-1 items-center justify-center rounded-full bg-cta text-sm font-medium text-white hover:bg-cta-hover"
                        >
                          Continue
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={submitSearch}
                          className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-cta text-sm font-medium text-white hover:bg-cta-hover"
                        >
                          <Search className="size-icon-sm" />
                          Search
                        </button>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
        </div>

        <nav
          aria-label="Trending categories"
          className="mt-6 flex max-w-[640px] flex-wrap items-center justify-center text-body-sm"
        >
          {TRENDING_CATEGORIES.map((category, index) => (
            <span key={category.slug} className="inline-flex items-center">
              {index > 0 && (
                <span className="mx-2 text-cream-200/50" aria-hidden>
                  ·
                </span>
              )}
              <Link
                href={`/search/?category=${category.slug}`}
                className="inline-flex min-h-11 items-center rounded-md px-1 text-cream-100 underline-offset-4 transition ease-default duration-default hover:text-cream-50 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                {category.label}
              </Link>
            </span>
          ))}
        </nav>
      </div>
    </section>
  );
}

