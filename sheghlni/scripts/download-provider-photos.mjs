import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { CURATED_PHOTOS } from "./provider-photo-curated.mjs";

const ROOT = path.join(process.cwd(), "public", "images", "providers");
const AVATAR_ROOT = path.join(ROOT, "avatars");

function pexelsUrl(photoId, width, height) {
  return `https://images.pexels.com/photos/${photoId}/pexels-photo-${photoId}.jpeg?auto=compress&cs=tinysrgb&w=${width}&h=${height}&fit=crop`;
}

async function downloadImage(url, dest) {
  const res = await fetch(url, {
    headers: { "User-Agent": "SheghlniMock/1.0 (curated demo assets)" },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 12_000) {
    throw new Error(`Suspiciously small file (${buf.length} bytes) for ${dest}`);
  }
  await writeFile(dest, buf);
  console.log("OK", path.basename(dest), `${Math.round(buf.length / 1024)}KB`);
}

await mkdir(ROOT, { recursive: true });
await mkdir(AVATAR_ROOT, { recursive: true });

for (const [slug, photos] of Object.entries(CURATED_PHOTOS)) {
  await downloadImage(
    pexelsUrl(photos.hero, 1400, 1050),
    path.join(ROOT, `${slug}.jpg`),
  );
  await new Promise((r) => setTimeout(r, 350));

  for (let i = 0; i < photos.gallery.length; i += 1) {
    const slot = i + 1;
    await downloadImage(
      pexelsUrl(photos.gallery[i], 1400, 1050),
      path.join(ROOT, `${slug}-${slot}.jpg`),
    );
    await new Promise((r) => setTimeout(r, 350));
  }

  await downloadImage(
    pexelsUrl(photos.avatar, 480, 480),
    path.join(AVATAR_ROOT, `${slug}.jpg`),
  );
  await new Promise((r) => setTimeout(r, 350));
}

console.log(
  "Done —",
  Object.keys(CURATED_PHOTOS).length,
  "service categories with hero + 6 gallery + avatar (Pexels, service-matched).",
);
