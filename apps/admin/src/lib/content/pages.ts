import type { PageDef, PageDraft } from "@/lib/types";
import { HOME_COUNTS } from "@/lib/validation/schemas";

/** Page tree and section layout (blueprint section 7). Safe to import in client code. */
export const PAGE_DEFS: PageDef[] = [
  {
    slug: "home",
    title: "Home",
    description: "Landing page built from reorderable sections.",
    sections: [
      { id: "hero", label: "Hero and search", keys: ["hero", "chips"] },
      { id: "names", label: "Names strip", keys: ["namesStripLabel", "namesStrip"] },
      { id: "slider", label: "Top tours slider", keys: ["sliderEyebrow", "sliderTitle"] },
      { id: "categories", label: "Categories", keys: ["categoryEyebrow", "categoryTitle", "categories"] },
      { id: "choose", label: "How we choose", keys: ["howWeChooseTitle", "howWeChoose"] },
      { id: "places", label: "Places tabs", keys: ["placesTitle", "placesTabs"] },
      { id: "seo", label: "SEO and contact", keys: ["seo", "contactEmail"] },
    ],
  },
  {
    slug: "about",
    title: "About",
    description: "Story, philosophy and places.",
    sections: [
      { id: "hero", label: "Hero", keys: ["hero"] },
      { id: "mantra", label: "Travel mantra", keys: ["travelMantra"] },
      { id: "banner", label: "Experiences banner", keys: ["experiencesBanner"] },
      { id: "writes", label: "Who writes this", keys: ["whoWritesThis"] },
      { id: "journey", label: "Journey", keys: ["journey"] },
      { id: "philosophy", label: "Philosophy", keys: ["philosophy"] },
      { id: "places", label: "Places", keys: ["places"] },
    ],
  },
  {
    slug: "contact",
    title: "Contact",
    description: "Ways to reach us and the message form.",
    sections: [
      { id: "hero", label: "Hero", keys: ["hero"] },
      { id: "header", label: "Header", keys: ["header"] },
      { id: "ways", label: "Ways to reach us", keys: ["waysToReachUs"] },
      { id: "form", label: "Message form", keys: ["messageForm"] },
      { id: "answers", label: "Quick answers", keys: ["quickAnswers"] },
    ],
  },
  {
    slug: "faq",
    title: "FAQ",
    description: "Question blocks.",
    sections: [{ id: "blocks", label: "FAQ blocks", keys: ["blocks"] }],
  },
  {
    slug: "legal",
    title: "Legal",
    description: "Privacy, terms, cookie and affiliate disclosure.",
    sections: [
      { id: "privacy", label: "Privacy", keys: ["privacy"] },
      { id: "terms", label: "Terms", keys: ["terms"] },
      { id: "cookie", label: "Cookie", keys: ["cookie"] },
      { id: "affiliate", label: "Affiliate disclosure", keys: ["affiliate"] },
    ],
  },
];

export function getPageDef(slug: string): PageDef | undefined {
  return PAGE_DEFS.find((p) => p.slug === slug);
}

export const NAVIGATION_SECTIONS: PageDef = {
  slug: "navigation",
  title: "Navigation",
  description: "Navbar and footer items.",
  sections: [
    { id: "navbar", label: "Navbar", keys: ["navbar"] },
    { id: "footer", label: "Footer", keys: ["footer"] },
  ],
};

const blanks = (n: number, make: () => unknown) => Array.from({ length: n }, make);

/** Empty structure matching the content template, so the editor shows every required field. */
export function skeletonData(slug: string): Record<string, unknown> {
  switch (slug) {
    case "home":
      return {
        hero: { eyebrow: "", title: "", goldWord: "", subtitle: "", image: { src: "", alt: "" }, searchPlaceholder: "" },
        chips: blanks(HOME_COUNTS.chips, () => ""),
        namesStripLabel: "",
        namesStrip: blanks(HOME_COUNTS.namesStrip, () => ({ name: "", href: "" })),
        sliderEyebrow: "",
        sliderTitle: "",
        categoryEyebrow: "",
        categoryTitle: "",
        categories: blanks(HOME_COUNTS.categories, () => ({
          name: "",
          slug: "",
          description: "",
          imageUrl: "",
          tourSlugs: blanks(HOME_COUNTS.tourSlugs, () => ""),
        })),
        howWeChooseTitle: "",
        howWeChoose: blanks(HOME_COUNTS.howWeChoose, () => ({ title: "", description: "", icon: "" })),
        placesTitle: "",
        placesTabs: blanks(HOME_COUNTS.placesTabs, () => ({ name: "", href: "", description: "" })),
        seo: { metaTitle: "", metaDescription: "", keywords: "", ogImage: "" },
        contactEmail: "",
      };
    case "about":
      return { hero: {}, travelMantra: [], experiencesBanner: {}, whoWritesThis: {}, journey: [], philosophy: [], places: {} };
    case "contact":
      return { hero: {}, header: {}, waysToReachUs: [], messageForm: {}, quickAnswers: [] };
    case "faq":
      return { blocks: [{ title: "", questions: [{ question: "", answer: "" }] }] };
    case "legal":
      return { privacy: "", terms: "", cookie: "", affiliate: "" };
    case "navigation":
      return { navbar: [], footer: [] };
    default:
      return {};
  }
}

export function emptyDraft(slug: string): PageDraft {
  const def = slug === "navigation" ? NAVIGATION_SECTIONS : getPageDef(slug);
  return {
    meta: { title: def?.title ?? slug, metaTitle: "", metaDesc: "" },
    layout: (def?.sections ?? []).map((s) => ({ id: s.id, visible: true })),
    data: skeletonData(slug),
  };
}

/** Template for a new array item: copies the shape of an existing item with blank values. */
export function blankLike(value: unknown): unknown {
  if (Array.isArray(value)) return [];
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value as Record<string, unknown>).map(([k, v]) => [k, blankLike(v)]));
  }
  if (typeof value === "number") return 0;
  if (typeof value === "boolean") return false;
  return "";
}

export function metaFor(slug: string, draft: PageDraft): { metaTitle: string; metaDesc: string } {
  if (slug === "home") {
    const seo = (draft.data.seo ?? {}) as { metaTitle?: string; metaDescription?: string };
    return { metaTitle: seo.metaTitle ?? "", metaDesc: seo.metaDescription ?? "" };
  }
  return { metaTitle: draft.meta.metaTitle, metaDesc: draft.meta.metaDesc };
}
