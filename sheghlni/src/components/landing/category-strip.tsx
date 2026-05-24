"use client";

import Link from "next/link";
import { getCategoryIcon } from "@/components/landing/category-icon";
import { Reveal } from "@/components/landing/reveal";
import { getTopLevelCategories } from "@/lib/mock";

export function CategoryStrip() {
  const categories = getTopLevelCategories();

  return (
    <section className="bg-bg py-12 md:py-[48px]">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
        <Reveal>
          <h2 className="font-display text-h2 text-text-primary">
            Browse by category
          </h2>
          <p className="mt-1 text-body-sm text-text-tertiary md:hidden">
            Swipe to see all categories →
          </p>
        </Reveal>

        <div className="-mx-6 mt-8 overflow-x-auto px-6 pb-2 [scrollbar-width:none] md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden">
          <div className="flex w-max snap-x snap-mandatory gap-4 md:w-full md:snap-none md:justify-between">
            {categories.map((category) => {
              const Icon = getCategoryIcon(category.iconName);
              return (
                <Link
                  key={category.id}
                  href={`/search/?category=${category.slug}`}
                  className="group flex w-[6.5rem] shrink-0 snap-start flex-col items-center gap-2 md:w-28"
                >
                  <div className="flex size-[5.5rem] items-center justify-center rounded-2xl border border-transparent bg-bg-elevated transition ease-default duration-default group-hover:scale-[1.03] group-hover:border-bronze-500 group-hover:shadow-md md:size-28">
                    <Icon
                      className="size-[1.75rem] text-text-secondary transition ease-default duration-default group-hover:text-cta md:size-[2rem]"
                      strokeWidth={1.5}
                    />
                  </div>
                  <span className="line-clamp-3 max-w-[6.5rem] text-center text-caption leading-snug text-text-primary md:max-w-28">
                    {category.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
