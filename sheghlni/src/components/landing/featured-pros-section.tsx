import { ProviderCard } from "@/components/cards/provider-card";
import { Reveal } from "@/components/landing/reveal";
import { getFeaturedProviders } from "@/lib/mock";

const MOCK_CITY = "Boston, MA";

export function FeaturedProsSection() {
  const providers = getFeaturedProviders("Boston");

  return (
    <section className="bg-bg py-8 md:py-12 lg:py-16">
      <div className="mx-auto max-w-[1280px] px-4 md:px-6 lg:px-12">
        <Reveal>
          <h2 className="font-display text-[1.375rem] font-medium text-text-primary md:text-h2">
            Top-rated pros near you
          </h2>
          <p className="mt-2 text-[0.9375rem] text-text-secondary md:text-body">
            {MOCK_CITY}
          </p>
        </Reveal>

        <div className="mt-6 flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] md:mt-8 md:grid md:grid-cols-2 md:overflow-visible md:snap-none lg:grid-cols-4 [&::-webkit-scrollbar]:hidden">
          {providers.map((provider) => (
            <div
              key={provider.id}
              className="w-[20rem] shrink-0 snap-start md:w-auto md:snap-align-none"
            >
              <ProviderCard provider={provider} layout="carousel" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
