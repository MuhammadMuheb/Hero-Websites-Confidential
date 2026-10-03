import type { Firestore } from "firebase-admin/firestore";
import { homeSchema } from "@/lib/validation/schemas";

/**
 * Starting content for a project, built only from what the project already has (its name, contact email, tours and
 * domain). One template for every project: nothing in here is specific to one of them. It is a starting point to
 * be edited in the admin, never a replacement for the editor's own content, so it only fills what is missing.
 *
 * Used when a project gets its domain (so its site works the moment the domain points at the web app) and by
 * scripts/seed-network-projects.mts for projects that already exist. No "server-only" import: scripts use it too.
 */

const clip = (s: string, n: number) => (s.length <= n ? s : `${s.slice(0, n - 1).trimEnd()}…`);

/** A picture to start with; every project can replace it in the editor. */
export const STARTER_IMAGE = "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1600&q=80";

export interface StarterTour {
  slug: string;
  title: string;
}

interface StarterProject {
  slug: string;
  name: string;
  domain: string;
  contactEmail: string;
}

const link = (label: string, href: string) => ({ label, href, cta: false, children: [] as never[] });

/** First candidate with 30 to 60 characters (the publish check), else the first one clipped. */
function fit(candidates: string[]): string {
  return candidates.find((c) => c.length >= 30 && c.length <= 60) ?? clip(candidates[0], 60);
}

/** A description of 70 to 160 characters. */
const describe = (s: string) => clip(s.length >= 70 ? s : `${s} Hand-picked and easy to book through trusted partners.`, 160);

/** What a project is about, in its own words. Everything is optional; anything missing falls back to the generic text. */
export interface HomeProfile {
  eyebrow?: string;
  headline?: string;
  /** The word of the headline shown in gold. */
  highlight?: string;
  subtitle?: string;
  /** Short topics for the round buttons under the search bar. */
  keywords?: string[];
  /** Category tabs with the tours that belong to each (every tab needs at least one tour). */
  categories?: { name: string; description?: string; tourSlugs: string[] }[];
}

const slugOf = (s: string) => s.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export function buildHome(p: StarterProject, tours: StarterTour[], layout: { id: string; visible: boolean }[], image: { src: string; alt: string }, profile: HomeProfile = {}) {
  const { name } = p;
  const generic = ["Small groups", "Local guides", "Trusted partners", "Italy"];
  const chips = [...new Set([...(profile.keywords ?? []), ...tours.map((t) => clip(t.title, 60)), ...generic])].slice(0, 20);
  const custom = (profile.categories ?? []).filter((c) => c.name && c.tourSlugs.length > 0);
  const groups = custom.length >= 3 ? custom.map((c) => ({ name: clip(c.name, 80), slug: slugOf(c.name), description: clip(c.description ?? `${c.name}: ${name} experiences worth a look.`, 400), imageUrl: image.src, tourSlugs: c.tourSlugs.slice(0, 8) })) : [
    { name: "Top picks", slug: "top-picks", description: `Our most popular ${name} experiences, a good place to start.` },
    { name: "Small group experiences", slug: "small-group-experiences", description: "Guided by locals, in small groups, with time to ask questions." },
    { name: "More ways to explore", slug: "more-ways-to-explore", description: `Other ${name} tours worth a look.` },
  ].map((g, gi) => ({ ...g, imageUrl: image.src, tourSlugs: tours.filter((_, i) => i % 3 === gi).map((t) => t.slug).slice(0, 8) }));
  const metaTitle = fit([`${name}: Tours and Experiences in Italy`, `${name}: Tours in Italy`, `${name} | Tours and Experiences`, `${name}: Hand-Picked Tours and Experiences in Italy`]);
  const metaDescription = describe(`Hand-picked ${name} tours and experiences in Italy, from trusted booking partners.`);
  const data = {
    hero: { eyebrow: clip(profile.eyebrow ?? "Italy", 120), title: clip(profile.headline ?? `Discover ${name}`, 160), goldWord: clip(profile.highlight ?? name, 60), subtitle: clip(profile.subtitle ?? "Hand-picked tours and experiences, booked through trusted partners.", 400), image, searchPlaceholder: clip(`Search ${name} tours...`, 120) },
    chips,
    namesStripLabel: "Popular tours",
    namesStrip: tours.slice(0, 10).map((t) => ({ name: clip(t.title, 80), href: `/tours/${t.slug}` })),
    sliderEyebrow: "Top tours",
    sliderTitle: clip(`Top ${name} Tours`, 160),
    categoryEyebrow: "Browse",
    categoryTitle: "Ways to Experience It",
    categories: groups,
    howWeChooseTitle: "How We Choose",
    howWeChoose: [
      { title: "Trusted partners", description: "Every tour is offered by an established booking partner.", icon: "heart" },
      { title: "Honest descriptions", description: "What you read here is what you can expect on the day.", icon: "users" },
      { title: "Clear prices", description: "You see the price and the details before you book.", icon: "map" },
      { title: "Easy to book", description: "Choose a tour and finish your booking with our partner.", icon: "clock" },
    ],
    placesTitle: "All Tours",
    placesTabs: tours.slice(0, 30).map((t) => ({ name: clip(t.title, 80), href: `/tours/${t.slug}`, description: "" })),
    seo: { metaTitle, metaDescription, keywords: `${name}, Italy tours`, ogImage: image.src },
    contactEmail: p.contactEmail,
  };
  return { meta: { title: "Home", metaTitle, metaDesc: metaDescription }, layout, data };
}

/** The navbar and footer. `withPages` adds the standard pages, for a project that has them (it has a domain). */
export function buildNavigation(p: StarterProject, withPages: boolean) {
  const home = link("Home", "/");
  const tours = link("Tours", "/tours");
  const pages = withPages ? [link("About", "/about"), link("FAQ", "/faq"), link("Contact", "/contact")] : [];
  const legal = withPages ? [link("Privacy Policy", "/privacy"), link("Terms of Service", "/terms"), link("Cookie Policy", "/cookie-policy"), link("Affiliate Disclosure", "/affiliate-disclosure")] : [];
  return {
    meta: { title: "Navigation", metaTitle: "", metaDesc: "" },
    layout: [
      { id: "navbar", visible: true },
      { id: "footer", visible: true },
    ],
    data: {
      navbar: [home, tours, ...pages],
      footer: [{ label: p.name, href: "", cta: false, children: [home, tours, ...pages] }, ...(legal.length ? [{ label: "Privacy & Terms", href: "", cta: false, children: legal }] : [])],
      siteTitle: p.name,
      ctaLabel: "See Tours",
      ctaHref: "/tours",
      contactEmail: p.contactEmail,
      contactLines: [] as string[],
      contactBadge: "",
      bottomNote: "We may earn a commission when you book through partner links on this site, at no extra cost to you.",
    },
  };
}

type PageSlug = "about" | "contact" | "faq" | "legal";

const layoutOf = (...ids: string[]) => ids.map((id) => ({ id, visible: true }));

/** About, Contact, FAQ and Legal: plain, honest starter text that says only what is true of every project. */
export function buildPages(p: StarterProject): Record<PageSlug, { meta: { title: string; metaTitle: string; metaDesc: string }; layout: { id: string; visible: boolean }[]; data: Record<string, unknown> }> {
  const { name } = p;
  const email = p.contactEmail;
  return {
    about: {
      meta: {
        title: "About",
        metaTitle: fit([`About ${name}: Who We Are`, `About ${name}: Who We Are and How We Choose`, `About ${name} | Tours in Italy`]),
        metaDesc: describe(`Who is behind ${name}, how we choose the tours we list, and how booking works.`),
      },
      layout: layoutOf("hero", "mantra", "banner", "writes", "journey", "philosophy", "places"),
      data: {
        hero: { title: `About ${name}`, subtitle: "Who we are and how we choose the tours we list." },
        travelMantra: [],
        experiencesBanner: {},
        whoWritesThis: { title: "Who runs this site", text: `${name} is an independent guide to tours and experiences in Italy. We list tours from established booking partners and describe them as plainly as we can.` },
        journey: [],
        philosophy: [
          { title: "Only trusted partners", text: "We list tours offered by established booking partners, so you book with a company you can check." },
          { title: "Plain descriptions", text: "We say what a tour includes and who it suits, so you know what to expect." },
          { title: "You book with the partner", text: "Booking is completed on the partner's site. We may earn a commission, at no extra cost to you." },
        ],
        places: {},
      },
    },
    contact: {
      meta: {
        title: "Contact",
        metaTitle: fit([`Contact ${name}`, `Contact ${name}: Questions and Feedback`, `Contact ${name} | Questions About Our Tours`]),
        metaDesc: describe(`Questions about ${name} or one of our tours? Here is how to reach us.`),
      },
      layout: layoutOf("hero", "header", "ways", "form", "answers"),
      data: {
        hero: { title: `Contact ${name}`, subtitle: "We are glad to hear from you." },
        header: {},
        waysToReachUs: email ? [{ title: "Email", text: email }] : [],
        messageForm: {},
        quickAnswers: [
          { question: "Where do I book?", answer: "Choose a tour on this site and finish your booking on our partner's page." },
          { question: "Who can change or cancel a booking?", answer: "The booking partner. Their terms are shown before you pay." },
        ],
      },
    },
    faq: {
      meta: {
        title: "FAQ",
        metaTitle: fit([`${name} FAQ: Booking Questions`, `${name} FAQ: Answers to Common Questions`, `Frequently Asked Questions | ${name}`]),
        metaDesc: describe(`Answers to common questions about booking tours listed on ${name}.`),
      },
      layout: layoutOf("blocks"),
      data: {
        blocks: [
          {
            title: "Booking",
            questions: [
              { question: "How do I book a tour?", answer: "Open a tour, choose the date on our partner's page and complete the booking there." },
              { question: "Is the price shown final?", answer: "The partner shows the final price before you pay. Prices can change with the date and group size." },
              { question: "Can I cancel?", answer: "Cancellation rules depend on the tour. They are shown by the booking partner before you pay." },
              { question: "Who do I ask if I have a question?", answer: email ? `Write to ${email} and we will do our best to help.` : "Use the contact page and we will do our best to help." },
            ],
          },
        ],
      },
    },
    legal: {
      meta: {
        title: "Legal",
        metaTitle: fit([`${name}: Privacy, Terms and Cookies`, `${name} | Privacy, Terms and Cookie Policy`]),
        metaDesc: describe(`The privacy policy, terms of service, cookie policy and affiliate disclosure of ${name}.`),
      },
      layout: layoutOf("privacy", "terms", "cookie", "affiliate"),
      data: {
        privacy: `<h2>Privacy Policy</h2><p>${name} collects as little personal data as possible. If you write to us, we use your message and email address only to reply. We do not sell personal data.</p><p>Bookings are made on our partners' sites, which have their own privacy policies.</p>`,
        terms: `<h2>Terms of Service</h2><p>${name} describes tours offered by booking partners. The booking contract is between you and the partner. We try to keep the information here accurate, but it can change; the partner's page is the final word on price, dates and conditions.</p>`,
        cookie: `<h2>Cookie Policy</h2><p>This site uses the cookies needed for it to work and, where you agree, cookies that help us understand how it is used. Booking partners may set their own cookies on their sites.</p>`,
        affiliate: `<h2>Affiliate Disclosure</h2><p>We may earn a commission when you book through links on this site, at no extra cost to you. It does not change the price you pay.</p>`,
      },
    },
  };
}

export interface StarterResult {
  home: "written" | "kept" | "skipped (needs 3 published tours)" | "invalid";
  navigation: "written" | "kept";
  pages: string[];
}

/**
 * Writes what the project is missing, published as version 1 so the site can serve it at once. An existing Home,
 * navigation or page is never replaced (unless `force`). Pages need the project's domain, because that is where
 * they are stored. Safe to call again: a second call writes nothing.
 */
export async function ensureStarterContent(db: Firestore, project: StarterProject, opts: { force?: boolean; dryRun?: boolean; profile?: HomeProfile; refresh?: boolean } = {}): Promise<StarterResult> {
  const { force = false, dryRun = false, profile, refresh = false } = opts;
  const stamp = { propertySlug: project.slug, status: "published", version: 1, dirty: false, inReview: false, updatedBy: "starter-content", updatedAt: new Date() };
  const result: StarterResult = { home: "kept", navigation: "kept", pages: [] };

  // Home
  const homeRef = db.collection("siteContent").doc(project.slug);
  const existing = (await homeRef.get()).data();
  // `refresh` rewrites a Home that this code wrote and nobody has edited since (never one an editor has saved).
  const ours = existing?.updatedBy === "seed-script" || existing?.updatedBy === "starter-content";
  if (force || !existing?.draft || (refresh && ours)) {
    const toursSnap = await db.collection("tours").where("propertySlug", "==", project.slug).get();
    const tours: StarterTour[] = toursSnap.docs
      .map((t) => t.data())
      .filter((t) => t.status === undefined || t.status === "published")
      .map((t) => ({ slug: String(t.slug ?? ""), title: String(t.title ?? "") }))
      .filter((t) => t.slug && t.title)
      .sort((a, b) => a.title.localeCompare(b.title));
    if (tours.length < 3) result.home = "skipped (needs 3 published tours)";
    else {
      const main = (await db.collection("siteContent").doc("street-food-rome").get()).data();
      const layout: { id: string; visible: boolean }[] = main?.draft?.layout ?? layoutOf("hero", "names", "slider", "categories", "choose", "places", "seo");
      const image = main?.draft?.data?.hero?.image?.src ? String(main.draft.data.hero.image.src) : STARTER_IMAGE;
      const home = buildHome(project, tours, layout, { src: image, alt: `${project.name}: tours in Italy` }, profile);
      if (!homeSchema.safeParse(home.data).success) result.home = "invalid";
      else {
        if (!dryRun) await homeRef.set({ slug: "home", draft: home, published: home, ...stamp }, { merge: true });
        result.home = "written";
      }
    }
  }

  // Navigation
  const navRef = db.collection("navigation").doc(project.slug);
  if (force || !(await navRef.get()).data()?.draft) {
    const nav = buildNavigation(project, Boolean(project.domain));
    if (!dryRun) await navRef.set({ slug: "navigation", draft: nav, published: nav, ...stamp }, { merge: true });
    result.navigation = "written";
  }

  // Pages live under the project's domain.
  if (project.domain) {
    const pages = buildPages(project);
    for (const slug of Object.keys(pages) as PageSlug[]) {
      const ref = db.collection("sites").doc(project.domain).collection("pages").doc(slug);
      if (!force && (await ref.get()).data()?.draft) continue;
      const draft = pages[slug];
      const legacy: Record<string, unknown> = { title: draft.meta.title, metaTitle: draft.meta.metaTitle, metaDesc: draft.meta.metaDesc };
      if (slug === "faq") {
        const blocks = (draft.data.blocks ?? []) as { questions: { question: string; answer: string }[] }[];
        legacy.faqs = blocks.flatMap((b) => b.questions);
      }
      if (!dryRun) await ref.set({ slug, ...legacy, draft, published: draft, ...stamp }, { merge: true });
      result.pages.push(slug);
    }
  }

  // A navigation this code wrote (nobody has edited it) learns about the pages once they exist, so the new site
  // links to them. A navigation someone has edited is never touched.
  if (project.domain && !force) {
    const cur = (await navRef.get()).data();
    const navbar = (cur?.draft?.data?.navbar ?? []) as unknown[];
    if ((cur?.updatedBy === "starter-content" || cur?.updatedBy === "seed-script") && navbar.length < 5) {
      const nav = buildNavigation(project, true);
      if (!dryRun) await navRef.set({ slug: "navigation", draft: nav, published: nav, ...stamp }, { merge: true });
      result.navigation = "written";
    }
  }
  return result;
}
