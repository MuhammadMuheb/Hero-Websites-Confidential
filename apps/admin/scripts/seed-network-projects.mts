/**
 * Gives every project other than Street Food Rome a complete starting site, built from the project's own data
 * (its name, its contact email and its tours), so the generic site template can serve it as soon as a domain points
 * at it:
 *
 *   siteContent/{slug}  the Home page (draft and published, version 1)
 *   navigation/{slug}   the navbar, footer and header details (draft and published, version 1)
 *
 * Only what is missing is written. A project that already has a Home or a navigation is left alone (--force
 * overwrites). Domains, status and tours are never touched. Dry run unless --apply is passed.
 *
 *   npx tsx --env-file=../../infra/env/.env scripts/seed-network-projects.mts            # dry run
 *   npx tsx --env-file=../../infra/env/.env scripts/seed-network-projects.mts --apply    # write
 *
 * Needs FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL and FIREBASE_PRIVATE_KEY in the environment.
 */
import { cert, initializeApp } from "firebase-admin/app";
import { FieldValue, getFirestore } from "firebase-admin/firestore";
import { runPageGate } from "../src/lib/publish/gate";
import { homeSchema, formatIssues } from "../src/lib/validation/schemas";

const args = new Set(process.argv.slice(2));
const APPLY = args.has("--apply");
const FORCE = args.has("--force");
const MAIN = "street-food-rome";

const need = (n: string) => {
  const v = process.env[n];
  if (!v) throw new Error(`Missing ${n}.`);
  return v;
};
initializeApp({ credential: cert({ projectId: need("FIREBASE_PROJECT_ID"), clientEmail: need("FIREBASE_CLIENT_EMAIL"), privateKey: need("FIREBASE_PRIVATE_KEY").replace(/\\n/g, "\n") }) });
const db = getFirestore();

const clip = (s: string, n: number) => (s.length <= n ? s : `${s.slice(0, n - 1).trimEnd()}…`);

/** A picture to start with; every project can replace it in the editor. */
const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1600&q=80";

interface Tour {
  slug: string;
  title: string;
}

function seoTitle(name: string): string {
  const candidates = [`${name}: Tours and Experiences in Italy`, `${name}: Tours in Italy`, `${name} | Tours and Experiences`, name];
  const fit = candidates.find((c) => c.length >= 30 && c.length <= 60);
  if (fit) return fit;
  const padded = `${name}: Hand-Picked Tours and Experiences in Italy`;
  return clip(padded, 60);
}

function homeFor(name: string, email: string, tours: Tour[], layout: { id: string; visible: boolean }[], image: { src: string; alt: string }) {
  const titles = tours.map((t) => clip(t.title, 60));
  const generic = ["Small groups", "Local guides", "Trusted partners", "Italy"];
  const chips = [...new Set([...titles, ...generic])].slice(0, 20);

  const names = tours.slice(0, 10).map((t) => ({ name: clip(t.title, 80), href: `/tours/${t.slug}` }));

  // Three groups so every tour appears somewhere; each group has at least one tour.
  const groups = [
    { name: "Top picks", slug: "top-picks", description: `Our most popular ${name} experiences, a good place to start.` },
    { name: "Small group experiences", slug: "small-group-experiences", description: "Guided by locals, in small groups, with time to ask questions." },
    { name: "More ways to explore", slug: "more-ways-to-explore", description: `Other ${name} tours worth a look.` },
  ].map((g, gi) => ({ ...g, imageUrl: image.src, tourSlugs: tours.filter((_, i) => i % 3 === gi).map((t) => t.slug).slice(0, 8) }));

  const data = {
    hero: { eyebrow: "Italy", title: `Discover ${name}`, goldWord: name, subtitle: "Hand-picked tours and experiences, booked through trusted partners.", image, searchPlaceholder: clip(`Search ${name} tours...`, 120) },
    chips,
    namesStripLabel: "Popular tours",
    namesStrip: names,
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
    seo: {
      metaTitle: seoTitle(name),
      metaDescription: clip(`Hand-picked ${name} tours and experiences in Italy, from trusted booking partners. Compare the options and book with confidence.`, 160),
      keywords: `${name}, Italy tours`,
      ogImage: image.src,
    },
    contactEmail: email,
  };
  return { meta: { title: "Home", metaTitle: data.seo.metaTitle, metaDesc: data.seo.metaDescription }, layout, data };
}

function navigationFor(name: string, email: string) {
  const link = (label: string, href: string) => ({ label, href, cta: false, children: [] });
  return {
    meta: { title: "Navigation", metaTitle: "", metaDesc: "" },
    layout: [
      { id: "navbar", visible: true },
      { id: "footer", visible: true },
    ],
    data: {
      // Only pages that exist from the start. About, FAQ and the rest are added when those pages are written.
      navbar: [link("Home", "/"), link("Tours", "/tours")],
      footer: [{ label: name, href: "", cta: false, children: [link("Home", "/"), link("Tours", "/tours")] }],
      siteTitle: name,
      ctaLabel: "See Tours",
      ctaHref: "/tours",
      contactEmail: email,
      contactLines: [],
      contactBadge: "",
      bottomNote: "We may earn a commission when you book through partner links on this site, at no extra cost to you.",
    },
  };
}

async function main() {
  const template = (await db.collection("siteContent").doc(MAIN).get()).data();
  const layout: { id: string; visible: boolean }[] = template?.draft?.layout ?? ["hero", "names", "slider", "categories", "choose", "places", "seo"].map((id) => ({ id, visible: true }));
  const sfrImage = template?.draft?.data?.hero?.image;
  const baseImage = typeof sfrImage?.src === "string" && sfrImage.src ? sfrImage.src : FALLBACK_IMAGE;

  const projects = (await db.collection("properties").get()).docs.filter((d) => d.id !== MAIN);
  console.log(`${APPLY ? "APPLY" : "DRY RUN"}: ${projects.length} projects\n`);

  let written = 0;
  for (const p of projects) {
    const d = p.data();
    const name = String(d.name ?? p.id).trim();
    const email = typeof d.contactEmail === "string" ? d.contactEmail : "";
    const toursSnap = await db.collection("tours").where("propertySlug", "==", p.id).get();
    const tours: Tour[] = toursSnap.docs
      .map((t) => t.data())
      .filter((t) => t.status === undefined || t.status === "published")
      .map((t) => ({ slug: String(t.slug ?? ""), title: String(t.title ?? "") }))
      .filter((t) => t.slug && t.title)
      .sort((a, b) => a.title.localeCompare(b.title));

    if (tours.length < 3) {
      console.log(`SKIP  ${p.id}: needs at least 3 published tours (has ${tours.length})`);
      continue;
    }

    const home = homeFor(name, email, tours, layout, { src: baseImage, alt: `${name}: tours in Italy` });
    const parsed = homeSchema.safeParse(home.data);
    const gate = runPageGate("home", home, { tourSlugs: new Set(tours.map((t) => t.slug)), otherMetaTitles: [] });
    if (!parsed.success || gate.some((c) => !c.ok)) {
      console.log(`FAIL  ${p.id}: ${!parsed.success ? formatIssues(parsed.error).slice(0, 3).join("; ") : gate.filter((c) => !c.ok).map((c) => c.label).join("; ")}`);
      continue;
    }

    const homeRef = db.collection("siteContent").doc(p.id);
    const navRef = db.collection("navigation").doc(p.id);
    const [hasHome, hasNav] = await Promise.all([homeRef.get().then((s) => Boolean(s.data()?.draft)), navRef.get().then((s) => Boolean(s.data()?.draft))]);
    const todo = [!hasHome || FORCE ? "home" : null, !hasNav || FORCE ? "navigation" : null].filter(Boolean);
    console.log(`${todo.length ? "WRITE" : "KEEP "} ${p.id}: ${tours.length} tours; ${todo.length ? todo.join(" + ") : "already has content"}`);
    if (!APPLY || todo.length === 0) continue;

    const stamp = { propertySlug: p.id, status: "published", version: 1, dirty: false, inReview: false, updatedBy: "seed-script", updatedAt: new Date(), publishedAt: FieldValue.serverTimestamp() };
    if (todo.includes("home")) await homeRef.set({ slug: "home", draft: home, published: home, ...stamp }, { merge: true });
    if (todo.includes("navigation")) {
      const nav = navigationFor(name, email);
      await navRef.set({ slug: "navigation", draft: nav, published: nav, ...stamp }, { merge: true });
    }
    written += 1;
  }
  console.log(`\n${APPLY ? `Done: ${written} projects written.` : "Dry run only. Nothing was written. Pass --apply to write."}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
