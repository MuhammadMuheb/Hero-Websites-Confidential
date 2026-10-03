"use client";

import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { checkPage, publishPage, retryRevalidate, saveDraft, submitForReview } from "@/app/actions/content";
import { Badge, StatusBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Field, Input, Textarea } from "@/components/ui/Field";
import { Icon } from "@/components/ui/Icon";
import { UploadContext } from "@/components/ui/ImageUploader";
import { PageHeader } from "@/components/ui/PageHeader";
import { useToast } from "@/components/ui/Toast";
import type { GateCheck } from "@/lib/publish/gate";
import type { PageDef, PageDraft, PageState } from "@/lib/types";
import { humanize, JsonField } from "./JsonField";
import { PagePreview } from "./PagePreview";

interface Props {
  projectSlug: string;
  projectName: string;
  /** "home", "about", ... or "navigation". */
  pageSlug: string;
  def: PageDef;
  state: PageState;
  initialChecks: GateCheck[];
  canEdit: boolean;
  canPublish: boolean;
  /** Show only this section (used by the global SEO screen). */
  onlySection?: string;
  breadcrumbGroup?: string;
}

const SIZE = (n: number, min: number, max: number) => (n >= min && n <= max ? "text-ink-muted" : "font-medium text-danger");

export function PageEditor({ projectSlug, projectName, pageSlug, def, state, initialChecks, canEdit, canPublish, onlySection, breadcrumbGroup = "Pages" }: Props) {
  const router = useRouter();
  const { notify } = useToast();
  const [pending, startTransition] = useTransition();

  const [draft, setDraft] = useState<PageDraft>(state.draft);
  const [dirty, setDirty] = useState(false);
  const [checks, setChecks] = useState<GateCheck[]>(initialChecks);
  const [selectedId, setSelectedId] = useState(onlySection ?? def.sections[0]?.id);
  const [revalidateError, setRevalidateError] = useState<string>();
  const [status, setStatus] = useState(state.status);
  const [version, setVersion] = useState(state.version);
  const previewRef = useRef<HTMLDivElement>(null);

  const sections = useMemo(() => {
    const byId = new Map(def.sections.map((s) => [s.id, s]));
    return draft.layout.filter((l) => byId.has(l.id)).map((l) => ({ ...byId.get(l.id)!, visible: l.visible }));
  }, [def, draft.layout]);
  const visibleSections = onlySection ? sections.filter((s) => s.id === onlySection) : sections;
  const selected = visibleSections.find((s) => s.id === selectedId) ?? visibleSections[0];
  const isHome = pageSlug === "home";
  const showMeta = !isHome && pageSlug !== "navigation";
  const allChecksPass = checks.every((c) => c.ok);

  const update = (next: PageDraft) => {
    setDraft(next);
    setDirty(true);
  };

  // Server-side publish checks, debounced while the editor types.
  useEffect(() => {
    const t = window.setTimeout(async () => {
      const r = await checkPage(projectSlug, pageSlug, draft);
      if (r.ok) setChecks(r.data);
    }, 700);
    return () => window.clearTimeout(t);
  }, [draft, projectSlug, pageSlug]);

  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const move = (index: number, delta: -1 | 1) => {
    const target = index + delta;
    if (target < 0 || target >= draft.layout.length) return;
    const layout = [...draft.layout];
    [layout[index], layout[target]] = [layout[target], layout[index]];
    update({ ...draft, layout });
  };
  const toggle = (id: string) => update({ ...draft, layout: draft.layout.map((l) => (l.id === id ? { ...l, visible: !l.visible } : l)) });
  const layoutIndex = (id: string) => draft.layout.findIndex((l) => l.id === id);

  const save = (after?: () => void) =>
    startTransition(async () => {
      const r = await saveDraft(projectSlug, pageSlug, draft);
      if (!r.ok) return notify(r.issues?.length ? `${r.error} ${r.issues[0]}` : r.error, { tone: "error" });
      setDirty(false);
      if (status === "published" || status === "in_review") setStatus(status === "published" ? "published" : "draft");
      notify("Draft saved");
      after?.();
      router.refresh();
    });

  const publish = () =>
    startTransition(async () => {
      if (dirty) {
        const s = await saveDraft(projectSlug, pageSlug, draft);
        if (!s.ok) return notify(s.error, { tone: "error" });
        setDirty(false);
      }
      const r = await publishPage(projectSlug, pageSlug);
      if (!r.ok) {
        setChecks((c) => c); // server list is authoritative; show it in the toast too
        return notify(`${r.error} ${r.issues?.slice(0, 2).join("; ") ?? ""}`.trim(), { tone: "error" });
      }
      setStatus("published");
      setVersion(r.data.version);
      setRevalidateError(r.data.revalidateError);
      if (r.data.revalidateError) notify("Published, but the public site could not be refreshed. Use Retry.", { tone: "error" });
      else notify(`Published v${r.data.version}`);
      router.refresh();
    });

  const retry = () =>
    startTransition(async () => {
      const r = await retryRevalidate(projectSlug, pageSlug);
      if (!r.ok) return notify(r.error, { tone: "error" });
      setRevalidateError(r.data.revalidateError);
      notify(r.data.revalidateError ? `Still failing: ${r.data.revalidateError}` : "Public site refreshed", { tone: r.data.revalidateError ? "error" : "success" });
    });

  const review = () =>
    startTransition(async () => {
      const r = await submitForReview(projectSlug, pageSlug);
      if (!r.ok) return notify(r.error, { tone: "error" });
      setStatus("in_review");
      notify("Submitted for review");
      router.refresh();
    });

  const title = onlySection ? sections.find((s) => s.id === onlySection)?.label ?? def.title : def.title;

  return (
    <UploadContext.Provider value={projectSlug}>
      <PageHeader
        title={title}
        breadcrumbs={[{ label: projectName, href: `/projects/${projectSlug}/pages/home` }, { label: breadcrumbGroup }, { label: title }]}
        badge={
          <>
            <Badge tone={status === "published" && !dirty ? "green" : "amber"}>
              {dirty ? "Unsaved changes" : status === "published" ? `Published v${version}` : `Draft v${version}`}
            </Badge>
          </>
        }
        description={def.description}
        actions={
          canEdit ? (
            <>
              <Button size="sm" disabled={pending || !dirty} onClick={() => save()}>
                Save draft{dirty ? " *" : ""}
              </Button>
              <Button size="sm" onClick={() => previewRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })}>
                Preview
              </Button>
              {canPublish ? (
                <Button size="sm" variant="primary" disabled={pending || !allChecksPass} title={allChecksPass ? undefined : "Fix the publish checks first"} onClick={publish}>
                  {pending ? "Working..." : "Publish"}
                </Button>
              ) : (
                <Button size="sm" variant="primary" disabled={pending || dirty || status === "in_review"} onClick={review} title={dirty ? "Save the draft first" : undefined}>
                  Submit for review
                </Button>
              )}
            </>
          ) : (
            <Badge tone="grey">Read only</Badge>
          )
        }
      />

      {revalidateError && (
        <div role="alert" className="mb-4 flex flex-wrap items-center justify-between gap-2 rounded-card border border-danger/30 bg-danger-soft p-3 text-[13px] text-danger">
          <span>The change is saved, but the public site was not refreshed: {revalidateError}</span>
          <Button size="sm" onClick={retry} disabled={pending}>
            Retry revalidation
          </Button>
        </div>
      )}

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-4">
          {!onlySection && (
            <Card title={`${def.title} sections (${sections.length})`} bodyClassName="p-2">
              <ul>
                {sections.map((s) => {
                  const active = s.id === selected?.id;
                  const i = layoutIndex(s.id);
                  return (
                    <li key={s.id} className={clsx("flex items-center gap-2 rounded-control border px-2 py-1.5", active ? "border-primary bg-primary-soft/50" : "border-transparent hover:bg-canvas")}>
                      <Icon name="drag" size={16} className="shrink-0 text-ink-muted" />
                      <button type="button" onClick={() => setSelectedId(s.id)} aria-pressed={active} className={clsx("min-w-0 flex-1 truncate text-left text-sm", !s.visible && "text-ink-muted line-through")}>
                        {s.label}
                      </button>
                      <span className="hidden text-xs text-ink-muted sm:inline">{s.visible ? "visible" : "hidden"}</span>
                      {canEdit && (
                        <>
                          <button type="button" aria-label={`Move ${s.label} up`} disabled={i === 0} onClick={() => move(i, -1)} className="rounded p-1 text-ink-muted hover:bg-canvas disabled:opacity-30">
                            <Icon name="up" size={16} />
                          </button>
                          <button type="button" aria-label={`Move ${s.label} down`} disabled={i === draft.layout.length - 1} onClick={() => move(i, 1)} className="rounded p-1 text-ink-muted hover:bg-canvas disabled:opacity-30">
                            <Icon name="down" size={16} />
                          </button>
                          <button type="button" aria-label={s.visible ? `Hide ${s.label}` : `Show ${s.label}`} onClick={() => toggle(s.id)} className="rounded p-1 text-ink-muted hover:bg-canvas">
                            <Icon name={s.visible ? "eye" : "eyeOff"} size={16} />
                          </button>
                        </>
                      )}
                    </li>
                  );
                })}
              </ul>
            </Card>
          )}

          {showMeta && !onlySection && (
            <Card title="Page settings">
              <div className="space-y-4">
                <Field label="Page title" htmlFor="meta-title" hint="Shown as the page H1 when the page has no hero title.">
                  <Input id="meta-title" value={draft.meta.title} disabled={!canEdit} onChange={(e) => update({ ...draft, meta: { ...draft.meta, title: e.target.value } })} />
                </Field>
                <Field label="SEO title" htmlFor="meta-seo-title">
                  <Input id="meta-seo-title" value={draft.meta.metaTitle} disabled={!canEdit} onChange={(e) => update({ ...draft, meta: { ...draft.meta, metaTitle: e.target.value } })} />
                  <p className={clsx("text-xs", SIZE(draft.meta.metaTitle.trim().length, 30, 60))}>{draft.meta.metaTitle.trim().length}/60 characters (30 to 60)</p>
                </Field>
                <Field label="Meta description" htmlFor="meta-desc">
                  <Textarea id="meta-desc" rows={3} value={draft.meta.metaDesc} disabled={!canEdit} onChange={(e) => update({ ...draft, meta: { ...draft.meta, metaDesc: e.target.value } })} />
                  <p className={clsx("text-xs", SIZE(draft.meta.metaDesc.trim().length, 70, 160))}>{draft.meta.metaDesc.trim().length}/160 characters (70 to 160)</p>
                </Field>
              </div>
            </Card>
          )}

          {selected && (
            <Card title={`Edit: ${selected.label}`}>
              <div className="space-y-4" key={selected.id}>
                {selected.keys.map((k) => (
                  <JsonField
                    key={k}
                    name={k}
                    label={humanize(k)}
                    value={draft.data[k] ?? ""}
                    readOnly={!canEdit}
                    freeform={!isHome}
                    onChange={(next) => update({ ...draft, data: { ...draft.data, [k]: next } })}
                  />
                ))}
                {pageSlug === "home" && selected.id === "hero" && <p className="text-xs text-ink-muted">The hero title is the page H1.</p>}
              </div>
            </Card>
          )}
        </div>

        <div className="space-y-4">
          <div ref={previewRef}>
            <PagePreview sections={sections.map((s) => ({ id: s.id, label: s.label, visible: s.visible }))} />
          </div>
          <Card title="Publish checks">
            <ul className="space-y-2">
              {checks.map((c) => (
                <li key={c.id} className="flex items-start gap-2 text-[13px]">
                  <Icon name={c.ok ? "check" : "alert"} size={16} className={clsx("mt-0.5 shrink-0", c.ok ? "text-primary" : "text-warning")} />
                  <span>
                    {c.label}
                    {!c.ok && c.detail && <span className="block text-xs text-ink-muted">{c.detail}</span>}
                    <span className="sr-only">{c.ok ? " passed" : " failed"}</span>
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-3 flex items-center gap-2 text-xs text-ink-muted">
              Status: <StatusBadge status={status} />
              {state.hasPublished && dirty === false && status !== "published" && <span>(a published version exists)</span>}
            </p>
          </Card>
        </div>
      </div>
    </UploadContext.Provider>
  );
}
