import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { track } from "@/lib/analytics";
import { useI18n } from "@/i18n";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";

const screenshots = [
  "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=800&auto=format&fit=crop",
];

export default function HeroB() {
  const { t } = useI18n();
  const [idx, setIdx] = useState(0);
  const [joinOpen, setJoinOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIdx((i) => (i + 1) % screenshots.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, []);

  const onJoin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    track("join_submit", data as any);
    toast.success(t("contact.toast_contact"));
    setJoinOpen(false);
  };

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white via-brand-peach to-white" aria-hidden="true" />
      <div className="container grid items-center justify-start gap-16 py-5 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <div className="relative mx-auto w-full max-w-[240px]">
            <div className="relative aspect-[9/19.5] w-full rounded-[35.2px] border bg-black shadow-2xl">
                            {screenshots.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt={`HeartStep mobile app screenshot ${i + 1}`}
                  className={`absolute inset-0 h-full w-full rounded-[33.6px] object-cover transition-opacity duration-700 ${i === idx ? "opacity-100" : "opacity-0"}`}
                />
              ))}
            </div>
            <div className="absolute -bottom-6 -left-6 hidden h-24 w-24 rounded-2xl bg-brand-peach/50 blur-2xl sm:block" aria-hidden="true" />
            <div className="absolute -top-8 -right-6 hidden h-28 w-28 rounded-full bg-brand-green/40 blur-2xl sm:block" aria-hidden="true" />
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <h1 className="font-heading text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl">
            {t("hero.title")}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">
            {t("hero.b_sub")}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => {
                track("cta_click", { id: "heroB_join" });
                setJoinOpen(true);
              }}
            >
              {t("hero.play")}
            </Button>
            <Button
              variant="outline"
              className="border-primary/30 text-primary hover:bg-secondary"
              onClick={() => {
                track("cta_click", { id: "heroB_support" });
                setSupportOpen(true);
              }}
            >
              {t("hero.parentsGuide")}
            </Button>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            {t("hero.trusted")}
          </p>
        </div>
      </div>

      {/* Join modal */}
      <Dialog open={joinOpen} onOpenChange={setJoinOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("common.join")}</DialogTitle>
            <DialogDescription>{t("contact.sub")}</DialogDescription>
          </DialogHeader>
          <form className="grid gap-3" onSubmit={onJoin}>
            <div className="grid gap-2">
              <Label htmlFor="join_name">{t("contact.name")}</Label>
              <Input id="join_name" name="name" required placeholder="Your name" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="join_email">{t("contact.email")}</Label>
              <Input id="join_email" name="email" type="email" required placeholder="you@example.com" />
            </div>
            <DialogFooter>
              <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">{t("common.register")}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Support modal */}
      <Dialog open={supportOpen} onOpenChange={setSupportOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("common.support")}</DialogTitle>
            <DialogDescription>{t("help.heading")}</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2">
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => {
                track("support_click", { type: "donate" });
                toast.success(t("contact.toast_news"));
                setSupportOpen(false);
              }}
            >
              {t("common.donate")}
            </Button>
            <Button
              variant="outline"
              className="border-primary/30 text-primary hover:bg-secondary"
              onClick={() => {
                track("support_click", { type: "volunteer" });
                toast.success(t("contact.toast_news"));
                setSupportOpen(false);
              }}
            >
              {t("common.volunteer")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
