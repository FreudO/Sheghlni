"use client";

import { useState, type KeyboardEvent } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowUp,
  Calendar,
  DollarSign,
  FileText,
  ImageIcon,
  MapPin,
  Paperclip,
  Smile,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { IconWell } from "@/components/ui/icon-well";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type MessageInputProps = {
  placeholder: string;
  onSend: (body: string) => void;
  /** Customer demo — hide pro-only attach actions */
  isCustomerView?: boolean;
};

type AttachItem = {
  label: string;
  icon: LucideIcon;
  iconClassName: string;
};

const attachItems: AttachItem[] = [
  { label: "Photo", icon: ImageIcon, iconClassName: "text-bronze-500" },
  { label: "File", icon: FileText, iconClassName: "text-sage-500" },
  { label: "Location", icon: MapPin, iconClassName: "text-gold-500" },
];

const proOnlyItems: AttachItem[] = [
  { label: "Send quote", icon: DollarSign, iconClassName: "text-bronze-500" },
  { label: "Share availability", icon: Calendar, iconClassName: "text-sage-500" },
];

export function MessageInput({
  placeholder,
  onSend,
  isCustomerView = true,
}: MessageInputProps) {
  const [value, setValue] = useState("");
  const [attachOpen, setAttachOpen] = useState(false);

  const canSend = value.trim().length > 0;

  const submit = () => {
    if (!canSend) return;
    onSend(value);
    setValue("");
  };

  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submit();
    }
  };

  const renderAttachRow = (item: AttachItem) => (
    <li key={item.label}>
      <button
        type="button"
        className="flex w-full items-center gap-3 rounded-md px-2 py-2 text-left text-sm text-text-primary hover:bg-muted"
        onClick={() => setAttachOpen(false)}
      >
        <IconWell
          icon={item.icon}
          size="sm"
          iconClassName={item.iconClassName}
        />
        {item.label}
      </button>
    </li>
  );

  return (
    <div className="shrink-0 border-t border-border bg-bg px-3 py-3 md:px-4">
      <div className="flex items-end gap-2">
        <Popover open={attachOpen} onOpenChange={setAttachOpen}>
          <PopoverTrigger
            type="button"
            className="flex size-10 shrink-0 items-center justify-center rounded-full text-ink-300 transition hover:bg-bg-elevated-2 hover:text-text-primary"
            aria-label="Attachments"
          >
            <Paperclip className="size-5" strokeWidth={1.5} />
          </PopoverTrigger>
          <PopoverContent
            align="start"
            side="top"
            className="min-w-[12rem] border-border bg-bg-elevated p-1"
          >
            <ul className="py-0.5">
              {attachItems.map(renderAttachRow)}
              {!isCustomerView && proOnlyItems.map(renderAttachRow)}
            </ul>
          </PopoverContent>
        </Popover>

        <div className="flex min-h-10 flex-1 items-center gap-1 rounded-full border border-border bg-bg-elevated-2 px-3 py-1.5">
          <textarea
            rows={1}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            className="max-h-24 min-h-[1.25rem] flex-1 resize-none bg-transparent text-sm text-text-primary outline-none placeholder:text-ink-300"
          />
          <button
            type="button"
            className="shrink-0 p-1 text-ink-300 hover:text-text-primary"
            aria-label="Emoji"
          >
            <Smile className="size-5" strokeWidth={1.5} aria-hidden />
          </button>
        </div>

        <Button
          type="button"
          size="icon"
          disabled={!canSend}
          onClick={submit}
          className={cn(
            "size-10 shrink-0 rounded-full",
            canSend
              ? "bg-cta text-white hover:bg-cta-hover"
              : "bg-bg-elevated-2 text-ink-300",
          )}
          aria-label="Send message"
        >
          <ArrowUp className="size-5" strokeWidth={1.5} />
        </Button>
      </div>
    </div>
  );
}
