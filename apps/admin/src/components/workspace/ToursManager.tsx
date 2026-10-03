"use client";

import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import { publishCard, restoreCard, saveCard, submitCard, trashCard } from "@/app/actions/tours";
import { StatusBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { DiscardDialog } from "@/components/ui/DiscardDialog";
import { EmptyState } from "@/components/ui/EmptyState";
import { Field, Input, Select, Textarea } from "@/components/ui/Field";
import { Icon } from "@/components/ui/Icon";
import { ImageUploader } from "@/components/ui/ImageUploader";
import { Modal } from "@/components/ui/Modal";
import { PageHeader } from "@/components/ui/PageHeader";
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

/** How many category and area pages list this tour. Real data: a tour with no category or area is on none. */
const listedOn = (t: Pick<Tour, "category" | "neighbourhood" | "city">) => [t.category, t.neighbourhood, t.city].filter(Boolean).length;

/** Moves a tour to the Trash after a confirmation, then offers Undo for ten seconds. */
function TrashDialog({ open, projectSlug, tour, onClose, onDone }: { open: boolean; projectSlug: string; tour: Pick<Tour, "id" | "title" | "slug" | "status" | "category" | "neighbourhood" | "city">; onClose: () => void; onDone: () => void }) {
  const router = useRouter();
  const { notify } = useToast();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const n = listedOn(tour);
  const statusText = tour.status === "published" ? "Published" : tour.status === "in_review" ? "In review" : "Draft";

  const confirm = () =>
    startTransition(async () => {
      setError(null);
      const r = await trashCard(projectSlug, tour.id);
      if (!r.ok) return setError(r.error);
      onClose();
      onDone();
      router.refresh();
      notify("Moved to Trash.", {
        durationMs: 10_000,
        actionLabel: "Undo",
        onAction: async () => {
          const u = await restoreCard(projectSlug, tour.id);
          if (!u.ok) return notify(u.error, { tone: "error" });
          notify("Restored.");
          router.refresh();
        },
      });
    });

  return (
    <ConfirmDialog open={open} title="Move to Trash?" confirmLabel="Move to Trash" tone="danger" busy={pending} error={error} onConfirm={confirm} onCancel={() => !pending && onClose()}>
      <p>
        <strong>{tour.title || "Untitled tour"}</strong>
      </p>
      <p className="text-[13px] text-ink-muted">
        Tour &middot; {statusText} &middot; /tours/{tour.slug}
      </p>
      <p>It disappears from the live site after you confirm. You can restore it from Trash for 30 days.</p>
      {n > 0 && <p>It is linked from {n} category and area {n === 1 ? "page" : "pages"}. Those links will be removed automatically.</p>}
    </ConfirmDialog>
  );
}

interface FormProps {
  projectSlug: string;
  tour?: Tour;
  taxonomies: Taxonomies;
  canPublish: boolean;
  onClose: () => void;
}

/** The tour editor in a pop-up: text and numbers on the left, images and checks on the right. */
function CardModal({ projectSlug, tour, taxonomies, canPublish, onClose }: FormProps) {
  const router = useRouter();
  const { notify } = useToast();
  const [pending, startTransition] = useTransition();
  const [id, setId] = useState<string | null>(tour?.id ?? null);
  const [saved, setSaved] = useState(Boolean(tour));
  const [dirty, setDirty] = useState(false);
  const [asking, setAsking] = useState(false);
  const [trashing, setTrashing] = useState(false);
  const [blocked, setBlocked] = useState<string[] | null>(null);
  const [error, setError] = useState<string[] | null>(null);

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
    setBlocked(null);
  };

  const priceNowN = num(priceNow);
  const priceWasN = num(priceWas);
  const ratingN = num(rating);
  const off = discount(priceNowN, priceWasN);
  const titleLen = title.trim().length;
  const titleValid = titleLen >= TITLE_MIN && titleLen <= TITLE_MAX;
  const ratingValid = rating === "" || (ratingN !== null && ratingN >= 0 && ratingN <= 5);
  const priceValid = (priceNow === "" || (priceNowN !== null && priceNowN >= 0)) && (priceWas === "" || (priceWasN !== null && priceWasN >= 0));
  const wasTooLow = priceWasN !== null && priceNowN !== null && priceWasN <= priceNowN;
  const noAlt = images.filter((i) => i.alt.trim() === "").length;

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
  const failing = checks.filter((c) => !c.ok);
  const canSave = titleValid && ratingValid && priceValid && short.length <= SHORT_MAX && slug !== "";

  const withCurrent = (list: string[], cur: string) => (cur && !list.includes(cur) ? [cur, ...list] : list);

  const save = (after?: (savedId: string) => void) =>
    startTransition(async () => {
      setError(null);
      const r = await saveCard(projectSlug, id, payload);
      if (!r.ok) {
        setError([r.error, ...(r.issues ?? [])]);
        return notify("Could not save. Check the highlighted fields and try again.", { tone: "error" });
      }
      setId(r.data.id);
      setSaved(true);
      setDirty(false);
      if (!after) {
        notify("Draft saved.");
        router.refresh();
        return onClose();
      }
      after(r.data.id);
    });

  const publish = () => {
    // The checks are shown beside the fields; pressing Publish with a failing one says why and does nothing else.
    if (failing.length > 0) {
      setBlocked(failing.map((c) => (c.id === "alt" ? "Add alt text to every image." : c.label)));
      return notify("Publish blocked. See the reasons next to the checks.", { tone: "error" });
    }
    save((savedId) =>
      startTransition(async () => {
        const r = await publishCard(projectSlug, savedId);
        if (!r.ok) {
          setBlocked([r.error, ...(r.issues ?? [])]);
          return notify("Saved as a draft, but it cannot be published yet.", { tone: "error" });
        }
        notify(r.data.revalidateError ? "Published. The public site could not be refreshed yet. Your change is saved and will appear within the hour." : "Published.", { tone: r.data.revalidateError ? "error" : "success" });
        router.refresh();
        onClose();
      }),
    );
  };

  const review = () =>
    startTransition(async () => {
      if (!id) return;
      const r = await submitCard(projectSlug, id);
      if (!r.ok) return notify(r.error, { tone: "error" });
      notify("Submitted for review.");
      router.refresh();
      onClose();
    });

  const moveImage = (i: number, d: -1 | 1) => {
    const t = i + d;
    if (t < 0 || t >= images.length) return;
    const next = [...images];
    [next[i], next[t]] = [next[t], next[i]];
    touch(setImages)(next);
  };

  const requestClose = () => (dirty ? setAsking(true) : onClose());
  const count = (n: number, max: number) => <span className={clsx("text-xs", n > max ? "font-medium text-danger" : "text-ink-muted")}>{n} of {max}</span>;

  return (
    <>
      <Modal
        open
        title={tour ? "Edit tour" : "New tour"}
        subtitle={tour ? `Tours / ${tour.title}` : "Tours"}
        size="xl"
        busy={pending}
        onClose={requestClose}
        badges={dirty ? <Chip tone="amber">Unsaved changes</Chip> : undefined}
        footer={
          <>
            <div className="mr-auto">
              {id && (
                <Button variant="danger" disabled={pending} onClick={() => setTrashing(true)}>
                  Move to Trash
                </Button>
              )}
            </div>
            <Button onClick={requestClose} disabled={pending}>
              Cancel
            </Button>
            <Button disabled={pending || !canSave || !dirty} onClick={() => save()}>
              {pending ? "Saving..." : "Save draft"}
            </Button>
            {canPublish ? (
              <Button variant="primary" disabled={pending || !canSave} onClick={publish}>
                Publish
              </Button>
            ) : (
              <Button variant="primary" disabled={pending || !saved || dirty} onClick={review} title={dirty ? "Save the draft first" : undefined}>
                Submit for review
              </Button>
            )}
          </>
        }
      >
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="min-w-0 space-y-4">
            <Field label="Title" htmlFor="card-title">
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
              <div className="flex justify-between">
                <span className="text-xs text-ink-muted">At least {TITLE_MIN} characters.</span>
                {count(titleLen, TITLE_MAX)}
              </div>
              {title !== "" && !titleValid && <p role="alert" className="text-xs text-danger">The title needs {TITLE_MIN} to {TITLE_MAX} characters.</p>}
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
            <Field label="Short description (shown on cards and in search)" htmlFor="card-short">
              <Textarea id="card-short" rows={3} value={short} onChange={(e) => touch(setShort)(e.target.value)} className={short.length > SHORT_MAX ? "border-danger" : undefined} />
              <div className="flex justify-end">{count(short.length, SHORT_MAX)}</div>
            </Field>
            <Field label="Long description" htmlFor="card-desc" hint="Basic HTML only (p, h2, h3, strong, em, ul, ol, li, a). Anything else is removed on save.">
              <Textarea id="card-desc" rows={6} value={description} onChange={(e) => touch(setDescription)(e.target.value)} />
            </Field>

            <div className="grid grid-cols-3 gap-3">
              <Field label="Price now" htmlFor="card-price">
                <Input id="card-price" inputMode="decimal" value={priceNow} onChange={(e) => touch(setPriceNow)(e.target.value)} />
              </Field>
              <Field label="Was (optional)" htmlFor="card-was">
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
            {off !== null && <p className="-mt-2 text-[13px] font-medium text-primary">-{off}% (calculated, never typed)</p>}
            {wasTooLow && <p role="alert" className="-mt-2 text-xs text-danger">&ldquo;Was&rdquo; must be higher than the current price.</p>}

            <div className="grid grid-cols-3 gap-3">
              <Field label="Rating (0 to 5)" htmlFor="card-rating">
                <Input id="card-rating" inputMode="decimal" value={rating} onChange={(e) => touch(setRating)(e.target.value)} className={!ratingValid ? "border-danger" : undefined} />
              </Field>
              <Field label="Reviews" htmlFor="card-reviews">
                <Input id="card-reviews" inputMode="numeric" value={reviews} onChange={(e) => touch(setReviews)(e.target.value)} />
              </Field>
              <Field label="Source" htmlFor="card-source">
                <Select id="card-source" value={source} onChange={(e) => touch(setSource)(e.target.value as "own" | "partner")}>
                  <option value="partner">Partner</option>
                  <option value="own">Own</option>
                </Select>
              </Field>
            </div>
            {!ratingValid && <p role="alert" className="-mt-2 text-xs text-danger">Use a rating from 0 to 5.</p>}
            {source === "partner" && rating !== "" && <p className="-mt-2 text-xs text-ink-muted">Partner ratings are shown with their source but are not used as structured data.</p>}

            <div className="grid grid-cols-2 gap-3">
              <Field label="Category" htmlFor="card-category">
                <Select id="card-category" value={category} onChange={(e) => touch(setCategory)(e.target.value)}>
                  <option value="">Select...</option>
                  {withCurrent(taxonomies.categories, category).map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </Select>
              </Field>
              <Field label="Area" htmlFor="card-area">
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
            {taxonomies.categories.length === 0 && <p className="-mt-2 text-xs text-ink-muted">Add categories, areas and cities under Neighbourhoods first.</p>}

            <Field label="Booking link (tracked, opens in a new tab)" htmlFor="card-aff" hint="https only. The public site opens it through the tracked /go/ redirect.">
              <Input id="card-aff" type="url" value={affiliateUrl} placeholder="https://" onChange={(e) => touch(setAffiliateUrl)(e.target.value)} />
            </Field>
          </div>

          <div className="min-w-0 space-y-6">
            <div>
              <h3 className="mb-1 text-sm font-semibold text-ink">Images</h3>
              <p className="mb-3 text-xs text-ink-muted">The first image is the cover. Use the arrows to reorder. 4:3, at least 1200 x 900. Alt text is required on every image.</p>
              <ul className="space-y-3">
                {images.map((im, i) => (
                  <li key={im.url} className="flex items-start gap-3 rounded-control border border-line p-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={im.url} alt="" className="h-16 w-20 shrink-0 rounded-control border border-line object-cover" />
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        {i === 0 && <Chip tone="green">Cover</Chip>}
                        <Chip tone={im.alt.trim() ? "green" : "red"}>{im.alt.trim() ? "alt: ok" : "alt: missing"}</Chip>
                      </div>
                      <label htmlFor={`alt-${i}`} className="sr-only">
                        Alt text for image {i + 1}
                      </label>
                      <Input id={`alt-${i}`} value={im.alt} placeholder="Describe the image" aria-invalid={im.alt.trim() === ""} className={im.alt.trim() === "" ? "border-danger" : undefined} onChange={(e) => touch(setImages)(images.map((x, n) => (n === i ? { ...x, alt: e.target.value } : x)))} />
                    </div>
                    <div className="flex shrink-0 flex-col">
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
                  </li>
                ))}
              </ul>
              {images.length === 0 && <p className="mb-3 rounded-control border border-dashed border-line px-3 py-4 text-center text-[13px] text-ink-muted">No images yet. A tour needs at least one.</p>}
              <div className="mt-3">
                <ImageUploader project={projectSlug} label="+ Upload image" onUploaded={(url) => touch(setImages)([...images, { url, alt: "", order: images.length }])} />
              </div>
              {noAlt > 0 && <p className="mt-2 text-xs text-danger">{noAlt} {noAlt === 1 ? "image has" : "images have"} no alt text.</p>}
            </div>

            <div>
              <div className="mb-2 flex items-center gap-2">
                <h3 className="text-sm font-semibold text-ink">Status and checks</h3>
                {tour ? <StatusBadge status={tour.status} /> : <Chip>Draft</Chip>}
              </div>
              <ul className="space-y-1.5 rounded-control border border-line bg-canvas p-3">
                {checks.map((c) => (
                  <li key={c.id} className="flex items-start gap-2 text-[13px]">
                    <Icon name={c.ok ? "check" : "alert"} size={16} className={clsx("mt-0.5 shrink-0", c.ok ? "text-primary" : "text-danger")} />
                    <span>
                      {c.id === "alt" && !c.ok ? "Add alt text to every image." : c.label}
                      {!c.ok && c.detail && <span className="block text-xs text-ink-muted">{c.detail}</span>}
                      <span className="sr-only">{c.ok ? " passed" : " failed"}</span>
                    </span>
                  </li>
                ))}
              </ul>
              {(blocked || error) && (
                <div role="alert" className="mt-3 rounded-control bg-danger-soft px-3 py-2 text-[13px] text-danger">
                  <p className="font-medium">{blocked ? "Publish blocked:" : "Could not save. Check the highlighted fields and try again."}</p>
                  <ul className="mt-1 list-disc space-y-0.5 pl-4">
                    {(blocked ?? error ?? []).slice(0, 6).map((m) => (
                      <li key={m}>{m}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </Modal>
      <DiscardDialog open={asking} what="tour" onKeep={() => setAsking(false)} onDiscard={() => (setAsking(false), onClose())} />
      {tour && id && (
        <TrashDialog open={trashing} projectSlug={projectSlug} tour={{ id, title: title.trim(), slug, status: tour.status, category, neighbourhood: area, city }} onClose={() => setTrashing(false)} onDone={onClose} />
      )}
    </>
  );
}

type ModalMode = { kind: "edit"; tour: Tour } | { kind: "new" } | null;

interface ManagerProps {
  projectSlug: string;
  projectName: string;
  tours: Tour[];
  taxonomies: Taxonomies;
  canPublish: boolean;
  /** Inside the project editor, which already has its own header. */
  embedded?: boolean;
  initialCategory?: string;
  initialArea?: string;
  /** Start on this status ("trashed" for the Trash) and use this heading. */
  initialStatus?: "active" | ContentStatus;
  heading?: string;
}

export function ToursManager({ projectSlug, projectName, tours, taxonomies, canPublish, embedded, initialCategory = "all", initialArea = "all", initialStatus = "active", heading }: ManagerProps) {
  const router = useRouter();
  const { notify } = useToast();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [area, setArea] = useState(initialArea);
  const [statusFilter, setStatusFilter] = useState<"active" | ContentStatus>(initialStatus);
  const [modal, setModal] = useState<ModalMode>(null);
  const [trashTarget, setTrashTarget] = useState<Tour | null>(null);

  const categories = useMemo(() => Array.from(new Set([...taxonomies.categories, ...tours.map((t) => t.category).filter(Boolean)])).sort(), [taxonomies, tours]);
  const areas = useMemo(() => Array.from(new Set([...taxonomies.neighbourhoods, ...tours.map((t) => t.neighbourhood).filter(Boolean)])).sort(), [taxonomies, tours]);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tours.filter((t) => (statusFilter === "active" ? t.status !== "trashed" : t.status === statusFilter) && (category === "all" || t.category === category) && (area === "all" || t.neighbourhood === area) && (!q || t.title.toLowerCase().includes(q)));
  }, [tours, query, category, area, statusFilter]);

  const active = tours.filter((t) => t.status !== "trashed").length;
  const modalKey = modal ? (modal.kind === "edit" ? `${modal.tour.id}-${modal.tour.version}-${modal.tour.updatedAt}` : "new") : "closed";

  const restore = async (t: Tour) => {
    const r = await restoreCard(projectSlug, t.id);
    if (!r.ok) return notify(r.error, { tone: "error" });
    notify("Restored.");
    router.refresh();
  };

  const addButton = (
    <Button variant="primary" size={embedded ? "sm" : "md"} onClick={() => setModal({ kind: "new" })}>
      <Icon name="plus" size={16} /> Add tour
    </Button>
  );

  return (
    <>
      {embedded ? (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-[20px] font-semibold tracking-tight text-ink">{heading ?? `Tours (${active})`}</h2>
          {initialStatus === "trashed" ? null : addButton}
        </div>
      ) : (
        <PageHeader title={`Tours (${active})`} breadcrumbs={[{ label: projectName, href: `/projects/${projectSlug}` }, { label: "Tours" }]} description="Each tour is a row. Edit opens it in a pop-up. New tours are always created as a draft." actions={addButton} />
      )}

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
        <Select aria-label="Filter by area" value={area} onChange={(e) => setArea(e.target.value)} className="w-auto">
          <option value="all">All areas</option>
          {areas.map((a) => (
            <option key={a}>{a}</option>
          ))}
        </Select>
        <Select aria-label="Filter by status" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)} className="w-auto">
          <option value="active">All except Trash</option>
          <option value="draft">Draft</option>
          <option value="in_review">In review</option>
          <option value="published">Published</option>
          <option value="trashed">Trash</option>
        </Select>
      </div>

      {tours.length === 0 ? (
        <EmptyState title="No tours yet." description="Add your first tour." action={addButton} />
      ) : rows.length === 0 ? (
        <EmptyState title="No tours match" description="Try a different search or clear the filters." />
      ) : (
        <div className="overflow-x-auto rounded-card border border-line bg-surface shadow-card">
          <table className="w-full min-w-[820px] border-collapse text-left text-sm">
            <thead className="border-b border-line bg-canvas/60">
              <tr className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
                <th scope="col" className="px-4 py-2.5">Tour</th>
                <th scope="col" className="px-2 py-2.5">Category</th>
                <th scope="col" className="px-2 py-2.5">Area</th>
                <th scope="col" className="px-2 py-2.5">Price</th>
                <th scope="col" className="px-2 py-2.5">Rating</th>
                <th scope="col" className="px-2 py-2.5">Status</th>
                <th scope="col" className="px-4 py-2.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((t) => (
                <tr key={t.id} className="h-[60px] border-b border-line last:border-0 hover:bg-canvas/40">
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-3">
                      {t.images[0] ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={t.images[0].url} alt="" className="h-10 w-12 shrink-0 rounded-control border border-line object-cover" />
                      ) : (
                        <span className="flex h-10 w-12 shrink-0 items-center justify-center rounded-control border border-dashed border-line text-ink-muted/60">
                          <Icon name="file" size={16} />
                        </span>
                      )}
                      <div className="min-w-0">
                        <p className="truncate font-medium text-ink">{t.title}</p>
                        <p className="truncate font-mono text-xs text-ink-muted">/tours/{t.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-2 py-2 text-ink-muted">{t.category || "-"}</td>
                  <td className="px-2 py-2 text-ink-muted">{t.neighbourhood || "-"}</td>
                  <td className="px-2 py-2">
                    {t.priceOriginal !== null && t.priceCurrent !== null && t.priceOriginal > t.priceCurrent && <span className="mr-1.5 text-xs text-ink-muted line-through">{money(t.priceOriginal, t.currency)}</span>}
                    <span className={clsx(t.priceCurrent === null && "text-ink-muted")}>{money(t.priceCurrent, t.currency)}</span>
                  </td>
                  <td className="px-2 py-2 text-ink-muted">{t.ratingValue === null ? "-" : `${t.ratingValue} (${t.ratingCount ?? 0})`}</td>
                  <td className="px-2 py-2">
                    <StatusBadge status={t.status} />
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex items-center justify-end gap-1">
                      {t.status === "trashed" ? (
                        <Button size="sm" onClick={() => restore(t)}>
                          Restore
                        </Button>
                      ) : (
                        <>
                          <Button size="sm" onClick={() => setModal({ kind: "edit", tour: t })} aria-label={`Edit ${t.title}`}>
                            Edit
                          </Button>
                          <Button size="sm" onClick={() => setTrashTarget(t)} aria-label={`Move ${t.title} to Trash`}>
                            Move to Trash
                          </Button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modal && <CardModal key={modalKey} projectSlug={projectSlug} tour={modal.kind === "edit" ? modal.tour : undefined} taxonomies={taxonomies} canPublish={canPublish} onClose={() => setModal(null)} />}
      {trashTarget && <TrashDialog open projectSlug={projectSlug} tour={trashTarget} onClose={() => setTrashTarget(null)} onDone={() => setTrashTarget(null)} />}
    </>
  );
}
