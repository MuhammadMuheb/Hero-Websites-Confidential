"use client";

import Link from "next/link";
import { Select } from "@/components/ui/Field";
import { HOME_COUNTS, HOME_LIMITS } from "@/lib/validation/schemas";
import { Group, ImageField, ListEditor, TextField } from "./fields";

/**
 * The Home page, one panel per block, in the words of the live page: what each field is called here is what the
 * visitor sees there. Anything the page shows can be changed from its block; nothing else is offered.
 */

type Values = Record<string, unknown>;
export interface TourOption {
  slug: string;
  title: string;
}

interface FormProps {
  values: Values;
  set: (key: string, value: unknown) => void;
  readOnly: boolean;
  tours: TourOption[];
  /** For the link to the Tours list. */
  projectId: string;
}

const str = (v: unknown): string => (typeof v === "string" ? v : "");
const obj = (v: unknown): Record<string, unknown> => (typeof v === "object" && v !== null && !Array.isArray(v) ? (v as Record<string, unknown>) : {});
const arr = (v: unknown): unknown[] => (Array.isArray(v) ? v : []);

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const ICONS = [
  { value: "heart", label: "Heart" },
  { value: "users", label: "People" },
  { value: "map", label: "Map pin" },
  { value: "clock", label: "Clock" },
  { value: "compass", label: "Compass" },
  { value: "camera", label: "Camera" },
];

/** What the top of the page looks like with the text and picture as typed. */
function HeroPreview({ hero }: { hero: Record<string, unknown> }) {
  const title = str(hero.title);
  const gold = str(hero.goldWord).trim();
  const image = obj(hero.image);
  const src = str(image.src);
  const at = gold ? title.indexOf(gold) : -1;
  return (
    <div className="relative overflow-hidden rounded-card bg-primary-dark text-white" aria-label="How the top of the page will look">
      {/^https?:\/\//i.test(src) && (
        // eslint-disable-next-line @next/next/no-img-element -- preview of an arbitrary external image
        <img src={src} alt="" className="absolute inset-0 h-full w-full object-cover opacity-50" />
      )}
      <div className="relative space-y-2 px-5 py-6">
        <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-gold">{str(hero.eyebrow) || "Eyebrow"}</p>
        <p className="text-xl font-black leading-tight sm:text-2xl">
          {at >= 0 ? (
            <>
              {title.slice(0, at)}
              <span className="text-gold">{gold}</span>
              {title.slice(at + gold.length)}
            </>
          ) : (
            title || "Headline"
          )}
        </p>
        <p className="max-w-md text-[13px] text-white/80">{str(hero.subtitle) || "Subtitle"}</p>
        <div className="mt-3 max-w-sm rounded-control bg-white px-3 py-2 text-[13px] text-ink-muted">{str(hero.searchPlaceholder) || "Search bar text"}</div>
      </div>
    </div>
  );
}

function Hero({ values, set, readOnly }: FormProps) {
  const hero = obj(values.hero);
  const image = obj(hero.image);
  const setHero = (patch: Record<string, unknown>) => set("hero", { ...hero, ...patch });
  const chips = arr(values.chips).map(str);
  return (
    <div className="space-y-6">
      <HeroPreview hero={hero} />
      <Group title="Top of the page" note="The first thing a visitor reads.">
        <TextField label="Small line above the headline" value={str(hero.eyebrow)} max={120} readOnly={readOnly} onChange={(v) => setHero({ eyebrow: v })} hint="For example the place or the promise." />
        <TextField label="Main headline (the page's main heading)" value={str(hero.title)} max={160} readOnly={readOnly} onChange={(v) => setHero({ title: v })} />
        <TextField label="Highlighted word" value={str(hero.goldWord)} max={60} readOnly={readOnly} onChange={(v) => setHero({ goldWord: v })} hint="A word from the headline, shown in gold. Leave empty for none." />
        <TextField label="Subtitle" value={str(hero.subtitle)} max={400} long readOnly={readOnly} onChange={(v) => setHero({ subtitle: v })} />
        <ImageField label="Background image" url={str(image.src)} alt={str(image.alt)} readOnly={readOnly} hint="Wide, 16:9, at least 1600 x 900." onChange={({ url, alt }) => setHero({ image: { src: url, alt } })} />
        <TextField label="Search bar text" value={str(hero.searchPlaceholder)} max={120} readOnly={readOnly} onChange={(v) => setHero({ searchPlaceholder: v })} hint="The grey text inside the search bar." />
      </Group>
      <Group title="Quick search chips" note="The round buttons under the search bar.">
        <ListEditor<string> title="Chips" items={chips} onChange={(next) => set("chips", next)} blank={() => ""} min={HOME_LIMITS.chips.min} max={HOME_LIMITS.chips.max} noun="Chip" readOnly={readOnly} compact render={(chip, update) => <TextField label="Text" value={chip} max={60} readOnly={readOnly} onChange={update} />} />
      </Group>
    </div>
  );
}

function Names({ values, set, readOnly }: FormProps) {
  const items = arr(values.namesStrip).map((i) => ({ name: str(obj(i).name), href: str(obj(i).href) }));
  return (
    <div className="space-y-6">
      <TextField label="Label of the strip" value={str(values.namesStripLabel)} max={120} readOnly={readOnly} onChange={(v) => set("namesStripLabel", v)} />
      <ListEditor<{ name: string; href: string }>
        title="Names in the strip"
        items={items}
        onChange={(next) => set("namesStrip", next)}
        blank={() => ({ name: "", href: "" })}
        min={HOME_LIMITS.namesStrip.min}
        max={HOME_LIMITS.namesStrip.max}
        noun="Name"
        readOnly={readOnly}
        render={(item, update) => (
          <div className="grid gap-3 sm:grid-cols-2">
            <TextField label="Name" value={item.name} max={80} readOnly={readOnly} onChange={(v) => update({ ...item, name: v })} />
            <TextField label="Opens (a page path such as /tours)" value={item.href} max={500} readOnly={readOnly} onChange={(v) => update({ ...item, href: v })} />
          </div>
        )}
      />
    </div>
  );
}

function Slider({ values, set, readOnly, projectId }: FormProps) {
  return (
    <div className="space-y-5">
      <TextField label="Small line above the title" value={str(values.sliderEyebrow)} max={120} readOnly={readOnly} onChange={(v) => set("sliderEyebrow", v)} />
      <TextField label="Section title" value={str(values.sliderTitle)} max={160} readOnly={readOnly} onChange={(v) => set("sliderTitle", v)} />
      <p className="rounded-control bg-canvas px-3 py-2 text-[13px] text-ink-muted">
        The cards in this slider are your tours. To add, change or remove a card (image, title, description, price), open{" "}
        <Link href={`/projects/${projectId}?item=tours`} className="font-medium text-primary underline-offset-2 hover:underline">
          Tours
        </Link>
        .
      </p>
    </div>
  );
}

function Categories({ values, set, readOnly, tours }: FormProps) {
  const items = arr(values.categories).map((c) => {
    const o = obj(c);
    return { name: str(o.name), slug: str(o.slug), description: str(o.description), imageUrl: str(o.imageUrl), tourSlugs: arr(o.tourSlugs).map(str) };
  });
  type Cat = (typeof items)[number];
  return (
    <div className="space-y-6">
      <TextField label="Small line above the title" value={str(values.categoryEyebrow)} max={120} readOnly={readOnly} onChange={(v) => set("categoryEyebrow", v)} />
      <TextField label="Section title" value={str(values.categoryTitle)} max={160} readOnly={readOnly} onChange={(v) => set("categoryTitle", v)} />
      <ListEditor<Cat>
        title="Category tabs"
        hint="Each tab shows its own tours."
        items={items}
        onChange={(next) => set("categories", next)}
        blank={() => ({ name: "", slug: "", description: "", imageUrl: "", tourSlugs: Array.from({ length: HOME_COUNTS.tourSlugs }, () => "") })}
        min={HOME_LIMITS.categories.min}
        max={HOME_LIMITS.categories.max}
        noun="Category"
        readOnly={readOnly}
        render={(c, update) => (
          <>
            <ImageField label="Image" url={c.imageUrl} withAlt={false} readOnly={readOnly} hint="4:3, at least 1000 x 750." onChange={({ url }) => update({ ...c, imageUrl: url })} />
            <div className="grid gap-3 sm:grid-cols-2">
              <TextField label="Name" value={c.name} max={80} readOnly={readOnly} onChange={(v) => update({ ...c, name: v, slug: !c.slug || c.slug === slugify(c.name) ? slugify(v) : c.slug })} />
              <TextField label="Web address ending" value={c.slug} readOnly={readOnly} onChange={(v) => update({ ...c, slug: v.toLowerCase() })} hint="Lowercase letters, digits and hyphens." />
            </div>
            <TextField label="Description" value={c.description} max={400} long readOnly={readOnly} onChange={(v) => update({ ...c, description: v })} />
            <ListEditor<string>
              title="Tours shown in this tab"
              items={c.tourSlugs}
              onChange={(next) => update({ ...c, tourSlugs: next })}
              blank={() => ""}
              min={HOME_LIMITS.tourSlugs.min}
              max={HOME_LIMITS.tourSlugs.max}
              noun="Tour"
              readOnly={readOnly}
              render={(slug, setSlug) => (
                <Select aria-label="Tour" value={slug} disabled={readOnly} onChange={(e) => setSlug(e.target.value)}>
                  <option value="">Choose a tour</option>
                  {slug && !tours.some((t) => t.slug === slug) && <option value={slug}>{slug}</option>}
                  {tours.map((t) => (
                    <option key={t.slug} value={t.slug}>
                      {t.title}
                    </option>
                  ))}
                </Select>
              )}
            />
          </>
        )}
      />
    </div>
  );
}

function Choose({ values, set, readOnly }: FormProps) {
  const items = arr(values.howWeChoose).map((i) => ({ title: str(obj(i).title), description: str(obj(i).description), icon: str(obj(i).icon) }));
  type Item = (typeof items)[number];
  return (
    <div className="space-y-6">
      <TextField label="Section title" value={str(values.howWeChooseTitle)} max={160} readOnly={readOnly} onChange={(v) => set("howWeChooseTitle", v)} />
      <ListEditor<Item>
        title="Points"
        items={items}
        onChange={(next) => set("howWeChoose", next)}
        blank={() => ({ title: "", description: "", icon: "heart" })}
        min={HOME_LIMITS.howWeChoose.min}
        max={HOME_LIMITS.howWeChoose.max}
        noun="Point"
        readOnly={readOnly}
        render={(item, update) => (
          <>
            <div className="grid gap-3 sm:grid-cols-[1fr_160px]">
              <TextField label="Title" value={item.title} max={120} readOnly={readOnly} onChange={(v) => update({ ...item, title: v })} />
              <label className="block space-y-1">
                <span className="block text-[13px] font-medium text-ink">Icon</span>
                <Select value={item.icon || "heart"} disabled={readOnly} onChange={(e) => update({ ...item, icon: e.target.value })}>
                  {ICONS.map((i) => (
                    <option key={i.value} value={i.value}>
                      {i.label}
                    </option>
                  ))}
                </Select>
              </label>
            </div>
            <TextField label="Description" value={item.description} max={400} long readOnly={readOnly} onChange={(v) => update({ ...item, description: v })} />
          </>
        )}
      />
    </div>
  );
}

function Places({ values, set, readOnly }: FormProps) {
  const items = arr(values.placesTabs).map((i) => ({ name: str(obj(i).name), href: str(obj(i).href), description: str(obj(i).description) }));
  type Item = (typeof items)[number];
  return (
    <div className="space-y-6">
      <TextField label="Section title" value={str(values.placesTitle)} max={160} readOnly={readOnly} onChange={(v) => set("placesTitle", v)} />
      <ListEditor<Item>
        title="Place tabs"
        items={items}
        onChange={(next) => set("placesTabs", next)}
        blank={() => ({ name: "", href: "", description: "" })}
        min={HOME_COUNTS.placesTabs}
        max={30}
        noun="Place"
        readOnly={readOnly}
        compact
        render={(item, update) => (
          <>
            <TextField label="Name" value={item.name} max={80} readOnly={readOnly} onChange={(v) => update({ ...item, name: v })} />
            <TextField label="Opens (a page path such as /neighborhoods/trastevere)" value={item.href} max={500} readOnly={readOnly} onChange={(v) => update({ ...item, href: v })} />
            <TextField label="Short description (optional)" value={item.description} max={400} long readOnly={readOnly} onChange={(v) => update({ ...item, description: v })} />
          </>
        )}
      />
    </div>
  );
}

function Seo({ values, set, readOnly }: FormProps) {
  const seo = obj(values.seo);
  const setSeo = (patch: Record<string, unknown>) => set("seo", { ...seo, ...patch });
  return (
    <div className="space-y-5">
      <TextField label="SEO title" value={str(seo.metaTitle)} min={30} max={60} readOnly={readOnly} onChange={(v) => setSeo({ metaTitle: v })} hint="The title shown in search results." />
      <TextField label="Meta description" value={str(seo.metaDescription)} min={70} max={160} long readOnly={readOnly} onChange={(v) => setSeo({ metaDescription: v })} hint="The text under the title in search results." />
      <TextField label="Keywords (comma separated, optional)" value={str(seo.keywords)} max={400} readOnly={readOnly} onChange={(v) => setSeo({ keywords: v })} />
      <ImageField label="Sharing image" url={str(seo.ogImage)} withAlt={false} readOnly={readOnly} hint="Shown when the link is shared. 1200 x 630." onChange={({ url }) => setSeo({ ogImage: url })} />
      <TextField label="Contact email" value={str(values.contactEmail)} readOnly={readOnly} onChange={(v) => set("contactEmail", v)} />
    </div>
  );
}

const FORMS: Record<string, (p: FormProps) => React.ReactElement> = { hero: Hero, names: Names, slider: Slider, categories: Categories, choose: Choose, places: Places, seo: Seo };

/** The editor for one block of the Home page, or null for a block that has no special editor. */
export function hasHomeForm(sectionId: string): boolean {
  return sectionId in FORMS;
}

export function HomeSectionForm({ sectionId, ...props }: FormProps & { sectionId: string }) {
  const Form = FORMS[sectionId];
  return Form ? <Form {...props} /> : null;
}
