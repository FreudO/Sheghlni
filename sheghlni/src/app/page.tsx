import { MockDataSmokeTest } from "@/components/mock-data-smoke-test";
import { BecomeProCtaSection } from "@/components/landing/become-pro-cta-section";
import { CategoryStrip } from "@/components/landing/category-strip";
import { FeaturedProsSection } from "@/components/landing/featured-pros-section";
import { HeroSection } from "@/components/landing/hero-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { LandingFooter } from "@/components/landing/landing-footer";
import { TrustBandSection } from "@/components/landing/trust-band-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <CategoryStrip />
      <FeaturedProsSection />
      <HowItWorksSection />
      <TrustBandSection />
      <BecomeProCtaSection />
      <LandingFooter />
      <MockDataSmokeTest />
    </>
  );
}
