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

/** What can be edited inside a project. */
export const WORKSPACE_TREE: TreeGroup[] = [
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
    title: "Content",
    items: [
      { label: "Tours", path: "listings/tours" },
      { label: "Categories and areas", path: "taxonomies" },
    ],
  },
  {
    title: "Site",
    items: [
      { label: "Navbar", path: "global/navbar" },
      { label: "Footer", path: "global/footer" },
      { label: "Theme and brand", path: "global/theme" },
      { label: "SEO defaults", path: "global/seo" },
    ],
  },
  {
    title: "Tools",
    items: [{ label: "Content import", path: "import" }],
  },
];
