import { Menu } from "lucide-react";
import { useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import { useI18n } from "@/i18n";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Header() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#events", label: String(t("nav.events")) },
    { href: "#pecs-generator", label: String(t("nav.generator")) },
    { href: "#contact", label: String(t("contact.heading")) },
  ];

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-background/80">
      <div className="container flex h-16 items-center justify-between gap-4">
        <a href="/" aria-label="HeartStep home" className="flex shrink-0 items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-coral/20 text-primary">
            <img src="./logo.png" alt="" width={32} height={32} />
          </span>
          <span className="font-heading text-lg font-semibold tracking-tight">{String(t("common.brand"))}</span>
        </a>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Main">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <LanguageSwitcher variant="dropdown" />
          </div>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="md:hidden"
                aria-label={String(t("nav.menu"))}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(100vw-2rem,20rem)]">
              <SheetHeader>
                <SheetTitle>{String(t("nav.menu"))}</SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-1" aria-label="Mobile">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-muted"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
              <div className="mt-6 border-t pt-6">
                <LanguageSwitcher variant="list" />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
