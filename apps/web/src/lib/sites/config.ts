import { z } from 'zod';

export const SiteConfigSchema = z.object({
  // Basic identifiers
  slug: z.string(),
  name: z.string(),
  domain: z.string(),
  description: z.string(),

  // Hero section
  heroImage: z.object({
    src: z.string(),
    alt: z.string(),
  }),
  heroEyebrow: z.string().optional(),
  heroTitle: z.string(),
  heroGoldWord: z.string(),
  heroSubtitle: z.string(),
  searchPlaceholder: z.string().optional(),

  // Home page: chips/badges (20 required)
  chips: z.array(z.string()).optional(),

  // Home page: names strip (10 required, 2 rows)
  namesStrip: z.array(z.object({
    name: z.string(),
    href: z.string(),
  })).optional(),
  namesStripLabel: z.string().optional(),

  // Home page: slider section
  sliderEyebrow: z.string().optional(),
  sliderTitle: z.string().optional(),

  // Home page: category cards (5 required, each with 3 tourSlugs)
  categoryEyebrow: z.string().optional(),
  categoryTitle: z.string().optional(),
  categories: z.array(z.object({
    name: z.string(),
    slug: z.string(),
    description: z.string(),
    imageUrl: z.string(),
    tourSlugs: z.array(z.string()),
  })).optional(),

  // Home page: how we choose section (4 items required)
  howWeChooseEyebrow: z.string().optional(),
  howWeChooseTitle: z.string().optional(),
  howWeChooseSubtitle: z.string().optional(),
  howWeChoose: z.array(z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string().optional(),
  })).optional(),

  // Home page: places/neighborhoods tabs (3 tabs × 20 items required)
  placesTitle: z.string().optional(),
  placesTabs: z.array(z.object({
    name: z.string(),
    href: z.string(),
    description: z.string().optional(),
  })).optional(),

  // SEO & meta
  metaTitle: z.string().optional(),
  metaDescription: z.string(),
  keywords: z.array(z.string()).optional(),
  ogImage: z.string().optional(),
  jsonLd: z.any().optional(),

  // Contact
  contactEmail: z.string().email(),
  bookingEmail: z.string().email().optional(),
});

export type SiteConfig = z.infer<typeof SiteConfigSchema>;

export const SITE_CONFIGS: Record<string, SiteConfig> = {};
