import {
  categories,
  getFeaturedProviders,
  getProviderByHandle,
  providers,
  reviews,
  services,
} from "@/lib/mock";

export function MockDataSmokeTest() {
  const featured = getFeaturedProviders();
  const sofia = getProviderByHandle("sofia-reyes-photo");

  return (
    <div className="hidden" data-mock-smoke-test>
      {featured.length}-{providers.length}-{categories.length}-
      {services.length}-{reviews.length}-{sofia?.businessName ?? "missing"}
    </div>
  );
}
