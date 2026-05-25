import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  FileCheck,
  Shield,
  ShieldCheck,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";
import type { Provider, ProviderBadge, Service, User } from "@/lib/mock";
import { getProviderPrimaryCategoryName, services, users } from "@/lib/mock";

export type ReviewDistribution = {
  stars: number;
  pct: number;
  count: number;
};

export type ProviderCredential = {
  id: string;
  label: string;
  detail: string;
  status: "verified" | "pending";
};

export type ProviderFaq = {
  id: string;
  question: string;
  answer: string;
};

export type AvailabilityDay = {
  date: Date;
  available: boolean;
  slotCount: number;
};

export function getUserForProvider(provider: Provider): User | undefined {
  return users.find((user) => user.id === provider.userId);
}

export function getProviderGalleryImages(provider: Provider): string[] {
  return [provider.heroImageUrl, ...provider.mediaUrls].filter(
    (url, index, all) => all.indexOf(url) === index,
  );
}

export function getServicesForProvider(providerId: string): Service[] {
  return services.filter(
    (service) => service.providerId === providerId && service.active,
  );
}

export function getProviderCategoryLabel(providerId: string): string {
  const label = getProviderPrimaryCategoryName(providerId);
  return label.split(" · ")[0] ?? label;
}

export function getReviewDistribution(
  ratingCount: number,
  ratingAvg: number,
): ReviewDistribution[] {
  const base =
    ratingAvg >= 4.85
      ? [
          { stars: 5, pct: 82 },
          { stars: 4, pct: 13 },
          { stars: 3, pct: 3 },
          { stars: 2, pct: 1 },
          { stars: 1, pct: 1 },
        ]
      : ratingAvg >= 4.5
        ? [
            { stars: 5, pct: 68 },
            { stars: 4, pct: 22 },
            { stars: 3, pct: 6 },
            { stars: 2, pct: 2 },
            { stars: 1, pct: 2 },
          ]
        : [
            { stars: 5, pct: 52 },
            { stars: 4, pct: 28 },
            { stars: 3, pct: 12 },
            { stars: 2, pct: 5 },
            { stars: 1, pct: 3 },
          ];

  return base.map((row) => ({
    ...row,
    count: Math.max(0, Math.round((ratingCount * row.pct) / 100)),
  }));
}

export function getProviderCredentials(provider: Provider): ProviderCredential[] {
  const items: ProviderCredential[] = [];

  if (provider.badges.includes("license-verified")) {
    items.push({
      id: "license",
      label: "Professional license",
      detail: `${provider.baseRegion} business license • #${provider.baseRegion}-•••${provider.id.slice(-4)}`,
      status: "verified",
    });
  } else if (provider.yearsExperience >= 5) {
    items.push({
      id: "license-pending",
      label: "Professional license",
      detail: "License submission under review",
      status: "pending",
    });
  }

  if (provider.badges.includes("insurance-verified")) {
    items.push({
      id: "insurance",
      label: "General liability insurance",
      detail: "Coverage active • Expires Mar 2027",
      status: "verified",
    });
  }

  if (provider.badges.includes("background-check")) {
    items.push({
      id: "background",
      label: "Background check",
      detail: "Passed • Renewed annually",
      status: "verified",
    });
  }

  items.push({
    id: "cert",
    label: "Platform certification",
    detail: `${provider.businessName} completed Sheghlni pro onboarding`,
    status: "verified",
  });

  return items;
}

const FAQ_BY_CATEGORY: Record<string, ProviderFaq[]> = {
  photography: [
    {
      id: "faq-1",
      question: "How soon will we receive our photos?",
      answer:
        "Engagement galleries are delivered within 2 weeks. Full wedding galleries typically arrive within 4–6 weeks with a sneak peek within 48 hours.",
    },
    {
      id: "faq-2",
      question: "Do you travel for destination weddings?",
      answer:
        "Yes — I regularly shoot across Southern California and can travel nationwide. Travel fees are quoted based on location and coverage length.",
    },
    {
      id: "faq-3",
      question: "Can we request specific shot lists?",
      answer:
        "Absolutely. I send a planning questionnaire before every shoot and welcome must-have family groupings or detail shots.",
    },
    {
      id: "faq-4",
      question: "Do you provide raw files?",
      answer:
        "I deliver fully edited, color-graded images in a private online gallery. Raw files are not included but print release is standard.",
    },
  ],
  default: [
    {
      id: "faq-1",
      question: "What is your typical response time?",
      answer:
        "Most inquiries receive a reply within one business day. Urgent requests are prioritized when possible.",
    },
    {
      id: "faq-2",
      question: "How do quotes work?",
      answer:
        "Share your project details in a message and you'll receive a line-item quote you can accept, decline, or discuss before booking.",
    },
    {
      id: "faq-3",
      question: "What is your cancellation policy?",
      answer:
        "Cancel more than 48 hours before the scheduled start for a full refund of any deposit. Later cancellations may incur a fee.",
    },
  ],
};

export function getProviderFaqs(providerId: string): ProviderFaq[] {
  const category = getProviderPrimaryCategoryName(providerId).toLowerCase();
  if (category.includes("photograph")) return FAQ_BY_CATEGORY.photography;
  if (category.includes("electric")) {
    return [
      ...FAQ_BY_CATEGORY.default,
      {
        id: "faq-e1",
        question: "Are you licensed and insured?",
        answer:
          "Yes — all work is performed by licensed professionals with active liability insurance and permits pulled when required.",
      },
    ];
  }
  return FAQ_BY_CATEGORY.default;
}

export function getAvailabilityPreview(providerId: string): AvailabilityDay[] {
  const seed = providerId.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() + index);
    const available = (seed + index) % 7 !== 1 && (seed + index) % 7 !== 4;
    return {
      date,
      available,
      slotCount: available ? 2 + (index % 3) : 0,
    };
  });
}

export function formatResponseTime(minutes: number): string {
  if (minutes < 60) return `Responds in ~${minutes} min`;
  return `Responds in ~${Math.round(minutes / 60)}hr`;
}

export function getBadgeConfig(badge: ProviderBadge): {
  label: string;
  className: string;
  icon: LucideIcon;
  iconClassName: string;
} | null {
  const map: Record<
    ProviderBadge,
    { label: string; className: string; icon: LucideIcon; iconClassName: string }
  > = {
    "verified-id": {
      label: "Verified ID",
      className: "bg-[#A8B5A2] text-ink-900",
      icon: ShieldCheck,
      iconClassName: "text-sage-500",
    },
    "background-check": {
      label: "Background check",
      className: "bg-[#A8B5A2] text-ink-900",
      icon: BadgeCheck,
      iconClassName: "text-sage-500",
    },
    "top-rated": {
      label: "Top rated",
      className: "bg-gold-500 text-ink-900",
      icon: Star,
      iconClassName: "text-gold-500",
    },
    "quick-responder": {
      label: "Quick responder",
      className: "bg-bronze-600 text-white",
      icon: Zap,
      iconClassName: "text-bronze-500",
    },
    premium: {
      label: "Premium Pro",
      className: "bg-ink-800 text-cream-200",
      icon: Sparkles,
      iconClassName: "text-cream-100",
    },
    "license-verified": {
      label: "License verified",
      className: "bg-[#A8B5A2] text-ink-900",
      icon: FileCheck,
      iconClassName: "text-bronze-500",
    },
    "insurance-verified": {
      label: "Insured",
      className: "bg-[#A8B5A2] text-ink-900",
      icon: Shield,
      iconClassName: "text-sage-500",
    },
  };
  return map[badge] ?? null;
}

export function getFirstName(fullName: string): string {
  return fullName.split(" ")[0] ?? fullName;
}
