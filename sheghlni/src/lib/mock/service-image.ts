export type ServiceSlug =
  | "photography"
  | "electrician"
  | "fitness"
  | "cleaning"
  | "design"
  | "pet-care"
  | "tutoring"
  | "painting"
  | "hair-beauty"
  | "handyman"
  | "events"
  | "tech"
  | "auto"
  | "business"
  | "plumbing"
  | "music"
  | "video"
  | "wellness"
  | "hvac"
  | "dj"
  | "web-dev"
  | "chef"
  | "portrait";

type ServiceTheme = {
  label: string;
  from: string;
  to: string;
  accent: string;
};

const THEMES: Record<ServiceSlug, ServiceTheme> = {
  photography: { label: "Photography", from: "#1B2546", to: "#4A3728", accent: "#E8C9A0" },
  electrician: { label: "Electrical", from: "#101935", to: "#2C3E6B", accent: "#F5D76E" },
  fitness: { label: "Fitness", from: "#1A2E24", to: "#3D5A45", accent: "#A8C5A0" },
  cleaning: { label: "Cleaning", from: "#1E2A3A", to: "#4A6B8A", accent: "#B8D4E8" },
  design: { label: "Design", from: "#2A1F3D", to: "#5C4A72", accent: "#D4A5E8" },
  "pet-care": { label: "Pet Care", from: "#2A2418", to: "#6B5A3E", accent: "#E8C89A" },
  tutoring: { label: "Tutoring", from: "#1A2838", to: "#3A5068", accent: "#90C2E7" },
  painting: { label: "Painting", from: "#2E2218", to: "#6B4E35", accent: "#E8A87C" },
  "hair-beauty": { label: "Hair & Beauty", from: "#2A1828", to: "#6B3A58", accent: "#F0A8C8" },
  handyman: { label: "Handyman", from: "#222018", to: "#5A5040", accent: "#C8B090" },
  events: { label: "Events", from: "#281828", to: "#5A3868", accent: "#D8A8E8" },
  tech: { label: "Tech Support", from: "#101828", to: "#2A4060", accent: "#68B0E8" },
  auto: { label: "Auto Detailing", from: "#181C28", to: "#3A4560", accent: "#A0B8D8" },
  business: { label: "Business", from: "#1A2028", to: "#3A4858", accent: "#B0C0D0" },
  plumbing: { label: "Plumbing", from: "#142030", to: "#2A5070", accent: "#70C0E8" },
  music: { label: "Music Lessons", from: "#201828", to: "#503858", accent: "#C898D8" },
  video: { label: "Videography", from: "#181828", to: "#383858", accent: "#9898D8" },
  wellness: { label: "Wellness", from: "#182820", to: "#3A5848", accent: "#98C8A8" },
  hvac: { label: "HVAC", from: "#182028", to: "#3A5060", accent: "#88C8E0" },
  dj: { label: "DJ Services", from: "#201020", to: "#502050", accent: "#E080C0" },
  "web-dev": { label: "Web Development", from: "#101820", to: "#284060", accent: "#60A0E0" },
  chef: { label: "Private Chef", from: "#281810", to: "#604030", accent: "#E8A060" },
  portrait: { label: "Pro", from: "#1B2546", to: "#3A4560", accent: "#C8D0E0" },
};

const KEYWORD_RULES: { slug: ServiceSlug; pattern: RegExp }[] = [
  { slug: "dj", pattern: /\bdj\b|turntable|vinyl|beats/ },
  { slug: "events", pattern: /event|planning|party|table|floral/ },
  { slug: "photography", pattern: /photo|photographer|camera|engagement|bride|couple|wedding|portrait/ },
  { slug: "electrician", pattern: /electric|wiring|panel|charger|lighting/ },
  { slug: "fitness", pattern: /yoga|fitness|instructor|workout|training/ },
  { slug: "cleaning", pattern: /clean|house|maid|sparkle/ },
  { slug: "design", pattern: /design|graphic|studio|creative|brand/ },
  { slug: "pet-care", pattern: /dog|cat|pet|groom|puppy|walk/ },
  { slug: "tutoring", pattern: /tutor|student|teacher|lesson|sat|math/ },
  { slug: "painting", pattern: /paint|interior|wall/ },
  { slug: "hair-beauty", pattern: /hair|stylist|salon|braid|curl|beauty/ },
  { slug: "handyman", pattern: /handyman|repair|tools|furniture|mount|drywall/ },
  { slug: "tech", pattern: /tech|it\b|support|computer|wifi|cyber/ },
  { slug: "auto", pattern: /car|auto|detail|vehicle/ },
  { slug: "business", pattern: /account|business|assistant|office|bookkeep/ },
  { slug: "plumbing", pattern: /plumb|pipe|faucet|drain/ },
  { slug: "music", pattern: /piano|music|guitar|violin/ },
  { slug: "video", pattern: /video|film|videograph/ },
  { slug: "wellness", pattern: /massage|therapy|wellness|spa/ },
  { slug: "hvac", pattern: /hvac|air|heat|cool|furnace/ },
  { slug: "web-dev", pattern: /web|developer|code|software|app/ },
  { slug: "chef", pattern: /chef|cook|kitchen|culinary/ },
  { slug: "portrait", pattern: /portrait|person|man|woman|professional/ },
];

export function resolveServiceSlug(keyword: string): ServiceSlug {
  const normalized = keyword.toLowerCase();
  for (const rule of KEYWORD_RULES) {
    if (rule.pattern.test(normalized)) return rule.slug;
  }
  return "portrait";
}

function hashKeyword(keyword: string): number {
  let hash = 0;
  for (let i = 0; i < keyword.length; i += 1) {
    hash = (hash * 31 + keyword.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function iconMarkup(slug: ServiceSlug, cx: number, cy: number, scale: number): string {
  const s = scale;
  const icons: Record<ServiceSlug, string> = {
    photography: `<rect x="${cx - 44 * s}" y="${cy - 28 * s}" width="${88 * s}" height="${56 * s}" rx="${8 * s}" fill="none" stroke="currentColor" stroke-width="${4 * s}"/><circle cx="${cx}" cy="${cy}" r="${18 * s}" fill="none" stroke="currentColor" stroke-width="${4 * s}"/><circle cx="${cx + 28 * s}" cy="${cy - 18 * s}" r="${5 * s}" fill="currentColor"/>`,
    electrician: `<path d="M${cx} ${cy - 40 * s} L${cx - 18 * s} ${cy + 2 * s} H${cx + 6 * s} L${cx - 8 * s} ${cy + 40 * s} L${cx + 22 * s} ${cy - 6 * s} H${cx - 2 * s} Z" fill="currentColor"/>`,
    fitness: `<circle cx="${cx}" cy="${cy - 22 * s}" r="${14 * s}" fill="currentColor"/><path d="M${cx - 30 * s} ${cy + 30 * s} Q${cx} ${cy - 8 * s} ${cx + 30 * s} ${cy + 30 * s}" fill="none" stroke="currentColor" stroke-width="${5 * s}" stroke-linecap="round"/>`,
    cleaning: `<rect x="${cx - 12 * s}" y="${cy - 36 * s}" width="${24 * s}" height="${48 * s}" rx="${6 * s}" fill="currentColor"/><path d="M${cx - 20 * s} ${cy - 36 * s} Q${cx} ${cy - 52 * s} ${cx + 20 * s} ${cy - 36 * s}" fill="none" stroke="currentColor" stroke-width="${4 * s}"/><circle cx="${cx + 28 * s}" cy="${cy - 20 * s}" r="${4 * s}" fill="currentColor" opacity="0.7"/><circle cx="${cx + 36 * s}" cy="${cy - 8 * s}" r="${3 * s}" fill="currentColor" opacity="0.5"/>`,
    design: `<path d="M${cx + 30 * s} ${cy - 30 * s} L${cx - 10 * s} ${cy + 10 * s} L${cx - 30 * s} ${cy + 30 * s} L${cx - 10 * s} ${cy + 10 * s} Z" fill="currentColor"/><circle cx="${cx - 24 * s}" cy="${cy + 24 * s}" r="${6 * s}" fill="currentColor"/>`,
    "pet-care": `<circle cx="${cx - 14 * s}" cy="${cy - 10 * s}" r="${8 * s}" fill="currentColor"/><circle cx="${cx + 14 * s}" cy="${cy - 10 * s}" r="${8 * s}" fill="currentColor"/><circle cx="${cx - 24 * s}" cy="${cy + 4 * s}" r="${7 * s}" fill="currentColor"/><circle cx="${cx + 24 * s}" cy="${cy + 4 * s}" r="${7 * s}" fill="currentColor"/><ellipse cx="${cx}" cy="${cy + 16 * s}" rx="${28 * s}" ry="${22 * s}" fill="currentColor"/>`,
    tutoring: `<path d="M${cx - 36 * s} ${cy - 20 * s} L${cx} ${cy - 36 * s} L${cx + 36 * s} ${cy - 20 * s} V${cy + 16 * s} L${cx} ${cy + 32 * s} L${cx - 36 * s} ${cy + 16 * s} Z" fill="none" stroke="currentColor" stroke-width="${4 * s}"/><line x1="${cx}" y1="${cy - 36 * s}" x2="${cx}" y2="${cy + 32 * s}" stroke="currentColor" stroke-width="${3 * s}"/>`,
    painting: `<rect x="${cx - 36 * s}" y="${cy - 28 * s}" width="${48 * s}" height="${36 * s}" rx="${4 * s}" fill="none" stroke="currentColor" stroke-width="${4 * s}"/><rect x="${cx + 8 * s}" y="${cy - 8 * s}" width="${28 * s}" height="${8 * s}" rx="${2 * s}" fill="currentColor"/><rect x="${cx - 4 * s}" y="${cy + 12 * s}" width="${8 * s}" height="${28 * s}" fill="currentColor"/>`,
    "hair-beauty": `<circle cx="${cx - 16 * s}" cy="${cy + 20 * s}" r="${10 * s}" fill="none" stroke="currentColor" stroke-width="${4 * s}"/><circle cx="${cx + 16 * s}" cy="${cy + 20 * s}" r="${10 * s}" fill="none" stroke="currentColor" stroke-width="${4 * s}"/><line x1="${cx - 6 * s}" y1="${cy - 30 * s}" x2="${cx + 6 * s}" y2="${cy + 10 * s}" stroke="currentColor" stroke-width="${4 * s}"/><line x1="${cx + 6 * s}" y1="${cy - 30 * s}" x2="${cx - 6 * s}" y2="${cy + 10 * s}" stroke="currentColor" stroke-width="${4 * s}"/>`,
    handyman: `<path d="M${cx - 32 * s} ${cy + 24 * s} L${cx + 8 * s} ${cy - 16 * s} L${cx + 20 * s} ${cy - 4 * s} L${cx - 20 * s} ${cy + 36 * s} Z" fill="currentColor"/><rect x="${cx + 8 * s}" y="${cy - 36 * s}" width="${10 * s}" height="${36 * s}" rx="${2 * s}" transform="rotate(45 ${cx + 13 * s} ${cy - 18 * s})" fill="currentColor"/>`,
    events: `<rect x="${cx - 32 * s}" y="${cy - 28 * s}" width="${64 * s}" height="${52 * s}" rx="${6 * s}" fill="none" stroke="currentColor" stroke-width="${4 * s}"/><line x1="${cx - 32 * s}" y1="${cy - 8 * s}" x2="${cx + 32 * s}" y2="${cy - 8 * s}" stroke="currentColor" stroke-width="${3 * s}"/><circle cx="${cx}" cy="${cy + 12 * s}" r="${8 * s}" fill="currentColor"/>`,
    tech: `<rect x="${cx - 40 * s}" y="${cy - 24 * s}" width="${80 * s}" height="${48 * s}" rx="${6 * s}" fill="none" stroke="currentColor" stroke-width="${4 * s}"/><rect x="${cx - 36 * s}" y="${cy - 20 * s}" width="${72 * s}" height="${36 * s}" rx="${2 * s}" fill="currentColor" opacity="0.35"/><line x1="${cx - 28 * s}" y1="${cy - 8 * s}" x2="${cx + 12 * s}" y2="${cy - 8 * s}" stroke="currentColor" stroke-width="${3 * s}"/>`,
    auto: `<path d="M${cx - 40 * s} ${cy + 8 * s} H${cx + 40 * s} L${cx + 28 * s} ${cy - 16 * s} H${cx - 28 * s} Z" fill="currentColor"/><circle cx="${cx - 22 * s}" cy="${cy + 12 * s}" r="${10 * s}" fill="none" stroke="currentColor" stroke-width="${4 * s}"/><circle cx="${cx + 22 * s}" cy="${cy + 12 * s}" r="${10 * s}" fill="none" stroke="currentColor" stroke-width="${4 * s}"/>`,
    business: `<rect x="${cx - 32 * s}" y="${cy - 20 * s}" width="${64 * s}" height="${44 * s}" rx="${6 * s}" fill="none" stroke="currentColor" stroke-width="${4 * s}"/><path d="M${cx - 32 * s} ${cy - 8 * s} H${cx + 32 * s}" stroke="currentColor" stroke-width="${3 * s}"/><rect x="${cx - 12 * s}" y="${cy - 32 * s}" width="${24 * s}" height="${12 * s}" rx="${2 * s}" fill="currentColor"/>`,
    plumbing: `<path d="M${cx - 8 * s} ${cy - 36 * s} V${cy + 8 * s} Q${cx} ${cy + 20 * s} ${cx + 8 * s} ${cy + 8 * s} V${cy - 36 * s}" fill="none" stroke="currentColor" stroke-width="${4 * s}"/><ellipse cx="${cx}" cy="${cy + 28 * s}" rx="${6 * s}" ry="${10 * s}" fill="currentColor"/>`,
    music: `<rect x="${cx - 36 * s}" y="${cy - 24 * s}" width="${12 * s}" height="${48 * s}" fill="currentColor"/><rect x="${cx - 18 * s}" y="${cy - 32 * s}" width="${12 * s}" height="${56 * s}" fill="currentColor"/><rect x="${cx}" y="${cy - 20 * s}" width="${12 * s}" height="${44 * s}" fill="currentColor"/><rect x="${cx + 18 * s}" y="${cy - 28 * s}" width="${12 * s}" height="${52 * s}" fill="currentColor"/>`,
    video: `<rect x="${cx - 36 * s}" y="${cy - 24 * s}" width="${56 * s}" height="${40 * s}" rx="${4 * s}" fill="none" stroke="currentColor" stroke-width="${4 * s}"/><path d="M${cx + 20 * s} ${cy - 12 * s} L${cx + 40 * s} ${cy - 24 * s} V${cy + 24 * s} L${cx + 20 * s} ${cy + 12 * s} Z" fill="currentColor"/>`,
    wellness: `<path d="M${cx - 24 * s} ${cy} Q${cx - 24 * s} ${cy - 28 * s} ${cx} ${cy - 16 * s} Q${cx + 24 * s} ${cy - 28 * s} ${cx + 24 * s} ${cy} Q${cx + 24 * s} ${cy + 28 * s} ${cx} ${cy + 16 * s} Q${cx - 24 * s} ${cy + 28 * s} ${cx - 24 * s} ${cy} Z" fill="none" stroke="currentColor" stroke-width="${4 * s}"/>`,
    hvac: `<circle cx="${cx}" cy="${cy}" r="${28 * s}" fill="none" stroke="currentColor" stroke-width="${4 * s}"/><path d="M${cx} ${cy - 28 * s} V${cy + 28 * s} M${cx - 24 * s} ${cy - 14 * s} L${cx + 24 * s} ${cy + 14 * s} M${cx - 24 * s} ${cy + 14 * s} L${cx + 24 * s} ${cy - 14 * s}" stroke="currentColor" stroke-width="${3 * s}"/>`,
    dj: `<circle cx="${cx}" cy="${cy}" r="${30 * s}" fill="none" stroke="currentColor" stroke-width="${4 * s}"/><circle cx="${cx}" cy="${cy}" r="${10 * s}" fill="currentColor"/><circle cx="${cx}" cy="${cy}" r="${3 * s}" fill="none" stroke="currentColor" stroke-width="${2 * s}"/>`,
    "web-dev": `<text x="${cx}" y="${cy + 8 * s}" text-anchor="middle" fill="currentColor" font-family="ui-monospace,monospace" font-size="${36 * s}" font-weight="700">&lt;/&gt;</text>`,
    chef: `<path d="M${cx - 28 * s} ${cy - 8 * s} Q${cx - 28 * s} ${cy - 36 * s} ${cx} ${cy - 36 * s} Q${cx + 28 * s} ${cy - 36 * s} ${cx + 28 * s} ${cy - 8 * s} Z" fill="currentColor"/><rect x="${cx - 20 * s}" y="${cy - 4 * s}" width="${40 * s}" height="${24 * s}" rx="${4 * s}" fill="none" stroke="currentColor" stroke-width="${4 * s}"/>`,
    portrait: `<circle cx="${cx}" cy="${cy - 16 * s}" r="${18 * s}" fill="currentColor"/><path d="M${cx - 32 * s} ${cy + 36 * s} Q${cx} ${cy + 4 * s} ${cx + 32 * s} ${cy + 36 * s}" fill="currentColor"/>`,
  };
  return icons[slug];
}

export function buildServiceImageSvg(
  keyword: string,
  width: number,
  height: number,
): string {
  const slug = resolveServiceSlug(keyword);
  const theme = THEMES[slug];
  const isAvatar = width <= 320 && height <= 320;
  const variant = hashKeyword(keyword) % 3;
  const uid = `g-${slug}-${width}-${variant}`;

  const cx = width / 2;
  const cy = isAvatar ? height * 0.46 : height * 0.44;
  const iconScale = isAvatar ? 0.55 : 1;
  const icon = isAvatar
    ? iconMarkup("portrait", cx, cy, iconScale)
    : iconMarkup(slug, cx, cy, iconScale);

  const patternOffset = variant * 40;
  const label = isAvatar
    ? ""
    : `<text x="${cx}" y="${height - 36}" text-anchor="middle" fill="rgba(255,255,255,0.82)" font-family="system-ui,sans-serif" font-size="${Math.round(width * 0.028)}" font-weight="600" letter-spacing="0.04em">${theme.label}</text>`;

  const avatarBadge =
    isAvatar && slug !== "portrait"
      ? `<g transform="translate(${width - 52}, ${height - 52})" color="${theme.accent}">${iconMarkup(slug, 18, 18, 0.35)}</g>`
      : "";

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${theme.label}">
  <defs>
    <linearGradient id="${uid}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${theme.from}"/>
      <stop offset="100%" stop-color="${theme.to}"/>
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#${uid})"/>
  <circle cx="${width * 0.82 + patternOffset}" cy="${height * 0.18}" r="${Math.min(width, height) * 0.22}" fill="${theme.accent}" opacity="0.08"/>
  <circle cx="${width * 0.12}" cy="${height * 0.78}" r="${Math.min(width, height) * 0.16}" fill="${theme.accent}" opacity="0.06"/>
  <g color="${theme.accent}">${icon}</g>
  ${label}
  ${avatarBadge}
</svg>`;
}

export function serviceImageDataUrl(
  keyword: string,
  width: number,
  height: number,
): string {
  const svg = buildServiceImageSvg(keyword, width, height);
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
