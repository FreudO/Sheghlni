"use client";

import { useState } from "react";
import type { Provider, User } from "@/lib/mock";

type ProviderAboutProps = {
  provider: Provider;
  user: User;
};

export function ProviderAbout({ provider, user }: ProviderAboutProps) {
  const [expanded, setExpanded] = useState(false);
  const memberSince = new Date(user.createdAt).getFullYear();
  const isLong = provider.bio.length > 220;

  return (
    <section className="mt-8 border-t border-border pt-8 md:mt-12 md:pt-10">
      <h2 className="font-display text-[1.375rem] font-medium text-text-primary md:text-h2">
        About
      </h2>
      <p
        className={`mt-4 text-[0.9375rem] text-text-secondary md:text-body ${!expanded && isLong ? "line-clamp-3" : ""}`}
      >
        {provider.bio}
      </p>
      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          className="mt-2 text-sm font-medium text-cta hover:underline"
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      )}
      <div className="mt-6 flex flex-wrap gap-2">
        <span className="rounded-full bg-bg-elevated px-3 py-1.5 text-caption text-text-secondary">
          {provider.yearsExperience} years experience
        </span>
        <span className="rounded-full bg-bg-elevated px-3 py-1.5 text-caption text-text-secondary">
          {provider.languages.join(", ")}
        </span>
        <span className="rounded-full bg-bg-elevated px-3 py-1.5 text-caption text-text-secondary">
          Member since {memberSince}
        </span>
      </div>
    </section>
  );
}




