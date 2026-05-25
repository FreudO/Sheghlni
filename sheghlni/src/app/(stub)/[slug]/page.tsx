import { StubPage } from "@/components/stub-page";

const PAGES: Record<string, { title: string; description?: string }> = {
  about: { title: "About Sheghlni" },
  blog: { title: "Blog" },
  careers: { title: "Careers" },
  press: { title: "Press" },
  trust: { title: "Trust & Safety" },
};

export function generateStaticParams() {
  return Object.keys(PAGES).map((slug) => ({ slug }));
}

type StaticStubProps = {
  params: { slug: string };
};

export default function StaticStubPage({ params }: StaticStubProps) {
  const page = PAGES[params.slug];
  if (!page) return <StubPage title="Page not found" />;

  return <StubPage title={page.title} description={page.description} />;
}
