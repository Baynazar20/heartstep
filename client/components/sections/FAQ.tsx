import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useI18n } from "@/i18n";

export default function FAQ() {
  const { t } = useI18n();
  const items = t("faq.items") as { q: string; a: string }[];
  return (
    <section className="container px-8 py-[50px]">
      <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">{t("faq.heading")}</h2>
      <div className="mt-6 rounded-xl border bg-card p-2 shadow-sm sm:p-4">
        <Accordion type="single" collapsible className="w-full">
          {items.map((f, idx) => (
            <AccordionItem key={idx} value={`f-${idx}`}>
              <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">{f.a}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
