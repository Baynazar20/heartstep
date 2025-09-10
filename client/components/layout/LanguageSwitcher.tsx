import { Button } from "@/components/ui/button";
import { languages, useI18n } from "@/i18n";

export default function LanguageSwitcher() {
  const { lang, setLang } = useI18n();
  return (
    <div role="group" aria-label="Language selector" className="flex gap-1">
      {languages.map((l) => (
        <Button
          key={l.code}
          variant={l.code === lang ? "default" : "outline"}
          size="sm"
          className={`${l.code === lang ? "bg-primary text-primary-foreground" : "border-primary/30 text-primary"} h-8 px-2 text-xs sm:h-9 sm:px-3 sm:text-sm`}
          aria-pressed={l.code === lang}
          onClick={() => setLang(l.code)}
        >
          {l.label}
        </Button>
      ))}
    </div>
  );
}
