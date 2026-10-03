import { unstable_cache } from 'next/cache';
import { streetFoodRomeConfig } from '@/config/sites/street-food-rome';
import { PROPERTY_SLUG, SITE_DOMAIN, getDb } from '@/lib/firestore';
import { SiteConfigSchema, type SiteConfig } from '@/lib/sites/config';

/**
 * Home content: Firestore first, static config as the safety net.
 *
 * The admin publishes to siteContent/{PROPERTY_SLUG}.published.data (older documents may keep the
 * fields at the top level). getHomeContent() never throws and never returns less than a complete,
 * valid config: any failure, timeout, missing or invalid document yields the static config, so the
 * home page cannot go blank. Fields the admin left empty are filled from the static config.
 */

const READ_TIMEOUT_MS = 5000;

type Raw = Record<string, unknown>;

const isObject = (v: unknown): v is Raw => typeof v === 'object' && v !== null && !Array.isArray(v);
const isText = (v: unknown): v is string => typeof v === 'string' && v.trim() !== '';

function text(v: unknown): string | undefined {
  return isText(v) ? v.trim() : undefined;
}

/** Keeps only entries whose required string fields are all filled in. */
function items<T extends Raw>(v: unknown, required: string[]): T[] | undefined {
  if (!Array.isArray(v)) return undefined;
  const out = v.filter((x): x is T => isObject(x) && required.every((k) => isText(x[k])));
  return out.length > 0 ? out : undefined;
}

/** Maps the admin's home data onto SiteConfig. Empty values are dropped so they never override the fallback. */
function fromAdminData(d: Raw): Partial<SiteConfig> {
  const hero = isObject(d.hero) ? d.hero : {};
  const heroImage = isObject(hero.image) && isText(hero.image.src) ? { src: hero.image.src, alt: text(hero.image.alt) ?? '' } : undefined;
  const seo = isObject(d.seo) ? d.seo : {};
  const keywords = text(seo.keywords)
    ?.split(',')
    .map((k) => k.trim())
    .filter(Boolean);

  const chips = Array.isArray(d.chips) ? d.chips.filter(isText).map((c) => c.trim()) : [];
  const categories = items<Raw>(d.categories, ['name', 'slug', 'description', 'imageUrl'])?.map((c) => ({
    name: String(c.name),
    slug: String(c.slug),
    description: String(c.description),
    imageUrl: String(c.imageUrl),
    tourSlugs: Array.isArray(c.tourSlugs) ? c.tourSlugs.filter(isText) : [],
  }));
  const howWeChoose = items<Raw>(d.howWeChoose, ['title', 'description'])?.map((h) => ({
    title: String(h.title),
    description: String(h.description),
    icon: text(h.icon),
  }));
  const namesStrip = items<Raw>(d.namesStrip, ['name', 'href'])?.map((n) => ({ name: String(n.name), href: String(n.href) }));
  const placesTabs = items<Raw>(d.placesTabs, ['name', 'href'])?.map((p) => ({ name: String(p.name), href: String(p.href), description: text(p.description) }));

  const candidate: Partial<SiteConfig> = {
    heroImage,
    heroEyebrow: text(hero.eyebrow),
    heroTitle: text(hero.title),
    heroGoldWord: text(hero.goldWord),
    heroSubtitle: text(hero.subtitle),
    searchPlaceholder: text(hero.searchPlaceholder),
    chips: chips.length > 0 ? chips : undefined,
    namesStripLabel: text(d.namesStripLabel),
    namesStrip,
    sliderEyebrow: text(d.sliderEyebrow),
    sliderTitle: text(d.sliderTitle),
    categoryEyebrow: text(d.categoryEyebrow),
    categoryTitle: text(d.categoryTitle),
    categories,
    howWeChooseTitle: text(d.howWeChooseTitle),
    howWeChoose,
    placesTitle: text(d.placesTitle),
    placesTabs,
    metaTitle: text(seo.metaTitle),
    metaDescription: text(seo.metaDescription),
    keywords: keywords && keywords.length > 0 ? keywords : undefined,
    ogImage: text(seo.ogImage),
    contactEmail: text(d.contactEmail),
  };
  return Object.fromEntries(Object.entries(candidate).filter(([, v]) => v !== undefined)) as Partial<SiteConfig>;
}

/** Firestore config merged over the static one, or null when there is nothing usable (then the caller falls back). */
const readHome = unstable_cache(
  async (slug: string): Promise<SiteConfig | null> => {
    const snap = await getDb().collection('siteContent').doc(slug).get();
    const doc = snap.data();
    if (!doc) return null;

    const published = isObject(doc.published) ? doc.published : undefined;
    const data = published && isObject(published.data) ? published.data : doc; // legacy: fields at the top level
    const merged = { ...streetFoodRomeConfig, ...fromAdminData(data), slug, domain: SITE_DOMAIN };

    const parsed = SiteConfigSchema.safeParse(merged);
    if (!parsed.success) {
      console.warn('[home-content] siteContent/%s is invalid, using static config:', slug, parsed.error.issues.map((i) => i.path.join('.')).join(', '));
      return null;
    }
    return parsed.data;
  },
  ['home:content'],
  { tags: ['home'], revalidate: 3600 },
);

export async function getHomeContent(): Promise<SiteConfig> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    const timeout = new Promise<never>((_, reject) => {
      timer = setTimeout(() => reject(new Error('Firestore read timed out')), READ_TIMEOUT_MS);
    });
    const fromFirestore = await Promise.race([readHome(PROPERTY_SLUG), timeout]);
    if (fromFirestore) return fromFirestore;
  } catch (error) {
    console.warn('[home-content] Firestore unavailable, using static config:', error instanceof Error ? error.message : error);
  } finally {
    clearTimeout(timer);
  }
  return streetFoodRomeConfig;
}
