import type { Timestamp } from "firebase-admin/firestore";

export function toIso(v: unknown): string | null {
  if (!v) return null;
  if (v instanceof Date) return v.toISOString();
  const t = v as Timestamp;
  if (typeof t.toDate === "function") return t.toDate().toISOString();
  return null;
}

/** Firestore rejects undefined; drop it recursively. */
export function clean<T>(value: T): T {
  if (Array.isArray(value)) return value.map(clean) as T;
  if (value && typeof value === "object" && !(value instanceof Date)) {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      if (v !== undefined) out[k] = clean(v);
    }
    return out as T;
  }
  return value;
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/&/g, "and")
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
