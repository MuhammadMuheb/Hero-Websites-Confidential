import { describe, expect, it } from "vitest";
import { diffRows, parseImport } from "./build";

const n = (count: number, make: (i: number) => unknown) => Array.from({ length: count }, (_, i) => make(i));

function validFile() {
  return {
    project: { name: "Street Food Rome", slug: "rome", domain: "streetfoodrome.com", publicUrl: "https://streetfoodrome.com", contactEmail: "hi@streetfoodrome.com" },
    home: {
      heroEyebrow: "Eat Rome",
      heroTitle: "Taste the real Rome",
      heroGoldWord: "real",
      heroSubtitle: "Small group food tours",
      heroImage: { src: "https://example.com/h.webp", alt: "A plate of pasta" },
      searchPlaceholder: "Search tours",
      chips: n(20, (i) => `chip ${i}`),
      namesStripLabel: "As seen with",
      namesStrip: n(10, (i) => ({ name: `Name ${i}`, href: "/tours" })),
      sliderEyebrow: "Top picks",
      sliderTitle: "Top tours",
      categoryEyebrow: "Browse",
      categoryTitle: "Categories",
      categories: n(5, (i) => ({ name: `Cat ${i}`, slug: `cat-${i}`, description: "d", imageUrl: "https://example.com/c.webp", tourSlugs: ["a", "b", "c"] })),
      howWeChooseTitle: "How we choose",
      howWeChoose: n(4, (i) => ({ title: `T${i}`, description: "d", icon: "star" })),
      placesTitle: "Places",
      placesTabs: n(3, (i) => ({ name: `P${i}`, href: "/places", description: "d" })),
    },
    seo: { metaTitle: "Street Food Rome tours and tastings", metaDescription: "m", ogImage: "https://example.com/og.webp" },
    cards: [{ title: "Gelato and Espresso Crawl", slug: "gelato-crawl", price: { current: 25, original: 45, currency: "EUR" }, images: [{ url: "https://example.com/g.webp", alt: "Gelato" }] }],
  };
}

const parse = (v: unknown, slug = "rome") => parseImport(JSON.stringify(v), slug);

describe("content import (acceptance test 7)", () => {
  it("accepts a complete, valid file and maps the flat home keys to the stored shape", () => {
    const r = parse(validFile());
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    const hero = (r.plan.pages.home.hero as Record<string, unknown>);
    expect(hero.title).toBe("Taste the real Rome");
    expect(r.plan.cards).toHaveLength(1);
  });

  it("rejects the whole file with a readable list when counts are wrong", () => {
    const f = validFile();
    f.home.chips = f.home.chips.slice(0, 3);
    f.home.categories = f.home.categories.slice(0, 2);
    const r = parse(f);
    expect(r.ok).toBe(false);
    if (r.ok) return;
    expect(r.issues.some((i) => i.includes("home.chips"))).toBe(true);
    expect(r.issues.some((i) => i.includes("home.categories"))).toBe(true);
  });

  it("reports missing and unknown keys", () => {
    const f = validFile() as Record<string, unknown>;
    delete (f.home as Record<string, unknown>).heroTitle;
    (f.home as Record<string, unknown>).surprise = "x";
    const r = parse(f);
    expect(r.ok).toBe(false);
    if (r.ok) return;
    expect(r.issues.join("\n")).toMatch(/heroTitle/);
    expect(r.issues.join("\n")).toMatch(/surprise/);
  });

  it("rejects invalid JSON and files for another project", () => {
    expect(parseImport("{nope", "rome").ok).toBe(false);
    const wrong = parse(validFile(), "pompeii");
    expect(wrong.ok).toBe(false);
  });

  it("rejects duplicate card slugs and out-of-range ratings", () => {
    const f = validFile();
    f.cards.push({ ...f.cards[0], rating: { value: 9, count: 1, source: "partner" } } as never);
    const r = parse(f);
    expect(r.ok).toBe(false);
  });

  it("produces field-by-field differences", () => {
    const rows = diffRows("home", { hero: { title: "Old" }, chips: ["a"] }, { hero: { title: "New" }, chips: ["a"] });
    expect(rows).toEqual([{ target: "home", path: "hero.title", current: "Old", next: "New" }]);
  });
});
