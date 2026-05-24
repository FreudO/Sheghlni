import { resolveServiceSlug, type ServiceSlug } from "./service-image";

const BASE_PATH = "/Sheghlni";

/** Bundled local copies (see scripts/download-provider-photos.mjs). */
export function localHeroPhotoPath(slug: ServiceSlug): string {
  return `${BASE_PATH}/images/providers/${slug}.jpg`;
}

export function providerHeroImageUrl(keyword: string): string {
  const slug = resolveServiceSlug(keyword);
  return localHeroPhotoPath(slug);
}

export function providerAvatarImageUrl(keyword: string): string {
  const slug = resolveServiceSlug(keyword);
  return `${BASE_PATH}/images/providers/avatars/${slug}.jpg`;
}
