"use client";

import Link from "next/link";
import { Fragment, useState } from "react";
import { Check, Upload, X } from "lucide-react";
import { ProOnboardingStepper } from "@/components/pro/onboarding/pro-onboarding-stepper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  topLevelCategories,
  DEMO_PRO_HANDLE,
  type OnboardingStepIndex,
} from "@/lib/mock/pro-data";
import { categories } from "@/lib/mock/categories-data";
import { setIsProMode } from "@/lib/auth/pro-mode-store";
import { ICON_STROKE } from "@/components/ui/icon-well";
import { cn } from "@/lib/utils";

const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const TIME_SLOTS = [
  { id: "8-11", label: "8am–11am" },
  { id: "11-14", label: "11am–2pm" },
  { id: "14-17", label: "2pm–5pm" },
  { id: "17-20", label: "5pm–8pm" },
  { id: "20-22", label: "8pm–10pm" },
] as const;

const COMMON_LANGUAGES = [
  "English",
  "Spanish",
  "French",
  "German",
  "Portuguese",
  "Mandarin",
  "Cantonese",
  "Arabic",
  "Hindi",
  "Italian",
  "Korean",
  "Japanese",
  "Vietnamese",
  "Tagalog",
  "Russian",
];

const MIN_BIO_LENGTH = 10;

export function OnboardingWizard() {
  const [step, setStep] = useState<OnboardingStepIndex>(0);
  const [categoriesSelected, setCategoriesSelected] = useState<string[]>([
    "creative-media",
  ]);
  const [city, setCity] = useState("Los Angeles");
  const [region, setRegion] = useState("CA");
  const [radius, setRadius] = useState(40);
  const [pricingModel, setPricingModel] = useState("project");
  const [services, setServices] = useState([
    { name: "Wedding Day Coverage", unit: "project", min: 2500, max: 4500 },
  ]);
  const [availability, setAvailability] = useState<Record<string, boolean>>({});
  const [photoCount, setPhotoCount] = useState(0);
  const [headline, setHeadline] = useState("");
  const [bio, setBio] = useState("");
  const [languages, setLanguages] = useState(["English"]);
  const [languagePick, setLanguagePick] = useState("");
  const [customLanguage, setCustomLanguage] = useState("");
  const [years, setYears] = useState(6);
  const [verifyState, setVerifyState] = useState<"idle" | "loading" | "done">(
    "idle",
  );
  const [payoutState, setPayoutState] = useState<"idle" | "loading" | "done">(
    "idle",
  );
  const [published, setPublished] = useState(false);

  const selectedParentIds = topLevelCategories
    .filter((t) => categoriesSelected.includes(t.slug))
    .map((t) => t.id);
  const subcategories = categories.filter(
    (c) => c.parentId && selectedParentIds.includes(c.parentId),
  );

  const addLanguage = (lang: string) => {
    const trimmed = lang.trim();
    if (!trimmed) return;
    setLanguages((prev) =>
      prev.some((l) => l.toLowerCase() === trimmed.toLowerCase())
        ? prev
        : [...prev, trimmed],
    );
    setLanguagePick("");
    setCustomLanguage("");
  };

  const removeLanguage = (lang: string) => {
    setLanguages((prev) => {
      if (prev.length <= 1) return prev;
      return prev.filter((l) => l !== lang);
    });
  };

  const setWeekdayPreset = () => {
    const next: Record<string, boolean> = { ...availability };
    for (const day of ["Mon", "Tue", "Wed", "Thu", "Fri"]) {
      for (const slot of TIME_SLOTS) {
        if (slot.id !== "20-22") {
          next[`${day}-${slot.id}`] = true;
        }
      }
    }
    setAvailability(next);
  };

  const clearAvailability = () => setAvailability({});

  const canNext = () => {
    if (step === 4) return photoCount >= 3;
    if (step === 5) {
      return headline.trim().length > 0 && bio.trim().length >= MIN_BIO_LENGTH;
    }
    if (step === 6) return verifyState === "done";
    return true;
  };

  const continueHint = (): string | null => {
    if (step === 3) {
      return "Optional — set hours now or update anytime from your calendar.";
    }
    if (step === 4 && photoCount < 3) {
      return `Upload at least 3 photos (${photoCount}/3).`;
    }
    if (step === 5) {
      if (!headline.trim()) return "Add a professional headline to continue.";
      if (bio.trim().length < MIN_BIO_LENGTH) {
        return `Bio needs at least ${MIN_BIO_LENGTH} characters (${bio.trim().length}/${MIN_BIO_LENGTH}).`;
      }
    }
    if (step === 6 && verifyState !== "done") {
      return "Complete identity verification to continue.";
    }
    return null;
  };

  const next = () => {
    if (step < 7) setStep((step + 1) as OnboardingStepIndex);
  };
  const back = () => {
    if (step > 0) setStep((step - 1) as OnboardingStepIndex);
  };

  const publish = () => {
    setIsProMode(true);
    setPublished(true);
  };

  if (published) {
    return (
      <div className="mx-auto max-w-lg py-16 text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-sage-500/15">
          <Check className="size-8 text-sage-500" strokeWidth={ICON_STROKE} />
        </div>
        <h1 className="mt-6 font-display text-h1 text-text-primary">
          You&apos;re live!
        </h1>
        <p className="mt-2 text-text-secondary">
          Your profile is published. Customers can find and book you now.
        </p>
        <Link
          href="/pro/"
          className="mt-8 inline-flex h-11 items-center rounded-full bg-cta px-8 text-sm font-semibold text-white hover:bg-cta-hover"
        >
          Go to dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 md:py-12">
      <ProOnboardingStepper currentStep={step} />

      <div className="mt-10 rounded-2xl border border-border bg-bg-elevated p-6 md:p-8">
        {step === 0 && (
          <StepPanel title="What services do you offer?">
            <p className="text-sm text-ink-300">Select all that apply.</p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {topLevelCategories.map((cat) => {
                const on = categoriesSelected.includes(cat.slug);
                return (
                  <label
                    key={cat.id}
                    className={cn(
                      "flex cursor-pointer items-center gap-2 rounded-xl border px-4 py-3 transition",
                      on
                        ? "border-bronze-500 bg-bronze-500/10"
                        : "border-border hover:border-cta/30",
                    )}
                  >
                    <input
                      type="checkbox"
                      checked={on}
                      onChange={() =>
                        setCategoriesSelected((prev) =>
                          on
                            ? prev.filter((s) => s !== cat.slug)
                            : [...prev, cat.slug],
                        )
                      }
                      className="accent-bronze-500"
                    />
                    <span className="text-sm font-medium">{cat.name}</span>
                  </label>
                );
              })}
            </div>
            {subcategories.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {subcategories.slice(0, 8).map((sub) => (
                  <span
                    key={sub.id}
                    className="rounded-full border border-border bg-bg px-3 py-1 text-xs font-medium text-text-secondary"
                  >
                    {sub.name}
                  </span>
                ))}
              </div>
            )}
          </StepPanel>
        )}

        {step === 1 && (
          <StepPanel title="Where do you work?">
            <div className="grid gap-3 sm:grid-cols-2">
              <Input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
              />
              <Input
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                placeholder="State"
              />
            </div>
            <label className="mt-6 block text-sm font-medium">
              Service radius: {radius} miles
            </label>
            <input
              type="range"
              min={5}
              max={100}
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
              className="mt-2 w-full accent-bronze-500"
            />
            <div className="relative mt-6 aspect-[2/1] overflow-hidden rounded-xl bg-stone-200">
              <div className="absolute inset-0 flex items-center justify-center text-sm text-ink-400">
                Map preview
              </div>
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-bronze-500/60 bg-bronze-500/15"
                style={{
                  width: `${Math.min(radius, 80)}%`,
                  height: `${Math.min(radius, 80)}%`,
                }}
              />
            </div>
          </StepPanel>
        )}

        {step === 2 && (
          <StepPanel title="Set your pricing">
            <select
              value={pricingModel}
              onChange={(e) => setPricingModel(e.target.value)}
              className="h-10 w-full rounded-lg border border-border bg-bg px-3 text-sm"
            >
              <option value="hour">Hourly</option>
              <option value="project">Per project</option>
              <option value="visit">Per visit</option>
              <option value="custom">Custom</option>
            </select>
            <ul className="mt-4 space-y-3">
              {services.map((svc, i) => (
                <li
                  key={i}
                  className="grid gap-2 rounded-xl border border-border p-3 sm:grid-cols-4"
                >
                  <Input
                    value={svc.name}
                    onChange={(e) => {
                      const next = [...services];
                      next[i] = { ...svc, name: e.target.value };
                      setServices(next);
                    }}
                    placeholder="Service name"
                    className="sm:col-span-2"
                  />
                  <Input
                    type="number"
                    value={svc.min}
                    onChange={(e) => {
                      const next = [...services];
                      next[i] = { ...svc, min: Number(e.target.value) };
                      setServices(next);
                    }}
                    placeholder="Min $"
                  />
                  <Input
                    type="number"
                    value={svc.max}
                    onChange={(e) => {
                      const next = [...services];
                      next[i] = { ...svc, max: Number(e.target.value) };
                      setServices(next);
                    }}
                    placeholder="Max $"
                  />
                </li>
              ))}
            </ul>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-3 rounded-full"
              onClick={() =>
                setServices((s) => [
                  ...s,
                  { name: "", unit: pricingModel, min: 0, max: 0 },
                ])
              }
            >
              Add service
            </Button>
          </StepPanel>
        )}

        {step === 3 && (
          <StepPanel title="Weekly availability">
            <p className="text-sm text-ink-300">
              Tap cells to mark when you&apos;re generally available. You can
              refine this later in Calendar.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="rounded-full"
                onClick={setWeekdayPreset}
              >
                Weekdays 8am–8pm
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="rounded-full"
                onClick={() => {
                  const next: Record<string, boolean> = { ...availability };
                  for (const day of WEEK_DAYS) {
                    next[`${day}-17-20`] = true;
                    next[`${day}-20-22`] = true;
                  }
                  setAvailability(next);
                }}
              >
                Evenings only
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="rounded-full"
                onClick={clearAvailability}
              >
                Clear all
              </Button>
            </div>
            <div className="mt-4 overflow-x-auto pb-2">
              <div
                className="inline-grid min-w-full gap-1.5"
                style={{
                  gridTemplateColumns: `5.5rem repeat(${WEEK_DAYS.length}, minmax(3.25rem, 1fr))`,
                }}
              >
                <div />
                {WEEK_DAYS.map((day) => (
                  <span
                    key={day}
                    className="py-1 text-center text-xs font-semibold text-text-primary"
                  >
                    {day}
                  </span>
                ))}
                {TIME_SLOTS.map((slot) => (
                  <Fragment key={slot.id}>
                    <span className="flex items-center pr-2 text-xs text-ink-300">
                      {slot.label}
                    </span>
                    {WEEK_DAYS.map((day) => {
                      const key = `${day}-${slot.id}`;
                      const on = availability[key];
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() =>
                            setAvailability((a) => ({
                              ...a,
                              [key]: !a[key],
                            }))
                          }
                          className={cn(
                            "min-h-11 rounded-lg border text-xs font-medium transition",
                            on
                              ? "border-sage-500 bg-sage-500/20 text-sage-600"
                              : "border-border bg-bg hover:border-cta/30 hover:bg-bg-elevated",
                          )}
                          aria-pressed={on}
                          aria-label={`${day} ${slot.label}`}
                        />
                      );
                    })}
                  </Fragment>
                ))}
              </div>
            </div>
            <p className="mt-3 text-caption text-ink-300">
              {Object.values(availability).filter(Boolean).length} time blocks
              selected
            </p>
          </StepPanel>
        )}

        {step === 4 && (
          <StepPanel title="Portfolio photos">
            <p className="text-sm text-ink-300">
              At least 3 photos required to publish.
            </p>
            <div
              className="mt-4 flex min-h-[10rem] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-bg transition hover:border-cta/40"
              onClick={() => setPhotoCount((c) => Math.min(c + 1, 5))}
              onKeyDown={() => {}}
              role="button"
              tabIndex={0}
            >
              <Upload className="size-8 text-ink-300" strokeWidth={ICON_STROKE} />
              <p className="mt-2 text-sm font-medium text-text-primary">
                Drag & drop or click to upload
              </p>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "aspect-square rounded-xl border border-dashed border-border flex items-center justify-center text-caption text-ink-300",
                    i < photoCount && "border-sage-500 bg-sage-500/10 text-sage-500",
                  )}
                >
                  {i < photoCount ? "Uploaded" : "Slot"}
                </div>
              ))}
            </div>
            <p className="mt-2 text-sm text-ink-300">{photoCount}/3 minimum</p>
          </StepPanel>
        )}

        {step === 5 && (
          <StepPanel title="Bio & credentials">
            <Input
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder="Professional headline"
              className="mb-3"
            />
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={5}
              placeholder="Tell customers about your experience, style, and what makes you a great fit…"
              className="w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm"
            />
            <p
              className={cn(
                "mt-1 text-right text-caption",
                bio.trim().length >= MIN_BIO_LENGTH
                  ? "text-sage-500"
                  : "text-ink-300",
              )}
            >
              {bio.trim().length}/{MIN_BIO_LENGTH} characters minimum
            </p>
            <div className="mt-4">
              <p className="text-sm font-medium text-text-primary">Languages</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {languages.map((lang) => (
                  <span
                    key={lang}
                    className="inline-flex items-center gap-1 rounded-full border border-border bg-bg-elevated px-3 py-1.5 text-sm"
                  >
                    {lang}
                    <button
                      type="button"
                      onClick={() => removeLanguage(lang)}
                      disabled={languages.length <= 1}
                      className="rounded-full p-0.5 text-ink-300 hover:text-text-primary disabled:opacity-30"
                      aria-label={`Remove ${lang}`}
                    >
                      <X className="size-3.5" strokeWidth={ICON_STROKE} />
                    </button>
                  </span>
                ))}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <select
                  value={languagePick}
                  onChange={(e) => setLanguagePick(e.target.value)}
                  className="h-10 min-w-[10rem] flex-1 rounded-lg border border-border bg-bg px-3 text-sm"
                >
                  <option value="">Choose a language…</option>
                  {COMMON_LANGUAGES.filter(
                    (lang) =>
                      !languages.some(
                        (l) => l.toLowerCase() === lang.toLowerCase(),
                      ),
                  ).map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                  disabled={!languagePick}
                  onClick={() => addLanguage(languagePick)}
                >
                  Add
                </Button>
              </div>
              <div className="mt-2 flex gap-2">
                <Input
                  value={customLanguage}
                  onChange={(e) => setCustomLanguage(e.target.value)}
                  placeholder="Other language"
                  className="flex-1"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addLanguage(customLanguage);
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="shrink-0 rounded-full"
                  disabled={!customLanguage.trim()}
                  onClick={() => addLanguage(customLanguage)}
                >
                  Add custom
                </Button>
              </div>
            </div>
            <label className="mt-4 block text-sm font-medium">
              Years of experience
              <Input
                type="number"
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="mt-1 max-w-[8rem]"
              />
            </label>
            <div className="mt-4 rounded-xl border border-border p-4">
              <p className="text-sm font-medium">Licenses & certifications</p>
              <input type="file" className="mt-2 text-sm" />
            </div>
          </StepPanel>
        )}

        {step === 6 && (
          <StepPanel title="Identity verification">
            <p className="text-sm text-text-secondary">
              We use Stripe Identity to verify your ID. This keeps the marketplace
              safe for everyone.
            </p>
            {verifyState === "done" ? (
              <div className="mt-6 flex items-center gap-2 text-sage-500">
                <Check className="size-5" strokeWidth={ICON_STROKE} />
                Verification complete
              </div>
            ) : (
              <Button
                type="button"
                className="mt-6 rounded-full bg-cta text-white hover:bg-cta-hover"
                disabled={verifyState === "loading"}
                onClick={() => {
                  setVerifyState("loading");
                  window.setTimeout(() => setVerifyState("done"), 1500);
                }}
              >
                {verifyState === "loading"
                  ? "Verifying…"
                  : "Start verification"}
              </Button>
            )}
          </StepPanel>
        )}

        {step === 7 && (
          <StepPanel title="Payout setup">
            <p className="text-sm text-text-secondary">
              Connect with Stripe to receive payouts after each completed job.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <Input placeholder="Routing number" />
              <Input placeholder="Account number" />
            </div>
            {payoutState === "done" ? (
              <div className="mt-6 flex items-center gap-2 text-sage-500">
                <Check className="size-5" strokeWidth={ICON_STROKE} />
                Stripe connected
              </div>
            ) : (
              <Button
                type="button"
                className="mt-6 rounded-full bg-cta text-white hover:bg-cta-hover"
                disabled={payoutState === "loading"}
                onClick={() => {
                  setPayoutState("loading");
                  window.setTimeout(() => setPayoutState("done"), 1500);
                }}
              >
                {payoutState === "loading"
                  ? "Connecting…"
                  : "Connect with Stripe"}
              </Button>
            )}
            {payoutState === "done" && (
              <div className="mt-8 rounded-xl border border-border bg-bg p-4">
                <h3 className="font-semibold text-text-primary">
                  Profile preview
                </h3>
                <p className="mt-1 text-sm text-ink-300">
                  Review how customers will see your listing.
                </p>
                <Link
                  href={`/p/${DEMO_PRO_HANDLE}/`}
                  className="mt-3 inline-block text-sm font-medium text-cta hover:underline"
                >
                  Preview profile →
                </Link>
                <Button
                  type="button"
                  onClick={publish}
                  className="mt-4 w-full rounded-full bg-cta text-white hover:bg-cta-hover sm:w-auto"
                >
                  Publish your profile
                </Button>
              </div>
            )}
          </StepPanel>
        )}

        <div className="mt-8 border-t border-border pt-6">
          {continueHint() && (
            <p
              className={cn(
                "mb-4 text-center text-sm",
                canNext() ? "text-ink-300" : "text-bronze-600",
              )}
              role="status"
            >
              {continueHint()}
            </p>
          )}
          <div className="flex justify-between gap-3">
            <Button
              type="button"
              variant="outline"
              className="rounded-full"
              onClick={back}
              disabled={step === 0}
            >
              Back
            </Button>
            {step < 7 ? (
              <Button
                type="button"
                className="rounded-full bg-cta text-white hover:bg-cta-hover disabled:opacity-40"
                onClick={next}
                disabled={!canNext()}
              >
                Continue
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

function StepPanel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="font-display text-h2 text-text-primary">{title}</h2>
      <div className="mt-4">{children}</div>
    </div>
  );
}
