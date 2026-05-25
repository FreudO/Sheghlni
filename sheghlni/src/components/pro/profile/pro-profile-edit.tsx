"use client";

import Link from "next/link";
import { Fragment, useState } from "react";
import { GripVertical, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getProviderByHandle } from "@/lib/mock";
import {
  getProviderFaqs,
  getServicesForProvider,
} from "@/lib/provider/profile-data";
import type { Service } from "@/lib/mock";
import { DEMO_PRO_HANDLE, DEMO_PRO_PROVIDER_ID } from "@/lib/mock/pro-data";
import { ICON_STROKE } from "@/components/ui/icon-well";
import { toast } from "@/lib/toast";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const HOURS = ["9a", "12p", "3p", "6p"];

export function ProProfileEdit() {
  const provider = getProviderByHandle(DEMO_PRO_HANDLE);
  const services = getServicesForProvider(DEMO_PRO_PROVIDER_ID);
  const faqs = getProviderFaqs(DEMO_PRO_PROVIDER_ID);

  const [bio, setBio] = useState(provider?.bio ?? "");
  const [headline, setHeadline] = useState(provider?.headline ?? "");
  const [pricingModel, setPricingModel] = useState("project");
  const [faqItems, setFaqItems] = useState(faqs);
  const [saved, setSaved] = useState(false);
  const [grid, setGrid] = useState<Record<string, boolean>>({});

  const toggleCell = (day: string, hour: string) => {
    const key = `${day}-${hour}`;
    setGrid((g) => ({ ...g, [key]: !g[key] }));
  };

  const handleSave = () => {
    setSaved(true);
    toast.success("Profile saved.");
    window.setTimeout(() => setSaved(false), 2500);
  };

  if (!provider) return null;

  return (
    <div className="mx-auto max-w-3xl space-y-10 pb-12">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-h1 text-text-primary">Edit profile</h1>
        <div className="flex gap-2">
          <Link
            href={`/p/${DEMO_PRO_HANDLE}/`}
            className="inline-flex h-9 items-center rounded-full border border-border px-4 text-sm font-medium text-text-primary hover:bg-muted"
          >
            Preview profile
          </Link>
          <Button
            type="button"
            onClick={handleSave}
            className="rounded-full bg-cta text-white hover:bg-cta-hover"
          >
            {saved ? "Saved!" : "Save changes"}
          </Button>
        </div>
      </header>

      <section>
        <h2 className="font-display text-h3 text-text-primary">Photos</h2>
        <p className="mt-1 text-sm text-ink-300">
          Drag to reorder. Star your hero image.
        </p>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {provider.mediaUrls.slice(0, 5).map((url, index) => (
            <div
              key={url}
              className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-border bg-bg-elevated"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="" className="size-full object-cover" />
              <button
                type="button"
                className="absolute left-2 top-2 rounded-full bg-bg/90 p-1 opacity-0 transition group-hover:opacity-100"
                aria-label="Reorder"
              >
                <GripVertical className="size-4" strokeWidth={ICON_STROKE} />
              </button>
              {index === 0 && (
                <span className="absolute bottom-2 left-2 rounded-full bg-bronze-500 px-2 py-0.5 text-caption font-medium text-white">
                  Hero
                </span>
              )}
            </div>
          ))}
          <button
            type="button"
            className="flex aspect-[4/3] items-center justify-center rounded-xl border border-dashed border-border text-sm text-ink-300 hover:border-cta/40"
          >
            + Add photo
          </button>
        </div>
      </section>

      <section>
        <h2 className="font-display text-h3 text-text-primary">Bio</h2>
        <Input
          value={headline}
          onChange={(e) => setHeadline(e.target.value)}
          placeholder="Headline"
          className="mt-3"
        />
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value.slice(0, 2000))}
          rows={6}
          className="mt-3 w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm"
          placeholder="Tell customers about your experience…"
        />
        <p className="mt-1 text-right text-caption text-ink-300">
          {bio.length}/2000
        </p>
      </section>

      <section>
        <h2 className="font-display text-h3 text-text-primary">Services</h2>
        <div className="mt-4 overflow-hidden rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-bg-elevated text-caption text-ink-300">
              <tr>
                <th className="px-4 py-2 text-left">Service</th>
                <th className="px-4 py-2 text-left">Price</th>
                <th className="px-4 py-2" />
              </tr>
            </thead>
            <tbody>
              {services.map((svc: Service) => (
                <tr key={svc.id} className="border-t border-border">
                  <td className="px-4 py-3 font-medium">{svc.title}</td>
                  <td className="px-4 py-3 text-ink-300">
                    From ${Math.round(svc.priceMinCents / 100)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button type="button" className="text-cta text-sm">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Button type="button" variant="outline" size="sm" className="mt-3 rounded-full gap-1">
          <Plus className="size-3.5" />
          Add service
        </Button>
      </section>

      <section>
        <h2 className="font-display text-h3 text-text-primary">Availability</h2>
        <div className="mt-4 overflow-x-auto">
          <div className="inline-grid gap-1" style={{ gridTemplateColumns: `4rem repeat(${DAYS.length}, 3rem)` }}>
            <div />
            {DAYS.map((d) => (
              <span key={d} className="text-center text-caption font-medium text-ink-300">
                {d}
              </span>
            ))}
            {HOURS.map((hour) => (
              <Fragment key={hour}>
                <span className="py-2 text-caption text-ink-300">{hour}</span>
                {DAYS.map((day) => {
                  const key = `${day}-${hour}`;
                  const on = grid[key];
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => toggleCell(day, hour)}
                      className={`size-12 rounded-lg border transition ${
                        on
                          ? "border-sage-500 bg-sage-500/20"
                          : "border-border bg-bg hover:bg-bg-elevated"
                      }`}
                      aria-pressed={on}
                    />
                  );
                })}
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      <section>
        <h2 className="font-display text-h3 text-text-primary">Pricing model</h2>
        <select
          value={pricingModel}
          onChange={(e) => setPricingModel(e.target.value)}
          className="mt-3 h-10 w-full max-w-xs rounded-lg border border-border bg-bg px-3 text-sm"
        >
          <option value="hour">Hourly</option>
          <option value="project">Per project</option>
          <option value="visit">Per visit</option>
          <option value="custom">Custom</option>
        </select>
      </section>

      <section>
        <h2 className="font-display text-h3 text-text-primary">FAQ</h2>
        <Accordion type="single" collapsible className="mt-4">
          {faqItems.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>
                <p>{faq.answer}</p>
                <button
                  type="button"
                  onClick={() =>
                    setFaqItems((items) => items.filter((f) => f.id !== faq.id))
                  }
                  className="mt-2 inline-flex items-center gap-1 text-sm text-destructive"
                >
                  <Trash2 className="size-3.5" />
                  Remove
                </button>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-3 rounded-full"
          onClick={() =>
            setFaqItems((items) => [
              ...items,
              {
                id: `faq-new-${items.length}`,
                question: "New question",
                answer: "Add your answer here.",
              },
            ])
          }
        >
          Add FAQ item
        </Button>
      </section>
    </div>
  );
}
