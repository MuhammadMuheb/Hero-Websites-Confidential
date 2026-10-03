import { PAGE_DEFS } from "@/lib/content/pages";

export interface OutlineItem {
  /** Value of ?item= in the address bar. */
  id: string;
  label: string;
  /** A real number from the database, or nothing. */
  count?: number;
  /** Small text next to the count, for example "cols". */
  unit?: string;
}

export interface OutlineGroup {
  title: string;
  items: OutlineItem[];
}

export interface OutlineCounts {
  navbar: number;
  footer: number;
  tours: number;
  areas: number;
}

/**
 * The editor's outline, in the order a visitor meets the site: Navbar, pages, content, Footer, then the look.
 * Pages come from the shared page definitions, so every project gets the same outline; only the counts differ.
 */
export function buildOutline(counts: OutlineCounts): OutlineGroup[] {
  return [
    { title: "Navbar", items: [{ id: "navbar", label: "Navbar", count: counts.navbar }] },
    { title: "Pages", items: PAGE_DEFS.map((p) => ({ id: p.slug, label: p.title, count: p.sections.length })) },
    {
      title: "Content",
      items: [
        { id: "tours", label: "Tours", count: counts.tours },
        { id: "neighbourhoods", label: "Neighbourhoods", count: counts.areas },
        { id: "blog", label: "Blog" },
      ],
    },
    { title: "Footer", items: [{ id: "footer", label: "Footer", count: counts.footer, unit: counts.footer === 1 ? "col" : "cols" }] },
    { title: "Look and SEO", items: [{ id: "look", label: "Theme, SEO, Import" }] },
  ];
}

export const OUTLINE_IDS = ["navbar", ...PAGE_DEFS.map((p) => p.slug), "tours", "neighbourhoods", "blog", "footer", "look"];

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
  { label: "Neighbourhoods", path: "/neighborhoods" },
];
