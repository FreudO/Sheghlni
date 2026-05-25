import { providers } from "@/lib/mock/data";

export type SavedListId = "default" | "wedding" | "house";

export type SavedList = {
  id: SavedListId;
  name: string;
  providerIds: string[];
};

const INITIAL_LISTS: SavedList[] = [
  {
    id: "default",
    name: "Saved",
    providerIds: [
      "prov-sofia-reyes",
      "prov-marcus-thompson",
      "prov-priya-kapoor",
      "prov-david-kim",
    ],
  },
  {
    id: "wedding",
    name: "Wedding vendors",
    providerIds: ["prov-sofia-reyes", "prov-nina-ortiz"],
  },
  {
    id: "house",
    name: "House projects",
    providerIds: ["prov-marcus-thompson", "prov-tom-barrett", "prov-james-crew"],
  },
];

let lists: SavedList[] = INITIAL_LISTS.map((list) => ({
  ...list,
  providerIds: [...list.providerIds],
}));

const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((listener) => listener());
}

export function getSavedLists(): SavedList[] {
  return lists.map((list) => ({
    ...list,
    providerIds: [...list.providerIds],
  }));
}

export function isProviderSaved(providerId: string): boolean {
  return lists.some((list) => list.providerIds.includes(providerId));
}

export function toggleProviderSaved(providerId: string): boolean {
  const anySaved = isProviderSaved(providerId);

  if (anySaved) {
    lists = lists.map((list) => ({
      ...list,
      providerIds: list.providerIds.filter((id) => id !== providerId),
    }));
    notify();
    return false;
  }

  const defaultList = lists.find((l) => l.id === "default");
  if (defaultList && !defaultList.providerIds.includes(providerId)) {
    defaultList.providerIds.push(providerId);
  }
  notify();
  return true;
}

export function removeProviderFromAllLists(providerId: string): void {
  lists = lists.map((list) => ({
    ...list,
    providerIds: list.providerIds.filter((id) => id !== providerId),
  }));
  notify();
}

export function getSavedProvidersForList(listId: SavedListId) {
  const list = lists.find((l) => l.id === listId);
  if (!list) return [];
  return list.providerIds
    .map((id) => providers.find((p) => p.id === id))
    .filter(Boolean) as typeof providers;
}

export function getTotalSavedCount(): number {
  const ids = new Set<string>();
  lists.forEach((list) => list.providerIds.forEach((id) => ids.add(id)));
  return ids.size;
}

export function subscribeSaved(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
