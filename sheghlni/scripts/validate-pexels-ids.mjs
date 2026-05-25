import { CURATED_PHOTOS } from "./provider-photo-curated.mjs";

async function ok(id) {
  const url = `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?w=400`;
  const res = await fetch(url, { method: "HEAD", redirect: "follow" });
  return res.ok;
}

for (const [slug, photos] of Object.entries(CURATED_PHOTOS)) {
  const ids = [photos.hero, ...photos.gallery, photos.avatar];
  for (const id of ids) {
    if (!(await ok(id))) console.log("FAIL", slug, id);
  }
}
