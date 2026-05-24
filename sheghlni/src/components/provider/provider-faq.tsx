import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { ProviderFaq } from "@/lib/provider/profile-data";

type ProviderFaqSectionProps = {
  faqs: ProviderFaq[];
};

export function ProviderFaqSection({ faqs }: ProviderFaqSectionProps) {
  return (
    <section className="mt-12 border-t border-border pt-10">
      <h2 className="font-display text-h2 text-text-primary">FAQ</h2>
      <Accordion type="single" collapsible className="mt-4">
        {faqs.map((faq) => (
          <AccordionItem key={faq.id} value={faq.id}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

