"use client";

import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState, useTransition } from "react";
import { checkPage, publishPage, retryRevalidate, saveDraft, submitForReview } from "@/app/actions/content";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Field, Input, Textarea } from "@/components/ui/Field";
import { Icon } from "@/components/ui/Icon";
import { UploadContext } from "@/components/ui/ImageUploader";
import { PageHeader } from "@/components/ui/PageHeader";
import { useToast } from "@/components/ui/Toast";
import type { GateCheck } from "@/lib/publish/gate";
import type { PageDef, PageDraft, PageState } from "@/lib/types";
import { humanize, JsonField } from "./JsonField";

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
  /** Show only this section (used by the Navbar, Footer and SEO screens). */
  onlySection?: string;
  breadcrumbGroup?: string;
}

/** What the last save did, shown right under the Save button of the section. */
type Outcome = { tone: "success" | "warning" | "error"; text: string; issues?: string[] };

const SETTINGS_ID = "__settings";
const LAYOUT_ID = "__layout";
const length = (n: number, min: number, max: number) => (n >= min && n <= max ? "text-ink-muted" : "font-medium text-danger");
const same = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);

export function PageEditor({ projectSlug, projectName, pageSlug, def, state, initialChecks, canEdit, canPublish, onlySection, breadcrumbGroup = "Pages" }: Props) {
  const router = useRouter();
  const { notify } = useToast();
  const [pending, startTransition] = useTransition();

  // `saved` is what is stored; `draft` is what is on screen. A section is "unsaved" when the two differ for its fields.
  const [saved, setSaved] = useState<PageDraft>(state.draft);
  const [draft, setDraft] = useState<PageDraft>(state.draft);
  const [status, setStatus] = useState(state.status);
  const [version, setVersion] = useState(state.version);
  const [checks, setChecks] = useState<GateCheck[]>(initialChecks);
  const [outcome, setOutcome] = useState<Record<string, Outcome>>({});
  const [revalidateError, setRevalidateError] = useState<string>();
  const [selectedId, setSelectedId] = useState(onlySection ?? def.sections[0]?.id ?? SETTINGS_ID);

  const isHome = pageSlug === "home";
  const showSettings = !isHome && pageSlug !== "navigation" && !onlySection;

  const sections = useMemo(() => {
    const byId = new Map(def.sections.map((s) => [s.id, s]));
    const all = draft.layout.filter((l) => byId.has(l.id)).map((l) => ({ ...byId.get(l.id)!, visible: l.visible }));
    return onlySection ? all.filter((s) => s.id === onlySection) : all;
  }, [def, draft.layout, onlySection]);

  const sectionDirty = (keys: string[]) => keys.some((k) => !same(draft.data[k], saved.data[k]));
  const layoutDirty = !same(draft.layout, saved.layout);
  const settingsDirty = !same(draft.meta, saved.meta);
  const anyDirty = layoutDirty || settingsDirty || sections.some((s) => sectionDirty(s.keys));

  useEffect(() => {
    if (!anyDirty) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [anyDirty]);

  const setData = (key: string, value: unknown) => setDraft((d) => ({ ...d, data: { ...d.data, [key]: value } }));

  const move = (index: number, delta: -1 | 1) => {
    const target = index + delta;
    if (target < 0 || target >= draft.layout.length) return;
    const layout = [...draft.layout];
    [layout[index], layout[target]] = [layout[target], layout[index]];
    setDraft({ ...draft, layout });
  };
  const toggle = (id: string) => setDraft({ ...draft, layout: draft.layout.map((l) => (l.id === id ? { ...l, visible: !l.visible } : l)) });
  const layoutIndex = (id: string) => draft.layout.findIndex((l) => l.id === id);

  /**
   * Saves one part of the page: the stored page plus only that part's changes, so edits made in other sections stay
   * unsaved until their own Save. A person who may publish also goes live in the same click.
   */
  const persist = (scope: string, build: (base: PageDraft) => PageDraft) =>
    startTransition(async () => {
      const next = build(saved);
      const s = await saveDraft(projectSlug, pageSlug, next);
      if (!s.ok) {
        setOutcome((o) => ({ ...o, [scope]: { tone: "error", text: s.error, issues: s.issues } }));
        return notify(s.error, { tone: "error" });
      }
      setSaved(next);
      if (status === "in_review") setStatus("draft");

      if (!canPublish) {
        setStatus((st) => (st === "published" ? "published" : "draft"));
        setOutcome((o) => ({ ...o, [scope]: { tone: "success", text: "Saved as a draft. Submit it for review to put it live." } }));
        return notify("Saved as a draft");
      }

      const p = await publishPage(projectSlug, pageSlug);
      const gate = await checkPage(projectSlug, pageSlug, next);
      if (gate.ok) setChecks(gate.data);
      if (!p.ok) {
        setStatus((st) => (st === "published" ? "published" : "draft"));
        setOutcome((o) => ({ ...o, [scope]: { tone: "warning", text: "Saved, but it is not live yet.", issues: p.issues?.length ? p.issues : [p.error] } }));
        return notify("Saved, but not live yet. See the reason under the button.", { tone: "error" });
      }
      setStatus("published");
      setVersion(p.data.version);
      setRevalidateError(p.data.revalidateError);
      setOutcome((o) => ({
        ...o,
        [scope]: p.data.revalidateError
          ? { tone: "warning", text: "Saved and published, but the live site could not be refreshed yet.", issues: [p.data.revalidateError] }
          : { tone: "success", text: `Saved and live (version ${p.data.version}).` },
      }));
      notify(p.data.revalidateError ? "Published, but the live site was not refreshed" : "Saved and live", { tone: p.data.revalidateError ? "error" : "success" });
      router.refresh();
    });

  const saveSection = (id: string, keys: string[]) =>
    persist(id, (base) => ({ ...base, data: { ...base.data, ...Object.fromEntries(keys.map((k) => [k, draft.data[k]])) } }));
  const saveLayout = () => persist(LAYOUT_ID, (base) => ({ ...base, layout: draft.layout }));
  const saveSettings = () => persist(SETTINGS_ID, (base) => ({ ...base, meta: draft.meta }));

  const retry = () =>
    startTransition(async () => {
      const r = await retryRevalidate(projectSlug, pageSlug);
      if (!r.ok) return notify(r.error, { tone: "error" });
      setRevalidateError(r.data.revalidateError);
      notify(r.data.revalidateError ? `Still failing: ${r.data.revalidateError}` : "Live site refreshed", { tone: r.data.revalidateError ? "error" : "success" });
    });

  const review = () =>
    startTransition(async () => {
      const r = await submitForReview(projectSlug, pageSlug);
      if (!r.ok) return notify(r.error, { tone: "error" });
      setStatus("in_review");
      notify("Submitted for review");
      router.refresh();
    });

  const failing = checks.filter((c) => !c.ok);
  const selected = sections.find((s) => s.id === selectedId);
  const title = onlySection ? (sections[0]?.label ?? def.title) : def.title;
  const saveLabel = canPublish ? "Save and publish" : "Save draft";

  const badge = anyDirty ? (
    <Badge tone="amber">Unsaved changes</Badge>
  ) : status === "published" ? (
    <Badge tone="green">Live, version {version}</Badge>
  ) : status === "in_review" ? (
    <Badge tone="amber">In review</Badge>
  ) : (
    <Badge tone="grey">Draft, not live</Badge>
  );

  const saveBar = (id: string, onSave: () => void, disabled: boolean) => {
    const result = outcome[id];
    return (
      <div className="mt-6 border-t border-line pt-4">
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary" disabled={pending || disabled} onClick={onSave}>
            {pending ? "Saving..." : saveLabel}
          </Button>
          <span className="text-[13px] text-ink-muted">{disabled ? "No changes to save." : canPublish ? "Saves this section and updates the live site." : "Saves this section as a draft."}</span>
        </div>
        {result && (
          <div
            role="status"
            className={clsx("mt-3 rounded-control px-3 py-2 text-[13px]", result.tone === "success" && "bg-primary-soft text-primary", result.tone === "warning" && "bg-warning-soft text-warning", result.tone === "error" && "bg-danger-soft text-danger")}
          >
            <p className="font-medium">{result.text}</p>
            {result.issues && result.issues.length > 0 && (
              <ul className="mt-1 list-disc space-y-0.5 pl-5">
                {result.issues.slice(0, 5).map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <UploadContext.Provider value={projectSlug}>
      <PageHeader
        title={title}
        breadcrumbs={[{ label: projectName, href: `/projects/${projectSlug}` }, { label: breadcrumbGroup }, { label: title }]}
        badge={badge}
        description={onlySection ? undefined : def.description}
        actions={
          !canEdit ? (
            <Badge tone="grey">Read only</Badge>
          ) : !canPublish ? (
            <Button size="sm" disabled={pending || anyDirty || status === "in_review"} onClick={review} title={anyDirty ? "Save your changes first" : undefined}>
              Submit for review
            </Button>
          ) : undefined
        }
      />

      {revalidateError && (
        <div role="alert" className="mb-4 flex flex-wrap items-center justify-between gap-2 rounded-card border border-danger/30 bg-danger-soft p-3 text-[13px] text-danger">
          <span>Your change is saved, but the live site has not refreshed yet: {revalidateError}</span>
          <Button size="sm" onClick={retry} disabled={pending}>
            Try again
          </Button>
        </div>
      )}

      <div className={clsx("grid gap-6", !onlySection && "lg:grid-cols-[260px_minmax(0,1fr)]")}>
        {!onlySection && (
          <aside className="space-y-3 lg:sticky lg:top-[calc(theme(spacing.topbar)+24px)] lg:self-start">
            <nav aria-label={`${def.title} sections`} className="rounded-card border border-line bg-surface p-2 shadow-card">
              <p className="px-2 pb-1 pt-1 text-[11px] font-semibold uppercase tracking-wider text-ink-muted">Sections</p>
              <ul>
                {sections.map((s) => {
                  const active = s.id === selectedId;
                  const i = layoutIndex(s.id);
                  return (
                    <li key={s.id} className={clsx("group flex items-center gap-1 rounded-control", active ? "bg-primary-soft" : "hover:bg-canvas")}>
                      <button type="button" onClick={() => setSelectedId(s.id)} aria-current={active ? "true" : undefined} className={clsx("flex min-w-0 flex-1 items-center gap-2 px-2.5 py-2 text-left text-sm", active ? "font-medium text-primary" : "text-ink", !s.visible && "text-ink-muted line-through")}>
                        <span className="truncate">{s.label}</span>
                        {sectionDirty(s.keys) && <span title="Unsaved changes" className="h-1.5 w-1.5 shrink-0 rounded-full bg-warning" />}
                      </button>
                      {canEdit && (
                        <span className="flex shrink-0 items-center pr-1 opacity-60 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100">
                          <button type="button" aria-label={`Move ${s.label} up`} disabled={i === 0} onClick={() => move(i, -1)} className="rounded p-1 text-ink-muted hover:bg-surface disabled:opacity-30">
                            <Icon name="up" size={14} />
                          </button>
                          <button type="button" aria-label={`Move ${s.label} down`} disabled={i === draft.layout.length - 1} onClick={() => move(i, 1)} className="rounded p-1 text-ink-muted hover:bg-surface disabled:opacity-30">
                            <Icon name="down" size={14} />
                          </button>
                          <button type="button" aria-label={s.visible ? `Hide ${s.label} on the site` : `Show ${s.label} on the site`} onClick={() => toggle(s.id)} className="rounded p-1 text-ink-muted hover:bg-surface">
                            <Icon name={s.visible ? "eye" : "eyeOff"} size={14} />
                          </button>
                        </span>
                      )}
                    </li>
                  );
                })}
                {showSettings && (
                  <li className={clsx("mt-1 rounded-control border-t border-line pt-1", selectedId === SETTINGS_ID && "bg-primary-soft")}>
                    <button type="button" onClick={() => setSelectedId(SETTINGS_ID)} className={clsx("flex w-full items-center gap-2 px-2.5 py-2 text-left text-sm", selectedId === SETTINGS_ID ? "font-medium text-primary" : "text-ink")}>
                      Page title and SEO
                      {settingsDirty && <span title="Unsaved changes" className="h-1.5 w-1.5 rounded-full bg-warning" />}
                    </button>
                  </li>
                )}
              </ul>
              {canEdit && layoutDirty && (
                <div className="border-t border-line p-2">
                  <p className="mb-2 text-xs text-ink-muted">You changed the order or visibility of sections.</p>
                  <Button size="sm" variant="primary" className="w-full" disabled={pending} onClick={saveLayout}>
                    {saveLabel} order
                  </Button>
                  {outcome[LAYOUT_ID] && <p className={clsx("mt-2 text-xs", outcome[LAYOUT_ID].tone === "success" ? "text-primary" : "text-warning")}>{outcome[LAYOUT_ID].text}</p>}
                </div>
              )}
            </nav>

            {canPublish && failing.length > 0 && (
              <div className="rounded-card border border-warning/30 bg-warning-soft p-3 text-[13px] text-warning">
                <p className="font-medium">Needed before this page can go live</p>
                <ul className="mt-1 space-y-1">
                  {failing.map((c) => (
                    <li key={c.id}>
                      {c.label}
                      {c.detail && <span className="block text-xs opacity-80">{c.detail}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        )}

        <div className="min-w-0">
          {selected && (
            <section className="rounded-card border border-line bg-surface shadow-card">
              <header className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-5 py-4">
                <div>
                  <h2 className="text-lg font-semibold text-ink">{selected.label}</h2>
                  {!selected.visible && <p className="text-[13px] text-warning">Hidden on the site. Use the eye icon to show it again.</p>}
                </div>
                {sectionDirty(selected.keys) && <Badge tone="amber">Unsaved</Badge>}
              </header>
              <div className="space-y-5 p-5" key={selected.id}>
                {selected.keys.map((k) => (
                  <JsonField key={k} name={k} label={humanize(k)} value={draft.data[k] ?? ""} readOnly={!canEdit} freeform={!isHome} onChange={(next) => setData(k, next)} />
                ))}
                {isHome && selected.id === "hero" && <p className="text-xs text-ink-muted">The hero title is the page&rsquo;s main heading.</p>}
                {canEdit && saveBar(selected.id, () => saveSection(selected.id, selected.keys), !sectionDirty(selected.keys))}
              </div>
            </section>
          )}

          {showSettings && selectedId === SETTINGS_ID && (
            <section className="rounded-card border border-line bg-surface shadow-card">
              <header className="flex items-center justify-between gap-2 border-b border-line px-5 py-4">
                <h2 className="text-lg font-semibold text-ink">Page title and SEO</h2>
                {settingsDirty && <Badge tone="amber">Unsaved</Badge>}
              </header>
              <div className="space-y-5 p-5">
                <Field label="Page heading" htmlFor="meta-title" hint="Shown as the main heading when the page has no hero title.">
                  <Input id="meta-title" value={draft.meta.title} disabled={!canEdit} onChange={(e) => setDraft({ ...draft, meta: { ...draft.meta, title: e.target.value } })} />
                </Field>
                <Field label="SEO title" htmlFor="meta-seo-title">
                  <Input id="meta-seo-title" value={draft.meta.metaTitle} disabled={!canEdit} onChange={(e) => setDraft({ ...draft, meta: { ...draft.meta, metaTitle: e.target.value } })} />
                  <p className={clsx("text-xs", length(draft.meta.metaTitle.trim().length, 30, 60))}>{draft.meta.metaTitle.trim().length} of 60 characters (30 to 60)</p>
                </Field>
                <Field label="Meta description" htmlFor="meta-desc">
                  <Textarea id="meta-desc" rows={3} value={draft.meta.metaDesc} disabled={!canEdit} onChange={(e) => setDraft({ ...draft, meta: { ...draft.meta, metaDesc: e.target.value } })} />
                  <p className={clsx("text-xs", length(draft.meta.metaDesc.trim().length, 70, 160))}>{draft.meta.metaDesc.trim().length} of 160 characters (70 to 160)</p>
                </Field>
                {canEdit && saveBar(SETTINGS_ID, saveSettings, !settingsDirty)}
              </div>
            </section>
          )}
        </div>
      </div>
    </UploadContext.Provider>
  );
}
