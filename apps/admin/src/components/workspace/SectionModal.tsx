"use client";

import clsx from "clsx";
import { useEffect, useMemo, useState, useTransition } from "react";
import { publishPage, saveDraft } from "@/app/actions/content";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { DiscardDialog } from "@/components/ui/DiscardDialog";
import { Field, Input, Textarea } from "@/components/ui/Field";
import { Icon } from "@/components/ui/Icon";
import { Modal } from "@/components/ui/Modal";
import { UploadContext } from "@/components/ui/ImageUploader";
import { useToast } from "@/components/ui/Toast";
import { metaFor } from "@/lib/content/pages";
import { pagePath } from "@/lib/content/outline";
import { runPageGate } from "@/lib/publish/gate";
import type { PageDraft } from "@/lib/types";
import { hasHomeForm, HomeSectionForm, type TourOption } from "./HomeForms";
import { humanize, JsonField } from "./JsonField";

/** The pseudo-section that holds a page's title, SEO title and description (pages other than Home). */
export const META_SECTION = "__meta";

export interface EditTarget {
  id: string;
  label: string;
  keys: string[];
}

interface Props {
  open: boolean;
  onClose: () => void;
  projectSlug: string;
  /** Shown in the search preview address. */
  domain: string;
  pageSlug: string;
  pageTitle: string;
  target: EditTarget;
  /** The saved draft this edit starts from. */
  draft: PageDraft;
  canEdit: boolean;
  canPublish: boolean;
  /** Tours of the project, for the pickers of the Home page. */
  tours?: TourOption[];
  gateCtx: { tourSlugs: string[]; otherMetaTitles: string[] };
  /** Called after a successful save with the new saved draft (and whether it went live). */
  onSaved: (draft: PageDraft, published: boolean) => void;
}

const count = (s: string, max: number) => (
  <span className={clsx("text-xs", s.trim().length > max ? "font-medium text-danger" : "text-ink-muted")}>
    {s.trim().length} of {max}
  </span>
);

function SearchPreview({ title, url, description }: { title: string; url: string; description: string }) {
  return (
    <div className="rounded-control border border-line bg-surface p-3">
      <p className="truncate text-[13px] text-ink-muted">{url}</p>
      <p className="mt-0.5 line-clamp-2 text-[17px] leading-snug text-info">{title.trim() || "No SEO title yet"}</p>
      <p className="mt-1 line-clamp-3 text-[13px] text-ink-muted">{description.trim() || "No description yet. Search engines will pick text from the page."}</p>
    </div>
  );
}

/** One section of a page in a pop-up: its fields, a search preview, the publish checks, and Save draft / Publish now. */
export function SectionModal({ open, onClose, projectSlug, domain, pageSlug, pageTitle, target, draft, canEdit, canPublish, tours = [], gateCtx, onSaved }: Props) {
  const { notify } = useToast();
  const [pending, startTransition] = useTransition();
  const isMeta = target.id === META_SECTION;
  const isHome = pageSlug === "home";

  // The edit lives here until it is saved; `draft` stays the stored copy.
  const [data, setData] = useState<Record<string, unknown>>({});
  const [meta, setMeta] = useState(draft.meta);
  const [error, setError] = useState<{ text: string; issues?: string[] } | null>(null);
  const [asking, setAsking] = useState(false);

  useEffect(() => {
    if (!open) return;
    setData(Object.fromEntries(target.keys.map((k) => [k, draft.data[k] ?? ""])));
    setMeta(draft.meta);
    setError(null);
    setAsking(false);
    // Only when the pop-up opens on a section; later changes to `draft` must not wipe what is being typed.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, target.id]);

  const dirty = useMemo(() => (isMeta ? JSON.stringify(meta) !== JSON.stringify(draft.meta) : target.keys.some((k) => JSON.stringify(data[k]) !== JSON.stringify(draft.data[k] ?? ""))), [isMeta, meta, data, draft, target.keys]);

  const merged: PageDraft = useMemo(() => (isMeta ? { ...draft, meta } : { ...draft, data: { ...draft.data, ...data } }), [isMeta, draft, meta, data]);

  // The publish checks for the page as it would be after this edit. They run here, so they are instant and
  // typing never waits for the server. The server runs the same checks again when you publish.
  const checks = useMemo(() => runPageGate(pageSlug, merged, { tourSlugs: new Set(gateCtx.tourSlugs), otherMetaTitles: gateCtx.otherMetaTitles }), [pageSlug, merged, gateCtx]);

  const seo = metaFor(pageSlug, merged);
  const url = `${domain || "No address set"}${pagePath(pageSlug) === "/" ? "" : ` › ${pagePath(pageSlug).slice(1)}`}`;
  const failing = checks.filter((c) => !c.ok);

  const requestClose = () => (dirty ? setAsking(true) : onClose());

  const run = (publish: boolean) =>
    startTransition(async () => {
      setError(null);
      const s = await saveDraft(projectSlug, pageSlug, merged);
      if (!s.ok) {
        setError({ text: "Could not save. Check the highlighted fields and try again.", issues: [s.error, ...(s.issues ?? [])] });
        return notify("Could not save.", { tone: "error" });
      }
      if (!publish) {
        notify("Draft saved.");
        onSaved(merged, false);
        return onClose();
      }
      const p = await publishPage(projectSlug, pageSlug);
      if (!p.ok) {
        // Saved, but the gate stopped the publish: stay open and say why.
        setError({ text: "Saved as a draft, but it cannot be published yet.", issues: p.issues?.length ? p.issues : [p.error] });
        onSaved(merged, false);
        return notify("Publish blocked. See the reasons in the pop-up.", { tone: "error" });
      }
      notify(p.data.revalidateError ? "Published. The public site could not be refreshed yet. Your change is saved and will appear within the hour." : "Published.", { tone: p.data.revalidateError ? "error" : "success" });
      onSaved(merged, true);
      onClose();
    });

  const label = isMeta ? "Page title and SEO" : target.label;

  return (
    <UploadContext.Provider value={projectSlug}>
      <Modal
        open={open}
        title={isMeta ? "Edit page settings" : "Edit section"}
        subtitle={`${pageTitle} / ${label}`}
        size="lg"
        busy={pending}
        onClose={requestClose}
        badges={dirty ? <Chip tone="amber">Unsaved changes</Chip> : undefined}
        footer={
          canEdit ? (
            <>
              {canPublish && <p className="mr-auto hidden max-w-xs text-xs text-ink-muted sm:block">Save draft keeps the change private. Publish now puts it on the live site.</p>}
              <Button onClick={requestClose} disabled={pending}>
                Cancel
              </Button>
              <Button onClick={() => run(false)} disabled={pending || !dirty}>
                {pending ? "Saving..." : "Save draft"}
              </Button>
              {canPublish && (
                <Button variant="primary" onClick={() => run(true)} disabled={pending}>
                  Publish now
                </Button>
              )}
            </>
          ) : (
            <Button onClick={onClose}>Close</Button>
          )
        }
      >
        <div
          className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]"
          onKeyDown={(e) => {
            if (!canEdit || pending || !(e.ctrlKey || e.metaKey)) return;
            if (e.key === "s") {
              e.preventDefault();
              if (dirty) run(false);
            } else if (e.key === "Enter" && canPublish) {
              e.preventDefault();
              run(true);
            }
          }}
        >
          <div className="min-w-0 space-y-5">
            {isMeta ? (
              <>
                <Field label="Page heading" htmlFor="m-title" hint="Shown as the main heading when the page has no hero title.">
                  <Input id="m-title" value={meta.title} disabled={!canEdit} maxLength={200} onChange={(e) => setMeta({ ...meta, title: e.target.value })} />
                </Field>
                <Field label="SEO title" htmlFor="m-seo">
                  <Input id="m-seo" value={meta.metaTitle} disabled={!canEdit} onChange={(e) => setMeta({ ...meta, metaTitle: e.target.value })} />
                  <div className="flex justify-between">
                    <span className="text-xs text-ink-muted">30 to 60 characters</span>
                    {count(meta.metaTitle, 60)}
                  </div>
                </Field>
                <Field label="Meta description" htmlFor="m-desc">
                  <Textarea id="m-desc" rows={3} value={meta.metaDesc} disabled={!canEdit} onChange={(e) => setMeta({ ...meta, metaDesc: e.target.value })} />
                  <div className="flex justify-between">
                    <span className="text-xs text-ink-muted">70 to 160 characters</span>
                    {count(meta.metaDesc, 160)}
                  </div>
                </Field>
              </>
            ) : (
              isHome && hasHomeForm(target.id) ? (
                <HomeSectionForm sectionId={target.id} values={data} set={(k, v) => setData((d) => ({ ...d, [k]: v }))} readOnly={!canEdit} tours={tours} projectId={projectSlug} />
              ) : (
                target.keys.map((k) => <JsonField key={k} name={k} label={humanize(k)} value={data[k] ?? ""} readOnly={!canEdit} freeform={false} onChange={(next) => setData((d) => ({ ...d, [k]: next }))} />)
              )
            )}
          </div>

          <aside className="space-y-5 lg:border-l lg:border-line lg:pl-6">
            <div>
              <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-ink-muted">Search preview</h3>
              <SearchPreview title={seo.metaTitle} url={url} description={seo.metaDesc} />
              {!isHome && !isMeta && <p className="mt-2 text-xs text-ink-muted">The title and description are set under Page title and SEO.</p>}
            </div>
            <div>
              <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-ink-muted">Publish checks</h3>
              {(
                <ul className="space-y-2">
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
              )}
              {failing.length === 0 && <p className="mt-2 text-xs text-primary">All checks pass.</p>}
            </div>
            {error && (
              <div role="alert" className="rounded-control bg-danger-soft px-3 py-2 text-[13px] text-danger">
                <p className="font-medium">{error.text}</p>
                {error.issues && error.issues.length > 0 && (
                  <ul className="mt-1 list-disc space-y-0.5 pl-4">
                    {error.issues.slice(0, 5).map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </aside>
        </div>
      </Modal>
      <DiscardDialog open={asking} what="section" onKeep={() => setAsking(false)} onDiscard={() => (setAsking(false), onClose())} />
    </UploadContext.Provider>
  );
}
