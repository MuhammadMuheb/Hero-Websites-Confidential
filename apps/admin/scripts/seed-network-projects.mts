/**
 * Fills in every project other than Street Food Rome, so each has what Street Food Rome has:
 *
 *   - a Home and a navigation (draft and published), built from the project's own name, email and tours
 *   - About, Contact, FAQ and Legal pages, once the project has a domain (they are stored under the domain)
 *   - a category and a city on its tours, and its managed lists (taxonomies), when those are missing
 *
 * Only what is missing is written; anything already there is kept. Dry run unless --apply is passed.
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
import { ensureStarterContent } from "../src/lib/starter";

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

/** What each project is about: the category its tours belong to, and where they take place. Seed data, not template. */
const TOPICS: Record<string, { category: string; city: string }> = {
  "amalfi-day-trip": { category: "Amalfi Coast", city: "Amalfi" },
  "cooking-in-rome": { category: "Cooking Classes", city: "Rome" },
  "golf-cart-rome": { category: "Golf Cart Tours", city: "Rome" },
  "naples-street-food": { category: "Street Food", city: "Naples" },
  "pompeii-day-trip": { category: "Pompeii", city: "Pompeii" },
  "private-vatican": { category: "Vatican", city: "Rome" },
  "rome-pizza-class": { category: "Pizza Classes", city: "Rome" },
  "rome-vespa": { category: "Vespa Tours", city: "Rome" },
  "tiramisu-class": { category: "Dessert Classes", city: "Rome" },
  "tivoli-day-trip": { category: "Tivoli", city: "Tivoli" },
  "tuscany-day-trip": { category: "Tuscany", city: "Tuscany" },
  "underground-colosseum": { category: "Colosseum", city: "Rome" },
};

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
    const tours = await db.collection("tours").where("propertySlug", "==", p.id).get();
    if (topic) {
      let touched = 0;
      for (const t of tours.docs) {
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

    // 3. Home, navigation and pages.
    const r = await ensureStarterContent(db, { slug: p.id, name, domain, contactEmail: email }, { dryRun: !APPLY });
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
