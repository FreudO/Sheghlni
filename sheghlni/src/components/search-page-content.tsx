"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { X } from "lucide-react";
import { FilterBar } from "@/components/search/filter-bar";
import { MapPanel } from "@/components/search/map-panel";
import { ResultCard } from "@/components/search/result-card";
import { SearchEmptyState } from "@/components/search/search-empty-state";
import { SearchSkeletonList } from "@/components/search/search-skeleton";
import { getMapPins } from "@/lib/search/map-positions";
import {
  buildSearchParams,
  getResultLocationLabel,
  parseSearchParams,
  runSearch,
  type SearchState,
} from "@/lib/search/search-params";

export function SearchPageContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const applied = useMemo(
    () => parseSearchParams(searchParams),
    [searchParams],
  );

  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const [draft, setDraft] = useState<SearchState>(applied);

  const paramKey = searchParams.toString();

  useEffect(() => {
    setLoading(true);
    const timer = window.setTimeout(() => setLoading(false), 600);
    return () => window.clearTimeout(timer);
  }, [paramKey]);

  useEffect(() => {
    if (!drawerOpen) setDraft(applied);
  }, [applied, drawerOpen]);

  const results = useMemo(() => runSearch(applied), [applied]);
  const pins = useMemo(() => getMapPins(results), [results]);
  const locationLabel = getResultLocationLabel(applied.city);

  const pushState = useCallback(
    (patch: Partial<SearchState>) => {
      const next = { ...applied, ...patch };
      const params = buildSearchParams(next, searchParams);
      const query = params.toString();
      router.push(query ? `${pathname}?${query}` : pathname);
    },
    [applied, pathname, router, searchParams],
  );

  const handleClearFilters = () => {
    setDrawerOpen(false);
    router.push(pathname);
  };

  const handleApplyDrawer = () => {
    const params = buildSearchParams(draft, searchParams);
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
    setDrawerOpen(false);
  };

  const scrollToResult = (providerId: string) => {
    const element = document.getElementById(`result-${providerId}`);
    element?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="flex min-h-[calc(100dvh-3.5rem)] flex-col md:min-h-[calc(100dvh-4rem)]">
      <FilterBar
        state={applied}
        resultCount={results.length}
        locationLabel={locationLabel}
        drawerOpen={drawerOpen}
        onDrawerOpenChange={setDrawerOpen}
        draft={draft}
        onDraftChange={(patch) => setDraft((current) => ({ ...current, ...patch }))}
        onApplyDrawer={handleApplyDrawer}
        onClearFilters={handleClearFilters}
        onPatch={pushState}
      />

      <div className="grid flex-1 lg:grid-cols-[3fr_2fr]">
        <section className="min-w-0 px-6 py-6 lg:px-12">
          {loading ? (
            <SearchSkeletonList />
          ) : results.length === 0 ? (
            <SearchEmptyState onClearFilters={handleClearFilters} />
          ) : (
            <div className="space-y-4">
              {results.map((provider) => (
                <ResultCard
                  key={provider.id}
                  provider={provider}
                  highlighted={highlightedId === provider.id}
                  onHover={setHighlightedId}
                />
              ))}
            </div>
          )}
        </section>

        <aside className="relative hidden lg:block">
          <div className="sticky top-14 h-[calc(100dvh-3.5rem)] md:top-16 md:h-[calc(100dvh-4rem)]">
            <MapPanel
              providers={results}
              pins={pins}
              highlightedProviderId={highlightedId}
              onPinHover={setHighlightedId}
              onPinClick={scrollToResult}
              cityLabel={locationLabel}
              className="size-full"
            />
          </div>
        </aside>
      </div>

      <button
        type="button"
        onClick={() => setMapOpen(true)}
        className="fixed bottom-[calc(4.5rem+env(safe-area-inset-bottom))] left-1/2 z-40 inline-flex -translate-x-1/2 items-center gap-2 rounded-full bg-ink-900 px-5 py-2.5 text-sm font-medium text-cream-50 shadow-xl lg:hidden"
      >
        🗺 Map
      </button>

      {mapOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-bg lg:hidden">
          <div className="relative flex-1">
            <MapPanel
              providers={results}
              pins={pins}
              highlightedProviderId={highlightedId}
              onPinHover={setHighlightedId}
              onPinClick={(id) => {
                setHighlightedId(id);
                scrollToResult(id);
              }}
              cityLabel={locationLabel}
              className="size-full"
              overlay
            />
            <button
              type="button"
              aria-label="Close map"
              onClick={() => setMapOpen(false)}
              className="absolute right-4 top-4 inline-flex size-10 items-center justify-center rounded-full bg-bg/90 text-text-primary shadow-lg"
            >
              <X className="size-5" />
            </button>
          </div>

          <div className="border-t border-border bg-bg p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
            <div className="flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {results.map((provider) => (
                <div key={provider.id} className="w-[min(85vw,320px)] shrink-0">
                  <ResultCard
                    provider={provider}
                    compact
                    highlighted={highlightedId === provider.id}
                    onHover={setHighlightedId}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
