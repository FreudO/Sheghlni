"use client";

import { useCallback, useRef, useState } from "react";
import { Upload } from "lucide-react";
import type { Service, User } from "@/lib/mock";
import { BookingStepActions } from "@/components/booking/booking-step-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ICON_STROKE } from "@/components/ui/icon-well";
import type { Urgency } from "@/lib/booking/utils";
import { cn } from "@/lib/utils";

export type DetailsStepData = {
  serviceId: string;
  description: string;
  photoPreviews: string[];
  location: string;
  isRemote: boolean;
  urgency: Urgency;
};

type DetailsStepProps = {
  user: User;
  services: Service[];
  data: DetailsStepData;
  onChange: (patch: Partial<DetailsStepData>) => void;
  onContinue: () => void;
  error?: string | null;
};

const URGENCY_OPTIONS: { value: Urgency; label: string }[] = [
  { value: "flexible", label: "Flexible" },
  { value: "this-week", label: "This week" },
  { value: "asap", label: "ASAP" },
];

export function DetailsStep({
  user,
  services,
  data,
  onChange,
  onContinue,
  error,
}: DetailsStepProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const firstName = user.fullName.split(" ")[0] ?? user.fullName;

  const addFiles = useCallback(
    (files: FileList | null) => {
      if (!files?.length) return;
      const urls = Array.from(files)
        .filter((f) => f.type.startsWith("image/"))
        .map((f) => URL.createObjectURL(f));
      onChange({ photoPreviews: [...data.photoPreviews, ...urls].slice(0, 6) });
    },
    [data.photoPreviews, onChange],
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-h3 text-text-primary">Job details</h2>
        <p className="mt-1 text-sm text-text-secondary">
          Tell {firstName} what you need so they can prepare an accurate quote.
        </p>
      </div>

      <fieldset>
        <legend className="mb-2 text-sm font-medium text-text-primary">
          Service
        </legend>
        <div className="space-y-2">
          {services.map((service) => (
            <label
              key={service.id}
              className={cn(
                "flex cursor-pointer items-start gap-3 rounded-2xl border px-4 py-3 transition",
                data.serviceId === service.id
                  ? "border-bronze-500 bg-bronze-500/5"
                  : "border-border bg-bg hover:border-bronze-500/40",
              )}
            >
              <input
                type="radio"
                name="service"
                value={service.id}
                checked={data.serviceId === service.id}
                onChange={() => onChange({ serviceId: service.id })}
                className="mt-1 accent-cta"
              />
              <span className="min-w-0 flex-1">
                <span className="font-medium text-text-primary">
                  {service.title}
                </span>
                <span className="mt-0.5 block text-sm text-text-secondary line-clamp-2">
                  {service.description}
                </span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="block">
        <span className="mb-2 block text-sm font-medium text-text-primary">
          Describe your job
        </span>
        <textarea
          value={data.description}
          onChange={(e) => onChange({ description: e.target.value })}
          rows={5}
          placeholder="The more detail you give, the better. E.g. 'Interior painting of a 3-bedroom apartment, 1,200 sq ft. Walls only, no ceilings. Walls need patching in 2 rooms first.'"
          className="w-full resize-y rounded-2xl border border-border bg-bg px-4 py-3 text-sm text-text-primary outline-none placeholder:text-ink-300 focus-visible:ring-2 focus-visible:ring-bronze-500/30"
        />
      </label>

      <div>
        <p className="mb-2 text-sm font-medium text-text-primary">
          Add photos to help {firstName} understand the job
        </p>
        <div
          role="button"
          tabIndex={0}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            addFiles(e.dataTransfer.files);
          }}
          onClick={() => fileRef.current?.click()}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") fileRef.current?.click();
          }}
          className={cn(
            "flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-10 text-center transition",
            dragOver
              ? "border-bronze-500 bg-bronze-500/5"
              : "border-border bg-bg-elevated hover:border-bronze-500/50",
          )}
        >
          <Upload className="size-8 text-ink-300" strokeWidth={ICON_STROKE} />
          <p className="mt-2 text-sm font-medium text-text-primary">
            Drag and drop photos here
          </p>
          <p className="mt-1 text-xs text-ink-300">or click to browse (max 6)</p>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            multiple
            className="sr-only"
            onChange={(e) => addFiles(e.target.files)}
          />
        </div>
        {data.photoPreviews.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {data.photoPreviews.map((url) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={url}
                src={url}
                alt=""
                className="size-20 rounded-lg object-cover"
              />
            ))}
          </div>
        )}
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between gap-2">
          <span className="text-sm font-medium text-text-primary">Location</span>
          <label className="inline-flex items-center gap-2 text-sm text-text-secondary">
            <input
              type="checkbox"
              checked={data.isRemote}
              onChange={(e) => onChange({ isRemote: e.target.checked })}
              className="accent-cta"
            />
            Online / Remote
          </label>
        </div>
        <Input
          value={data.location}
          onChange={(e) => onChange({ location: e.target.value })}
          placeholder="Where is the job?"
          disabled={data.isRemote}
          className={cn(data.isRemote && "opacity-50")}
        />
      </div>

      <fieldset>
        <legend className="mb-2 text-sm font-medium text-text-primary">
          Urgency
        </legend>
        <div className="flex flex-wrap gap-2">
          {URGENCY_OPTIONS.map((opt) => (
            <label
              key={opt.value}
              className={cn(
                "inline-flex cursor-pointer items-center rounded-full border px-4 py-2 text-sm transition",
                data.urgency === opt.value
                  ? "border-bronze-500 bg-bronze-500/10 text-bronze-600"
                  : "border-border text-text-secondary hover:border-bronze-500/40",
              )}
            >
              <input
                type="radio"
                name="urgency"
                value={opt.value}
                checked={data.urgency === opt.value}
                onChange={() => onChange({ urgency: opt.value })}
                className="sr-only"
              />
              {opt.label}
            </label>
          ))}
        </div>
      </fieldset>

      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}

      <BookingStepActions>
        <Button
          type="button"
          onClick={onContinue}
          className="h-12 min-h-11 w-full rounded-full bg-cta text-base font-semibold text-white hover:bg-cta-hover"
        >
          Continue
        </Button>
      </BookingStepActions>
    </div>
  );
}
