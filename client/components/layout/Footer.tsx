import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics";
import { useI18n } from "@/i18n";
import { Instagram, Send, Mail, Phone } from "lucide-react";

export default function Footer() {
  const { t } = useI18n();
  const socials = [
    {
      id: "instagram",
      label: "Instagram",
      href: "https://instagram.com/heartstep_tm",
      icon: <Instagram className="h-4 w-4" aria-hidden="true" />,
      text: "@heartstep_tm",
    },
    {
      id: "telegram",
      label: "Telegram",
      href: "https://t.me/baynazar_m",
      icon: <Send className="h-4 w-4" aria-hidden="true" />,
      text: "@baynazar_m",
    },
    {
      id: "email",
      label: "Email",
      href: "mailto:info@heartstep.org",
      icon: <Mail className="h-4 w-4" aria-hidden="true" />,
      text: "info@heartstep.org",
    },
    {
      id: "phone",
      label: "Phone",
      href: "tel:+99362667886",
      icon: <Phone className="h-4 w-4" aria-hidden="true" />,
      text: "+99362667886",
    },
  ];

  return (
    <footer className="mt-16 border-t bg-muted/30">
      <div className="container py-10">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-coral/20 text-primary">❤️</span>
              <span className="font-heading text-lg font-semibold">{t("common.brand")}</span>
            </div>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              {t("footer.tagline")}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => track("cta_click", { id: "footer_support" })}
            >
              {t("common.support")}
            </Button>
          </div>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {socials.map((s) => (
            <a
              key={s.id}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("cta_click", { id: `social_${s.id}` })}
              className="group flex items-center gap-3 rounded-md border bg-card p-3 text-sm text-foreground shadow-sm transition-colors hover:bg-secondary"
              aria-label={`${s.label}: ${s.text}`}
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-secondary text-foreground">
                {s.icon}
              </span>
              <span className="flex flex-col">
                <span className="font-medium">{s.label}</span>
                <span className="text-muted-foreground">{s.text}</span>
              </span>
            </a>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-center gap-3 text-sm text-muted-foreground">
          <p>© 2025 {t("common.brand")} {'\u00A0'}</p>
        </div>
      </div>
    </footer>
  );
}
