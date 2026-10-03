/**
 * Homepage content types.
 *
 * <HomePageBody> renders every site from this one shape. The per-site data
 * that used to live here (12 network sites) was removed in the single-site
 * cleanup; the old code is kept on the archive/old-13-sites branch.
 */
import type { TourDoc } from '@/lib/firestore';

export type IconName = 'heart' | 'users' | 'map' | 'clock' | 'compass' | 'camera';

export interface LinkItem {
  label: string;
  href: string;
}

export interface HomeCategory {
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  href: string;
  tourSlugs: string[];
}

export interface HomeContent {
  siteName: string;
  city: string;
  metaTitle: string;
  metaDescription: string;
  heroImage: { src: string; alt: string };
  heroEyebrow: string;
  /** [before, gold word, after] */
  heroTitle: [string, string, string];
  searchPlaceholder: string;
  chips: LinkItem[];
  namesLabel: string;
  names: LinkItem[];
  sliderEyebrow: string;
  /** [before, green word, after] */
  sliderTitle: [string, string, string];
  tours: TourDoc[];
  /** tour slug -> internal page the card opens */
  tourHrefs: Record<string, string>;
  categoryEyebrow: string;
  categoryTitle: [string, string, string];
  categories: HomeCategory[];
  howEyebrow: string;
  howTitle: [string, string, string];
  howSubtitle: string;
  how: { title: string; description: string; icon: IconName }[];
  placesTitle: string;
  attractions: LinkItem[];
  topTours: LinkItem[];
}
