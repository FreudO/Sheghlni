import Link from "next/link";

type StubPageProps = {
  title: string;
  description?: string;
};

export function StubPage({ title, description }: StubPageProps) {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center px-6 py-16 text-center lg:px-12">
      <h1 className="font-display text-h1 text-text-primary">{title}</h1>
      <p className="mt-3 text-body text-text-secondary">
        {description ?? "This page is coming soon in the demo."}
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex h-10 items-center justify-center rounded-full bg-cta px-6 text-sm font-medium text-white transition ease-default duration-default hover:bg-cta-hover"
      >
        Back to home
      </Link>
    </div>
  );
}
