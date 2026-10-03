export type ContentStatus = "draft" | "in_review" | "published" | "trashed";
export type ProjectStatus = "coming_soon" | "live" | "archived";
export type Role = "super_admin" | "admin" | "contributor";

export interface Project {
  id: string;
  name: string;
  slug: string;
  domain: string;
  publicUrl: string;
  status: ProjectStatus;
  contactEmail: string;
  logoUrl: string;
  theme: Theme;
  cards: number;
  lastEdit: string | null;
}

export interface Theme {
  primary: string;
  dark: string;
  accent: string;
  fontHeading: string;
  fontBody: string;
}

export interface TourImage {
  url: string;
  alt: string;
  order: number;
}

/** Tour as shown in the admin: the draft if there is one, otherwise the live fields. */
export interface Tour {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  priceCurrent: number | null;
  priceOriginal: number | null;
  priceOriginalSince: string;
  currency: string;
  ratingValue: number | null;
  ratingCount: number | null;
  ratingSource: "own" | "partner";
  images: TourImage[];
  category: string;
  neighbourhood: string;
  city: string;
  duration: string;
  affiliateUrl: string;
  status: ContentStatus;
  version: number;
  createdBy: string;
  updatedAt: string | null;
}

export interface LayoutItem {
  id: string;
  visible: boolean;
}

/** Section as shown in the layout list and wireframe preview. */
export interface PageSection {
  id: string;
  label: string;
  visible: boolean;
}

export interface PageMeta {
  title: string;
  metaTitle: string;
  metaDesc: string;
}

export interface PageDraft {
  meta: PageMeta;
  layout: LayoutItem[];
  data: Record<string, unknown>;
}

export interface PageSectionDef {
  id: string;
  label: string;
  /** Keys of PageDraft.data edited by this section. */
  keys: string[];
}

export interface PageDef {
  slug: string;
  title: string;
  description: string;
  sections: PageSectionDef[];
}

export interface PageState {
  status: ContentStatus;
  version: number;
  draft: PageDraft;
  hasPublished: boolean;
  updatedAt: string | null;
}

export type AuditAction =
  | "create"
  | "update"
  | "publish"
  | "unpublish"
  | "delete"
  | "restore"
  | "purge"
  | "login"
  | "role_change"
  | "import";

export interface AuditEntry {
  id: string;
  ts: string;
  actorUid: string;
  actorEmail: string;
  actorRole: Role | "system";
  propertySlug: string;
  entityType: string;
  entityId: string;
  action: AuditAction;
  summary: string;
}

export interface AdminUser {
  id: string;
  email: string;
  displayName: string;
  role: Role;
  propertyIds: string[];
  status: "active" | "suspended";
  mfaEnabled: boolean;
  lastLoginAt: string | null;
}

export interface NetworkEntry {
  name: string;
  publicUrl: string;
}

export interface Taxonomies {
  categories: string[];
  neighbourhoods: string[];
  cities: string[];
  blogCategories: string[];
}

export interface NavItem {
  label: string;
  href: string;
  icon: IconName;
}

export type IconName =
  | "dashboard"
  | "projects"
  | "analytics"
  | "activity"
  | "settings"
  | "menu"
  | "close"
  | "chevron"
  | "search"
  | "plus"
  | "drag"
  | "eye"
  | "eyeOff"
  | "up"
  | "down"
  | "link"
  | "check"
  | "globe"
  | "layout"
  | "file"
  | "tag"
  | "map"
  | "alert";

/** Result of every server action: never throws to the client with internals. */
export type ActionResult<T = void> = { ok: true; data: T } | { ok: false; error: string; issues?: string[] };
