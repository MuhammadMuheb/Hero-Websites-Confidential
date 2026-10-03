import type { NavItem } from "@/lib/types";

/** Two screens: Projects and Settings. A project's content editors open from its Open button. */
export const MAIN_NAV: NavItem[] = [
  { label: "Projects", href: "/projects", icon: "projects" },
  { label: "Settings", href: "/settings", icon: "settings" },
];
