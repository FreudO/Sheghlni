import { notFound } from "next/navigation";
import { HelpArticle } from "@/components/help/help-article";
import { getAllHelpSlugs, getHelpArticle } from "@/lib/help/articles";

export function generateStaticParams() {
  return getAllHelpSlugs().map((slug) => ({ slug }));
}

type HelpArticlePageProps = {
  params: { slug: string };
};

export default function HelpArticlePage({ params }: HelpArticlePageProps) {
  const article = getHelpArticle(params.slug);
  if (!article) notFound();

  return <HelpArticle title={article.title} category={article.category} />;
}
