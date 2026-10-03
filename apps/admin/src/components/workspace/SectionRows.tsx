"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import { publishPage, saveDraft, submitForReview } from "@/app/actions/content";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { EmptyState } from "@/components/ui/EmptyState";
import { Icon } from "@/components/ui/Icon";
import { useToast } from "@/components/ui/Toast";
import { pagePath } from "@/lib/content/outline";
import { firstImage, imagesMissingAlt, summarize } from "@/lib/content/summary";
import type { GateCheck } from "@/lib/publish/gate";
import type { LayoutItem, PageDef, PageDraft, PageState } from "@/lib/types";
import type { TourOption } from "./HomeForms";
import { META_SECTION, SectionModal, type EditTarget } from "./SectionModal";

interface Props {
  projectSlug: string;
  domain: string;
  pageSlug: string;
  def: PageDef;
  state: PageState;
  checks: GateCheck[];
  canEdit: boolean;
  canPublish: boolean;
  tours?: TourOption[];
}

const iconButton = "rounded p-1.5 text-ink-muted hover:bg-canvas hover:text-ink disabled:opacity-30";

/** A page as ordered rows, top to bottom, exactly like the live page. */
export function SectionRows({ projectSlug, domain, pageSlug, def, state, checks, canEdit, canPublish, tours }: Props) {
  const router = useRouter();
  const { notify } = useToast();
  const [pending, startTransition] = useTransition();
  const [draft, setDraft] = useState<PageDraft>(state.draft);
  const [status, setStatus] = useState(state.status);
  const [editing, setEditing] = useState<EditTarget | null>(null);

  const rows = useMemo(() => {
    const byId = new Map(def.sections.map((s) => [s.id, s]));
    return draft.layout.filter((l) => byId.has(l.id)).map((l) => ({ ...byId.get(l.id)!, visible: l.visible }));
  }, [def, draft.layout]);

  const passed = checks.filter((c) => c.ok).length;
  const failing = checks.filter((c) => !c.ok);
  const allPass = failing.length === 0;
  const unpublished = status !== "published" && state.hasPublished;

  const saveLayout = (layout: LayoutItem[], message: string) =>
    startTransition(async () => {
      const next = { ...draft, layout };
      const r = await saveDraft(projectSlug, pageSlug, next);
      if (!r.ok) return notify("Could not save. Check the highlighted fields and try again.", { tone: "error" });
      setDraft(next);
      setStatus("draft");
      notify(message);
      router.refresh();
    });

  const move = (index: number, delta: -1 | 1) => {
    const a = rows[index]?.id;
    const b = rows[index + delta]?.id;
    if (!a || !b) return;
    const layout = [...draft.layout];
    const pa = layout.findIndex((l) => l.id === a);
    const pb = layout.findIndex((l) => l.id === b);
    [layout[pa], layout[pb]] = [layout[pb], layout[pa]];
    saveLayout(layout, "Order saved as a draft.");
  };

  const toggle = (id: string, visible: boolean) => saveLayout(draft.layout.map((l) => (l.id === id ? { ...l, visible: !l.visible } : l)), visible ? "Section hidden. Publish to apply it." : "Section shown. Publish to apply it.");

  const publish = () =>
    startTransition(async () => {
      const r = await publishPage(projectSlug, pageSlug);
      if (!r.ok) return notify(`${r.error} ${r.issues?.[0] ?? ""}`.trim(), { tone: "error" });
      setStatus("published");
      notify(r.data.revalidateError ? "Published. The public site could not be refreshed yet. Your change is saved and will appear within the hour." : "Published.", { tone: r.data.revalidateError ? "error" : "success" });
      router.refresh();
    });

  const review = () =>
    startTransition(async () => {
      const r = await submitForReview(projectSlug, pageSlug);
      if (!r.ok) return notify(r.error, { tone: "error" });
      setStatus("in_review");
      notify("Submitted for review.");
      router.refresh();
    });

  const statusChip = status === "published" ? <Chip tone="green">Live</Chip> : status === "in_review" ? <Chip tone="amber">In review</Chip> : <Chip>Draft</Chip>;

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-[20px] font-semibold tracking-tight text-ink">{def.title}</h2>
          <span className="font-mono text-xs text-ink-muted">{pagePath(pageSlug)}</span>
          {statusChip}
          <Chip tone={allPass ? "green" : "amber"} title={allPass ? undefined : failing.map((c) => c.label).join(", ")}>
            SEO {passed} of {checks.length} checks
          </Chip>
          {unpublished && <Chip tone="amber">Unsaved changes</Chip>}
        </div>
        {canEdit &&
          (canPublish ? (
            <Button variant="primary" onClick={publish} disabled={pending || !allPass || status === "published"} title={!allPass ? `Fix first: ${failing.map((c) => c.label).join(", ")}` : status === "published" ? "Nothing to publish" : undefined}>
              {pending ? "Working..." : "Publish"}
            </Button>
          ) : (
            <Button variant="primary" onClick={review} disabled={pending || status === "in_review" || status === "published"}>
              Submit for review
            </Button>
          ))}
      </div>

      {!allPass && (
        <div className="mb-4 rounded-control bg-warning-soft px-3 py-2 text-[13px] text-warning">
          <p className="font-medium">Before this page can be published:</p>
          <ul className="mt-1 list-disc space-y-0.5 pl-5">
            {failing.map((c) => (
              <li key={c.id}>
                {c.id === "alt" ? "Add alt text to every image." : c.label}
                {c.detail ? ` (${c.detail})` : ""}
              </li>
            ))}
          </ul>
        </div>
      )}

      {rows.length === 0 ? (
        <EmptyState title="No sections yet." description="Add your first section." />
      ) : (
        <div className="overflow-x-auto rounded-card border border-line bg-surface shadow-card">
          <table className="w-full min-w-[720px] border-collapse text-sm">
            <thead className="border-b border-line bg-canvas/60">
              <tr className="text-left text-xs font-semibold uppercase tracking-wide text-ink-muted">
                <th scope="col" className="w-12 px-4 py-2.5">
                  #
                </th>
                <th scope="col" className="px-2 py-2.5">
                  Section (top to bottom)
                </th>
                <th scope="col" className="px-2 py-2.5">
                  Status
                </th>
                <th scope="col" className="px-2 py-2.5">
                  SEO
                </th>
                <th scope="col" className="px-4 py-2.5 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {pageSlug !== "home" && (
                <tr className="h-[56px] border-b border-line bg-canvas/30">
                  <td className="px-4 py-2 text-ink-muted">
                    <Icon name="globe" size={16} />
                  </td>
                  <td className="px-2 py-2">
                    <p className="font-medium text-ink">Page title and SEO</p>
                    <p className="max-w-md truncate text-xs text-ink-muted">{draft.meta.metaTitle || "No SEO title yet"}</p>
                  </td>
                  <td className="px-2 py-2">{statusChip}</td>
                  <td className="px-2 py-2">
                    <Chip tone={checks.find((c) => c.id === "title")?.ok && checks.find((c) => c.id === "meta")?.ok ? "green" : "amber"}>
                      {checks.find((c) => c.id === "title")?.ok && checks.find((c) => c.id === "meta")?.ok ? "OK" : "Needs work"}
                    </Chip>
                  </td>
                  <td className="px-4 py-2 text-right">
                    <Button size="sm" variant="primary" onClick={() => setEditing({ id: META_SECTION, label: "Page title and SEO", keys: [] })}>
                      {canEdit ? "Edit" : "View"}
                    </Button>
                  </td>
                </tr>
              )}
              {rows.map((s, i) => {
                const thumb = s.keys.map((k) => firstImage(draft.data[k])).find(Boolean) ?? null;
                const missingAlt = s.keys.reduce((n, k) => n + imagesMissingAlt(draft.data[k]), 0);
                return (
                  <tr key={s.id} className="h-[60px] border-b border-line last:border-0 hover:bg-canvas/40">
                    <td className="px-4 py-2 tabular-nums text-ink-muted">{i + 1}</td>
                    <td className="px-2 py-2">
                      <div className="flex items-center gap-3">
                        {thumb ? (
                          // eslint-disable-next-line @next/next/no-img-element -- small preview of an arbitrary external image
                          <img src={thumb} alt="" className="h-10 w-10 shrink-0 rounded-control border border-line object-cover" />
                        ) : (
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-control border border-dashed border-line text-ink-muted/60">
                            <Icon name="layout" size={16} />
                          </span>
                        )}
                        <div className="min-w-0">
                          <p className="truncate font-medium text-ink">{s.label}</p>
                          <p className="truncate text-xs text-ink-muted">{summarize(s.keys, draft.data)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-2 py-2">{!s.visible ? <Chip>Hidden</Chip> : statusChip}</td>
                    <td className="px-2 py-2">{!s.visible ? <span className="text-xs text-ink-muted">n/a</span> : missingAlt > 0 ? <Chip tone="red">Alt text</Chip> : <Chip tone="green">OK</Chip>}</td>
                    <td className="px-4 py-2">
                      <div className="flex items-center justify-end gap-1">
                        <Button size="sm" variant="primary" onClick={() => setEditing({ id: s.id, label: s.label, keys: s.keys })} aria-label={`${canEdit ? "Edit" : "View"} ${s.label}`}>
                          {canEdit ? "Edit" : "View"}
                        </Button>
                        {canEdit && (
                          <>
                            <button type="button" aria-label={`Move ${s.label} up`} disabled={pending || i === 0} onClick={() => move(i, -1)} className={iconButton}>
                              <Icon name="up" size={16} />
                            </button>
                            <button type="button" aria-label={`Move ${s.label} down`} disabled={pending || i === rows.length - 1} onClick={() => move(i, 1)} className={iconButton}>
                              <Icon name="down" size={16} />
                            </button>
                            <Button size="sm" disabled={pending} onClick={() => toggle(s.id, s.visible)} aria-label={`${s.visible ? "Hide" : "Show"} ${s.label}`}>
                              {s.visible ? "Hide" : "Show"}
                            </Button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <SectionModal
          open
          onClose={() => setEditing(null)}
          projectSlug={projectSlug}
          domain={domain}
          pageSlug={pageSlug}
          pageTitle={def.title}
          target={editing}
          draft={draft}
          canEdit={canEdit}
          canPublish={canPublish}
          tours={tours}
          onSaved={(next, live) => {
            setDraft(next);
            setStatus(live ? "published" : "draft");
            router.refresh();
          }}
        />
      )}
    </div>
  );
}
