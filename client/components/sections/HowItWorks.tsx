import { CheckCircle2 } from "lucide-react";
import { useI18n } from "@/i18n";

export default function HowItWorks() {
  const { t } = useI18n();
  const steps = t("how.steps") as { title: string; desc: string }[];
  return (
    <section className="bg-secondary/40 py-14 sm:py-20">
      <div className="container">
        <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">{t("how.heading")}</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.title} className="relative rounded-xl border bg-card p-6 shadow-sm">
              <div className="absolute -top-3 left-6 inline-flex h-8 items-center rounded-full bg-brand-peach px-3 text-xs font-semibold text-foreground">
                {`Step ${i + 1}`}
              </div>
              <div className="mt-3 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" aria-hidden="true" />
                <h3 className="font-semibold">{s.title}</h3>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
