import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { events } from "@/data/cms";
import { useI18n } from "@/i18n";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const SLIDE_MS = 5000;
const TOTAL = events.length;

function useCardsPerView() {
  const [perView, setPerView] = useState(3);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setPerView(1);
      else if (w < 1024) setPerView(2);
      else setPerView(3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return perView;
}

export default function EventsSection() {
  const { t } = useI18n();
  const perView = useCardsPerView();
  const pageCount = Math.ceil(TOTAL / perView);
  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback(
    (next: number) => {
      setPage(((next % pageCount) + pageCount) % pageCount);
    },
    [pageCount],
  );

  useEffect(() => {
    setPage((p) => Math.min(p, pageCount - 1));
  }, [pageCount]);

  useEffect(() => {
    if (paused || pageCount <= 1) return;
    const id = window.setInterval(() => {
      setPage((p) => (p + 1) % pageCount);
    }, SLIDE_MS);
    return () => window.clearInterval(id);
  }, [paused, pageCount]);

  const translatePercent = -(page * 100);

  return (
    <section
      id="events"
      className="bg-secondary/40 py-20"
      aria-labelledby="events-heading"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setPaused(false);
      }}
    >
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2
            id="events-heading"
            className="font-heading text-3xl font-bold tracking-tight sm:text-4xl"
          >
            {String(t("events.heading"))}
          </h2>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="rounded-full"
              aria-label={String(t("events.prev"))}
              onClick={() => goTo(page - 1)}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="rounded-full"
              aria-label={String(t("events.next"))}
              onClick={() => goTo(page + 1)}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="relative mt-8 overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(${translatePercent}%)` }}
          >
            {Array.from({ length: pageCount }).map((_, pageIndex) => (
              <div
                key={pageIndex}
                className="grid w-full shrink-0 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                aria-hidden={pageIndex !== page}
              >
                {events.slice(pageIndex * perView, pageIndex * perView + perView).map((e) => (
                  <article
                    key={e.id}
                    className="flex h-full flex-col overflow-hidden rounded-xl border bg-card shadow-sm"
                  >
                    <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-muted">
                      <img
                        src={e.imageUrl}
                        alt={e.imageAlt}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <p className="text-sm font-medium text-primary">{e.dateLabel}</p>
                      <h3 className="mt-1 text-xl font-semibold leading-snug">{e.title}</h3>
                      <p className="mt-2 text-muted-foreground">{e.location}</p>
                      {e.href ? (
                        <Button
                          className="mt-auto w-full rounded-[14px] bg-primary text-primary-foreground hover:bg-primary/90"
                          asChild
                        >
                          <a
                            href={e.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => track("cta_click", { id: `event_read_more_${e.id}` })}
                          >
                            {String(t("events.readMore"))}
                          </a>
                        </Button>
                      ) : (
                        <Button
                          className="mt-auto w-full rounded-[14px] bg-primary text-primary-foreground hover:bg-primary/90"
                          onClick={() => track("cta_click", { id: `event_read_more_${e.id}` })}
                        >
                          {String(t("events.readMore"))}
                        </Button>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-2" role="tablist" aria-label="Event carousel pages">
          {Array.from({ length: pageCount }).map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === page}
              aria-label={`Page ${i + 1}`}
              className={cn(
                "h-2 w-2 rounded-full transition-colors",
                i === page ? "bg-primary w-6" : "bg-primary/30",
              )}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
