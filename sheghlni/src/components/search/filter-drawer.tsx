"use client";

import { useMemo, useState } from "react";
import { categories, getCategoryTree } from "@/lib/mock";
import type { SearchSort } from "@/lib/mock";
import type { SearchState } from "@/lib/search/search-params";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const RADIUS_OPTIONS = [5, 10, 25, 50] as const;
const LANGUAGE_OPTIONS = [
  "English",
  "Spanish",
  "French",
  "Mandarin",
  "Portuguese",
] as const;
const SPECIALTY_OPTIONS = [
  "Women-owned",
  "Veteran-owned",
  "Minority-owned",
] as const;
const WHEN_OPTIONS = ["Today", "This week", "Pick dates"] as const;

type FilterDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  draft: SearchState;
  onDraftChange: (patch: Partial<SearchState>) => void;
  onApply: () => void;
  onClear: () => void;
};

function formatPriceLabel(cents: number): string {
  if (cents >= 50000) return "$500+";
  return `$${Math.round(cents / 100)}`;
}

export function FilterDrawer({
  open,
  onOpenChange,
  draft,
  onDraftChange,
  onApply,
  onClear,
}: FilterDrawerProps) {
  const tree = useMemo(() => getCategoryTree(), []);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const minPrice = 0;
  const maxPrice = draft.maxPriceCents ?? 50000;

  const toggleLanguage = (language: string) => {
    const current = draft.languages ?? [];
    const next = current.includes(language)
      ? current.filter((l) => l !== language)
      : [...current, language];
    onDraftChange({ languages: next.length > 0 ? next : undefined });
  };

  const toggleSpecialty = (specialty: string) => {
    const current = draft.specialties ?? [];
    const next = current.includes(specialty)
      ? current.filter((s) => s !== specialty)
      : [...current, specialty];
    onDraftChange({ specialties: next.length > 0 ? next : undefined });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full max-w-md overflow-y-auto sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>All filters</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-8 pb-24">
          <section>
            <h3 className="text-sm font-semibold text-text-primary">Category</h3>
            <div className="mt-3 space-y-2">
              {tree.map((top) => (
                <div key={top.id} className="rounded-lg border border-border p-3">
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="checkbox"
                      checked={draft.categorySlug === top.slug}
                      onChange={() =>
                        onDraftChange({
                          categorySlug:
                            draft.categorySlug === top.slug ? undefined : top.slug,
                        })
                      }
                      className="size-4 accent-cta"
                    />
                    <span className="text-sm font-medium text-text-primary">
                      {top.name}
                    </span>
                    <button
                      type="button"
                      className="ml-auto text-caption text-text-tertiary"
                      onClick={() =>
                        setExpanded((prev) => ({
                          ...prev,
                          [top.id]: !prev[top.id],
                        }))
                      }
                    >
                      {expanded[top.id] ? "Hide" : "Show"}
                    </button>
                  </label>
                  {expanded[top.id] && (
                    <div className="mt-2 space-y-1 border-l border-border pl-4">
                      {top.children.map((child) => (
                        <label
                          key={child.id}
                          className="flex cursor-pointer items-center gap-2 py-1"
                        >
                          <input
                            type="checkbox"
                            checked={draft.categorySlug === child.slug}
                            onChange={() =>
                              onDraftChange({
                                categorySlug:
                                  draft.categorySlug === child.slug
                                    ? undefined
                                    : child.slug,
                              })
                            }
                            className="size-4 accent-cta"
                          />
                          <span className="text-sm text-text-secondary">
                            {child.name}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-sm font-semibold text-text-primary">
              Location radius
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {RADIUS_OPTIONS.map((miles) => (
                <button
                  key={miles}
                  type="button"
                  onClick={() => onDraftChange({ radiusMi: miles })}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-sm transition",
                    draft.radiusMi === miles
                      ? "border-cta bg-cta/10 text-cta"
                      : "border-border text-text-secondary hover:border-cta/40",
                  )}
                >
                  {miles} mi
                </button>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-sm font-semibold text-text-primary">Min rating</h3>
            <div className="mt-3 space-y-2">
              {[
                { label: "Any", value: undefined },
                { label: "4+ stars", value: 4 },
                { label: "4.5+ stars", value: 4.5 },
              ].map((option) => (
                <label
                  key={option.label}
                  className="flex cursor-pointer items-center gap-2"
                >
                  <input
                    type="radio"
                    name="minRating"
                    checked={draft.minRating === option.value}
                    onChange={() => onDraftChange({ minRating: option.value })}
                    className="size-4 accent-cta"
                  />
                  <span className="text-sm text-text-secondary">{option.label}</span>
                </label>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-sm font-semibold text-text-primary">Price range</h3>
            <p className="mt-2 text-caption text-text-tertiary">
              {formatPriceLabel(minPrice)} – {formatPriceLabel(maxPrice)}
            </p>
            <input
              type="range"
              min={0}
              max={50000}
              step={2500}
              value={maxPrice}
              onChange={(event) =>
                onDraftChange({ maxPriceCents: Number(event.target.value) })
              }
              className="mt-3 w-full accent-cta"
            />
          </section>

          <section>
            <h3 className="text-sm font-semibold text-text-primary">Availability</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {WHEN_OPTIONS.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() =>
                    onDraftChange({
                      when: draft.when === option ? undefined : option,
                    })
                  }
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-sm transition",
                    draft.when === option
                      ? "border-cta bg-cta/10 text-cta"
                      : "border-border text-text-secondary hover:border-cta/40",
                  )}
                >
                  {option}
                </button>
              ))}
            </div>
            {draft.when === "Pick dates" && (
              <div className="mt-3 grid grid-cols-2 gap-3">
                <label className="flex flex-col gap-1 text-caption text-text-tertiary">
                  From
                  <input
                    type="date"
                    value={draft.dateStart ?? ""}
                    onChange={(event) =>
                      onDraftChange({ dateStart: event.target.value || undefined })
                    }
                    className="rounded-lg border border-border bg-bg px-3 py-2 text-body text-text-primary"
                  />
                </label>
                <label className="flex flex-col gap-1 text-caption text-text-tertiary">
                  To
                  <input
                    type="date"
                    value={draft.dateEnd ?? ""}
                    onChange={(event) =>
                      onDraftChange({ dateEnd: event.target.value || undefined })
                    }
                    className="rounded-lg border border-border bg-bg px-3 py-2 text-body text-text-primary"
                  />
                </label>
              </div>
            )}
          </section>

          <section>
            <label className="flex cursor-pointer items-center justify-between">
              <span className="text-sm font-semibold text-text-primary">
                Verified badge
              </span>
              <input
                type="checkbox"
                checked={Boolean(draft.verified)}
                onChange={(event) =>
                  onDraftChange({ verified: event.target.checked || undefined })
                }
                className="size-4 accent-cta"
              />
            </label>
          </section>

          <section>
            <h3 className="text-sm font-semibold text-text-primary">Languages</h3>
            <div className="mt-3 space-y-2">
              {LANGUAGE_OPTIONS.map((language) => (
                <label key={language} className="flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    checked={draft.languages?.includes(language) ?? false}
                    onChange={() => toggleLanguage(language)}
                    className="size-4 accent-cta"
                  />
                  <span className="text-sm text-text-secondary">{language}</span>
                </label>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-sm font-semibold text-text-primary">Pro tier</h3>
            <div className="mt-3 space-y-2">
              {[
                { label: "All", value: false },
                { label: "Plus & Pro tier only", value: true },
              ].map((option) => (
                <label key={option.label} className="flex cursor-pointer items-center gap-2">
                  <input
                    type="radio"
                    name="proTier"
                    checked={Boolean(draft.premiumOnly) === option.value}
                    onChange={() =>
                      onDraftChange({
                        premiumOnly: option.value || undefined,
                      })
                    }
                    className="size-4 accent-cta"
                  />
                  <span className="text-sm text-text-secondary">{option.label}</span>
                </label>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-sm font-semibold text-text-primary">Specialties</h3>
            <div className="mt-3 space-y-2">
              {SPECIALTY_OPTIONS.map((specialty) => (
                <label key={specialty} className="flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    checked={draft.specialties?.includes(specialty) ?? false}
                    onChange={() => toggleSpecialty(specialty)}
                    className="size-4 accent-cta"
                  />
                  <span className="text-sm text-text-secondary">{specialty}</span>
                </label>
              ))}
            </div>
          </section>
        </div>

        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-border bg-bg-elevated p-4">
          <button
            type="button"
            onClick={onClear}
            className="text-sm font-medium text-text-secondary hover:text-text-primary"
          >
            Clear all
          </button>
          <Button
            type="button"
            className="rounded-full bg-cta px-6 text-white hover:bg-cta-hover"
            onClick={onApply}
          >
            Show results
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function getCategoryLabel(slug?: string): string {
  if (!slug) return "Category";
  return categories.find((c) => c.slug === slug)?.name ?? "Category";
}

export { getCategoryLabel };

export const SORT_OPTIONS: { value: SearchSort; label: string }[] = [
  { value: "recommended", label: "Recommended" },
  { value: "rating", label: "Highest rated" },
  { value: "price_asc", label: "Price: Low to high" },
  { value: "newest", label: "Newest" },
];

