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

  // Home page sections
  exploreTitle: z.string().optional(),
  exploreDescription: z.string().optional(),

  // Tours & categories
  featuredTours: z.array(z.string()).optional(),
  categories: z.array(z.object({
    name: z.string(),
    slug: z.string(),
  })).optional(),

  // CTA & booking
  ctaTitle: z.string().optional(),
  ctaDescription: z.string().optional(),
  bookingUrl: z.string().optional(),

  // SEO
  metaDescription: z.string(),
  keywords: z.array(z.string()).optional(),
  ogImage: z.string().optional(),

  // Contact
  contactEmail: z.string().email(),
  bookingEmail: z.string().email().optional(),
});

export type SiteConfig = z.infer<typeof SiteConfigSchema>;

export const SITE_CONFIGS: Record<string, SiteConfig> = {};
