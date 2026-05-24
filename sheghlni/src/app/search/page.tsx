import { Suspense } from "react";
import { SearchPageContent } from "@/components/search-page-content";
import { SearchPageSkeleton } from "@/components/search/search-skeleton";

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchPageSkeleton />}>
      <SearchPageContent />
    </Suspense>
  );
}
