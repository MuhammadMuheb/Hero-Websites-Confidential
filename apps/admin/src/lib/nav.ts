import type { NavItem } from "@/lib/types";

/** Two screens: Projects and Settings. A project's content editors open from its Open button. */
export const MAIN_NAV: NavItem[] = [
  { label: "Projects", href: "/projects", icon: "projects" },
  { label: "Settings", href: "/settings", icon: "settings" },
];

export interface TreeGroup {
  title: string;
  items: { label: string; path: string; count?: number }[];
}

/** Page tree shown inside a project workspace (blueprint diagram D3). */
export const WORKSPACE_TREE: TreeGroup[] = [
  {
    title: "Global",
    items: [
      { label: "Navbar", path: "global/navbar" },
      { label: "Footer", path: "global/footer" },
      { label: "Theme & brand", path: "global/theme" },
      { label: "SEO defaults", path: "global/seo" },
      { label: "Redirects", path: "global/redirects" },
      { label: "Our Network", path: "global/network" },
    ],
  },
  {
    title: "Pages",
    items: [
      { label: "Home", path: "pages/home" },
      { label: "About", path: "pages/about" },
      { label: "Contact", path: "pages/contact" },
      { label: "FAQ", path: "pages/faq" },
      { label: "Legal", path: "pages/legal" },
    ],
  },
  {
    title: "Listings",
    items: [
      { label: "Tours", path: "listings/tours" },
      { label: "Neighbourhoods", path: "listings/neighbourhoods" },
      { label: "Blog", path: "listings/blog" },
      { label: "Guides & Stories", path: "listings/guides" },
    ],
  },
  {
    title: "Taxonomies",
    items: [{ label: "Categories, areas, cities", path: "taxonomies" }],
  },
  {
    title: "Tools",
    items: [{ label: "Content import", path: "import" }],
  },
];
