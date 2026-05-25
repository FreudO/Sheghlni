"use client";

import Link from "next/link";
import { getCategoryIcon } from "@/components/landing/category-icon";
import { Reveal } from "@/components/landing/reveal";
import { getTopLevelCategories } from "@/lib/mock";

export function CategoryStrip() {
  const categories = getTopLevelCategories();

  return (
    <section className="bg-bg py-8 md:py-12 lg:py-[48px]">
      <div className="mx-auto max-w-[1280px] px-4 md:px-6 lg:px-12">
        <Reveal>
          <h2 className="font-display text-[1.375rem] font-medium text-text-primary md:text-h2">
            Browse by category
          </h2>
        </Reveal>

        <div className="scrollbar-subtle -mx-4 mt-6 overflow-x-auto overscroll-x-contain px-4 pb-2 md:mx-0 md:mt-8 md:px-0">
          <div className="flex w-max snap-x snap-mandatory gap-3 md:gap-4">
            {categories.map((category) => {
              const Icon = getCategoryIcon(category.iconName);
              return (
                <Link
                  key={category.id}
                  href={`/search/?category=${category.slug}`}
                  className="group flex w-[7.5rem] shrink-0 snap-start flex-col items-center gap-2 md:w-[6.75rem]"
                >
                  <div className="flex size-[7.5rem] items-center justify-center rounded-2xl border border-transparent bg-bg-elevated transition ease-default duration-default group-hover:scale-[1.03] group-hover:border-bronze-500 group-hover:shadow-md md:size-[6.75rem]">
                    <Icon
                      className="size-7 text-text-secondary transition ease-default duration-default group-hover:text-cta md:size-[2rem]"
                      strokeWidth={1.5}
                    />
                  </div>
                  <span className="line-clamp-2 max-w-[7.5rem] text-center text-sm leading-snug text-text-primary md:max-w-[6.75rem]">
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
