import type { ProviderCredential } from "@/lib/provider/profile-data";
import { cn } from "@/lib/utils";

type ProviderCredentialsProps = {
  credentials: ProviderCredential[];
};

export function ProviderCredentials({ credentials }: ProviderCredentialsProps) {
  return (
    <section className="mt-12 border-t border-border pt-10">
      <h2 className="font-display text-h2 text-text-primary">Credentials</h2>
      <ul className="mt-6 space-y-4">
        {credentials.map((item) => (
          <li
            key={item.id}
            className="flex flex-col gap-2 rounded-2xl border border-border bg-bg p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="font-medium text-text-primary">{item.label}</p>
              <p className="mt-1 text-body-sm text-text-secondary">{item.detail}</p>
            </div>
            <span
              className={cn(
                "inline-flex w-fit rounded-full px-2.5 py-1 text-caption font-medium capitalize",
                item.status === "verified"
                  ? "bg-sage-500/15 text-sage-500"
                  : "bg-gold-500/15 text-gold-500",
              )}
            >
              {item.status}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

