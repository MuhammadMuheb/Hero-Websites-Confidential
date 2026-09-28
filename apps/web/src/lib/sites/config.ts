import { z } from 'zod';

export const SiteConfigSchema = z.object({
  slug: z.string(),
  name: z.string(),
  domain: z.string(),
  description: z.string(),
  heroImage: z.object({
    src: z.string(),
    alt: z.string(),
  }),
  heroTitle: z.string(),
  heroSubtitle: z.string(),
  accentWord: z.string(),

  // Home page: chips/badges
  chips: z.array(z.string()).optional(),

  // Home page: names strip (food/place links)
  namesStrip: z.array(z.object({
    name: z.string(),
    href: z.string(),
  })).optional(),

  // Home page: category slider title
  sliderTitle: z.string().optional(),

  // Home page: category cards with tours
  categories: z.array(z.object({
    name: z.string(),
    slug: z.string(),
    description: z.string(),
    imageUrl: z.string(),
    tourSlugs: z.array(z.string()),
  })).optional(),

  // Home page: how we choose section
  howWeChoose: z.array(z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string().optional(),
  })).optional(),

  // Home page: places/neighborhoods tabs
  placesTabs: z.array(z.object({
    name: z.string(),
    href: z.string(),
    description: z.string().optional(),
  })).optional(),

  // SEO
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
