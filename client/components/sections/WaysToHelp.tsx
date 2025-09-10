import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics";

export default function WaysToHelp() {
  const events = [
    { id: "sep-24-28", title: "Sep 24-28", desc: "Malaysian" },
    { id: "oct-3-4", title: "Oct 3-4", desc: "Kazakhstan" },
    { id: "oct-26-28", title: "Oct 26-28", desc: "Columbia" },
  ];

  return (
    <section className="bg-secondary/40 py-20">
      <div className="container">
        <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">Our upcoming events</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {events.map((e) => (
            <div key={e.id} className="rounded-xl border bg-card p-6 shadow-sm">
              <h3 className="text-2xl font-semibold">{e.title}</h3>
              <p className="mt-2 text-lg text-muted-foreground">{e.desc}</p>
              <Button
                className="mt-4 w-full rounded-[14px] bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => track("cta_click", { id: `event_read_more_${e.id}` })}
              >
                Read More
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
