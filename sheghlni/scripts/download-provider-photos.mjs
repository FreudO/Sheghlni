import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = path.join(process.cwd(), "public", "images", "providers");
const AVATAR_ROOT = path.join(ROOT, "avatars");
const GALLERY_SLOTS = 6;

/** Category tags for loremflickr — downloaded once and bundled locally. */
const HERO_TAGS = {
  photography: "wedding,photography",
  electrician: "electrician,electrical",
  fitness: "yoga,fitness",
  cleaning: "cleaning,housekeeping",
  design: "design,studio",
  "pet-care": "dog,grooming",
  tutoring: "tutoring,education",
  painting: "painting,interior",
  "hair-beauty": "hair,salon",
  handyman: "handyman,tools",
  events: "event,party",
  tech: "computer,technology",
  auto: "car,detailing",
  business: "office,business",
  plumbing: "plumbing,pipes",
  music: "piano,music",
  video: "videography,camera",
  wellness: "massage,spa",
  hvac: "airconditioning,hvac",
  dj: "dj,turntable",
  "web-dev": "coding,laptop",
  chef: "chef,cooking",
  portrait: "portrait,professional",
};

const AVATAR_TAGS = {
  photography: "woman,photographer",
  electrician: "man,contractor",
  fitness: "woman,fitness",
  cleaning: "man,cleaning",
  design: "woman,designer",
  "pet-care": "man,dog",
  tutoring: "woman,teacher",
  painting: "man,painter",
  "hair-beauty": "woman,hair",
  handyman: "man,tools",
  events: "woman,event",
  tech: "man,technology",
  auto: "woman,car",
  business: "man,business",
  plumbing: "man,plumber",
  music: "woman,piano",
  video: "man,camera",
  wellness: "woman,spa",
  hvac: "man,technician",
  dj: "woman,dj",
  "web-dev": "man,developer",
  chef: "man,chef",
  portrait: "portrait,person",
};

async function downloadFlickr(tags, dest, lock) {
  const url = `https://loremflickr.com/800/600/${tags}/all?lock=${lock}`;
  const res = await fetch(url, {
    headers: { "User-Agent": "SheghlniMock/1.0" },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(dest, buf);
  console.log("OK", path.basename(dest), `${Math.round(buf.length / 1024)}KB`);
}

async function downloadAvatar(tags, dest) {
  const url = `https://loremflickr.com/400/400/${tags}/all?lock=1`;
  const res = await fetch(url, {
    headers: { "User-Agent": "SheghlniMock/1.0" },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(dest, buf);
  console.log("OK", path.basename(dest), `${Math.round(buf.length / 1024)}KB`);
}

await mkdir(ROOT, { recursive: true });
await mkdir(AVATAR_ROOT, { recursive: true });

for (const [slug, tags] of Object.entries(HERO_TAGS)) {
  for (let slot = 1; slot <= GALLERY_SLOTS; slot += 1) {
    await downloadFlickr(tags, path.join(ROOT, `${slug}-${slot}.jpg`), slot);
    await new Promise((r) => setTimeout(r, 800));
  }
  await downloadFlickr(tags, path.join(ROOT, `${slug}.jpg`), 1);
  await new Promise((r) => setTimeout(r, 800));
}

for (const [slug, tags] of Object.entries(AVATAR_TAGS)) {
  await downloadAvatar(tags, path.join(AVATAR_ROOT, `${slug}.jpg`));
  await new Promise((r) => setTimeout(r, 800));
}

console.log(
  "Done —",
  Object.keys(HERO_TAGS).length,
  "categories x",
  GALLERY_SLOTS,
  "gallery + hero, and",
  Object.keys(AVATAR_TAGS).length,
  "avatars",
);
