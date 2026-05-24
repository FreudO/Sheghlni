import { ProviderCard } from "@/components/cards/provider-card";
import { Reveal } from "@/components/landing/reveal";
import { getFeaturedProviders } from "@/lib/mock";

const MOCK_CITY = "Boston, MA";

export function FeaturedProsSection() {
  const providers = getFeaturedProviders("Boston");

  return (
    <section className="bg-bg py-12 md:py-16">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
        <Reveal>
          <h2 className="font-display text-h2 text-text-primary">
            Top-rated pros near you
          </h2>
          <p className="mt-2 text-body text-text-secondary">{MOCK_CITY}</p>
        </Reveal>

        <div className="mt-8 grid auto-cols-[82%] grid-flow-col gap-4 overflow-x-auto pb-2 snap-x snap-mandatory [scrollbar-width:none] sm:auto-cols-auto sm:grid-flow-row sm:grid-cols-2 sm:overflow-visible sm:snap-none lg:grid-cols-4 [&::-webkit-scrollbar]:hidden">
          {providers.map((provider) => (
            <div key={provider.id} className="snap-start sm:snap-align-none">
              <ProviderCard provider={provider} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
