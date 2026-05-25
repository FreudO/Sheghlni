import { notFound } from "next/navigation";
import { LegalDocument } from "@/components/legal/legal-document";

const TITLES: Record<string, string> = {
  terms: "Terms of Service",
  privacy: "Privacy Policy",
  cookies: "Cookie Policy",
  "do-not-sell": "Do not sell my info",
};

export function generateStaticParams() {
  return Object.keys(TITLES).map((slug) => ({ slug }));
}

type LegalPageProps = {
  params: { slug: string };
};

export default function LegalPage({ params }: LegalPageProps) {
  const title = TITLES[params.slug];
  if (!title) notFound();

  return <LegalDocument title={title} />;
}
