import { cn } from "@/lib/utils";

function Label({
  className,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn(
        "text-caption font-medium text-text-secondary",
        className,
      )}
      {...props}
    />
  );
}

export { Label };
