import { z } from 'zod';

/**
 * Blueprint §4.2: the contract every SiteConfig must satisfy. All 13 sites
 * provide their own implementations at sites/{slug}/config.ts that conform to
 * this schema. Validated at build time via zod (§19.1.4).
 */
export const SiteConfigSchema = z.object({
  slug: z.string().describe('URL segment: street-food-rome, underground-colosseum, etc.'),
  number: z.string().describe('Two-digit display number, e.g. "05"'),
  name: z.string().describe('Full site name, e.g. "Street Food Rome"'),
  domain: z.string().optional().describe('Future own-domain support, e.g. "streetfoodrome.com"'),
  city: z.string().describe('Main city, e.g. "Rome"'),
  niche: z.string().describe('Site category, e.g. "food tours"'),
  primaryKeyword: z.string().describe('Main SEO keyword, e.g. "Rome food tours"'),
  tagline: z.string().describe('Brand line for footer/OG'),
  nav: z.object({
    toursLabel: z.string().describe('e.g. "Food Tours"'),
    areasLabel: z.string().optional().describe('e.g. "Neighbourhoods", omit if N/A'),
    megaMenu: z.array(z.unknown()).describe('MegaMenuColumn[] — site-specific nav'),
  }),
  home: z.unknown().describe('HomeContent — hero, trust, stats, categories, etc.'),
  about: z.unknown().describe('AboutContent'),
  contact: z.unknown().describe('ContactContent'),
  footer: z.object({
    blurb: z.string(),
    exploreLinks: z.array(z.object({ label: z.string(), href: z.string() })),
  }),
  tours: z.array(z.unknown()).describe('Tour[]'),
  categories: z.array(z.unknown()).describe('Category[]'),
  areas: z.array(z.unknown()).optional().describe('Area[]'),
  guides: z.array(z.unknown()).describe('Guide[]'),
  faqs: z.array(z.unknown()).describe('FAQ[]'),
  images: z.unknown().describe('ImageManifest'),
  seo: z.object({
    titleTemplate: z.string(),
    defaultDescription: z.string(),
    ogImage: z.string(),
  }),
});

export type SiteConfig = z.infer<typeof SiteConfigSchema>;
