"use client";

import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { getTopLevelCategories } from "@/lib/mock";
import type { SearchSort } from "@/lib/mock";
import type { SearchState } from "@/lib/search/search-params";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FilterDrawer, SORT_OPTIONS, getCategoryLabel } from "@/components/search/filter-drawer";
import { ICON_STROKE } from "@/components/ui/icon-well";
import { cn } from "@/lib/utils";

type FilterBarProps = {
  state: SearchState;
  resultCount: number;
  locationLabel: string;
  drawerOpen: boolean;
  onDrawerOpenChange: (open: boolean) => void;
  draft: SearchState;
  onDraftChange: (patch: Partial<SearchState>) => void;
  onApplyDrawer: () => void;
  onClearFilters: () => void;
  onPatch: (patch: Partial<SearchState>) => void;
};

const RATING_CHIPS = [
  { label: "4+", value: 4 },
  { label: "4.5+", value: 4.5 },
  { label: "5.0", value: 5 },
] as const;

export function FilterBar({
  state,
  resultCount,
  locationLabel,
  drawerOpen,
  onDrawerOpenChange,
  draft,
  onDraftChange,
  onApplyDrawer,
  onClearFilters,
  onPatch,
}: FilterBarProps) {
  const topCategories = getTopLevelCategories();
  const sortLabel =
    SORT_OPTIONS.find((option) => option.value === (state.sort ?? "recommended"))
      ?.label ?? "Recommended";

  return (
    <>
      <div className="sticky top-14 z-40 border-b border-border bg-bg/95 backdrop-blur-md md:top-16">
        <div className="mx-auto max-w-[1280px] px-4 py-3 md:px-6 lg:px-12">
          <div className="flex items-center justify-between gap-3 md:hidden">
            <p className="text-[0.8125rem] text-text-secondary">
              <span className="font-medium text-text-primary">{resultCount}</span> pros
              in {locationLabel}
            </p>
            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex min-h-11 items-center gap-1 rounded-full border border-border bg-bg px-3 text-[0.8125rem] text-text-secondary">
                {sortLabel}
                <ChevronDown className="size-3.5" strokeWidth={ICON_STROKE} />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {SORT_OPTIONS.map((option) => (
                  <DropdownMenuItem
                    key={option.value}
                    onClick={() => onPatch({ sort: option.value as SearchSort })}
                  >
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="-mx-4 mt-3 flex items-center gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] md:mx-0 md:mt-0 md:flex-wrap md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="shrink-0 rounded-full"
              onClick={() => onDrawerOpenChange(true)}
            >
              <SlidersHorizontal className="size-3.5" strokeWidth={ICON_STROKE} />
              All filters
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex h-9 shrink-0 items-center gap-1 rounded-full border border-border bg-bg px-3 text-[0.8rem] text-text-secondary hover:border-cta/40">
                {getCategoryLabel(state.categorySlug)}
                <ChevronDown className="size-3.5" strokeWidth={ICON_STROKE} />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="max-h-64 overflow-y-auto">
                <DropdownMenuItem onClick={() => onPatch({ categorySlug: undefined })}>
                  All categories
                </DropdownMenuItem>
                {topCategories.map((category) => (
                  <DropdownMenuItem
                    key={category.id}
                    onClick={() => onPatch({ categorySlug: category.slug })}
                  >
                    {category.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {RATING_CHIPS.map((chip) => (
              <button
                key={chip.label}
                type="button"
                onClick={() =>
                  onPatch({
                    minRating:
                      state.minRating === chip.value ? undefined : chip.value,
                  })
                }
                className={cn(
                  "shrink-0 rounded-full border px-3 py-1.5 text-[0.8rem] transition",
                  state.minRating === chip.value
                    ? "border-cta bg-cta/10 text-cta"
                    : "border-border text-text-secondary hover:border-cta/40",
                )}
              >
                {chip.label}
              </button>
            ))}

            <button
              type="button"
              onClick={() => onPatch({ verified: state.verified ? undefined : true })}
              className={cn(
                "shrink-0 rounded-full border px-3 py-1.5 text-[0.8rem] transition",
                state.verified
                  ? "border-cta bg-cta/10 text-cta"
                  : "border-border text-text-secondary hover:border-cta/40",
              )}
            >
              Verified only
            </button>

            <button
              type="button"
              onClick={() =>
                onPatch({
                  maxPriceCents: state.maxPriceCents ? undefined : 15000,
                })
              }
              className={cn(
                "shrink-0 rounded-full border px-3 py-1.5 text-[0.8rem] transition",
                state.maxPriceCents
                  ? "border-cta bg-cta/10 text-cta"
                  : "border-border text-text-secondary hover:border-cta/40",
              )}
            >
              Under $150
            </button>

            <p className="hidden text-caption text-ink-300 sm:ml-auto md:block">
              {resultCount} pros in {locationLabel}
            </p>

            <DropdownMenu>
              <DropdownMenuTrigger className="ml-auto hidden h-9 shrink-0 items-center gap-1 rounded-full border border-border bg-bg px-3 text-[0.8rem] text-text-secondary hover:border-cta/40 md:inline-flex">
                {sortLabel}
                <ChevronDown className="size-3.5" strokeWidth={ICON_STROKE} />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {SORT_OPTIONS.map((option) => (
                  <DropdownMenuItem
                    key={option.value}
                    onClick={() => onPatch({ sort: option.value as SearchSort })}
                  >
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <FilterDrawer
        open={drawerOpen}
        onOpenChange={onDrawerOpenChange}
        draft={draft}
        onDraftChange={onDraftChange}
        onApply={onApplyDrawer}
        onClear={onClearFilters}
      />
    </>
  );
}
