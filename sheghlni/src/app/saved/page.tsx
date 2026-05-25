import { SavedPageContent } from "@/components/saved/saved-page-content";

export default function SavedPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6 md:px-6 md:py-10 lg:px-12">
      <header className="mb-6 md:mb-8">
        <h1 className="font-display text-h1 text-text-primary">Saved</h1>
        <p className="mt-2 text-body text-text-secondary">
          Pros and lists you&apos;ve bookmarked for later.
        </p>
      </header>
      <SavedPageContent />
    </div>
  );
}
