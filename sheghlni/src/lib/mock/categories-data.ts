import { mockImageUrl } from "./mock-image-url";
import type { Category, PricingUnit } from "./types";

type SubcategoryDef = {
  slug: string;
  name: string;
  iconName: string;
  requiresLicense?: boolean;
  requiresBackgroundCheck?: boolean;
  requiresInsuranceProof?: boolean;
  defaultPricingUnit?: PricingUnit;
};

type TopLevelDef = {
  slug: string;
  name: string;
  iconName: string;
  requiresLicense?: boolean;
  requiresBackgroundCheck?: boolean;
  requiresInsuranceProof?: boolean;
  defaultPricingUnit: PricingUnit;
  subcategories: SubcategoryDef[];
};

const TAXONOMY: TopLevelDef[] = [
  {
    slug: "home-services",
    name: "Home Services",
    iconName: "home",
    requiresBackgroundCheck: true,
    defaultPricingUnit: "hour",
    subcategories: [
      { slug: "painting", name: "Painting", iconName: "paintbrush", defaultPricingUnit: "project" },
      { slug: "plumbing", name: "Plumbing", iconName: "droplets", requiresLicense: true, requiresInsuranceProof: true, defaultPricingUnit: "hour" },
      { slug: "electrical", name: "Electrical", iconName: "zap", requiresLicense: true, requiresInsuranceProof: true, defaultPricingUnit: "hour" },
      { slug: "hvac", name: "HVAC", iconName: "thermometer", requiresLicense: true, requiresInsuranceProof: true, defaultPricingUnit: "hour" },
      { slug: "carpentry-handyman", name: "Carpentry & Handyman", iconName: "hammer", requiresBackgroundCheck: true, defaultPricingUnit: "hour" },
      { slug: "roofing", name: "Roofing", iconName: "home", requiresLicense: true, requiresInsuranceProof: true, defaultPricingUnit: "project" },
      { slug: "landscaping-lawn-care", name: "Landscaping & Lawn Care", iconName: "trees", defaultPricingUnit: "hour" },
      { slug: "cleaning", name: "Cleaning", iconName: "sparkles", requiresBackgroundCheck: true, defaultPricingUnit: "hour" },
      { slug: "moving-hauling", name: "Moving & Hauling", iconName: "truck", defaultPricingUnit: "project" },
      { slug: "pest-control", name: "Pest Control", iconName: "bug", requiresLicense: true, defaultPricingUnit: "visit" },
      { slug: "flooring-tile", name: "Flooring & Tile", iconName: "grid-3x3", defaultPricingUnit: "project" },
      { slug: "drywall-insulation", name: "Drywall & Insulation", iconName: "layers", defaultPricingUnit: "project" },
      { slug: "pressure-washing", name: "Pressure Washing", iconName: "spray-can", defaultPricingUnit: "hour" },
      { slug: "pool-spa", name: "Pool & Spa", iconName: "waves", requiresLicense: true, defaultPricingUnit: "visit" },
      { slug: "locksmith", name: "Locksmith", iconName: "key-round", requiresLicense: true, requiresBackgroundCheck: true, defaultPricingUnit: "visit" },
      { slug: "smart-home-installation", name: "Smart Home Installation", iconName: "cpu", defaultPricingUnit: "hour" },
      { slug: "interior-design-staging", name: "Interior Design & Staging", iconName: "sofa", defaultPricingUnit: "project" },
      { slug: "appliance-repair", name: "Appliance Repair", iconName: "refrigerator", defaultPricingUnit: "visit" },
    ],
  },
  {
    slug: "personal-care-wellness",
    name: "Personal Care & Wellness",
    iconName: "heart-pulse",
    defaultPricingUnit: "session",
    subcategories: [
      { slug: "hair", name: "Hair", iconName: "scissors", requiresLicense: true, defaultPricingUnit: "session" },
      { slug: "makeup-nails", name: "Makeup & Nails", iconName: "sparkle", requiresLicense: true, defaultPricingUnit: "session" },
      { slug: "massage-therapy", name: "Massage Therapy", iconName: "hand", requiresLicense: true, requiresBackgroundCheck: true, defaultPricingUnit: "session" },
      { slug: "personal-training-fitness", name: "Personal Training & Fitness", iconName: "dumbbell", requiresBackgroundCheck: true, defaultPricingUnit: "session" },
      { slug: "yoga-pilates", name: "Yoga / Pilates Instructor", iconName: "activity", defaultPricingUnit: "session" },
      { slug: "nutrition-coaching", name: "Nutrition Coaching", iconName: "apple", defaultPricingUnit: "session" },
      { slug: "therapy-counseling", name: "Therapy & Counseling", iconName: "brain", requiresLicense: true, requiresBackgroundCheck: true, defaultPricingUnit: "session" },
    ],
  },
  {
    slug: "creative-media",
    name: "Creative & Media",
    iconName: "camera",
    defaultPricingUnit: "project",
    subcategories: [
      { slug: "photography", name: "Photography", iconName: "camera", defaultPricingUnit: "project" },
      { slug: "videography", name: "Videography", iconName: "video", defaultPricingUnit: "project" },
      { slug: "graphic-design", name: "Graphic Design", iconName: "palette", defaultPricingUnit: "project" },
      { slug: "web-app-design-development", name: "Web & App Design / Development", iconName: "code", defaultPricingUnit: "project" },
      { slug: "illustration", name: "Illustration", iconName: "pen-tool", defaultPricingUnit: "project" },
      { slug: "music", name: "Music", iconName: "music", defaultPricingUnit: "session" },
      { slug: "writing-editing", name: "Writing & Editing", iconName: "pen-line", defaultPricingUnit: "project" },
    ],
  },
  {
    slug: "events",
    name: "Events",
    iconName: "party-popper",
    requiresBackgroundCheck: true,
    defaultPricingUnit: "project",
    subcategories: [
      { slug: "wedding-planning", name: "Wedding Planning", iconName: "heart", defaultPricingUnit: "project" },
      { slug: "event-planning-coordination", name: "Event Planning & Coordination", iconName: "calendar", defaultPricingUnit: "project" },
      { slug: "catering-private-chefs", name: "Catering & Private Chefs", iconName: "utensils", requiresLicense: true, defaultPricingUnit: "project" },
      { slug: "bartending", name: "Bartending", iconName: "wine", requiresLicense: true, defaultPricingUnit: "hour" },
      { slug: "floristry", name: "Floristry", iconName: "flower-2", defaultPricingUnit: "project" },
      { slug: "photo-booth", name: "Photo Booth", iconName: "camera", defaultPricingUnit: "project" },
      { slug: "mc-officiant", name: "MC / Officiant", iconName: "mic", defaultPricingUnit: "project" },
      { slug: "rental-equipment-setup", name: "Rental Equipment Setup", iconName: "package", defaultPricingUnit: "project" },
    ],
  },
  {
    slug: "education-tutoring",
    name: "Education & Tutoring",
    iconName: "graduation-cap",
    requiresBackgroundCheck: true,
    defaultPricingUnit: "hour",
    subcategories: [
      { slug: "academic-tutoring", name: "Academic Tutoring", iconName: "book-open", defaultPricingUnit: "hour" },
      { slug: "test-prep", name: "Test Prep", iconName: "clipboard-check", defaultPricingUnit: "hour" },
      { slug: "language-tutoring", name: "Language Tutoring", iconName: "languages", defaultPricingUnit: "hour" },
      { slug: "music-lessons", name: "Music Lessons", iconName: "music-2", defaultPricingUnit: "hour" },
      { slug: "art-lessons", name: "Art Lessons", iconName: "palette", defaultPricingUnit: "hour" },
      { slug: "coding-tech-lessons", name: "Coding & Tech Lessons", iconName: "code-2", defaultPricingUnit: "hour" },
      { slug: "driving-instruction", name: "Driving Instruction", iconName: "car", requiresLicense: true, defaultPricingUnit: "session" },
    ],
  },
  {
    slug: "tech-it",
    name: "Tech & IT",
    iconName: "laptop",
    defaultPricingUnit: "hour",
    subcategories: [
      { slug: "computer-phone-repair", name: "Computer & Phone Repair", iconName: "smartphone", defaultPricingUnit: "hour" },
      { slug: "it-support-network-setup", name: "IT Support / Network Setup", iconName: "wifi", defaultPricingUnit: "hour" },
      { slug: "audio-video-installation", name: "Audio/Video Installation", iconName: "speaker", defaultPricingUnit: "hour" },
      { slug: "data-recovery", name: "Data Recovery", iconName: "hard-drive", defaultPricingUnit: "project" },
      { slug: "cybersecurity-consulting", name: "Cybersecurity Consulting", iconName: "shield", defaultPricingUnit: "hour" },
    ],
  },
  {
    slug: "auto",
    name: "Auto",
    iconName: "car",
    defaultPricingUnit: "visit",
    subcategories: [
      { slug: "mobile-mechanic", name: "Mobile Mechanic", iconName: "wrench", requiresLicense: true, defaultPricingUnit: "hour" },
      { slug: "detailing", name: "Detailing", iconName: "spray-can", defaultPricingUnit: "visit" },
      { slug: "tire-service", name: "Tire Service", iconName: "circle", defaultPricingUnit: "visit" },
      { slug: "towing", name: "Towing", iconName: "truck", requiresLicense: true, defaultPricingUnit: "visit" },
      { slug: "mobile-car-wash", name: "Mobile Car Wash", iconName: "droplets", defaultPricingUnit: "visit" },
    ],
  },
  {
    slug: "pet-services",
    name: "Pet Services",
    iconName: "paw-print",
    requiresBackgroundCheck: true,
    defaultPricingUnit: "visit",
    subcategories: [
      { slug: "dog-walking", name: "Dog Walking", iconName: "footprints", requiresBackgroundCheck: true, defaultPricingUnit: "visit" },
      { slug: "pet-sitting-boarding", name: "Pet Sitting / Boarding", iconName: "house", requiresBackgroundCheck: true, defaultPricingUnit: "visit" },
      { slug: "grooming", name: "Grooming", iconName: "scissors", defaultPricingUnit: "visit" },
      { slug: "training", name: "Training", iconName: "bone", defaultPricingUnit: "session" },
      { slug: "mobile-vet", name: "Mobile Vet", iconName: "stethoscope", requiresLicense: true, defaultPricingUnit: "visit" },
    ],
  },
  {
    slug: "business-professional",
    name: "Business & Professional",
    iconName: "briefcase",
    defaultPricingUnit: "hour",
    subcategories: [
      { slug: "bookkeeping-accounting", name: "Bookkeeping & Accounting", iconName: "calculator", requiresLicense: true, defaultPricingUnit: "hour" },
      { slug: "tax-preparation", name: "Tax Preparation", iconName: "receipt", requiresLicense: true, defaultPricingUnit: "project" },
      { slug: "legal-consultation", name: "Legal Consultation", iconName: "scale", requiresLicense: true, defaultPricingUnit: "hour" },
      { slug: "marketing-social-media", name: "Marketing & Social Media", iconName: "megaphone", defaultPricingUnit: "hour" },
      { slug: "virtual-assistant", name: "Virtual Assistant", iconName: "headphones", requiresBackgroundCheck: true, defaultPricingUnit: "hour" },
      { slug: "translation-interpretation", name: "Translation & Interpretation", iconName: "languages", defaultPricingUnit: "hour" },
      { slug: "notary-services", name: "Notary Services", iconName: "stamp", requiresLicense: true, defaultPricingUnit: "visit" },
      { slug: "resume-career-coaching", name: "Resume / Career Coaching", iconName: "file-text", defaultPricingUnit: "hour" },
    ],
  },
  {
    slug: "errands-lifestyle",
    name: "Errands & Lifestyle",
    iconName: "shopping-bag",
    requiresBackgroundCheck: true,
    defaultPricingUnit: "hour",
    subcategories: [
      { slug: "personal-shopper", name: "Personal Shopper", iconName: "shopping-cart", requiresBackgroundCheck: true, defaultPricingUnit: "hour" },
      { slug: "errand-runner", name: "Errand Runner", iconName: "map-pin", requiresBackgroundCheck: true, defaultPricingUnit: "hour" },
      { slug: "furniture-assembly", name: "Furniture Assembly", iconName: "armchair", defaultPricingUnit: "hour" },
      { slug: "senior-care-companion", name: "Senior Care Companion", iconName: "heart-handshake", requiresBackgroundCheck: true, defaultPricingUnit: "hour" },
      { slug: "childcare-babysitter", name: "Childcare / Babysitter", iconName: "baby", requiresBackgroundCheck: true, defaultPricingUnit: "hour" },
    ],
  },
];

function categoryId(parentSlug: string, subSlug?: string): string {
  return subSlug ? `cat-${parentSlug}-${subSlug}` : `cat-${parentSlug}`;
}

function buildSeoTitle(name: string, parentName?: string): string {
  if (parentName) {
    return `${name} Services — ${parentName} | Sheghlni`;
  }
  return `${name} — Find Local Pros | Sheghlni`;
}

export const categories: Category[] = TAXONOMY.flatMap((top, topIndex) => {
  const topId = categoryId(top.slug);
  const topCategory: Category = {
    id: topId,
    slug: top.slug,
    name: top.name,
    iconName: top.iconName,
    parentId: null,
    requiresLicense: top.requiresLicense ?? false,
    requiresBackgroundCheck: top.requiresBackgroundCheck ?? false,
    requiresInsuranceProof: top.requiresInsuranceProof ?? false,
    defaultPricingUnit: top.defaultPricingUnit,
    seoTitle: buildSeoTitle(top.name),
    seoDescription: `Browse trusted ${top.name.toLowerCase()} professionals near you on Sheghlni.`,
    heroImageUrl: mockImageUrl(top.slug, 1200, 600),
    sortOrder: topIndex,
    active: true,
  };

  const subcategories: Category[] = top.subcategories.map((sub, subIndex) => ({
    id: categoryId(top.slug, sub.slug),
    slug: sub.slug,
    name: sub.name,
    iconName: sub.iconName,
    parentId: topId,
    requiresLicense: sub.requiresLicense ?? top.requiresLicense ?? false,
    requiresBackgroundCheck:
      sub.requiresBackgroundCheck ?? top.requiresBackgroundCheck ?? false,
    requiresInsuranceProof:
      sub.requiresInsuranceProof ?? top.requiresInsuranceProof ?? false,
    defaultPricingUnit: sub.defaultPricingUnit ?? top.defaultPricingUnit,
    seoTitle: buildSeoTitle(sub.name, top.name),
    seoDescription: `Hire vetted ${sub.name.toLowerCase()} pros for in-home and local services.`,
    heroImageUrl: null,
    sortOrder: subIndex,
    active: true,
  }));

  return [topCategory, ...subcategories];
});

/** Resolve a category id by top-level or subcategory slug */
export function getCategoryIdBySlug(slug: string): string | undefined {
  return categories.find((c) => c.slug === slug)?.id;
}
