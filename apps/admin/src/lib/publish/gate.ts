import type { PageDraft } from "@/lib/types";
import { metaFor } from "@/lib/content/pages";
import { homeSchema, formatIssues, SLUG_RE } from "@/lib/validation/schemas";

export interface GateCheck {
  id: string;
  label: string;
  ok: boolean;
  detail?: string;
}

export interface GateContext {
  /** Slugs of tours that exist in this project (for /tours/<slug> links). */
  tourSlugs: Set<string>;
  /** Meta titles of the other pages in this project (draft values), to enforce uniqueness. */
  otherMetaTitles: string[];
}

interface Leaf {
  path: string;
  key: string;
  value: string;
}

function leaves(value: unknown, path = "", key = ""): Leaf[] {
  if (typeof value === "string") return [{ path, key, value }];
  if (Array.isArray(value)) return value.flatMap((v, i) => leaves(v, `${path}[${i}]`, key));
  if (value && typeof value === "object") {
    return Object.entries(value as Record<string, unknown>).flatMap(([k, v]) => leaves(v, path ? `${path}.${k}` : k, k));
  }
  return [];
}

function imagesMissingAlt(value: unknown, path = ""): string[] {
  const out: string[] = [];
  if (Array.isArray(value)) {
    value.forEach((v, i) => out.push(...imagesMissingAlt(v, `${path}[${i}]`)));
  } else if (value && typeof value === "object") {
    const o = value as Record<string, unknown>;
    const url = typeof o.src === "string" ? o.src : typeof o.url === "string" ? o.url : null;
    if (url && url.trim() && "alt" in o && !(typeof o.alt === "string" && o.alt.trim())) out.push(path || "(root)");
    for (const [k, v] of Object.entries(o)) out.push(...imagesMissingAlt(v, path ? `${path}.${k}` : k));
  }
  return out;
}

const HTML_IMG_NO_ALT = /<img\b(?![^>]*\balt\s*=\s*["'][^"']+["'])[^>]*>/gi;
const HTML_H1 = /<h1\b/gi;
const HTML_HREF = /href\s*=\s*["']([^"']*)["']/gi;

function linkProblem(href: string, ctx: GateContext): string | null {
  const h = href.trim();
  if (!h || h.startsWith("#") || h.startsWith("mailto:") || h.startsWith("tel:") || /^https?:\/\//i.test(h)) return null;
  if (!h.startsWith("/") || h.startsWith("//")) return `"${h}" is not an absolute path or https URL`;
  const path = h.split(/[?#]/)[0];
  if (path !== path.toLowerCase()) return `"${h}" must be lowercase`;
  if (path.length > 1 && !/^\/[a-z0-9\-_/]+$/.test(path.replace(/\/$/, ""))) return `"${h}" contains invalid characters`;
  const tour = /^\/tours\/([^/]+)$/.exec(path);
  if (tour && SLUG_RE.test(tour[1]) && !ctx.tourSlugs.has(tour[1])) return `"${h}" points to a tour that does not exist`;
  return null;
}

/** Sources of the single H1: the hero/page title. */
function h1Source(slug: string, draft: PageDraft): boolean {
  const d = draft.data;
  const hero = (d.hero ?? {}) as Record<string, unknown>;
  const heroTitle = (typeof hero.title === "string" && hero.title.trim()) || (typeof hero.heading === "string" && hero.heading.trim());
  if (slug === "home" || slug === "about" || slug === "contact") return Boolean(heroTitle);
  return Boolean(draft.meta.title.trim());
}

/** Publish gate for pages (blueprint section 12). Publish is allowed only if every check is ok. */
export function runPageGate(slug: string, draft: PageDraft, ctx: GateContext): GateCheck[] {
  const checks: GateCheck[] = [];
  const { metaTitle, metaDesc } = metaFor(slug, draft);
  const all = leaves(draft.data);

  checks.push({
    id: "title",
    label: "Title 30 to 60 characters",
    ok: metaTitle.trim().length >= 30 && metaTitle.trim().length <= 60,
    detail: `Currently ${metaTitle.trim().length} characters`,
  });
  const dup = ctx.otherMetaTitles.some((t) => t.trim().toLowerCase() === metaTitle.trim().toLowerCase() && metaTitle.trim() !== "");
  checks.push({ id: "title-unique", label: "Title unique within the project", ok: !dup, detail: dup ? "Another page uses the same title" : undefined });
  checks.push({
    id: "meta",
    label: "Meta description 70 to 160 characters",
    ok: metaDesc.trim().length >= 70 && metaDesc.trim().length <= 160,
    detail: `Currently ${metaDesc.trim().length} characters`,
  });

  const htmlH1 = all.reduce((n, l) => n + (l.value.match(HTML_H1)?.length ?? 0), 0);
  const h1 = (h1Source(slug, draft) ? 1 : 0) + htmlH1;
  checks.push({
    id: "h1",
    label: "Exactly one H1",
    ok: h1 === 1,
    detail: h1 === 0 ? "The hero title is empty, so the page has no H1" : h1 > 1 ? `${htmlH1} extra <h1> in rich text` : undefined,
  });

  const missingAlt = [...imagesMissingAlt(draft.data), ...all.flatMap((l) => (l.value.match(HTML_IMG_NO_ALT) ? [l.path] : []))];
  checks.push({ id: "alt", label: "Alt text on every image", ok: missingAlt.length === 0, detail: missingAlt.slice(0, 5).join(", ") || undefined });

  const linkIssues = all
    .flatMap((l) => {
      const found: string[] = [];
      if (l.key === "href") found.push(l.value);
      for (const m of l.value.matchAll(HTML_HREF)) found.push(m[1]);
      return found.map((h) => linkProblem(h, ctx)).filter((x): x is string => x !== null);
    })
    .slice(0, 5);
  checks.push({ id: "links", label: "No broken internal links", ok: linkIssues.length === 0, detail: linkIssues.join("; ") || undefined });

  if (slug === "home") {
    const parsed = homeSchema.safeParse(draft.data);
    checks.push({
      id: "structure",
      label: "Home content complete (all counts and required fields)",
      ok: parsed.success,
      detail: parsed.success ? undefined : formatIssues(parsed.error).slice(0, 4).join("; "),
    });
  }
  if (slug === "faq") {
    const blocks = (draft.data.blocks ?? []) as { title?: string; questions?: { question?: string; answer?: string }[] }[];
    const ok = blocks.length > 0 && blocks.every((b) => b.title?.trim() && b.questions?.length && b.questions.every((q) => q.question?.trim() && q.answer?.trim()));
    checks.push({ id: "structure", label: "Every FAQ block has a title and complete questions", ok });
  }
  // Navbar and footer have no title, description or headings of their own.
  if (slug === "navigation") return checks.filter((c) => c.id === "links");
  return checks;
}

export const gatePasses = (checks: GateCheck[]) => checks.every((c) => c.ok);

/** Publish gate for cards (blueprint section 9). */
export function runCardGate(card: {
  title: string;
  slug: string;
  images: { url: string; alt: string }[];
  price: { current: number; original: number | null; originalSince: string } | null;
  affiliateUrl: string;
}): GateCheck[] {
  const t = card.title.trim().length;
  return [
    { id: "title", label: "Title 10 to 70 characters", ok: t >= 10 && t <= 70, detail: `Currently ${t} characters` },
    { id: "slug", label: "Valid slug", ok: SLUG_RE.test(card.slug) },
    { id: "images", label: "At least one image", ok: card.images.length >= 1 },
    {
      id: "alt",
      label: "Alt text on every image",
      ok: card.images.every((i) => i.alt.trim().length > 0),
      detail: card.images.some((i) => !i.alt.trim()) ? "One or more images have no alt text" : undefined,
    },
    {
      id: "price",
      label: "Strike-through price needs a genuine original price and date",
      ok: !card.price || card.price.original === null || card.price.original <= card.price.current || card.price.originalSince !== "",
      detail: "Set \"original price since\" when original is higher than current",
    },
    { id: "affiliate", label: "Affiliate link uses https", ok: card.affiliateUrl === "" || card.affiliateUrl.startsWith("https://") },
  ];
}
