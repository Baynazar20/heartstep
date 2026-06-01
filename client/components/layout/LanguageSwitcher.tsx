import { Check, ChevronDown, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { languages, useI18n, type Lang } from "@/i18n";
import { cn } from "@/lib/utils";

type LanguageSwitcherProps = {
  /** Full-width list style for mobile drawer */
  variant?: "dropdown" | "list";
  className?: string;
};

export default function LanguageSwitcher({ variant = "dropdown", className }: LanguageSwitcherProps) {
  const { lang, setLang, t } = useI18n();
  const current = languages.find((l) => l.code === lang);

  if (variant === "list") {
    return (
      <div className={cn("space-y-1", className)} role="group" aria-label={String(t("common.language"))}>
        <p className="px-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {String(t("common.language"))}
        </p>
        {languages.map((l) => (
          <button
            key={l.code}
            type="button"
            className={cn(
              "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors",
              l.code === lang ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted",
            )}
            aria-pressed={l.code === lang}
            onClick={() => setLang(l.code as Lang)}
          >
            <span>{l.label}</span>
            {l.code === lang ? <Check className="h-4 w-4" aria-hidden /> : null}
          </button>
        ))}
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn("h-9 gap-1.5 border-primary/30 text-primary", className)}
          aria-label={`${String(t("common.language"))}: ${current?.label ?? lang}`}
        >
          <Languages className="h-4 w-4" aria-hidden />
          <span className="hidden max-w-[7rem] truncate sm:inline">{current?.label}</span>
          <span className="sm:hidden">{lang.toUpperCase()}</span>
          <ChevronDown className="h-3.5 w-3.5 opacity-70" aria-hidden />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[10rem]">
        {languages.map((l) => (
          <DropdownMenuItem
            key={l.code}
            className="flex cursor-pointer items-center justify-between gap-2"
            onClick={() => setLang(l.code as Lang)}
          >
            <span>{l.label}</span>
            {l.code === lang ? <Check className="h-4 w-4 text-primary" aria-hidden /> : null}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
