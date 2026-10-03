import { PAGE_DEFS } from "@/lib/content/pages";

export interface OutlineItem {
  /** Value of ?item= in the address bar. */
  id: string;
  label: string;
  /** A real number from the database, or nothing. */
  count?: number;
  /** Small text next to the count, for example "cols". */
  unit?: string;
  /** Entries nested under this one. They slide open while this item is selected. */
  children?: { id: string; label: string }[];
}

export interface OutlineGroup {
  title: string;
  items: OutlineItem[];
}

export interface OutlineCounts {
  /** The navbar's links that lead to one of the project's pages, so they can be opened from the outline. */
  navbarPages?: { label: string; page: string }[];
  navbar: number;
  footer: number;
  redirects: number;
  tours: number;
  /** Tours in the Trash. */
  trashed: number;
  /** Tour categories, areas, cities and blog categories (the managed lists). */
  categories: number;
  areas: number;
  cities: number;
  /** Projects listed in Our Network. */
  network: number;
}

/**
 * The editor's outline. Every project gets the same one: the groups come from here and from the shared page
 * definitions, and only the counts differ. The order is: what is shown on every page, the pages, the lists the
 * pages are built from, the managed lists they point to, and the record of changes.
 */
export function buildOutline(c: OutlineCounts): OutlineGroup[] {
  return [
    {
      title: "Global settings",
      items: [
        {
          id: "navbar",
          label: "Navbar",
          count: c.navbar,
          // Each page once, named as the navbar names it.
          children: (c.navbarPages ?? []).filter((p, i, all) => all.findIndex((q) => q.page === p.page) === i).map((p) => ({ id: p.page, label: p.label })),
        },
        { id: "footer", label: "Footer", count: c.footer, unit: c.footer === 1 ? "col" : "cols" },
        { id: "theme", label: "Theme and brand" },
        { id: "seo", label: "SEO defaults" },
        { id: "redirects", label: "Redirects", count: c.redirects },
      ],
    },
    { title: "Pages", items: PAGE_DEFS.map((p) => ({ id: p.slug, label: p.title, count: p.sections.length })) },
    {
      title: "Listings",
      items: [
        { id: "tours", label: "Tours", count: c.tours },
        { id: "neighbourhoods", label: "Neighbourhoods", count: c.areas },
        { id: "blog", label: "Blog" },
        { id: "guides", label: "Guides and Stories" },
      ],
    },
    {
      title: "Taxonomies",
      items: [
        { id: "categories", label: "Tour categories", count: c.categories },
        { id: "areas", label: "Areas", count: c.areas },
        { id: "cities", label: "Cities and blog categories", count: c.cities },
        { id: "network", label: "Network sites", count: c.network },
      ],
    },
    {
      title: "Activity",
      items: [
        { id: "activity", label: "Audit log" },
        { id: "trash", label: "Trash", count: c.trashed },
      ],
    },
  ];
}

export const OUTLINE_IDS = ["navbar", "footer", "theme", "seo", "redirects", ...PAGE_DEFS.map((p) => p.slug), "tours", "neighbourhoods", "blog", "guides", "categories", "areas", "cities", "network", "activity", "trash"];

/** The path a page has on the live site. Home is "/". */
export const pagePath = (slug: string) => (slug === "home" ? "/" : `/${slug}`);

/**
 * Which page a navbar or footer link points to, when it points to one of this project's editable pages.
 * Legal documents live on several paths.
 */
export function pageForPath(href: string): string | null {
  const path = href.split(/[?#]/)[0].replace(/\/$/, "") || "/";
  if (path === "/") return "home";
  const slug = path.slice(1);
  if (PAGE_DEFS.some((p) => p.slug === slug)) return slug;
  if (["privacy", "terms", "cookie-policy", "affiliate-disclosure"].includes(slug)) return "legal";
  return null;
}

/** Where a navbar or footer link can point to on the site (the "Page" type of a link). */
export const LINK_TARGETS: { label: string; path: string }[] = [
  ...PAGE_DEFS.map((p) => ({ label: p.title, path: pagePath(p.slug) })),
  { label: "Privacy Policy", path: "/privacy" },
  { label: "Terms of Service", path: "/terms" },
  { label: "Cookie Policy", path: "/cookie-policy" },
  { label: "Affiliate Disclosure", path: "/affiliate-disclosure" },
  { label: "Tours", path: "/tours" },
  { label: "Blog", path: "/blog" },
  { label: "Guides and Stories", path: "/guides" },
  { label: "Neighbourhoods", path: "/neighborhoods" },
];
