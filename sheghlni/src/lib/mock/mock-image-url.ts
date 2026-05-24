import { resolveServiceSlug } from "./service-image";

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
export function mockImageUrl(
  keyword: string,
  w = 1200,
  h = 600,
  slotOffset = 0,
): string {
  const slug = resolveServiceSlug(keyword);
  if (w <= 320 && h <= 320) {
    return `${BASE_PATH}/images/providers/avatars/${slug}.jpg`;
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
