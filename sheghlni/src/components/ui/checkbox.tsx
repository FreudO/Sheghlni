"use client";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { ICON_STROKE } from "@/components/ui/icon-well";

function Checkbox({
  className,
  ...props
}: CheckboxPrimitive.CheckboxProps) {
  return (
    <CheckboxPrimitive.Root
      className={cn(
        "flex size-5 shrink-0 items-center justify-center rounded-md border border-border bg-bg transition",
        "data-[state=checked]:border-bronze-500 data-[state=checked]:bg-bronze-500 data-[state=checked]:text-white",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta/40",
        "disabled:cursor-not-allowed disabled:opacity-40",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator>
        <Check className="size-3.5" strokeWidth={ICON_STROKE} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
