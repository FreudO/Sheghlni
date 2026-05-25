"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { HELP_CATEGORIES } from "@/lib/help/articles";
import { ICON_STROKE } from "@/components/ui/icon-well";
import { Input } from "@/components/ui/input";

export function HelpCenter() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return HELP_CATEGORIES;
    return HELP_CATEGORIES.map((category) => ({
      ...category,
      articles: category.articles.filter(
        (a) =>
          a.title.toLowerCase().includes(needle) ||
          category.title.toLowerCase().includes(needle),
      ),
    })).filter((c) => c.articles.length > 0);
  }, [query]);

  return (
    <div>
      <header className="mb-8 text-center md:mb-10">
        <h1 className="font-display text-h1 text-text-primary">Help Center</h1>
        <p className="mx-auto mt-2 max-w-lg text-body text-text-secondary">
          Search guides for booking, payments, provider tools, and account settings.
        </p>
        <label className="relative mx-auto mt-6 block max-w-xl">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-ink-300"
            strokeWidth={ICON_STROKE}
            aria-hidden
          />
          <Input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for help..."
            className="h-12 pl-12"
          />
        </label>
      </header>

      {filtered.length === 0 ? (
        <p className="py-12 text-center text-body text-text-secondary">
          No articles match your search.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((category) => (
            <section
              key={category.id}
              className="rounded-2xl border border-border bg-bg-elevated p-5"
            >
              <h2 className="font-display text-h3 text-text-primary">
                {category.title}
              </h2>
              <p className="mt-1 text-body-sm text-text-secondary">
                {category.description}
              </p>
              <ul className="mt-4 space-y-2">
                {category.articles.map((article) => (
                  <li key={article.slug}>
                    <Link
                      href={`/help/${article.slug}/`}
                      className="text-sm font-medium text-cta hover:underline"
                    >
                      {article.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
