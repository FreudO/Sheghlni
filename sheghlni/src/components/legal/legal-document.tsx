import Link from "next/link";

type LegalDocumentProps = {
  title: string;
};

export function LegalDocument({ title }: LegalDocumentProps) {
  return (
    <article className="mx-auto max-w-2xl">
      <nav className="mb-8 flex flex-wrap gap-4 text-sm">
        <Link href="/legal/terms/" className="text-cta hover:underline">
          Terms
        </Link>
        <Link href="/legal/privacy/" className="text-cta hover:underline">
          Privacy
        </Link>
        <Link href="/legal/cookies/" className="text-cta hover:underline">
          Cookies
        </Link>
      </nav>
      <h1 className="font-display text-h1 text-text-primary">{title}</h1>
      <p className="mt-4 rounded-xl border border-bronze-300/40 bg-bronze-500/10 px-4 py-3 text-sm text-bronze-600">
        Full legal text to be provided by counsel.
      </p>
      <div className="mt-8 space-y-4 text-body text-text-secondary">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.
          Praesent libero. Sed cursus ante dapibus diam.
        </p>
        <p>
          Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.
          Praesent mauris. Fusce nec tellus sed augue semper porta.
        </p>
        <p>
          Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti
          sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
        </p>
        <p>
          Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur
          tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor.
        </p>
      </div>
    </article>
  );
}
