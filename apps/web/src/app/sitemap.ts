import type { MetadataRoute } from 'next';
import { siteConfigs } from '@/lib/sites';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  
  const siteUrls = siteConfigs.map(site => ({
    url: `${baseUrl}/${site.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 1,
  }));

  const staticPages = [
    { url: `${baseUrl}/`, priority: 1 },
    { url: `${baseUrl}/tours`, priority: 0.9 },
    { url: `${baseUrl}/guides`, priority: 0.9 },
    { url: `${baseUrl}/search`, priority: 0.8 },
    { url: `${baseUrl}/affiliate-disclosure`, priority: 0.5 },
    { url: `${baseUrl}/cookie-policy`, priority: 0.5 },
  ];

  return [
    ...staticPages.map(page => ({
      url: page.url,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: page.priority,
    })),
    ...siteUrls,
  ];
}
