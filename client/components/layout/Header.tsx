import LanguageSwitcher from "./LanguageSwitcher";
import { useI18n } from "@/i18n";

export default function Header() {
  const { t } = useI18n();
  return (
    <header className="sticky top-0 z-30 w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-background/80">
      <div className="container flex h-16 items-center justify-between">
        <a href="/" aria-label="HeartStep home" className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-coral/20 text-primary">
            <img src="./logo.png" alt="" />
          </span>
          <span className="font-heading text-lg font-semibold tracking-tight">{t("common.brand")}</span>
        </a>
        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
