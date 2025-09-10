import { useEffect, useRef, useState } from "react";
import { impact } from "@/data/cms";
import { Area, AreaChart, Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { useI18n } from "@/i18n";

function useCountUp(target: number, duration = 1200) {
  const [value, setValue] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const start = performance.now();
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setValue(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration]);
  return value;
}

const chartData = [
  { name: "W1", value: 20 },
  { name: "W2", value: 35 },
  { name: "W3", value: 42 },
  { name: "W4", value: 56 },
  { name: "W5", value: 68 },
];

export default function Impact() {
  const { t } = useI18n();
  return (
    <section className="container px-8 py-[50px]">
      <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">{t("impact.heading")}</h2>
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {impact.map((m) => {
          const v = useCountUp(m.value);
          const label = t(`impact.labels.${m.id}`);
          return (
            <div key={m.id} className="rounded-xl border bg-card p-6 shadow-sm">
              <p className="text-4xl font-extrabold text-primary">{v.toLocaleString()}</p>
              <p className="mt-1 text-sm text-muted-foreground">{label}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <p className="text-sm font-medium">{t("impact.charts.weekly")}</p>
          <div className="mt-4 h-40">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
                <defs>
                  <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--brand-coral))" stopOpacity={0.7} />
                    <stop offset="100%" stopColor="hsl(var(--brand-coral))" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" hide />
                <Tooltip cursor={{ stroke: "hsl(var(--brand-coral))", strokeWidth: 1 }} contentStyle={{ fontSize: 12 }} />
                <Area type="monotone" dataKey="value" stroke="hsl(var(--brand-coral))" fill="url(#grad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <p className="text-sm font-medium">{t("impact.charts.confidence")}</p>
          <div className="mt-4 h-40">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" hide />
                <Tooltip cursor={{ fill: "hsl(var(--brand-peach))" }} contentStyle={{ fontSize: 12 }} />
                <Bar dataKey="value" fill="hsl(var(--brand-green))" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
