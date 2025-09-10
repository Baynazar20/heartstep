import { HeartHandshake, MessageCircleHeart, Users } from "lucide-react";
import { useI18n } from "@/i18n";

export default function ProblemMission() {
  const { t } = useI18n();
  const items = [
    {
      icon: <MessageCircleHeart className="h-6 w-6 text-primary" aria-hidden="true" />,
      stat: t("problem.items.one.stat"),
      label: t("problem.items.one.label"),
    },
    {
      icon: <Users className="h-6 w-6 text-primary" aria-hidden="true" />,
      stat: t("problem.items.two.stat"),
      label: t("problem.items.two.label"),
    },
    {
      icon: <HeartHandshake className="h-6 w-6 text-primary" aria-hidden="true" />,
      stat: t("problem.items.three.stat"),
      label: t("problem.items.three.label"),
    },
  ];

  return (
    <section className="container px-8 pt-[50px] pb-[85px]">
      <div className="grid items-center justify-start gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">{t("problem.heading")}</h2>
          <p className="mt-4 text-muted-foreground">{t("problem.p1")}</p>
          <p className="mt-3 text-muted-foreground">{t("problem.p2")}</p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {items.map((it) => (
            <div key={it.label} className="rounded-xl border bg-card p-6 text-center shadow-sm">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                {it.icon}
              </div>
              <p className="text-2xl font-semibold text-foreground">{it.stat}</p>
              <p className="mt-1 text-sm text-muted-foreground">{it.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
