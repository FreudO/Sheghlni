import Link from "next/link";
import type { PricingUnit, Service } from "@/lib/mock";

type ServicesTableProps = {
  services: Service[];
  providerId: string;
};

function formatServicePrice(service: Service): string {
  const min = Math.round(service.priceMinCents / 100);
  const max = Math.round(service.priceMaxCents / 100);
  const unitLabel: Record<PricingUnit, string> = {
    hour: "hr",
    project: "project",
    visit: "visit",
    session: "session",
    custom: "job",
  };
  const unit = unitLabel[service.pricingUnit];

  if (service.priceMinCents === service.priceMaxCents) {
    return `$${min}/${unit}`;
  }
  if (max > min) {
    return `$${min}–$${max}/${unit}`;
  }
  return `From $${min}/${unit}`;
}

export function ServicesTable({ services, providerId }: ServicesTableProps) {
  return (
    <section className="mt-8 border-t border-border pt-8 md:mt-12 md:pt-10">
      <h2 className="font-display text-[1.375rem] font-medium text-text-primary md:text-h2">
        Services & pricing
      </h2>

      <div className="mt-6 hidden overflow-hidden rounded-2xl border border-border md:block">
        <table className="w-full text-left">
          <tbody>
            {services.map((service) => (
              <tr key={service.id} className="border-b border-border last:border-0">
                <td className="px-5 py-4 align-top">
                  <p className="font-semibold text-text-primary">{service.title}</p>
                  <p className="mt-1 text-body-sm text-ink-500">{service.description}</p>
                </td>
                <td className="px-5 py-4 align-top text-body-sm text-text-secondary">
                  {formatServicePrice(service)}
                </td>
                <td className="px-5 py-4 align-top text-right">
                  <Link
                    href={`/book/${providerId}/?service=${service.id}`}
                    className="text-sm font-medium text-cta hover:underline"
                  >
                    Request this service
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 space-y-3 md:hidden">
        {services.map((service) => (
          <article
            key={service.id}
            className="rounded-2xl border border-border bg-bg p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="font-semibold text-text-primary">{service.title}</p>
              <p className="shrink-0 text-sm font-medium text-text-primary">
                {formatServicePrice(service)}
              </p>
            </div>
            <p className="mt-1 line-clamp-2 text-[0.8125rem] text-ink-500">
              {service.description}
            </p>
            <Link
              href={`/book/${providerId}/?service=${service.id}`}
              className="mt-3 inline-flex min-h-11 items-center rounded-full border border-border px-4 text-sm font-medium text-text-primary hover:bg-bg-elevated"
            >
              Request
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
