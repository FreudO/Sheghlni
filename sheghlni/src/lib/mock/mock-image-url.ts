import { resolveServiceSlug, type ServiceSlug } from "./service-image";

const BASE_PATH = "/Sheghlni";
const GALLERY_SLOTS = 6;

function hashKeyword(keyword: string): number {
  let hash = 0;
  for (let i = 0; i < keyword.length; i += 1) {
    hash = (hash * 31 + keyword.charCodeAt(i)) >>> 0;
  }
  return hash;
}

/** Stable local gallery path — bundled via `npm run download:photos`. */
export function localProviderPhotoPath(keyword: string, slotOffset = 0): string {
  const slug = resolveServiceSlug(keyword);
  const slot = ((hashKeyword(keyword) + slotOffset) % GALLERY_SLOTS) + 1;
  return `${BASE_PATH}/images/providers/${slug}-${slot}.jpg`;
}

/**
 * Category-matched local photos. Keywords map deterministically to a slot
 * within the provider's service category (1–6 unique images per category).
 */
/** Direct slug path when keyword is a known category id (e.g. photography-2). */
function slugFromKeyword(keyword: string): ServiceSlug | "cat-care" | null {
  const normalized = keyword.toLowerCase().trim();
  if (/^[a-z-]+$/.test(normalized) && !normalized.includes(",")) {
    return normalized as ServiceSlug;
  }
  return null;
}

export function mockImageUrl(
  keyword: string,
  w = 1200,
  h = 600,
  slotOffset = 0,
): string {
  const direct = slugFromKeyword(keyword);
  const slug = direct ?? resolveServiceSlug(keyword);
  if (w <= 320 && h <= 320) {
    return `${BASE_PATH}/images/providers/avatars/${slug}.jpg`;
  }
  if (direct) {
    const slot = slotOffset > 0 ? `-${slotOffset + 1}` : "";
    return `${BASE_PATH}/images/providers/${slug}${slot}.jpg`;
  }
  return localProviderPhotoPath(keyword, slotOffset);
}

export function providerHeroImageUrl(keyword: string): string {
  const slug = resolveServiceSlug(keyword);
  return `${BASE_PATH}/images/providers/${slug}.jpg`;
}

export function providerAvatarImageUrl(keyword: string): string {
  const slug = resolveServiceSlug(keyword);
  return `${BASE_PATH}/images/providers/avatars/${slug}.jpg`;
}
