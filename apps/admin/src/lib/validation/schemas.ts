import { z } from "zod";

export const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const HOSTNAME_RE = /^(?=.{1,253}$)([a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/;
const HEX_RE = /^#[0-9a-fA-F]{6}$/;

const text = (max: number) => z.string().trim().max(max);

/** https URL, trailing slash removed. */
export const httpsUrl = z
  .string()
  .trim()
  .url()
  .refine((v) => v.startsWith("https://"), "Must start with https://")
  .transform((v) => v.replace(/\/+$/, ""));

/** A project's domain: a bare hostname, lower-case. "www." is dropped because www.example.com and example.com are one site. */
const domainSchema = (message: string) =>
  z
    .string()
    .trim()
    .toLowerCase()
    .regex(HOSTNAME_RE, message)
    .transform((d) => d.replace(/^www./, ""))
    .or(z.literal(""));

export const emailSchema = z.string().trim().toLowerCase().email().max(254);

export const themeSchema = z.object({
  primary: z.string().regex(HEX_RE, "Use a hex colour like #1F7A4D"),
  dark: z.string().regex(HEX_RE, "Use a hex colour like #14352A"),
  accent: z.string().regex(HEX_RE, "Use a hex colour like #C8962B"),
  fontHeading: text(60).min(1),
  fontBody: text(60).min(1),
});

export const DEFAULT_THEME = {
  primary: "#1F7A4D",
  dark: "#14352A",
  accent: "#C8962B",
  fontHeading: "Inter",
  fontBody: "Inter",
};

export const projectCreateSchema = z
  .object({
    name: text(60).min(2, "Name must be 2 to 60 characters"),
    slug: z
      .string()
      .trim()
      .regex(SLUG_RE, "Lowercase letters, digits and hyphens only")
      .max(60)
      // "new" and "edit" are screens of their own under /projects, so a project cannot use them.
      .refine((v) => v !== "new" && v !== "edit", "This slug is reserved"),
    domain: domainSchema("Enter a valid hostname like example.com"),
    publicUrl: z.union([httpsUrl, z.literal("")]),
    status: z.enum(["coming_soon", "live", "archived"]).default("coming_soon"),
    contactEmail: emailSchema,
    logoUrl: z.union([httpsUrl, z.literal("")]).default(""),
    theme: themeSchema.default(DEFAULT_THEME),
  })
  .superRefine((v, ctx) => {
    if (v.status === "live") {
      if (!v.publicUrl) ctx.addIssue({ code: "custom", path: ["publicUrl"], message: "A public URL is required to go live" });
      if (!v.domain) ctx.addIssue({ code: "custom", path: ["domain"], message: "A domain is required to go live" });
    }
  });
export type ProjectCreateInput = z.infer<typeof projectCreateSchema>;

/** Settings edit: slug is fixed after creation. */
export const projectUpdateSchema = z
  .object({
    name: text(60).min(2),
    domain: domainSchema("Enter a valid hostname"),
    publicUrl: z.union([httpsUrl, z.literal("")]),
    status: z.enum(["coming_soon", "live", "archived"]),
    contactEmail: emailSchema,
    logoUrl: z.union([httpsUrl, z.literal("")]),
  })
  .superRefine((v, ctx) => {
    if (v.status === "live") {
      if (!v.publicUrl) ctx.addIssue({ code: "custom", path: ["publicUrl"], message: "A public URL is required to go live" });
      if (!v.domain) ctx.addIssue({ code: "custom", path: ["domain"], message: "A domain is required to go live" });
    }
  });

/* ---------- Home content (SiteConfig shape) ---------- */

const req = (max: number) => z.string().trim().min(1, "Required").max(max);

export const HOME_COUNTS = { chips: 20, namesStrip: 10, categories: 5, tourSlugs: 3, howWeChoose: 4, placesTabs: 3 } as const;
/** Places tabs: at least HOME_COUNTS.placesTabs, at most this many. */
export const PLACES_TABS_MAX = 30;

/** Strict home schema: used by import and by the publish gate. */
export const homeSchema = z.strictObject({
  hero: z.strictObject({
    eyebrow: req(120),
    title: req(160),
    goldWord: text(60),
    subtitle: req(400),
    image: z.strictObject({ src: req(2000), alt: req(200) }),
    searchPlaceholder: req(120),
  }),
  chips: z.array(req(60)).length(HOME_COUNTS.chips),
  namesStripLabel: req(120),
  namesStrip: z.array(z.strictObject({ name: req(80), href: req(500) })).length(HOME_COUNTS.namesStrip),
  sliderEyebrow: req(120),
  sliderTitle: req(160),
  categoryEyebrow: req(120),
  categoryTitle: req(160),
  categories: z
    .array(
      z.strictObject({
        name: req(80),
        slug: z.string().regex(SLUG_RE, "Lowercase letters, digits and hyphens only"),
        description: req(400),
        imageUrl: req(2000),
        tourSlugs: z.array(z.string().regex(SLUG_RE)).length(HOME_COUNTS.tourSlugs),
      }),
    )
    .length(HOME_COUNTS.categories),
  howWeChooseTitle: req(160),
  howWeChoose: z.array(z.strictObject({ title: req(120), description: req(400), icon: req(60) })).length(HOME_COUNTS.howWeChoose),
  placesTitle: req(160),
  placesTabs: z.array(z.strictObject({ name: req(80), href: req(500), description: text(400) })).min(HOME_COUNTS.placesTabs).max(PLACES_TABS_MAX),
  seo: z.strictObject({
    metaTitle: req(120),
    metaDescription: req(400),
    keywords: text(400).optional(),
    ogImage: text(2000).optional(),
  }),
  contactEmail: emailSchema,
});
export type HomeData = z.infer<typeof homeSchema>;

/* ---------- Tours / cards ---------- */

export const imageSchema = z.object({
  url: httpsUrl,
  alt: text(200).default(""),
  order: z.number().int().min(0).default(0),
});

export const cardDraftSchema = z.object({
  title: text(70).min(10, "Title must be 10 to 70 characters"),
  slug: z.string().trim().regex(SLUG_RE, "Lowercase letters, digits and hyphens only").max(90),
  shortDescription: text(160).default(""),
  description: z.string().max(20000).default(""),
  price: z
    .object({
      current: z.number().min(0),
      original: z.number().min(0).nullable().default(null),
      currency: z.string().regex(/^[A-Z]{3}$/, "Use a 3-letter currency code like EUR").default("EUR"),
      originalSince: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Use a date like 2026-01-31").or(z.literal("")).default(""),
    })
    .nullable()
    .default(null),
  rating: z
    .object({
      value: z.number().min(0).max(5),
      count: z.number().int().min(0),
      source: z.enum(["own", "partner"]),
    })
    .nullable()
    .default(null),
  images: z.array(imageSchema).max(20).default([]),
  category: text(80).default(""),
  neighbourhood: text(80).default(""),
  city: text(80).default(""),
  duration: text(60).default(""),
  affiliateUrl: z.union([httpsUrl, z.literal("")]).default(""),
});
export type CardDraftInput = z.infer<typeof cardDraftSchema>;

/* ---------- Content import file (blueprint section 10) ---------- */

const looseObject = z.record(z.string(), z.unknown());
const looseArray = z.array(z.unknown());

export const importFileSchema = z.strictObject({
  project: z.strictObject({
    name: z.string(),
    slug: z.string(),
    domain: z.string(),
    publicUrl: z.string(),
    contactEmail: z.string(),
  }),
  home: z.strictObject({
    heroEyebrow: z.string(),
    heroTitle: z.string(),
    heroGoldWord: z.string(),
    heroSubtitle: z.string(),
    heroImage: z.strictObject({ src: z.string(), alt: z.string() }),
    searchPlaceholder: z.string(),
    chips: z.array(z.string()),
    namesStripLabel: z.string(),
    namesStrip: z.array(z.strictObject({ name: z.string(), href: z.string() })),
    sliderEyebrow: z.string(),
    sliderTitle: z.string(),
    categoryEyebrow: z.string(),
    categoryTitle: z.string(),
    categories: z.array(
      z.strictObject({ name: z.string(), slug: z.string(), description: z.string(), imageUrl: z.string(), tourSlugs: z.array(z.string()) }),
    ),
    howWeChooseTitle: z.string(),
    howWeChoose: z.array(z.strictObject({ title: z.string(), description: z.string(), icon: z.string() })),
    placesTitle: z.string(),
    placesTabs: z.array(z.strictObject({ name: z.string(), href: z.string(), description: z.string() })),
  }),
  about: z
    .strictObject({
      hero: looseObject,
      travelMantra: looseArray,
      experiencesBanner: looseObject,
      whoWritesThis: looseObject,
      journey: looseArray,
      philosophy: looseArray,
      places: looseObject,
    })
    .partial()
    .optional(),
  contact: z
    .strictObject({ hero: looseObject, header: looseObject, waysToReachUs: looseArray, messageForm: looseObject, quickAnswers: looseArray })
    .partial()
    .optional(),
  faq: z
    .strictObject({
      blocks: z.array(
        z.strictObject({
          title: z.string().trim().min(1),
          questions: z.array(z.strictObject({ question: z.string().trim().min(1), answer: z.string().trim().min(1) })).min(1),
        }),
      ),
    })
    .optional(),
  legal: z
    .strictObject({ privacy: z.string(), terms: z.string(), cookie: z.string(), affiliate: z.string() })
    .partial()
    .optional(),
  seo: z.strictObject({ metaTitle: z.string(), metaDescription: z.string(), ogImage: z.string() }),
  cards: z.array(z.unknown()).default([]),
});
export type ImportFile = z.infer<typeof importFileSchema>;

export const importCardSchema = z.strictObject({
  title: z.string(),
  slug: z.string(),
  shortDescription: z.string().optional(),
  description: z.string().optional(),
  price: z.strictObject({ current: z.number(), original: z.number().nullable().optional(), currency: z.string().optional() }).optional(),
  rating: z.strictObject({ value: z.number(), count: z.number(), source: z.enum(["own", "partner"]) }).optional(),
  images: z.array(z.strictObject({ url: z.string(), alt: z.string().optional() })).optional(),
  category: z.string().optional(),
  neighbourhood: z.string().optional(),
  city: z.string().optional(),
  duration: z.string().optional(),
  affiliateUrl: z.string().optional(),
});

/** Readable, de-duplicated issue lines like "home.chips: expected 20 items, got 3". */
export function formatIssues(error: z.ZodError, prefix = ""): string[] {
  const lines = error.issues.map((i) => {
    const path = [prefix, ...i.path.map(String)].filter(Boolean).join(".");
    if (i.code === "unrecognized_keys") return `${path || "(root)"}: unknown key(s) ${i.keys.map((k) => `"${k}"`).join(", ")}`;
    if (i.code === "invalid_type" && i.message.includes("received undefined")) return `${path}: required key is missing`;
    if (i.code === "too_small" && i.origin === "array") return `${path}: expected at least ${i.minimum} item(s)`;
    if (i.code === "too_big" && i.origin === "array") return `${path}: expected at most ${i.maximum} item(s)`;
    return `${path || "(root)"}: ${i.message}`;
  });
  return Array.from(new Set(lines));
}

export const taxonomiesSchema = z.object({
  categories: z.array(text(80).min(1)).max(100),
  neighbourhoods: z.array(text(80).min(1)).max(100),
  cities: z.array(text(80).min(1)).max(100),
  blogCategories: z.array(text(80).min(1)).max(100),
});

export const userProfileSchema = z.object({
  displayName: text(80).min(1, "Name is required"),
  email: emailSchema,
});

/** Admin-set password. Firebase itself only requires 6 characters; the app asks for more. */
export const passwordSchema = z.string().min(12, "Use at least 12 characters").max(128, "Use at most 128 characters");

export const inviteSchema = z.object({
  email: emailSchema,
  displayName: text(80).min(1),
  role: z.enum(["super_admin", "admin", "contributor"]),
  propertyIds: z.array(z.string().regex(SLUG_RE)).max(100),
});
