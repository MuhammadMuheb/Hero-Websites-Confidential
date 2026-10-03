"use client";

import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import { publishCard, restoreCard, saveCard, submitCard, trashCard } from "@/app/actions/tours";
import { StatusBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Drawer } from "@/components/ui/Drawer";
import { EmptyState } from "@/components/ui/EmptyState";
import { Field, Input, Select, Textarea } from "@/components/ui/Field";
import { Icon } from "@/components/ui/Icon";
import { ImageUploader } from "@/components/ui/ImageUploader";
import { PageHeader } from "@/components/ui/PageHeader";
import { Table, Td, Th } from "@/components/ui/Table";
import { useToast } from "@/components/ui/Toast";
import { runCardGate } from "@/lib/publish/gate";
import type { ContentStatus, Taxonomies, Tour, TourImage } from "@/lib/types";

const TITLE_MIN = 10;
const TITLE_MAX = 70;
const SHORT_MAX = 160;

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const discount = (now: number | null, was: number | null) => (now === null || was === null || was <= now ? null : Math.round(((was - now) / was) * 100));
const money = (v: number | null, c: string) => (v === null ? "-" : `${c} ${v}`);
const num = (s: string): number | null => (s.trim() === "" || Number.isNaN(Number(s)) ? null : Number(s));

interface FormProps {
  projectSlug: string;
  tour?: Tour;
  taxonomies: Taxonomies;
  canPublish: boolean;
  onClose: () => void;
}

function CardForm({ projectSlug, tour, taxonomies, canPublish, onClose }: FormProps) {
  const router = useRouter();
  const { notify } = useToast();
  const [pending, startTransition] = useTransition();
  const [id, setId] = useState<string | null>(tour?.id ?? null);
  const [saved, setSaved] = useState(Boolean(tour));
  const [dirty, setDirty] = useState(!tour);

  const [title, setTitle] = useState(tour?.title ?? "");
  const [slug, setSlug] = useState(tour?.slug ?? "");
  const [slugEdited, setSlugEdited] = useState(Boolean(tour));
  const [short, setShort] = useState(tour?.shortDescription ?? "");
  const [description, setDescription] = useState(tour?.description ?? "");
  const [priceNow, setPriceNow] = useState(tour?.priceCurrent?.toString() ?? "");
  const [priceWas, setPriceWas] = useState(tour?.priceOriginal?.toString() ?? "");
  const [since, setSince] = useState(tour?.priceOriginalSince ?? "");
  const [currency, setCurrency] = useState(tour?.currency ?? "EUR");
  const [rating, setRating] = useState(tour?.ratingValue?.toString() ?? "");
  const [reviews, setReviews] = useState(tour?.ratingCount?.toString() ?? "");
  const [source, setSource] = useState<"own" | "partner">(tour?.ratingSource ?? "partner");
  const [images, setImages] = useState<TourImage[]>(tour?.images ?? []);
  const [category, setCategory] = useState(tour?.category ?? "");
  const [area, setArea] = useState(tour?.neighbourhood ?? "");
  const [city, setCity] = useState(tour?.city ?? "");
  const [duration, setDuration] = useState(tour?.duration ?? "");
  const [affiliateUrl, setAffiliateUrl] = useState(tour?.affiliateUrl ?? "");

  const touch = <T,>(set: (v: T) => void) => (v: T) => {
    set(v);
    setDirty(true);
  };

  const priceNowN = num(priceNow);
  const priceWasN = num(priceWas);
  const ratingN = num(rating);
  const off = discount(priceNowN, priceWasN);
  const titleLen = title.trim().length;
  const titleValid = titleLen >= TITLE_MIN && titleLen <= TITLE_MAX;
  const ratingValid = rating === "" || (ratingN !== null && ratingN >= 0 && ratingN <= 5);
  const priceValid = (priceNow === "" || (priceNowN !== null && priceNowN >= 0)) && (priceWas === "" || (priceWasN !== null && priceWasN >= 0));

  const payload = {
    title: title.trim(),
    slug,
    shortDescription: short,
    description,
    price: priceNowN === null ? null : { current: priceNowN, original: priceWasN, currency, originalSince: since },
    rating: ratingN === null ? null : { value: ratingN, count: Math.max(0, Math.round(num(reviews) ?? 0)), source },
    images: images.map((i, n) => ({ ...i, order: n })),
    category,
    neighbourhood: area,
    city,
    duration,
    affiliateUrl,
  };
  const checks = runCardGate({ ...payload, images: payload.images, price: payload.price });
  const gateOk = checks.every((c) => c.ok);
  const canSave = titleValid && ratingValid && priceValid && short.length <= SHORT_MAX && slug !== "";

  const withCurrent = (list: string[], cur: string) => (cur && !list.includes(cur) ? [cur, ...list] : list);

  const save = (after?: (savedId: string) => void) =>
    startTransition(async () => {
      const r = await saveCard(projectSlug, id, payload);
      if (!r.ok) return notify(r.issues?.length ? `${r.error} ${r.issues[0]}` : r.error, { tone: "error" });
      setId(r.data.id);
      setSaved(true);
      setDirty(false);
      notify("Draft saved");
      router.refresh();
      after?.(r.data.id);
    });

  const publish = () =>
    save((savedId) =>
      startTransition(async () => {
        const r = await publishCard(projectSlug, savedId);
        if (!r.ok) return notify(`${r.error} ${r.issues?.[0] ?? ""}`.trim(), { tone: "error" });
        notify(r.data.revalidateError ? "Published, but the public site could not be refreshed." : "Published", { tone: r.data.revalidateError ? "error" : "success" });
        router.refresh();
        onClose();
      }),
    );

  const review = () =>
    startTransition(async () => {
      if (!id) return;
      const r = await submitCard(projectSlug, id);
      if (!r.ok) return notify(r.error, { tone: "error" });
      notify("Submitted for review");
      router.refresh();
      onClose();
    });

  const trash = () =>
    startTransition(async () => {
      if (!id) return;
      const r = await trashCard(projectSlug, id);
      if (!r.ok) return notify(r.error, { tone: "error" });
      onClose();
      router.refresh();
      notify("Moved to trash", {
        durationMs: 10_000,
        actionLabel: "Undo",
        onAction: async () => {
          const u = await restoreCard(projectSlug, id);
          if (!u.ok) return notify(u.error, { tone: "error" });
          notify("Restored");
          router.refresh();
        },
      });
    });

  const moveImage = (i: number, d: -1 | 1) => {
    const t = i + d;
    if (t < 0 || t >= images.length) return;
    const next = [...images];
    [next[i], next[t]] = [next[t], next[i]];
    touch(setImages)(next);
  };

  return (
    <>
      <div className="space-y-4">
        <Field label="Title" htmlFor="card-title" hint={`${titleLen}/${TITLE_MAX} characters. Minimum ${TITLE_MIN}.`}>
          <Input
            id="card-title"
            value={title}
            aria-invalid={title !== "" && !titleValid}
            onChange={(e) => {
              touch(setTitle)(e.target.value);
              if (!slugEdited) setSlug(slugify(e.target.value));
            }}
            className={title !== "" && !titleValid ? "border-danger" : undefined}
          />
        </Field>
        <Field label="Slug" htmlFor="card-slug" hint="Lowercase letters, digits and hyphens. Must be unique in this project.">
          <Input
            id="card-slug"
            value={slug}
            className="font-mono text-xs"
            onChange={(e) => {
              setSlugEdited(true);
              touch(setSlug)(e.target.value);
            }}
          />
        </Field>

        <Field label="Short description" htmlFor="card-short" hint={`${short.length}/${SHORT_MAX} characters`}>
          <Textarea id="card-short" rows={3} value={short} onChange={(e) => touch(setShort)(e.target.value)} className={short.length > SHORT_MAX ? "border-danger" : undefined} />
        </Field>
        <Field label="Description" htmlFor="card-desc" hint="Basic HTML only (p, h2, h3, strong, em, ul, ol, li, a). Anything else is removed on save.">
          <Textarea id="card-desc" rows={5} value={description} onChange={(e) => touch(setDescription)(e.target.value)} />
        </Field>

        <div className="grid grid-cols-3 gap-3">
          <Field label="Price now" htmlFor="card-price">
            <Input id="card-price" inputMode="decimal" value={priceNow} onChange={(e) => touch(setPriceNow)(e.target.value)} />
          </Field>
          <Field label="Original price" htmlFor="card-was" hint="Genuine previous price only.">
            <Input id="card-was" inputMode="decimal" value={priceWas} onChange={(e) => touch(setPriceWas)(e.target.value)} />
          </Field>
          <Field label="Currency" htmlFor="card-cur">
            <Input id="card-cur" value={currency} maxLength={3} onChange={(e) => touch(setCurrency)(e.target.value.toUpperCase())} />
          </Field>
        </div>
        {priceWasN !== null && priceNowN !== null && priceWasN > priceNowN && (
          <Field label="Original price since" htmlFor="card-since" hint="Required for the strike-through price (EU price-reduction rules). Format 2026-01-31.">
            <Input id="card-since" value={since} placeholder="YYYY-MM-DD" onChange={(e) => touch(setSince)(e.target.value)} />
          </Field>
        )}
        {off !== null && <p className="-mt-2 text-[13px] font-medium text-primary">-{off}% shown as was / now (calculated)</p>}

        <div className="grid grid-cols-3 gap-3">
          <Field label="Rating (0 to 5)" htmlFor="card-rating">
            <Input id="card-rating" inputMode="decimal" value={rating} onChange={(e) => touch(setRating)(e.target.value)} className={!ratingValid ? "border-danger" : undefined} />
          </Field>
          <Field label="Reviews" htmlFor="card-reviews">
            <Input id="card-reviews" inputMode="numeric" value={reviews} onChange={(e) => touch(setReviews)(e.target.value)} />
          </Field>
          <Field label="Rating source" htmlFor="card-source">
            <Select id="card-source" value={source} onChange={(e) => touch(setSource)(e.target.value as "own" | "partner")}>
              <option value="partner">Partner</option>
              <option value="own">Own</option>
            </Select>
          </Field>
        </div>
        {source === "partner" && rating !== "" && <p className="-mt-2 text-xs text-ink-muted">Partner ratings are shown with their source and never as the site&apos;s own review markup.</p>}

        <div className="grid grid-cols-2 gap-3">
          <Field label="Category" htmlFor="card-category">
            <Select id="card-category" value={category} onChange={(e) => touch(setCategory)(e.target.value)}>
              <option value="">Select...</option>
              {withCurrent(taxonomies.categories, category).map((c) => (
                <option key={c}>{c}</option>
              ))}
            </Select>
          </Field>
          <Field label="Neighbourhood" htmlFor="card-area">
            <Select id="card-area" value={area} onChange={(e) => touch(setArea)(e.target.value)}>
              <option value="">Select...</option>
              {withCurrent(taxonomies.neighbourhoods, area).map((a) => (
                <option key={a}>{a}</option>
              ))}
            </Select>
          </Field>
          <Field label="City" htmlFor="card-city">
            <Select id="card-city" value={city} onChange={(e) => touch(setCity)(e.target.value)}>
              <option value="">Select...</option>
              {withCurrent(taxonomies.cities, city).map((c) => (
                <option key={c}>{c}</option>
              ))}
            </Select>
          </Field>
          <Field label="Duration" htmlFor="card-duration">
            <Input id="card-duration" value={duration} placeholder="3 hours" onChange={(e) => touch(setDuration)(e.target.value)} />
          </Field>
        </div>
        {taxonomies.categories.length === 0 && <p className="-mt-2 text-xs text-ink-muted">Add categories, neighbourhoods and cities under Taxonomies first.</p>}

        <Field label="Affiliate link" htmlFor="card-aff" hint="https only. The public site opens it through the tracked /go/ redirect.">
          <Input id="card-aff" type="url" value={affiliateUrl} onChange={(e) => touch(setAffiliateUrl)(e.target.value)} />
        </Field>

        <fieldset className="space-y-3 rounded-control border border-line p-3">
          <legend className="px-1 text-[13px] font-semibold">Images ({images.length}). The first image is the cover.</legend>
          {images.map((im, i) => (
            <div key={im.url} className="flex items-start gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={im.url} alt="" className="h-16 w-16 shrink-0 rounded-control border border-line object-cover" />
              <div className="min-w-0 flex-1">
                <Field label={`Alt text for image ${i + 1}${i === 0 ? " (cover)" : ""}`} htmlFor={`alt-${i}`}>
                  <Input
                    id={`alt-${i}`}
                    value={im.alt}
                    aria-invalid={im.alt.trim() === ""}
                    className={im.alt.trim() === "" ? "border-danger" : undefined}
                    onChange={(e) => touch(setImages)(images.map((x, n) => (n === i ? { ...x, alt: e.target.value } : x)))}
                  />
                </Field>
              </div>
              <div className="flex shrink-0 flex-col gap-1 pt-6">
                <button type="button" aria-label={`Move image ${i + 1} up`} disabled={i === 0} onClick={() => moveImage(i, -1)} className="rounded p-1 text-ink-muted hover:bg-canvas disabled:opacity-30">
                  <Icon name="up" size={16} />
                </button>
                <button type="button" aria-label={`Move image ${i + 1} down`} disabled={i === images.length - 1} onClick={() => moveImage(i, 1)} className="rounded p-1 text-ink-muted hover:bg-canvas disabled:opacity-30">
                  <Icon name="down" size={16} />
                </button>
                <button type="button" aria-label={`Remove image ${i + 1}`} onClick={() => touch(setImages)(images.filter((_, n) => n !== i))} className="rounded p-1 text-danger hover:bg-danger-soft">
                  <Icon name="close" size={16} />
                </button>
              </div>
            </div>
          ))}
          <ImageUploader project={projectSlug} label="Upload image" onUploaded={(url) => touch(setImages)([...images, { url, alt: "", order: images.length }])} />
        </fieldset>

        <div className="rounded-control border border-line bg-canvas p-3">
          <p className="mb-2 text-[13px] font-semibold">Publish checks</p>
          <ul className="space-y-1.5">
            {checks.map((c) => (
              <li key={c.id} className="flex items-start gap-2 text-[13px]">
                <Icon name={c.ok ? "check" : "alert"} size={16} className={clsx("mt-0.5 shrink-0", c.ok ? "text-primary" : "text-warning")} />
                <span>
                  {c.label}
                  <span className="sr-only">{c.ok ? " passed" : " failed"}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="sticky bottom-0 -mx-4 -mb-4 mt-6 flex flex-wrap justify-between gap-2 border-t border-line bg-surface p-4">
        <div>
          {id && (
            <Button variant="danger" disabled={pending} onClick={trash}>
              Move to trash
            </Button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          <Button disabled={pending || !canSave || !dirty} onClick={() => save()}>
            Save draft
          </Button>
          {canPublish ? (
            <Button variant="primary" disabled={pending || !canSave || !gateOk} onClick={publish} title={gateOk ? undefined : "Fix the publish checks first"}>
              Publish
            </Button>
          ) : (
            <Button variant="primary" disabled={pending || !saved || dirty} onClick={review} title={dirty ? "Save the draft first" : undefined}>
              Submit for review
            </Button>
          )}
        </div>
      </div>
    </>
  );
}

type DrawerMode = { kind: "edit"; tour: Tour } | { kind: "new" } | null;

export function ToursManager({ projectSlug, projectName, tours, taxonomies, canPublish }: { projectSlug: string; projectName: string; tours: Tour[]; taxonomies: Taxonomies; canPublish: boolean }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [statusFilter, setStatusFilter] = useState<"active" | ContentStatus>("active");
  const [drawer, setDrawer] = useState<DrawerMode>(null);

  const categories = useMemo(() => Array.from(new Set([...taxonomies.categories, ...tours.map((t) => t.category).filter(Boolean)])).sort(), [taxonomies, tours]);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tours.filter(
      (t) =>
        (statusFilter === "active" ? t.status !== "trashed" : t.status === statusFilter) &&
        (category === "all" || t.category === category) &&
        (!q || t.title.toLowerCase().includes(q)),
    );
  }, [tours, query, category, statusFilter]);

  const active = tours.filter((t) => t.status !== "trashed").length;
  const drawerKey = drawer ? (drawer.kind === "edit" ? `${drawer.tour.id}-${drawer.tour.version}-${drawer.tour.updatedAt}` : "new") : "closed";

  return (
    <>
      <PageHeader
        title={`Tours (${active})`}
        breadcrumbs={[{ label: projectName }, { label: "Listings" }, { label: "Tours" }]}
        description="Click a row to edit it in the side drawer. New cards are always created as Draft."
        actions={
          <Button variant="primary" size="sm" onClick={() => setDrawer({ kind: "new" })}>
            <Icon name="plus" size={16} /> Add card
          </Button>
        }
      />

      <div className="mb-3 flex flex-wrap gap-2">
        <div className="relative min-w-[200px] flex-1 sm:max-w-xs">
          <Icon name="search" size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" />
          <Input aria-label="Search tours" placeholder="Search tours" value={query} onChange={(e) => setQuery(e.target.value)} className="pl-9" />
        </div>
        <Select aria-label="Filter by category" value={category} onChange={(e) => setCategory(e.target.value)} className="w-auto">
          <option value="all">All categories</option>
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </Select>
        <Select aria-label="Filter by status" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)} className="w-auto">
          <option value="active">All except trashed</option>
          <option value="draft">Draft</option>
          <option value="in_review">In review</option>
          <option value="published">Published</option>
          <option value="trashed">Trashed</option>
        </Select>
      </div>

      {tours.length === 0 ? (
        <EmptyState
          title="No tour cards yet"
          description="Add a card by hand, or import a content JSON file from the Import screen."
          action={
            <Button variant="primary" onClick={() => setDrawer({ kind: "new" })}>
              <Icon name="plus" size={16} /> Add card
            </Button>
          }
        />
      ) : rows.length === 0 ? (
        <EmptyState title="No tours match" description="Try a different search or clear the filters." />
      ) : (
        <Table>
          <thead>
            <tr>
              <Th>Card</Th>
              <Th>Category</Th>
              <Th>Price</Th>
              <Th>Rating</Th>
              <Th>Status</Th>
            </tr>
          </thead>
          <tbody>
            {rows.map((t) => (
              <tr key={t.id} className="group cursor-pointer hover:bg-canvas" onClick={() => setDrawer({ kind: "edit", tour: t })}>
                <Td>
                  <button
                    type="button"
                    className="text-left font-medium text-ink group-hover:text-primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDrawer({ kind: "edit", tour: t });
                    }}
                  >
                    {t.title}
                  </button>
                  <p className="font-mono text-xs text-ink-muted">/tours/{t.slug}</p>
                </Td>
                <Td className="text-ink-muted">{t.category || "-"}</Td>
                <Td>
                  {t.priceOriginal !== null && t.priceCurrent !== null && t.priceOriginal > t.priceCurrent && <span className="mr-1.5 text-xs text-ink-muted line-through">{money(t.priceOriginal, t.currency)}</span>}
                  <span className={clsx(t.priceCurrent === null && "text-ink-muted")}>{money(t.priceCurrent, t.currency)}</span>
                </Td>
                <Td className="text-ink-muted">{t.ratingValue === null ? "-" : `${t.ratingValue} (${t.ratingCount ?? 0}, ${t.ratingSource})`}</Td>
                <Td>
                  <StatusBadge status={t.status} />
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Drawer open={drawer !== null} title={drawer?.kind === "edit" ? "Edit card" : "New card"} onClose={() => setDrawer(null)}>
        {drawer && (
          <CardForm key={drawerKey} projectSlug={projectSlug} tour={drawer.kind === "edit" ? drawer.tour : undefined} taxonomies={taxonomies} canPublish={canPublish} onClose={() => setDrawer(null)} />
        )}
      </Drawer>
    </>
  );
}
