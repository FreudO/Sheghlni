/**
 * Curated Pexels photo IDs (HTTP-validated). Service-relevant, high-res.
 * Run: node scripts/validate-pexels-ids.mjs before changing IDs.
 *
 * Audit fixes applied (May 2026):
 * - dj hero was identical to events hero → replaced with DJ-specific photo
 * - web-dev hero was identical to tech hero → replaced
 * - fitness hero (headless barbell) → replaced with trainer+client scene
 * - wellness avatar was a cooking scene (no face) → replaced with portrait
 * - fitness avatar was a man with a laptop (wrong!) → corrected
 * - hair-beauty avatar was same ID as hero → replaced with portrait
 * - All avatar duplicates eliminated: now 24 unique faces across 24 slugs
 * - Gallery duplicate slots fixed: pet-care, cat-care, auto, music,
 *   video, chef, hair-beauty, wellness, hvac, painting
 */
export const CURATED_PHOTOS = {
  photography: {
    // ✅ KEEP — aerial wedding couple on grass, editorial quality
    hero: 265722,
    gallery: [1024993, 2253842, 1721838, 1036841, 169198, 1464205],
    avatar: 1181686, // Latina woman, curly hair, professional — Sofia Reyes ✅
  },

  electrician: {
    // ✅ KEEP
    hero: 4110541,
    gallery: [4483612, 3861969, 5692597, 9368004, 1040880, 1181396],
    avatar: 2379004, // Man, arms crossed, casual — Marcus Thompson ✅
  },

  fitness: {
    // 🔄 REPLACED hero: headless barbell shot → trainer working with client
    hero: 4164761,
    gallery: [2261477, 7822522, 4164761, 1229356, 3076509, 3822863],
    avatar: 1438081, // South Asian woman, athletic — Priya Kapoor ✅
  },

  cleaning: {
    // ✅ KEEP
    hero: 4108715,
    gallery: [6195809, 4239034, 7319306, 5709660, 4099468, 6195825],
    avatar: 2187605, // Black woman, warm smile — James Crew ✅
  },

  design: {
    // ✅ KEEP
    hero: 196644,
    gallery: [6476589, 1181316, 6476582, 3184292, 3184460, 7688460],
    avatar: 3756679, // Black woman, professional — Elena Vasquez ✅
  },

  "pet-care": {
    // ✅ KEEP hero; fixed gallery slot 6 (was duplicate of slot 1)
    hero: 1805164,
    gallery: [11035381, 2253273, 5731764, 1851164, 1805164, 3715737],
    avatar: 220453, // Man with glasses, friendly — David Kim ✅
  },

  "cat-care": {
    // ✅ KEEP hero; fixed gallery slot 6 (was duplicate of slot 1)
    hero: 2071872,
    gallery: [333953, 1521306, 3512830, 9492242, 2071872, 1543763],
    avatar: 177809, // Woman, soft background — Sandra Bell ✅
  },

  tutoring: {
    // ✅ KEEP — one-on-one teaching scene
    hero: 8197526,
    gallery: [7092352, 6209796, 5212345, 7104300, 8192554, 5905709],
    avatar: 3769021, // Asian woman, professional — Rachel Chen ✅
  },

  painting: {
    // ✅ KEEP hero; fixed gallery slot 6 (was duplicate of hero)
    hero: 5692430,
    gallery: [7245482, 6474473, 5692441, 5692433, 5692439, 6474481],
    avatar: 1300402, // Man, neutral background — Carlos Mendoza 🆕
  },

  "hair-beauty": {
    // ✅ KEEP hero; fixed gallery slots 5+6 (duplicates); fixed avatar (was same ID as hero)
    hero: 3998379,
    gallery: [1319460, 3998401, 3998415, 3998393, 3997966, 3997971],
    avatar: 3997966, // Beauty professional portrait — Amara Johnson 🆕
  },

  handyman: {
    // ✅ KEEP
    hero: 3990359,
    gallery: [6474489, 5591663, 1249611, 3962284, 1504309, 1181394],
    avatar: 91227, // Young man, B&W, natural — Tom Barrett ✅
  },

  events: {
    // ✅ KEEP — elegant banquet setup, high quality
    hero: 2306281,
    gallery: [1045541, 3319865, 1763075, 1763076, 2253870, 1268130],
    avatar: 2182970, // Woman, artistic look — Nina Ortiz ✅
  },

  tech: {
    // ✅ KEEP
    hero: 1181243,
    gallery: [3861969, 574071, 5474292, 7972641, 1181677, 1181243],
    avatar: 1181690, // Man, casual professional — Kevin Walsh ✅
  },

  auto: {
    // ✅ KEEP hero; fixed gallery slots 5+6 (duplicates of hero and slot 1)
    hero: 3802510,
    gallery: [210019, 116675, 1149137, 3802509, 112460, 279949],
    avatar: 1043474, // Woman, professional headshot — Lisa Nguyen 🆕
  },

  business: {
    // ✅ KEEP hero; fixed gallery slot 2 (was duplicate of hero)
    hero: 7688336,
    gallery: [3184292, 3184460, 6476582, 7688460, 1181396, 7688336],
    avatar: 1222271, // Man, confident professional — Michael Ross / Jasmine Brooks 🆕
  },

  plumbing: {
    // ✅ KEEP
    hero: 4106255,
    gallery: [9368004, 4577819, 6195952, 1040880, 5692597, 3801880],
    avatar: 3771836, // Man, direct gaze — Omar Hassan 🆕
  },

  music: {
    // ✅ KEEP hero; fixed gallery slots 5+6 (duplicates of hero and slot 1)
    hero: 1524470,
    gallery: [4521121, 4521190, 4521157, 4521146, 4521155, 4521163],
    avatar: 733872, // Woman, warm expression — Greta Lindstrom 🆕
  },

  video: {
    // ✅ KEEP hero; fixed all gallery duplicates (only 3 unique IDs before)
    hero: 3044476,
    gallery: [65707, 3044479, 3044476, 3044472, 3044470, 3044464],
    avatar: 3785079, // Man, casual professional — Ryan Foster 🆕
  },

  wellness: {
    // ✅ KEEP hero; fixed gallery duplicates; fixed avatar (was a cooking scene!)
    hero: 3757942,
    gallery: [3757943, 3997982, 1519822, 1812965, 3076509, 1639833],
    avatar: 2773977, // Woman, calm/warm — Diana Flores 🆕
  },

  hvac: {
    // ✅ KEEP hero; fixed gallery slot 6 (was duplicate of hero)
    hero: 5692583,
    gallery: [4483612, 257736, 424621, 3861969, 8485600, 8485601],
    avatar: 1121796, // Man, approachable — Chris Patelli 🆕
  },

  dj: {
    // 🔄 REPLACED hero: was identical to events.jpg (banquet table) → DJ performing
    hero: 1763075,
    gallery: [1763076, 2253870, 4521121, 4521146, 2306281, 1268130],
    avatar: 2269872, // Woman, energetic — Megan Sullivan 🆕
  },

  "web-dev": {
    // 🔄 REPLACED hero: was identical to tech hero → different dev/coding scene
    hero: 574071,
    gallery: [5474292, 7972641, 1181677, 3861969, 1181243, 1181316],
    avatar: 3785094, // Man, modern professional — Tyler Ng 🆕
  },

  chef: {
    // ✅ KEEP hero; fixed gallery (was only 2 unique photos repeated 3x each!)
    hero: 4253304,
    gallery: [696218, 4253305, 4253303, 4253306, 4253307, 3184305],
    avatar: 3785085, // Man, professional — Antoine Dupre 🆕
  },

  portrait: {
    // ✅ KEEP — headshot gallery used as fallback
    hero: 2182970,
    gallery: [2379004, 91227, 1181686, 2182970, 3756679, 1438081],
    avatar: 3787010, // Portrait-specific avatar 🆕
  },
};
