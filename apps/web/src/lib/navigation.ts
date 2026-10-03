import { unstable_cache } from 'next/cache';
import { PROPERTY_SLUG, getDb } from '@/lib/firestore';

/**
 * The navbar links and the footer link groups of the main site, edited in the admin (Navbar and Footer).
 *
 * The admin publishes them to Firestore `navigation/{PROPERTY_SLUG}`; the web app falls back to the links below when
 * nothing usable is published, so the header and footer can never come up empty. The two dropdowns of the header
 * ("Tours & Blog" and "Our Network") are filled automatically from the tours and the projects.
 */

export interface NavLink {
  label: string;
  href: string;
}

export interface FooterGroup {
  title: string;
  links: NavLink[];
}

export interface SiteNavigation {
  navbar: NavLink[];
  footer: FooterGroup[];
  /** The name in the header and in the footer's copyright line. */
  siteTitle: string;
  /** The address in the footer's contact details. */
  contactEmail: string;
  /** The button at the right of the header. */
  cta: NavLink;
  /** The lines under the email in the footer's contact column. */
  contactLines: string[];
  /** The small badge under the contact lines. */
  contactBadge: string;
  /** The line at the bottom of the footer, next to the copyright. */
  bottomNote: string;
}

export const DEFAULT_NAVIGATION: SiteNavigation = {
  siteTitle: 'Street Food Rome',
  contactEmail: 'hello@streetfoodrome.com',
  cta: { label: 'See Tours', href: '/tours' },
  contactLines: ['Based in Italy', 'We usually reply within 24 hours'],
  contactBadge: 'Bookings via trusted partners',
  bottomNote: 'We may earn a commission when you book through partner links on this site, at no extra cost to you.',
  navbar: [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
  footer: [
    {
      title: 'Company',
      links: [
        { label: 'Home', href: '/' },
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/contact' },
        { label: 'Blog', href: '/blog' },
        { label: 'Rome Food Tours', href: '/tours' },
        { label: 'Top Attractions', href: '/neighborhoods' },
      ],
    },
    {
      title: 'Privacy & Terms',
      links: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Cookie Policy', href: '/cookie-policy' },
        { label: 'Affiliate Disclosure', href: '/affiliate-disclosure' },
        { label: 'FAQ', href: '/faq' },
      ],
    },
  ],
};

type Raw = Record<string, unknown>;
const isObject = (v: unknown): v is Raw => typeof v === 'object' && v !== null && !Array.isArray(v);

/** Only plain site paths, https links, mailto and tel are allowed as targets. */
function safeHref(v: unknown): string | null {
  if (typeof v !== 'string') return null;
  const href = v.trim();
  if (href.startsWith('/') && !href.startsWith('//')) return href;
  return /^(https:\/\/|mailto:|tel:)\S+$/i.test(href) ? href : null;
}

function link(v: unknown): NavLink | null {
  if (!isObject(v) || typeof v.label !== 'string') return null;
  const label = v.label.trim();
  const href = safeHref(v.href);
  return label && href ? { label: label.slice(0, 60), href } : null;
}

function links(v: unknown): NavLink[] {
  return Array.isArray(v) ? v.map(link).filter((l): l is NavLink => l !== null).slice(0, 20) : [];
}

/** Maps the admin's published navigation onto the site's shape. Anything unusable falls back to the defaults. */
export function fromAdminNavigation(data: unknown, defaults: SiteNavigation = DEFAULT_NAVIGATION): SiteNavigation {
  const d = isObject(data) ? data : {};
  const navbar = links(d.navbar);
  const footer = (Array.isArray(d.footer) ? d.footer : [])
    .map((g): FooterGroup | null => {
      if (!isObject(g) || typeof g.label !== 'string' || !g.label.trim()) return null;
      const items = links(g.children);
      return items.length > 0 ? { title: g.label.trim().slice(0, 60), links: items } : null;
    })
    .filter((g): g is FooterGroup => g !== null)
    .slice(0, 4);
  const title = typeof d.siteTitle === 'string' ? d.siteTitle.trim().slice(0, 60) : '';
  const email = typeof d.contactEmail === 'string' ? d.contactEmail.trim() : '';
  const text = (v: unknown, max: number): string => (typeof v === 'string' ? v.trim().slice(0, max) : '');
  const cta = link({ label: d.ctaLabel, href: d.ctaHref });
  const lines = Array.isArray(d.contactLines) ? d.contactLines.map((l) => text(l, 120)).filter(Boolean).slice(0, 6) : null;
  return {
    cta: cta ?? defaults.cta,
    contactLines: lines && lines.length > 0 ? lines : defaults.contactLines,
    contactBadge: text(d.contactBadge, 80) || defaults.contactBadge,
    bottomNote: text(d.bottomNote, 300) || defaults.bottomNote,
    navbar: navbar.length > 0 ? navbar : defaults.navbar,
    footer: footer.length > 0 ? footer : defaults.footer,
    siteTitle: title || defaults.siteTitle,
    contactEmail: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : defaults.contactEmail,
  };
}

/** The raw published navigation of a project, or null. Refreshed by the admin through the "navigation" tag. */
const readNavigation = unstable_cache(
  async (slug: string): Promise<Raw | null> => {
    const snap = await getDb().collection('navigation').doc(slug).get();
    const doc = snap.data();
    const published = doc && isObject(doc.published) ? doc.published : undefined;
    return published && isObject(published.data) ? published.data : null;
  },
  ['site:navigation:v3'],
  { tags: ['navigation'], revalidate: 3600 },
);

/** Defaults for a project that has not published its own navigation: its name, its email, and links that exist. */
export function navigationDefaults(name: string, email: string, links: NavLink[]): SiteNavigation {
  return {
    ...DEFAULT_NAVIGATION,
    siteTitle: name,
    contactEmail: email,
    navbar: links,
    footer: [{ title: name, links: [{ label: 'Home', href: '/' }, ...links.filter((l) => l.href !== '/')] }],
    contactLines: [],
    contactBadge: '',
    bottomNote: '',
  };
}

/** Never throws. Anything the project has not set falls back to `defaults`. */
export async function getNavigationFor(slug: string, defaults: SiteNavigation): Promise<SiteNavigation> {
  try {
    return fromAdminNavigation(await readNavigation(slug), defaults);
  } catch (error) {
    console.warn('[navigation] could not read the navigation of', slug, '- using the defaults:', error instanceof Error ? error.message : error);
    return defaults;
  }
}

/** The main site's navigation. */
export async function getNavigation(): Promise<SiteNavigation> {
  return getNavigationFor(PROPERTY_SLUG, DEFAULT_NAVIGATION);
}
