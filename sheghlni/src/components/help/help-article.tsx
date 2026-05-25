import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { ICON_STROKE } from "@/components/ui/icon-well";

type HelpArticleProps = {
  title: string;
  category: string;
};

export function HelpArticle({ title, category }: HelpArticleProps) {
  return (
    <article>
      <Link
        href="/help/"
        className="inline-flex items-center gap-1 text-sm font-medium text-cta hover:underline"
      >
        <ChevronLeft className="size-4" strokeWidth={ICON_STROKE} />
        Help Center
      </Link>
      <p className="mt-4 text-caption font-semibold uppercase tracking-wide text-bronze-600">
        {category}
      </p>
      <h1 className="mt-2 font-display text-h1 text-text-primary">{title}</h1>
      <div className="prose-like mt-8 space-y-4 text-body text-text-secondary">
        <p>
          This article is placeholder content for the demo. Full help documentation
          will be published before launch.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris.
        </p>
        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident.
        </p>
      </div>
    </article>
  );
}
