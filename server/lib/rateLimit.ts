type Bucket = { count: number; day: string };

const buckets = new Map<string, Bucket>();

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

export function checkRateLimit(
  ip: string,
  maxPerDay = Number(process.env.PECS_RATE_LIMIT_PER_IP ?? 10),
): { allowed: boolean; remaining: number } {
  const day = todayKey();
  const key = `${ip}:${day}`;
  const existing = buckets.get(key);

  if (!existing || existing.day !== day) {
    buckets.set(key, { count: 1, day });
    return { allowed: true, remaining: maxPerDay - 1 };
  }

  if (existing.count >= maxPerDay) {
    return { allowed: false, remaining: 0 };
  }

  existing.count += 1;
  return { allowed: true, remaining: maxPerDay - existing.count };
}

export function getClientIp(req: { headers: Record<string, string | string[] | undefined>; ip?: string }): string {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string") return forwarded.split(",")[0]?.trim() || "unknown";
  if (Array.isArray(forwarded) && forwarded[0]) return forwarded[0].split(",")[0]?.trim() || "unknown";
  return req.ip || "unknown";
}
