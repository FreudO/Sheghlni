import type { ServiceSlug } from "@/lib/mock/service-image";

const BASE_PATH = "/Sheghlni";
const GALLERY_SLOTS = 6;

export type ProviderPhotoSlug = ServiceSlug | "cat-care";

/** Curated local assets — see scripts/provider-photo-curated.mjs */
export function providerHeroUrl(slug: ProviderPhotoSlug): string {
  return `${BASE_PATH}/images/providers/${slug}.jpg`;
}

export function providerGalleryUrls(slug: ProviderPhotoSlug): string[] {
  return Array.from({ length: GALLERY_SLOTS }, (_, i) => {
    const slot = i + 1;
    return `${BASE_PATH}/images/providers/${slug}-${slot}.jpg`;
  });
}

export function providerAvatarUrl(slug: ProviderPhotoSlug): string {
  return `${BASE_PATH}/images/providers/avatars/${slug}.jpg`;
}

/** Maps each demo provider to a curated photo set (strictly service-relevant). */
export const PROVIDER_PHOTO_SLUG: Record<string, ProviderPhotoSlug> = {
  "prov-sofia-reyes": "photography",
  "prov-marcus-thompson": "electrician",
  "prov-priya-kapoor": "fitness",
  "prov-james-crew": "cleaning",
  "prov-elena-vasquez": "design",
  "prov-david-kim": "pet-care",
  "prov-rachel-chen": "tutoring",
  "prov-carlos-mendoza": "painting",
  "prov-amara-johnson": "hair-beauty",
  "prov-tom-barrett": "handyman",
  "prov-nina-ortiz": "events",
  "prov-kevin-walsh": "tech",
  "prov-lisa-nguyen": "auto",
  "prov-michael-ross": "business",
  "prov-jasmine-brooks": "business",
  "prov-omar-hassan": "plumbing",
  "prov-greta-lindstrom": "music",
  "prov-ryan-foster": "video",
  "prov-diana-flores": "wellness",
  "prov-chris-patelli": "hvac",
  "prov-megan-sullivan": "dj",
  "prov-tyler-ng": "web-dev",
  "prov-sandra-bell": "cat-care",
  "prov-antoine-dupre": "chef",
};

export const PRO_USER_PHOTO_SLUG: Record<string, ProviderPhotoSlug> = {
  "user-sofia-reyes": "photography",
  "user-marcus-thompson": "electrician",
  "user-priya-kapoor": "fitness",
  "user-james-crew": "cleaning",
  "user-elena-vasquez": "design",
  "user-david-kim": "pet-care",
  "user-rachel-chen": "tutoring",
  "user-carlos-mendoza": "painting",
  "user-amara-johnson": "hair-beauty",
  "user-tom-barrett": "handyman",
  "user-nina-ortiz": "events",
  "user-kevin-walsh": "tech",
  "user-lisa-nguyen": "auto",
  "user-michael-ross": "business",
  "user-jasmine-brooks": "business",
  "user-omar-hassan": "plumbing",
  "user-greta-lindstrom": "music",
  "user-ryan-foster": "video",
  "user-diana-flores": "wellness",
  "user-chris-patelli": "hvac",
  "user-megan-sullivan": "dj",
  "user-tyler-ng": "web-dev",
  "user-sandra-bell": "cat-care",
  "user-antoine-dupre": "chef",
};

export function mediaForProvider(providerId: string): {
  heroImageUrl: string;
  mediaUrls: string[];
} {
  const slug = PROVIDER_PHOTO_SLUG[providerId] ?? "portrait";
  return {
    heroImageUrl: providerHeroUrl(slug),
    mediaUrls: providerGalleryUrls(slug),
  };
}
