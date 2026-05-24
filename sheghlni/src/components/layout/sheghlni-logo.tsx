import Link from "next/link";
import { cn } from "@/lib/utils";

type SheghlniLogoProps = {
  variant?: "dark" | "light";
  className?: string;
};

export function SheghlniLogo({ variant = "dark", className }: SheghlniLogoProps) {
  const textColor = variant === "dark" ? "text-cream-50" : "text-ink-900";

  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center no-underline transition ease-default duration-default",
        className,
      )}
      aria-label="Sheghlni home"
    >
      <span
        className={cn(
          "font-fraunces text-[1.375rem] tracking-tight md:text-[1.5rem]",
          textColor,
        )}
      >
        Sheghlni
      </span>
    </Link>
  );
}
