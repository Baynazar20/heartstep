import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { track } from "@/lib/analytics";
import { toast } from "sonner";
import { FormEvent } from "react";
import { useI18n } from "@/i18n";

export default function ContactNewsletter() {
  const { t } = useI18n();
  const onContact = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    track("contact_submit", data as any);
    toast.success(t("contact.toast_contact"));
    (e.currentTarget as HTMLFormElement).reset();
  };
  const onNewsletter = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    track("newsletter_subscribe", data as any);
    toast.success(t("contact.toast_news"));
    (e.currentTarget as HTMLFormElement).reset();
  };

  return (
    <section id="contact" className="container px-8 py-[50px]">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <h3 className="font-heading text-2xl font-semibold">{t("contact.heading")}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{t("contact.sub")}</p>
          <form className="mt-4 grid gap-4" onSubmit={onContact}>
            <div className="grid gap-2">
              <Label htmlFor="name">{t("contact.name")}</Label>
              <Input id="name" name="name" required placeholder="Your name" aria-label={t("contact.name")} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">{t("contact.email")}</Label>
              <Input id="email" name="email" type="email" required placeholder="you@example.com" aria-label={t("contact.email")} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="message">{t("contact.message")}</Label>
              <Textarea id="message" name="message" rows={4} placeholder="How can we help?" aria-label={t("contact.message")} />
            </div>
            <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">{t("contact.send")}</Button>
          </form>
        </div>
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <h3 className="font-heading text-2xl font-semibold">{t("contact.newsletter")}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{t("contact.newsletter_sub")}</p>
          <form className="mt-4 flex items-center gap-2" onSubmit={onNewsletter}>
            <Input name="email" type="email" required placeholder="you@example.com" aria-label={t("contact.email")} />
            <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">{t("contact.subscribe")}</Button>
          </form>
          <div className="mt-6">
            <img
              src="./yurekgadamy.png"
              alt="Caregiver reading with child in warm light"
              className="w-full rounded-lg border object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
