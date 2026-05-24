import { StubPage } from "@/components/stub-page";

const PRO_PAGES: Record<string, { title: string; description: string }> = {
  dashboard: {
    title: "Pro Dashboard",
    description: "Overview of leads, upcoming jobs, and performance at a glance.",
  },
  calendar: {
    title: "Pro Calendar",
    description: "Manage availability, confirmed bookings, and blocked time.",
  },
  earnings: {
    title: "Pro Earnings",
    description: "Payout history, pending balances, and revenue summaries.",
  },
  onboarding: {
    title: "Pro Onboarding",
    description: "Complete your profile, verify credentials, and publish your services.",
  },
};

export function generateStaticParams() {
  return Object.keys(PRO_PAGES).map((slug) => ({ slug }));
}

type ProStubPageProps = {
  params: { slug: string };
};

export default function ProStubPage({ params }: ProStubPageProps) {
  const page = PRO_PAGES[params.slug];
  if (!page) {
    return <StubPage title="Page not found" />;
  }

  return <StubPage title={page.title} description={page.description} />;
}
