"use client";

import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ICON_STROKE } from "@/components/ui/icon-well";
import { cn } from "@/lib/utils";

export type FilterSelectOption<T extends string> = {
  value: T;
  label: string;
};

type FilterSelectProps<T extends string> = {
  value: T;
  onChange: (value: T) => void;
  options: FilterSelectOption<T>[];
  className?: string;
  menuClassName?: string;
  align?: "start" | "center" | "end";
  "aria-label"?: string;
};

export function FilterSelect<T extends string>({
  value,
  onChange,
  options,
  className,
  menuClassName,
  align = "end",
  "aria-label": ariaLabel,
}: FilterSelectProps<T>) {
  const selected = options.find((o) => o.value === value);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={ariaLabel ?? selected?.label}
        className={cn(
          "inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full border border-border bg-bg-elevated pl-3.5 pr-2.5 text-[0.8125rem] font-medium text-text-primary shadow-sm transition ease-default duration-default",
          "hover:border-bronze-500/35 hover:bg-bg",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta/40 focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
          "data-[state=open]:border-bronze-500/40 data-[state=open]:bg-bg",
          className,
        )}
      >
        <span className="truncate">{selected?.label ?? "Select"}</span>
        <ChevronDown
          className="size-3.5 shrink-0 text-ink-300"
          strokeWidth={ICON_STROKE}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={align}
        className={cn(
          "min-w-[var(--radix-dropdown-menu-trigger-width)] rounded-xl border-border p-1.5 shadow-lg",
          menuClassName,
        )}
      >
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => onChange(option.value)}
            className={cn(
              "rounded-lg px-3 py-2 text-[0.8125rem]",
              option.value === value &&
                "bg-bronze-500/10 font-medium text-bronze-600",
            )}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
