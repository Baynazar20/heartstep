import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { testimonials } from "@/data/cms";
import { useI18n } from "@/i18n";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function Testimonials() {
  const { t } = useI18n();
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [selected, setSelected] = useState(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setSelected(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  useEffect(() => {
    if (!api) return;
    const tick = () => {
      if (pausedRef.current) return;
      if (api.canScrollNext()) api.scrollNext();
      else api.scrollTo(0);
    };
    const id = window.setInterval(tick, 5000);
    return () => window.clearInterval(id);
  }, [api]);

  const goTo = (i: number) => api?.scrollTo(i);

  return (
    <section
      className="bg-secondary/40 py-[50px]"
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
    >
      <div className="container">
        <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">{t("testimonials.heading")}</h2>
        <div className="mt-8">
          <Carousel opts={{ align: "start", loop: true }} setApi={setApi}>
            <CarouselContent>
              {testimonials.map((t) => (
                <CarouselItem key={t.id} className="md:basis-1/2 lg:basis-1/3">
                  <figure className="h-full rounded-xl border bg-card p-6 shadow-sm">
                    <div className="flex items-center gap-3">
                      <img src={t.photoUrl} alt={t.alt} className="h-12 w-12 rounded-full object-cover" />
                      <figcaption>
                        <p className="font-semibold leading-tight">{t.name}</p>
                        <p className="text-xs text-muted-foreground">{t.role}</p>
                      </figcaption>
                    </div>
                    <blockquote className="mt-4 text-sm text-foreground">“{t.quote}”</blockquote>
                  </figure>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full"
              aria-label="Previous testimonial"
              onClick={() => api?.scrollPrev()}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-1">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => goTo(i)}
                  className={`h-2 w-2 rounded-full transition-colors ${i === selected ? "bg-primary" : "bg-muted"}`}
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full"
              aria-label="Next testimonial"
              onClick={() => api?.scrollNext()}
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
