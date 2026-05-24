import type { ReadonlyURLSearchParams } from "next/navigation";
import type { Provider, SearchFilters, SearchSort } from "@/lib/mock";
import { searchProviders } from "@/lib/mock";

export type SearchState = SearchFilters & {
  q: string;
  when?: string;
  dateStart?: string;
  dateEnd?: string;
  specialties?: string[];
};

const SORT_VALUES: SearchSort[] = [
  "recommended",
  "rating",
  "price_asc",
  "distance",
  "newest",
];

function parseSort(value: string | null): SearchSort {
  if (value && SORT_VALUES.includes(value as SearchSort)) {
    return value as SearchSort;
  }
  return "recommended";
}

function parseNumber(value: string | null): number | undefined {
  if (!value) return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function parseBoolean(value: string | null): boolean {
  return value === "true" || value === "1";
}

export function parseSearchParams(
  params: ReadonlyURLSearchParams,
): SearchState {
  const languages = params.get("languages");
  const specialties = params.get("specialties");

  return {
    q: params.get("q") ?? "",
    categorySlug: params.get("category") ?? undefined,
    city: params.get("city") ?? undefined,
    minRating: parseNumber(params.get("minRating")),
    maxPriceCents: parseNumber(params.get("maxPrice")),
    verified: parseBoolean(params.get("verified")),
    premiumOnly: parseBoolean(params.get("premiumOnly")),
    radiusMi: parseNumber(params.get("radius")),
    sort: parseSort(params.get("sort")),
    when: params.get("when") ?? undefined,
    dateStart: params.get("dateStart") ?? undefined,
    dateEnd: params.get("dateEnd") ?? undefined,
    languages: languages ? languages.split(",").filter(Boolean) : undefined,
    specialties: specialties ? specialties.split(",").filter(Boolean) : undefined,
  };
}

export function buildSearchParams(
  state: Partial<SearchState>,
  current?: ReadonlyURLSearchParams,
): URLSearchParams {
  const next = new URLSearchParams(current?.toString() ?? "");

  const setOrDelete = (key: string, value: string | undefined | null) => {
    if (value === undefined || value === null || value === "") {
      next.delete(key);
    } else {
      next.set(key, value);
    }
  };

  setOrDelete("q", state.q);
  setOrDelete("category", state.categorySlug);
  setOrDelete("city", state.city);
  setOrDelete(
    "minRating",
    state.minRating !== undefined ? String(state.minRating) : undefined,
  );
  setOrDelete(
    "maxPrice",
    state.maxPriceCents !== undefined ? String(state.maxPriceCents) : undefined,
  );
  setOrDelete("verified", state.verified ? "true" : undefined);
  setOrDelete("premiumOnly", state.premiumOnly ? "true" : undefined);
  setOrDelete(
    "radius",
    state.radiusMi !== undefined ? String(state.radiusMi) : undefined,
  );
  setOrDelete(
    "sort",
    state.sort && state.sort !== "recommended" ? state.sort : undefined,
  );
  setOrDelete("when", state.when);
  setOrDelete("dateStart", state.dateStart);
  setOrDelete("dateEnd", state.dateEnd);
  setOrDelete(
    "languages",
    state.languages && state.languages.length > 0
      ? state.languages.join(",")
      : undefined,
  );
  setOrDelete(
    "specialties",
    state.specialties && state.specialties.length > 0
      ? state.specialties.join(",")
      : undefined,
  );

  return next;
}

export function runSearch(state: SearchState): Provider[] {
  const filters: SearchFilters = {
    categorySlug: state.categorySlug,
    city: state.city,
    minRating: state.minRating,
    maxPriceCents: state.maxPriceCents,
    verified: state.verified,
    premiumOnly: state.premiumOnly,
    radiusMi: state.radiusMi,
    languages: state.languages,
    sort: state.sort,
  };
  return searchProviders(state.q, filters);
}

export function getResultLocationLabel(city?: string): string {
  return city?.trim() || "Boston";
}
