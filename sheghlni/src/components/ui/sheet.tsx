"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

function Sheet({ ...props }: Dialog.DialogProps) {
  return <Dialog.Root {...props} />;
}

function SheetTrigger({ ...props }: Dialog.DialogTriggerProps) {
  return <Dialog.Trigger {...props} />;
}

function SheetClose({ ...props }: Dialog.DialogCloseProps) {
  return <Dialog.Close {...props} />;
}

function SheetPortal({ ...props }: Dialog.DialogPortalProps) {
  return <Dialog.Portal {...props} />;
}

function SheetOverlay({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Dialog.Overlay>) {
  return (
    <Dialog.Overlay
      className={cn(
        "fixed inset-0 z-[55] bg-ink-900/40 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className,
      )}
      {...props}
    />
  );
}

function SheetContent({
  className,
  children,
  side = "bottom",
  ...props
}: React.ComponentPropsWithoutRef<typeof Dialog.Content> & {
  side?: "bottom" | "right";
}) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <Dialog.Content
        className={cn(
          "fixed z-[60] flex flex-col gap-4 bg-bg-elevated shadow-lg transition ease-default duration-default",
          side === "bottom" &&
            "inset-x-0 bottom-0 max-h-[85vh] rounded-t-2xl border-t border-border p-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
          side === "right" &&
            "inset-y-0 right-0 h-full w-full max-w-full border-l border-border data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
          className,
        )}
        {...props}
      >
        {children}
        <Dialog.Close className="absolute right-4 top-4 rounded-md p-1 text-text-tertiary transition ease-default duration-default hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta">
          <X className="size-icon-sm" />
          <span className="sr-only">Close</span>
        </Dialog.Close>
      </Dialog.Content>
    </SheetPortal>
  );
}

function SheetHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-col gap-1.5 text-left", className)} {...props} />
  );
}

function SheetTitle({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Dialog.Title>) {
  return (
    <Dialog.Title
      className={cn("font-display text-lg font-semibold text-text-primary", className)}
      {...props}
    />
  );
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
};
