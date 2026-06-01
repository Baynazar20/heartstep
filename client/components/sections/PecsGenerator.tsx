import { useEffect, useId, useState, type FormEvent, type KeyboardEvent } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useI18n, pecsLanguages, type Lang } from "@/i18n";
import { downloadBase64Image, slugifyForFilename } from "@/lib/pecs";
import type { GeneratePecsCardResponse, PecsStyle } from "@shared/pecs";
import { cn } from "@/lib/utils";

const STYLES: PecsStyle[] = ["simple", "object", "action", "emotion"];

export default function PecsGenerator() {
  const { t, lang } = useI18n();
  const formId = useId();
  const [text, setText] = useState("");
  const [cardLang, setCardLang] = useState<Lang>(lang);
  const [style, setStyle] = useState<PecsStyle>("simple");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<{ base64: string; mime: string } | null>(null);

  const chips = (t("pecs.chips") as string[]) ?? [];

  useEffect(() => {
    setCardLang(lang);
  }, [lang]);

  const mapError = (code?: string, message?: string) => {
    if (code === "validation" || code === "safety") return String(t("pecs.errorValidation"));
    if (code === "rate_limit") return String(t("pecs.errorRateLimit"));
    if (code === "config" || code === "provider") return String(t("pecs.errorService"));
    return message || String(t("pecs.errorGeneric"));
  };

  const generate = async () => {
    setError(null);
    const trimmed = text.trim();
    if (!trimmed) {
      setError(String(t("pecs.errorValidation")));
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/generate-pecs-card", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: trimmed, language: cardLang, style }),
      });
      const data = (await res.json()) as GeneratePecsCardResponse;
      if (data.success === false) {
        setPreview(null);
        setError(mapError(data.code, data.error));
        return;
      }
      setPreview({ base64: data.image, mime: data.mimeType });
    } catch {
      setPreview(null);
      setError(String(t("pecs.errorGeneric")));
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!loading) void generate();
  };

  const onTextKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      if (!loading) void generate();
    }
  };

  const onDownload = () => {
    if (!preview) return;
    const name = `heartstep-pecs-${cardLang}-${slugifyForFilename(text)}.png`;
    downloadBase64Image(preview.base64, preview.mime, name);
  };

  const onClear = () => {
    setText("");
    setPreview(null);
    setError(null);
  };

  const previewAlt = text.trim()
    ? `Generated PECS card preview for: ${text.trim()}`
    : String(t("pecs.previewEmpty"));

  return (
    <section
      id="pecs-generator"
      className="border-t bg-gradient-to-b from-white to-brand-peach/20 py-20"
      aria-labelledby="pecs-heading"
    >
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 id="pecs-heading" className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            {String(t("pecs.title"))}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{String(t("pecs.subtitle"))}</p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-start">
          <form
            id={formId}
            className="space-y-6 rounded-2xl border bg-card p-6 shadow-sm"
            onSubmit={onSubmit}
            noValidate
          >
            <div className="space-y-2">
              <Label htmlFor="pecs-text">{String(t("pecs.inputLabel"))}</Label>
              <Textarea
                id="pecs-text"
                value={text}
                onChange={(e) => setText(e.target.value.slice(0, 120))}
                onKeyDown={onTextKeyDown}
                placeholder={String(t("pecs.inputPlaceholder"))}
                rows={3}
                maxLength={120}
                className="resize-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-describedby="pecs-char-count pecs-text-hint"
                aria-required="true"
                disabled={loading}
              />
              <p id="pecs-char-count" className="text-right text-xs text-muted-foreground">
                {text.length}/120
              </p>
              <p id="pecs-text-hint" className="sr-only">
                Press Control or Command plus Enter to generate
              </p>
            </div>

            <div className="flex flex-wrap gap-2" role="group" aria-label="Example prompts">
              {chips.map((chip) => (
                <button
                  key={chip}
                  type="button"
                  className="rounded-full border border-primary/25 bg-secondary/50 px-3 py-1 text-sm text-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  onClick={() => setText(chip)}
                  disabled={loading}
                >
                  {chip}
                </button>
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="pecs-lang">{String(t("pecs.cardLanguage"))}</Label>
                <Select value={cardLang} onValueChange={(v) => setCardLang(v as Lang)} disabled={loading}>
                  <SelectTrigger id="pecs-lang" aria-label={String(t("pecs.cardLanguage"))}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {pecsLanguages.map((l) => (
                      <SelectItem key={l.code} value={l.code}>
                        {l.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="pecs-style">{String(t("pecs.styleLabel"))}</Label>
                <Select value={style} onValueChange={(v) => setStyle(v as PecsStyle)} disabled={loading}>
                  <SelectTrigger id="pecs-style" aria-label={String(t("pecs.styleLabel"))}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STYLES.map((s) => (
                      <SelectItem key={s} value={s}>
                        {String(t(`pecs.styles.${s}`))}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                type="submit"
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                disabled={loading}
                aria-busy={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />
                    {String(t("pecs.generating"))}
                  </>
                ) : (
                  String(t("pecs.generate"))
                )}
              </Button>
              {preview ? (
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  onClick={onClear}
                  disabled={loading}
                >
                  {String(t("pecs.clear"))}
                </Button>
              ) : null}
            </div>

            {error ? (
              <p
                className="rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive"
                role="alert"
                aria-live="assertive"
              >
                {error}
              </p>
            ) : null}

            <p className="text-xs leading-relaxed text-muted-foreground" role="note">
              {String(t("pecs.disclaimer"))}
            </p>
          </form>

          <div
            className={cn(
              "flex min-h-[280px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-primary/20 bg-white p-6 shadow-sm lg:min-h-[360px]",
            )}
            aria-live="polite"
            aria-busy={loading}
            aria-label={String(t("pecs.title"))}
          >
            {loading ? (
              <div className="flex flex-col items-center gap-3 text-muted-foreground">
                <Loader2 className="h-10 w-10 animate-spin text-primary" aria-hidden />
                <p>{String(t("pecs.generating"))}</p>
              </div>
            ) : preview ? (
              <div className="flex w-full max-w-sm flex-col items-center gap-4">
                <img
                  src={`data:${preview.mime};base64,${preview.base64}`}
                  alt={previewAlt}
                  className="aspect-square w-full max-w-[280px] rounded-xl border object-contain bg-white shadow-md"
                />
                <Button
                  type="button"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  onClick={onDownload}
                  aria-label={String(t("pecs.download"))}
                >
                  {String(t("pecs.download"))}
                </Button>
              </div>
            ) : (
              <p className="max-w-xs text-center text-muted-foreground">{String(t("pecs.previewEmpty"))}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
