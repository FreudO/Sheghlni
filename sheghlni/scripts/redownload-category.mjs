import { writeFile } from "node:fs/promises";
import path from "node:path";
import { CURATED_PHOTOS } from "./provider-photo-curated.mjs";

const slug = process.argv[2];
if (!slug || !CURATED_PHOTOS[slug]) {
  console.error("Usage: node scripts/redownload-category.mjs <slug>");
  process.exit(1);
}

const photos = CURATED_PHOTOS[slug];
const ROOT = path.join(process.cwd(), "public", "images", "providers");

function pexelsUrl(id, w, h) {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}&h=${h}&fit=crop`;
}

async function download(url, dest) {
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  await writeFile(dest, Buffer.from(await res.arrayBuffer()));
  console.log("OK", path.basename(dest));
}

await download(pexelsUrl(photos.hero, 1400, 1050), path.join(ROOT, `${slug}.jpg`));
for (let i = 0; i < photos.gallery.length; i += 1) {
  await download(
    pexelsUrl(photos.gallery[i], 1400, 1050),
    path.join(ROOT, `${slug}-${i + 1}.jpg`),
  );
}

console.log(`Updated ${slug} photos.`);
