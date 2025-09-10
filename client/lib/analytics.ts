export function track(event: string, data?: Record<string, any>) {
  if (typeof window !== "undefined" && (window as any).HeartStep?.track) {
    (window as any).HeartStep.track(event, data || {});
  } else if (typeof window !== "undefined") {
    try {
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({ event, ...(data || {}) });
    } catch {}
  }
}
