/**
 * Fills in every project other than Street Food Rome, so each has what Street Food Rome has:
 *
 *   - a Home and a navigation (draft and published) in the project's own words and with its own tours
 *   - About, Contact, FAQ and Legal pages, once the project has a domain (they are stored under the domain)
 *   - a category and a city on its tours, and its managed lists (taxonomies), when those are missing
 *
 * Only what is missing is written, and a Home or navigation that an editor has saved is never replaced. A Home that
 * this script wrote earlier is refreshed. Dry run unless --apply is passed.
 *
 *   npx tsx --env-file=../../infra/env/.env scripts/seed-network-projects.mts                       # dry run
 *   npx tsx --env-file=../../infra/env/.env scripts/seed-network-projects.mts --apply               # write
 *   npx tsx --env-file=../../infra/env/.env scripts/seed-network-projects.mts --apply --domains domains.json
 *
 * domains.json maps a project slug to its domain, for example {"rome-vespa": "romevespa.com"}. A domain is only
 * set on a project that has none yet, and it also becomes the project's public URL (https://domain).
 * Needs FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL and FIREBASE_PRIVATE_KEY in the environment.
 */
import fs from "node:fs";
import { cert, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { ensureStarterContent, type HomeProfile } from "../src/lib/starter";

const argv = process.argv.slice(2);
const APPLY = argv.includes("--apply");
const MAIN = "street-food-rome";
const domainsFile = argv.includes("--domains") ? argv[argv.indexOf("--domains") + 1] : null;

const need = (n: string) => {
  const v = process.env[n];
  if (!v) throw new Error(`Missing ${n}.`);
  return v;
};
initializeApp({ credential: cert({ projectId: need("FIREBASE_PROJECT_ID"), clientEmail: need("FIREBASE_CLIENT_EMAIL"), privateKey: need("FIREBASE_PRIVATE_KEY").replace(/\\n/g, "\n") }) });
const db = getFirestore();

interface Topic {
  /** The category its tours belong to, and where they take place. */
  category: string;
  city: string;
  eyebrow: string;
  headline: string;
  highlight: string;
  subtitle: string;
  keywords: string[];
  /** Category tabs of the Home page. A tour goes to the first tab whose pattern matches its title. */
  tabs: { name: string; match: RegExp }[];
}

/** What each project is about. Seed data (the words of each site); the template that shows it is shared. */
const TOPICS: Record<string, Topic> = {
  "amalfi-day-trip": { category: "Amalfi Coast", city: "Amalfi", eyebrow: "Amalfi Coast, Italy", headline: "Amalfi Coast Day Trips", highlight: "Amalfi Coast", subtitle: "Boat trips, walks and full-day tours along Italy's most famous coastline.", keywords: ["Boat tours", "Coastal walks", "Lemon groves", "Full-day tours", "Positano"], tabs: [{ name: "Boat trips", match: /boat/i }, { name: "Walks and groves", match: /hik|lemon/i }, { name: "Full-day tours", match: /full|day/i }] },
  "cooking-in-rome": { category: "Cooking Classes", city: "Rome", eyebrow: "Rome, Italy", headline: "Cooking Classes in Rome", highlight: "Cooking Classes", subtitle: "Learn to cook pasta, pizza and Roman classics, hands on.", keywords: ["Pasta making", "Pizza making", "Market to table", "Hands-on classes", "Roman cooking"], tabs: [{ name: "Pasta and pizza", match: /pasta|pizza/i }, { name: "Market to table", match: /market/i }, { name: "Cooking courses", match: /cooking|course/i }] },
  "golf-cart-rome": { category: "Golf Cart Tours", city: "Rome", eyebrow: "Rome, Italy", headline: "Rome by Golf Cart", highlight: "Golf Cart", subtitle: "See the sights of Rome from an electric golf cart.", keywords: ["Golf cart tours", "City tour", "Sunset tour", "Electric cart"], tabs: [{ name: "Sunset tours", match: /sunset/i }, { name: "City tours", match: /city/i }, { name: "Electric golf cart", match: /electric|golf/i }] },
  "naples-street-food": { category: "Street Food", city: "Naples", eyebrow: "Naples, Italy", headline: "Naples Street Food Tours", highlight: "Street Food", subtitle: "Pizza, markets and cooking in the home of Neapolitan food.", keywords: ["Neapolitan pizza", "Street food", "Food markets", "Cooking class"], tabs: [{ name: "Pizza", match: /pizza/i }, { name: "Markets and street food", match: /market|street/i }, { name: "Cooking classes", match: /cooking|class/i }] },
  "pompeii-day-trip": { category: "Pompeii", city: "Pompeii", eyebrow: "Pompeii, Italy", headline: "Pompeii Day Trips", highlight: "Pompeii", subtitle: "Guided visits to Pompeii, Herculaneum and Mount Vesuvius.", keywords: ["Pompeii", "Herculaneum", "Mount Vesuvius", "Guided tour", "Small group"], tabs: [{ name: "Pompeii tours", match: /guided|small/i }, { name: "Mount Vesuvius", match: /vesuvius/i }, { name: "Pompeii and Herculaneum", match: /herculaneum/i }] },
  "private-vatican": { category: "Vatican", city: "Rome", eyebrow: "Vatican City, Rome", headline: "Private Vatican Tours", highlight: "Vatican", subtitle: "The Vatican Museums and the Sistine Chapel, with early entry, private guides and skip-the-line tickets.", keywords: ["Vatican Museums", "Sistine Chapel", "St Peter's Dome", "Early entry", "Private guide", "Skip the line"], tabs: [{ name: "Early entry", match: /early/i }, { name: "Private and family tours", match: /private|family/i }, { name: "Tickets and combos", match: /ticket|combo|fast|skip/i }] },
  "rome-pizza-class": { category: "Pizza Classes", city: "Rome", eyebrow: "Rome, Italy", headline: "Pizza Classes in Rome", highlight: "Pizza", subtitle: "Make Roman pizza by hand, or taste your way through Trastevere.", keywords: ["Pizza making", "Evening class", "Trastevere", "Hands-on"], tabs: [{ name: "Pizza classes", match: /class|making/i }, { name: "Evening experiences", match: /evening|night/i }, { name: "Pizza tours", match: /tour|experience|cooking/i }] },
  "rome-vespa": { category: "Vespa Tours", city: "Rome", eyebrow: "Rome, Italy", headline: "Rome by Vespa", highlight: "Vespa", subtitle: "Ride through Rome on a classic Vespa, by day or at sunset.", keywords: ["Vespa", "City tour", "Sunset ride", "Food and wine"], tabs: [{ name: "Sunset rides", match: /sunset/i }, { name: "City tours", match: /city|classic/i }, { name: "Food and wine", match: /food|wine/i }] },
  "tiramisu-class": { category: "Dessert Classes", city: "Rome", eyebrow: "Rome, Italy", headline: "Tiramisu Classes in Rome", highlight: "Tiramisu", subtitle: "Learn to make tiramisu and other Italian desserts.", keywords: ["Tiramisu", "Gelato", "Italian desserts", "Hands-on"], tabs: [{ name: "Tiramisu", match: /making/i }, { name: "Tiramisu and gelato", match: /gelato/i }, { name: "Dessert classes", match: /dessert/i }] },
  "tivoli-day-trip": { category: "Tivoli", city: "Tivoli", eyebrow: "Tivoli, Italy", headline: "Tivoli Day Trips", highlight: "Tivoli", subtitle: "The villas and gardens of Tivoli on a guided day trip from Rome.", keywords: ["Tivoli", "Villas and gardens", "Day trip from Rome", "Guided tour"], tabs: [{ name: "Small group tours", match: /small/i }, { name: "Day trips", match: /day trip/i }, { name: "Estates and extended visits", match: /estate|extended/i }] },
  "tuscany-day-trip": { category: "Tuscany", city: "Tuscany", eyebrow: "Tuscany, Italy", headline: "Tuscany Day Trips", highlight: "Tuscany", subtitle: "Countryside, wine and cooking on a day trip to Tuscany.", keywords: ["Tuscany", "Countryside", "Wine tasting", "Cooking"], tabs: [{ name: "Countryside", match: /countryside/i }, { name: "Wine and cooking", match: /wine|cooking/i }, { name: "Day trips", match: /day trip/i }] },
  "underground-colosseum": { category: "Colosseum", city: "Rome", eyebrow: "Rome, Italy", headline: "Colosseum Underground Tours", highlight: "Colosseum", subtitle: "Go beneath the arena, and see the Colosseum, the Forum and Palatine Hill.", keywords: ["Colosseum", "Underground", "Arena floor", "Roman Forum", "Palatine Hill"], tabs: [{ name: "Underground and arena", match: /underground|arena|secrets/i }, { name: "Evening tours", match: /evening/i }, { name: "Colosseum, Forum and Palatine", match: /forum|palatine/i }] },
};

/** Sorts the tours into the topic's tabs; every tab ends up with at least one tour. */
function profileFor(t: Topic, tours: { slug: string; title: string }[]): HomeProfile {
  const buckets: string[][] = t.tabs.map(() => []);
  for (const tour of tours) {
    const i = t.tabs.findIndex((tab) => tab.match.test(tour.title));
    buckets[i === -1 ? buckets.reduce((min, b, n, all) => (b.length < all[min].length ? n : min), 0) : i].push(tour.slug);
  }
  // An empty tab takes one tour from the fullest tab (a tour may appear in two tabs, which is fine on a Home page).
  for (const b of buckets) if (b.length === 0) b.push(buckets.reduce((max, x) => (x.length > max.length ? x : max), buckets[0])[0]);
  return {
    eyebrow: t.eyebrow,
    headline: t.headline,
    highlight: t.highlight,
    subtitle: t.subtitle,
    keywords: t.keywords,
    categories: t.tabs.map((tab, i) => ({ name: tab.name, tourSlugs: buckets[i] })),
  };
}

const DOMAIN_RE = /^(?=.{1,253}$)([a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/;

async function main() {
  const domains: Record<string, string> = domainsFile ? JSON.parse(fs.readFileSync(domainsFile, "utf8")) : {};
  const projects = (await db.collection("properties").get()).docs.filter((d) => d.id !== MAIN);
  console.log(`${APPLY ? "APPLY" : "DRY RUN"}: ${projects.length} projects\n`);

  // A domain belongs to one project.
  const taken = new Map(projects.filter((p) => p.data().domain).map((p) => [String(p.data().domain).toLowerCase().replace(/^www\./, ""), p.id]));

  for (const p of projects) {
    const d = p.data();
    const name = String(d.name ?? p.id).trim();
    const email = typeof d.contactEmail === "string" ? d.contactEmail : "";
    const lines: string[] = [];

    // 1. A domain, when one was given and the project has none.
    let domain = typeof d.domain === "string" ? d.domain : "";
    const wanted = (domains[p.id] ?? "").trim().toLowerCase().replace(/^www\./, "");
    if (!domain && wanted) {
      if (!DOMAIN_RE.test(wanted)) lines.push(`domain "${wanted}" is not a valid hostname, skipped`);
      else if (taken.has(wanted) && taken.get(wanted) !== p.id) lines.push(`domain ${wanted} already belongs to ${taken.get(wanted)}, skipped`);
      else {
        if (APPLY) await db.collection("properties").doc(p.id).update({ domain: wanted, publicUrl: `https://${wanted}`, updatedAt: new Date() });
        taken.set(wanted, p.id);
        domain = wanted;
        lines.push(`domain ${wanted}`);
      }
    }

    // 2. Tours: a category and a city where missing. Prices and images are never invented.
    const topic = TOPICS[p.id];
    const toursSnap = await db.collection("tours").where("propertySlug", "==", p.id).get();
    if (topic) {
      let touched = 0;
      for (const t of toursSnap.docs) {
        const patch: Record<string, string> = {};
        if (!t.data().category) patch.category = topic.category;
        if (!t.data().city) patch.city = topic.city;
        if (Object.keys(patch).length) {
          touched += 1;
          if (APPLY) await t.ref.update(patch);
        }
      }
      if (touched) lines.push(`${touched} tours: category and city`);
      const taxRef = db.collection("taxonomies").doc(p.id);
      if (!(await taxRef.get()).exists) {
        if (APPLY) await taxRef.set({ categories: [topic.category], neighbourhoods: [], cities: [topic.city], blogCategories: [], propertySlug: p.id, updatedAt: new Date(), updatedBy: "starter-content" });
        lines.push("taxonomies");
      }
    }

    // 3. Home, navigation and pages, in the project's own words.
    const tours = toursSnap.docs
      .map((t) => t.data())
      .filter((t) => t.status === undefined || t.status === "published")
      .map((t) => ({ slug: String(t.slug ?? ""), title: String(t.title ?? "") }))
      .filter((t) => t.slug && t.title)
      .sort((a, b) => a.title.localeCompare(b.title));
    const profile = topic && tours.length >= 3 ? profileFor(topic, tours) : undefined;
    const r = await ensureStarterContent(db, { slug: p.id, name, domain, contactEmail: email }, { dryRun: !APPLY, profile, refresh: true });
    if (r.home !== "kept") lines.push(`home ${r.home}`);
    if (r.navigation !== "kept") lines.push("navigation");
    if (r.pages.length) lines.push(`pages: ${r.pages.join(", ")}`);
    console.log(`${lines.length ? "WRITE" : "KEEP "} ${p.id}${lines.length ? `: ${lines.join("; ")}` : ": nothing missing"}`);
  }
  console.log(`\n${APPLY ? "Done." : "Dry run only. Nothing was written. Pass --apply to write."}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
