"use client";

import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";

function Popover({ ...props }: PopoverPrimitive.PopoverProps) {
  return <PopoverPrimitive.Root {...props} />;
}

function PopoverAnchor({
  ...props
}: PopoverPrimitive.PopoverAnchorProps) {
  return <PopoverPrimitive.Anchor {...props} />;
}

function PopoverTrigger({
  ...props
}: PopoverPrimitive.PopoverTriggerProps) {
  return <PopoverPrimitive.Trigger {...props} />;
}

function PopoverContent({
  className,
  align = "start",
  sideOffset = 8,
  ...props
}: PopoverPrimitive.PopoverContentProps) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "z-[200] rounded-xl border p-0 shadow-xl outline-none",
          "data-[state=open]:animate-in data-[state=open]:fade-in-0",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
          className,
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
}

export { Popover, PopoverAnchor, PopoverTrigger, PopoverContent };
