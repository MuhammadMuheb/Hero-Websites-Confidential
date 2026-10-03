import { describe, expect, it } from "vitest";
import { emptyDraft } from "@/lib/content/pages";
import { sanitizeRich } from "@/lib/sanitize";
import { gatePasses, runCardGate, runPageGate } from "./gate";

const ctx = { tourSlugs: new Set(["gelato-crawl"]), otherMetaTitles: [] as string[] };
const failed = (checks: ReturnType<typeof runPageGate>) => checks.filter((c) => !c.ok).map((c) => c.id);

function faqDraft(over: Partial<ReturnType<typeof emptyDraft>["meta"]> = {}) {
  const d = emptyDraft("faq");
  d.meta = { title: "Frequently asked questions", metaTitle: "Street Food Rome FAQ: booking and payment", metaDesc: "Answers to the questions we hear most about booking, payment, meeting points and what to expect on our small group food tours in Rome.", ...over };
  d.data = { blocks: [{ title: "Booking", questions: [{ question: "Can I cancel?", answer: "Yes, up to 24 hours before." }] }] };
  return d;
}

describe("page publish gate (blueprint section 12)", () => {
  it("passes a complete page", () => {
    expect(gatePasses(runPageGate("faq", faqDraft(), ctx))).toBe(true);
  });

  it("blocks bad title and description lengths", () => {
    const f = failed(runPageGate("faq", faqDraft({ metaTitle: "Too short", metaDesc: "short" }), ctx));
    expect(f).toContain("title");
    expect(f).toContain("meta");
  });

  it("requires the title to be unique within the project", () => {
    const f = failed(runPageGate("faq", faqDraft(), { ...ctx, otherMetaTitles: ["street food rome faq: booking and payment"] }));
    expect(f).toContain("title-unique");
  });

  it("requires alt text on every image and blocks extra H1s", () => {
    const d = emptyDraft("about");
    d.meta = faqDraft().meta;
    d.data = { hero: { title: "About us", image: { src: "https://x.test/a.webp", alt: "" } }, journey: ["<h1>Second</h1>"] };
    const f = failed(runPageGate("about", d, ctx));
    expect(f).toContain("alt");
    expect(f).toContain("h1");
  });

  it("flags broken internal links but accepts valid ones", () => {
    const d = faqDraft();
    d.data = { ...d.data, links: [{ label: "x", href: "/tours/does-not-exist" }] };
    expect(failed(runPageGate("faq", d, ctx))).toContain("links");
    d.data = { ...d.data, links: [{ label: "x", href: "/tours/gelato-crawl" }, { label: "y", href: "https://example.com" }] };
    expect(failed(runPageGate("faq", d, ctx))).not.toContain("links");
  });

  it("requires the Home page to be complete", () => {
    const d = emptyDraft("home");
    expect(failed(runPageGate("home", d, ctx))).toContain("structure");
  });
});

describe("card publish gate (blueprint section 9)", () => {
  const base = { title: "Gelato and Espresso Crawl", slug: "gelato-crawl", images: [{ url: "https://x.test/a.webp", alt: "Gelato" }], price: { current: 25, original: null, originalSince: "" }, affiliateUrl: "" };

  it("passes a complete card", () => expect(runCardGate(base).every((c) => c.ok)).toBe(true));
  it("needs at least one image and alt text on all", () => {
    expect(runCardGate({ ...base, images: [] }).find((c) => c.id === "images")?.ok).toBe(false);
    expect(runCardGate({ ...base, images: [{ url: "https://x.test/a.webp", alt: " " }] }).find((c) => c.id === "alt")?.ok).toBe(false);
  });
  it("needs originalSince for a strike-through price", () => {
    const p = { current: 25, original: 45, originalSince: "" };
    expect(runCardGate({ ...base, price: p }).find((c) => c.id === "price")?.ok).toBe(false);
    expect(runCardGate({ ...base, price: { ...p, originalSince: "2026-01-01" } }).find((c) => c.id === "price")?.ok).toBe(true);
  });
  it("requires https affiliate links", () => expect(runCardGate({ ...base, affiliateUrl: "http://x.test" }).find((c) => c.id === "affiliate")?.ok).toBe(false));
});

describe("rich text sanitiser", () => {
  it("removes scripts and inline event handlers", () => {
    const out = sanitizeRich('<p onclick="x()">Hi</p><script>alert(1)</script><a href="javascript:alert(1)">z</a><img src=x onerror=alert(1)>');
    expect(out).not.toMatch(/script|onclick|onerror|javascript:|<img/i);
    expect(out).toContain("Hi");
  });
});
