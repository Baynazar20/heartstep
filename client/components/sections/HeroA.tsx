import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics";
import { useI18n } from "@/i18n";

export default function HeroA() {
  const { t } = useI18n();
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-secondary to-white" aria-hidden="true" />
      <div className="container grid gap-10 py-16 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:py-24">
        <div>
          <h1 className="font-heading text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl">
            {t("hero.title")}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">
            {t("hero.a_sub")}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => track("cta_click", { id: "heroA_join" })}
            >
              {t("common.join")}
            </Button>
            <Button
              variant="outline"
              className="border-primary/30 text-primary hover:bg-secondary"
              onClick={() => track("cta_click", { id: "heroA_support" })}
            >
              {t("common.support")}
            </Button>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-6 text-center sm:max-w-md">
            <div>
              <p className="text-3xl font-semibold text-primary">95%</p>
              <p className="text-sm text-muted-foreground">{t("hero.stats.c1")}</p>
            </div>
            <div>
              <p className="text-3xl font-semibold text-primary">4x</p>
              <p className="text-sm text-muted-foreground">{t("hero.stats.c2")}</p>
            </div>
            <div>
              <p className="text-3xl font-semibold text-primary">86</p>
              <p className="text-sm text-muted-foreground">{t("hero.stats.c3")}</p>
            </div>
          </div>
        </div>
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=1400&auto=format&fit=crop"
            alt="Children and caregiver playing in warm natural light"
            className="w-full rounded-2xl border shadow-sm"
          />
          <div className="absolute -bottom-6 -left-6 hidden h-24 w-24 rounded-2xl bg-brand-green/40 blur-2xl sm:block" aria-hidden="true" />
          <div className="absolute -top-8 -right-6 hidden h-28 w-28 rounded-full bg-brand-coral/40 blur-2xl sm:block" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
