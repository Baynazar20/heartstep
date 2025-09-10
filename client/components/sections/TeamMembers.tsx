import { team } from "@/data/cms";
import { useI18n } from "@/i18n";

export default function TeamMembers() {
  const { t } = useI18n();
  return (
    <section className="container px-8 py-[50px]">
      <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">{t("team.heading")}</h2>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {team.map((m) => (
          <article key={m.id} className="rounded-xl border bg-card p-4 shadow-sm">
            <img
              src={m.photoUrl}
              alt={m.alt}
              className="aspect-square w-full rounded-lg object-cover"
            />
            <div className="mt-4">
              <h3 className="text-base font-semibold leading-tight">{m.name}</h3>
              <p className="text-sm text-muted-foreground">{m.role}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
