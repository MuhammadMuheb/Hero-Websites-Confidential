import { homeSchema, importCardSchema, importFileSchema, cardDraftSchema, formatIssues, type CardDraftInput, type ImportFile } from "@/lib/validation/schemas";
import { sanitizeRich } from "@/lib/sanitize";
import { slugify } from "@/lib/repo/util";

export const MAX_IMPORT_BYTES = 2_000_000;
export const MAX_IMPORT_CARDS = 150;

export interface ImportPlan {
  /** Draft data to merge per page slug. */
  pages: Record<string, Record<string, unknown>>;
  cards: CardDraftInput[];
}

export type ParseResult = { ok: true; file: ImportFile; plan: ImportPlan } | { ok: false; issues: string[] };

/** Flattens the template's flat home keys into the stored SiteConfig shape. */
export function mapHome(file: ImportFile): Record<string, unknown> {
  const h = file.home;
  return {
    hero: { eyebrow: h.heroEyebrow, title: h.heroTitle, goldWord: h.heroGoldWord, subtitle: h.heroSubtitle, image: h.heroImage, searchPlaceholder: h.searchPlaceholder },
    chips: h.chips,
    namesStripLabel: h.namesStripLabel,
    namesStrip: h.namesStrip,
    sliderEyebrow: h.sliderEyebrow,
    sliderTitle: h.sliderTitle,
    categoryEyebrow: h.categoryEyebrow,
    categoryTitle: h.categoryTitle,
    categories: h.categories,
    howWeChooseTitle: h.howWeChooseTitle,
    howWeChoose: h.howWeChoose,
    placesTitle: h.placesTitle,
    placesTabs: h.placesTabs,
    seo: { metaTitle: file.seo.metaTitle, metaDescription: file.seo.metaDescription, ogImage: file.seo.ogImage },
    contactEmail: file.project.contactEmail,
  };
}

/**
 * Validates the whole file. Either everything is valid and a plan is returned, or the
 * complete list of problems is returned and nothing may be saved (no partial import).
 */
export function parseImport(text: string, projectSlug: string): ParseResult {
  if (text.length > MAX_IMPORT_BYTES) return { ok: false, issues: ["The file is larger than 2 MB."] };
  let raw: unknown;
  try {
    raw = JSON.parse(text);
  } catch (e) {
    return { ok: false, issues: [`The file is not valid JSON: ${e instanceof Error ? e.message : "parse error"}`] };
  }

  const parsed = importFileSchema.safeParse(raw);
  if (!parsed.success) return { ok: false, issues: formatIssues(parsed.error) };
  const file = parsed.data;
  const issues: string[] = [];

  if (file.project.slug !== projectSlug) issues.push(`project.slug: the file is for "${file.project.slug}" but this project is "${projectSlug}"`);

  const home = mapHome(file);
  const homeParsed = homeSchema.safeParse(home);
  if (!homeParsed.success) {
    // Re-label paths to the template's own key names where they differ.
    issues.push(...formatIssues(homeParsed.error, "home").map((l) => l.replace("home.hero.", "home.hero*.")));
  }

  const cards: CardDraftInput[] = [];
  if (file.cards.length > MAX_IMPORT_CARDS) issues.push(`cards: at most ${MAX_IMPORT_CARDS} cards per file`);
  const seen = new Set<string>();
  file.cards.slice(0, MAX_IMPORT_CARDS).forEach((c, i) => {
    const shape = importCardSchema.safeParse(c);
    if (!shape.success) return void issues.push(...formatIssues(shape.error, `cards[${i}]`));
    const x = shape.data;
    const candidate = {
      title: x.title,
      slug: x.slug || slugify(x.title),
      shortDescription: x.shortDescription ?? "",
      description: x.description ?? "",
      price: x.price ? { current: x.price.current, original: x.price.original ?? null, currency: x.price.currency ?? "EUR", originalSince: "" } : null,
      rating: x.rating ?? null,
      images: (x.images ?? []).map((im, n) => ({ url: im.url, alt: im.alt ?? "", order: n })),
      category: x.category ?? "",
      neighbourhood: x.neighbourhood ?? "",
      city: x.city ?? "",
      duration: x.duration ?? "",
      affiliateUrl: x.affiliateUrl ?? "",
    };
    const card = cardDraftSchema.safeParse(candidate);
    if (!card.success) return void issues.push(...formatIssues(card.error, `cards[${i}]`));
    if (seen.has(card.data.slug)) return void issues.push(`cards[${i}].slug: "${card.data.slug}" appears twice in the file`);
    seen.add(card.data.slug);
    cards.push({ ...card.data, description: sanitizeRich(card.data.description) });
  });

  if (issues.length > 0) return { ok: false, issues: Array.from(new Set(issues)) };

  const pages: Record<string, Record<string, unknown>> = { home };
  if (file.about) pages.about = { ...file.about };
  if (file.contact) pages.contact = { ...file.contact };
  if (file.faq) pages.faq = { blocks: file.faq.blocks };
  if (file.legal) pages.legal = Object.fromEntries(Object.entries(file.legal).map(([k, v]) => [k, sanitizeRich(v as string)]));
  return { ok: true, file, plan: { pages, cards } };
}

export interface PreviewRow {
  target: string;
  path: string;
  current: string;
  next: string;
}

const show = (v: unknown) => (v === undefined || v === null || v === "" ? "" : typeof v === "string" ? v : JSON.stringify(v));

function flatten(value: unknown, path: string, out: Map<string, string>) {
  if (Array.isArray(value)) {
    if (value.length === 0) out.set(path, "[]");
    value.forEach((v, i) => flatten(v, `${path}[${i}]`, out));
  } else if (value && typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>);
    if (entries.length === 0) out.set(path, "{}");
    for (const [k, v] of entries) flatten(v, path ? `${path}.${k}` : k, out);
  } else out.set(path, show(value));
}

/** Field-by-field differences: target path, new value, current value. Unchanged fields are left out. */
export function diffRows(target: string, current: Record<string, unknown>, next: Record<string, unknown>): PreviewRow[] {
  const a = new Map<string, string>();
  const b = new Map<string, string>();
  flatten(current, "", a);
  flatten(next, "", b);
  const rows: PreviewRow[] = [];
  for (const [path, value] of b) {
    const cur = a.get(path) ?? "";
    if (cur !== value) rows.push({ target, path, current: cur, next: value });
  }
  return rows;
}
