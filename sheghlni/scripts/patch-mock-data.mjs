import fs from "fs";

const dataPath = "src/lib/mock/data.ts";
let s = fs.readFileSync(dataPath, "utf8");

s = s.replace(
  /export const categories: Category\[\] = \[[\s\S]*?\];\n\nfunction unsplash/,
  "function unsplash",
);

s = s.replace(
  'import type { Category, Provider, Review, User } from "./types";',
  'import type { Provider, Review, User } from "./types";\nimport { categories } from "./categories-data";',
);

if (!s.includes("export { categories }")) {
  s = s.replace(
    "export { DEMO_USER_ID };",
    "export { DEMO_USER_ID };\nexport { categories };",
  );
}

if (!s.includes("isCustomer: true")) {
  s = s.replace(
    /(id: DEMO_USER_ID,[\s\S]*?isPro: false,)/,
    "$1\n    isCustomer: true,",
  );
  s = s.replace(
    /isPro: true,\n    createdAt/g,
    "isPro: true,\n    isCustomer: false,\n    createdAt",
  );
  s = s.replace(
    /isPro: false,\n    createdAt/g,
    "isPro: false,\n    isCustomer: false,\n    createdAt",
  );
}

const providerUserIds = [
  ...new Set(
    [...s.matchAll(/userId: "(user-[^"]+)"/g)].map((m) => m[1]),
  ),
];
for (const uid of providerUserIds) {
  const re = new RegExp(
    `(id: "${uid}",[\\s\\S]*?isPro: )false(,\\n    isCustomer:)`,
  );
  s = s.replace(re, "$1true$2");
}

const cityMap = {
  "Los Angeles, CA": ["Los Angeles", "CA"],
  "Boston, MA": ["Boston", "MA"],
  "Austin, TX": ["Austin", "TX"],
  "Chicago, IL": ["Chicago", "IL"],
};
for (const [old, [city, region]] of Object.entries(cityMap)) {
  s = s.replaceAll(
    `baseCityState: "${old}",`,
    `baseCity: "${city}",\n    baseRegion: "${region}",\n    baseCountry: "US",`,
  );
}

if (!s.includes("stripePayoutsEnabled")) {
  s = s.replaceAll(
    "stripeChargesEnabled: true,\n    badges:",
    "stripeChargesEnabled: true,\n    stripePayoutsEnabled: true,\n    acceptanceRatePct: 90,\n    badges:",
  );
}

if (!s.includes("acceptanceRatePct: 94")) {
  s = s.replaceAll(
    "responseRatePct: 98,\n    completedJobsCount:",
    "responseRatePct: 98,\n    acceptanceRatePct: 94,\n    completedJobsCount:",
  );
  s = s.replaceAll(
    "responseRatePct: 100,\n    completedJobsCount:",
    "responseRatePct: 100,\n    acceptanceRatePct: 96,\n    completedJobsCount:",
  );
}

fs.writeFileSync(dataPath, s);
console.log("data.ts patched");
