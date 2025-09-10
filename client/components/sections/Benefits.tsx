import { ShieldCheck, Smile, Sparkles, Users2 } from "lucide-react";
import { useI18n } from "@/i18n";

export default function Benefits() {
  const { t } = useI18n();
  const items = (t("benefits.items") as { title: string; desc: string }[]).map((b, idx) => ({
    icon:
      idx === 0 ? (
        <ShieldCheck className="h-6 w-6 text-primary" aria-hidden="true" />
      ) : idx === 1 ? (
        <Sparkles className="h-6 w-6 text-primary" aria-hidden="true" />
      ) : idx === 2 ? (
        <Smile className="h-6 w-6 text-primary" aria-hidden="true" />
      ) : (
        <Users2 className="h-6 w-6 text-primary" aria-hidden="true" />
      ),
    title: b.title,
    desc: b.desc,
  }));
  return (
    <section className="container py-[50px]">
      <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">{t("benefits.heading")}</h2>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((b) => (
          <div key={b.title} className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
              {b.icon}
            </div>
            <h3 className="font-semibold">{b.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{b.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
