import type { LucideIcon } from "lucide-react";
import {
  Briefcase,
  Camera,
  Car,
  GraduationCap,
  HeartPulse,
  Home,
  Laptop,
  PartyPopper,
  PawPrint,
  ShoppingBag,
} from "lucide-react";

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  home: Home,
  "heart-pulse": HeartPulse,
  camera: Camera,
  "party-popper": PartyPopper,
  "graduation-cap": GraduationCap,
  laptop: Laptop,
  car: Car,
  "paw-print": PawPrint,
  briefcase: Briefcase,
  "shopping-bag": ShoppingBag,
};

export function getCategoryIcon(iconName: string): LucideIcon {
  return CATEGORY_ICONS[iconName] ?? Home;
}
