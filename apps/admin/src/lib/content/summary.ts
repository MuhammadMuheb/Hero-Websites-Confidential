/** Short, honest descriptions of what a section holds, worked out from its own data. */

const IMAGE_KEYS = new Set(["src", "url", "imageUrl", "image", "ogImage"]);
const TITLE_KEYS = ["title", "heading", "name", "label", "question"];

const isObject = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v);
const clip = (s: string, n = 48) => (s.length > n ? `${s.slice(0, n - 1).trimEnd()}…` : s);

/** The first image address found anywhere in the value, for the row thumbnail. */
export function firstImage(value: unknown): string | null {
  if (typeof value === "string") return null;
  if (Array.isArray(value)) {
    for (const v of value) {
      const found = firstImage(v);
      if (found) return found;
    }
    return null;
  }
  if (isObject(value)) {
    for (const [k, v] of Object.entries(value)) {
      if (IMAGE_KEYS.has(k) && typeof v === "string" && /^https?:\/\//i.test(v)) return v;
      if (isObject(v) || Array.isArray(v)) {
        const found = firstImage(v);
        if (found) return found;
      }
    }
  }
  return null;
}

/** Image objects that have an address but no alt text. */
export function imagesMissingAlt(value: unknown): number {
  if (Array.isArray(value)) return value.reduce<number>((n, v) => n + imagesMissingAlt(v), 0);
  if (!isObject(value)) return 0;
  const url = typeof value.src === "string" ? value.src : typeof value.url === "string" ? value.url : "";
  const own = url.trim() && "alt" in value && !(typeof value.alt === "string" && value.alt.trim()) ? 1 : 0;
  return own + Object.values(value).reduce<number>((n, v) => n + imagesMissingAlt(v), 0);
}

function describe(value: unknown): string | null {
  if (typeof value === "string") return value.trim() ? clip(value.trim()) : null;
  if (Array.isArray(value)) return value.length === 0 ? "No items" : `${value.length} ${value.length === 1 ? "item" : "items"}`;
  if (isObject(value)) {
    for (const k of TITLE_KEYS) {
      const v = value[k];
      if (typeof v === "string" && v.trim()) return clip(v.trim());
    }
    const filled = Object.values(value).filter((v) => (typeof v === "string" ? v.trim() : v !== null && v !== undefined)).length;
    return filled === 0 ? null : `${filled} ${filled === 1 ? "field" : "fields"}`;
  }
  return null;
}

/** For example "Title text · 20 items". Empty sections say so. */
export function summarize(keys: string[], data: Record<string, unknown>): string {
  const parts = keys.map((k) => describe(data[k])).filter((p): p is string => p !== null);
  return parts.length === 0 ? "Empty" : parts.slice(0, 2).join(" · ");
}
