"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { publishPage, saveDraft } from "@/app/actions/content";
import { checkExternalLink, type LinkCheck } from "@/app/actions/links";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { DiscardDialog } from "@/components/ui/DiscardDialog";
import { EmptyState } from "@/components/ui/EmptyState";
import { Field, Input, Select } from "@/components/ui/Field";
import { Icon } from "@/components/ui/Icon";
import { Modal } from "@/components/ui/Modal";
import { SiteDetails } from "./SiteDetails";
import { useToast } from "@/components/ui/Toast";
import { pageForPath } from "@/lib/content/outline";
import type { GateCheck } from "@/lib/publish/gate";
import type { PageDraft, PageState } from "@/lib/types";

/** One link. In the footer, a column is an item whose `children` are its links. */
interface Item {
  label: string;
  href: string;
  cta?: boolean;
  children?: Item[];
}

export interface PageOption {
  label: string;
  path: string;
}

interface Props {
  projectSlug: string;
  /** "navbar": a flat list of links. "footer": columns of links. */
  kind: "navbar" | "footer";
  state: PageState;
  checks: GateCheck[];
  canEdit: boolean;
  canPublish: boolean;
  /** Pages a link can point to (the Page type). */
  pages: PageOption[];
  /** Entries the site fills in itself (shown locked). */
  automatic: { label: string; note: string }[];
}

const MAX_LINKS = 20;
const MAX_COLUMNS = 4;
const iconButton = "rounded p-1.5 text-ink-muted hover:bg-canvas hover:text-ink disabled:opacity-30";

/** Exactly what the site accepts as a target: a site path, an https link, mailto or tel. */
function targetProblem(type: "page" | "external", href: string): string | null {
  const h = href.trim();
  if (type === "page") {
    if (!h.startsWith("/") || h.startsWith("//")) return "Choose a page.";
    return h === h.toLowerCase() ? null : "Site paths are lower case, for example /about.";
  }
  return /^(https:\/\/|mailto:|tel:)\S+$/i.test(h) ? null : "Use a full https:// address, a mailto: or a tel: link. Other kinds of link are not allowed.";
}

const isExternal = (href: string) => !href.startsWith("/");

interface Editing {
  /** Column index (footer) or null for the navbar list. */
  column: number | null;
  /** Position in the list, or null for a new link. */
  index: number | null;
  item: Item;
}

/** Navbar and footer as rows with live validation. Changes are saved as a draft; Publish puts them live. */
export function LinkRows({ projectSlug, kind, state, checks, canEdit, canPublish, pages, automatic }: Props) {
  const router = useRouter();
  const { notify } = useToast();
  const [pending, startTransition] = useTransition();
  const [base, setBase] = useState<PageDraft>(state.draft);
  const initial = ((state.draft.data[kind] as Item[] | undefined) ?? []).filter((i) => i && typeof i.label === "string");
  const [items, setItems] = useState<Item[]>(initial);
  const [status, setStatus] = useState(state.status);
  const [editing, setEditing] = useState<Editing | null>(null);
  const [columnEdit, setColumnEdit] = useState<{ index: number | null; label: string } | null>(null);
  const [results, setResults] = useState<Record<string, LinkCheck | "checking">>({});

  const failing = checks.filter((c) => !c.ok);
  const unpublished = status !== "published" && state.hasPublished;

  /**
   * Saves `draft`; a person who may publish also makes it live in the same step, so a change in the navbar or footer
   * shows on the site at once. Returns false when nothing was saved.
   */
  const saveAndGoLive = async (draft: PageDraft, message: string, undo?: () => void): Promise<boolean> => {
    const r = await saveDraft(projectSlug, "navigation", draft);
    if (!r.ok) {
      notify(`Could not save. ${r.error}`, { tone: "error" });
      return false;
    }
    setBase(draft);
    if (!canPublish) {
      setStatus("draft");
      notify(`${message} Saved as a draft.`, undo ? { actionLabel: "Undo", durationMs: 10_000, onAction: undo } : undefined);
      router.refresh();
      return true;
    }
    const p = await publishPage(projectSlug, "navigation");
    if (!p.ok) {
      setStatus("draft");
      notify(`Saved, but not live yet: ${p.issues?.[0] ?? p.error}`, { tone: "error" });
      router.refresh();
      return true;
    }
    setStatus("published");
    if (p.data.revalidateError) notify("Saved and published. The public site could not be refreshed yet. Your change is saved and will appear within the hour.", { tone: "error" });
    else notify(`${message} It is live now.`, undo ? { actionLabel: "Undo", durationMs: 10_000, onAction: undo } : undefined);
    router.refresh();
    return true;
  };

  /** Stores the new list. `undo` is the list to go back to. */
  const persist = (next: Item[], message: string, undo?: Item[]) => {
    const before = items;
    setItems(next);
    startTransition(async () => {
      const draft: PageDraft = { ...base, data: { ...base.data, [kind]: next } };
      const saved = await saveAndGoLive(draft, message, undo ? () => persist(undo, "Restored.") : undefined);
      if (!saved) setItems(before);
    });
  };

  const publish = () =>
    startTransition(async () => {
      const r = await publishPage(projectSlug, "navigation");
      if (!r.ok) return notify(`${r.error} ${r.issues?.[0] ?? ""}`.trim(), { tone: "error" });
      setStatus("published");
      notify(r.data.revalidateError ? "Published. The public site could not be refreshed yet. Your change is saved and will appear within the hour." : "Published.", { tone: r.data.revalidateError ? "error" : "success" });
      router.refresh();
    });

  const check = (key: string, href: string) => {
    setResults((r) => ({ ...r, [key]: "checking" }));
    void checkExternalLink(projectSlug, href).then((res) => setResults((r) => ({ ...r, [key]: res.ok ? res.data : { state: "down", detail: res.error } })));
  };

  const listAt = (column: number | null): Item[] => (column === null ? items : (items[column]?.children ?? []));
  const withList = (column: number | null, list: Item[]): Item[] => (column === null ? list : items.map((g, n) => (n === column ? { ...g, children: list } : g)));

  const move = (column: number | null, i: number, d: -1 | 1) => {
    const list = [...listAt(column)];
    [list[i], list[i + d]] = [list[i + d], list[i]];
    persist(withList(column, list), "Order saved.", items);
  };
  const remove = (column: number | null, i: number) => {
    const list = listAt(column);
    persist(withList(column, list.filter((_, n) => n !== i)), `Removed "${list[i].label}".`, items);
  };

  const rows = (column: number | null) => {
    const list = listAt(column);
    return (
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead className="border-b border-line bg-canvas/60">
            <tr className="text-left text-xs font-semibold uppercase tracking-wide text-ink-muted">
              <th scope="col" className="w-12 px-4 py-2.5">
                #
              </th>
              <th scope="col" className="px-2 py-2.5">
                Label
              </th>
              <th scope="col" className="px-2 py-2.5">
                Points to
              </th>
              <th scope="col" className="px-2 py-2.5">
                Type
              </th>
              <th scope="col" className="px-4 py-2.5 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {list.map((item, i) => {
              const target = isExternal(item.href) ? null : pageForPath(item.href);
              const key = `${column ?? "n"}-${i}`;
              const res = results[key];
              return (
                <tr key={`${i}-${item.label}-${item.href}`} className="h-[52px] border-b border-line last:border-0 hover:bg-canvas/40">
                  <td className="px-4 py-2 tabular-nums text-ink-muted">{i + 1}</td>
                  <td className="px-2 py-2 font-medium text-ink">{item.label}</td>
                  <td className="max-w-[260px] truncate px-2 py-2 font-mono text-xs text-ink-muted">{item.href}</td>
                  <td className="px-2 py-2">
                    <Chip>{isExternal(item.href) ? "External" : "Page"}</Chip>
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex flex-wrap items-center justify-end gap-1">
                      {target && (
                        <Link href={`?item=${target}`} scroll={false} className="mr-1 text-[13px] font-medium text-primary underline-offset-2 hover:underline">
                          Open page &rarr;
                        </Link>
                      )}
                      {isExternal(item.href) && item.href.startsWith("https://") && (
                        <>
                          <Button size="sm" disabled={res === "checking"} onClick={() => check(key, item.href)}>
                            {res === "checking" ? "Checking..." : "Check link"}
                          </Button>
                          {res && res !== "checking" && (
                            <Chip tone={res.state === "up" ? "green" : "red"} title={res.detail}>
                              {res.state === "up" ? "Reachable" : "Not reachable"}
                            </Chip>
                          )}
                        </>
                      )}
                      {canEdit && (
                        <>
                          <Button size="sm" onClick={() => setEditing({ column, index: i, item })} aria-label={`Edit ${item.label}`}>
                            Edit
                          </Button>
                          <button type="button" aria-label={`Move ${item.label} up`} disabled={pending || i === 0} onClick={() => move(column, i, -1)} className={iconButton}>
                            <Icon name="up" size={16} />
                          </button>
                          <button type="button" aria-label={`Move ${item.label} down`} disabled={pending || i === list.length - 1} onClick={() => move(column, i, 1)} className={iconButton}>
                            <Icon name="down" size={16} />
                          </button>
                          <button type="button" aria-label={`Remove ${item.label}`} title="Remove" disabled={pending} onClick={() => remove(column, i)} className="rounded p-1.5 text-danger hover:bg-danger-soft disabled:opacity-30">
                            <Icon name="trash" size={16} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {list.length === 0 && <p className="px-4 py-6 text-center text-[13px] text-ink-muted">No links yet. Add your first link.</p>}
      </div>
    );
  };

  const addButton = (column: number | null) =>
    canEdit && (
      <Button size="sm" disabled={listAt(column).length >= MAX_LINKS} onClick={() => setEditing({ column, index: null, item: { label: "", href: "" } })}>
        + Add link
      </Button>
    );

  const title = kind === "navbar" ? "Navbar" : "Footer";

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-[20px] font-semibold tracking-tight text-ink">{title}</h2>
          {status === "published" ? <Chip tone="green">Live</Chip> : <Chip>Draft</Chip>}
          <Chip tone={failing.length === 0 ? "green" : "amber"}>{failing.length === 0 ? "Links OK" : "Links need fixing"}</Chip>
          {unpublished && <Chip tone="amber">Unsaved changes</Chip>}
        </div>
        {canEdit && canPublish && (
          <Button variant="primary" onClick={publish} disabled={pending || failing.length > 0 || status === "published"} title={failing.length > 0 ? `Fix first: ${failing.map((c) => c.label).join(", ")}` : status === "published" ? "Nothing to publish" : undefined}>
            {pending ? "Working..." : "Publish"}
          </Button>
        )}
      </div>
      <p className="mb-4 max-w-2xl text-[13px] text-ink-muted">
        {kind === "navbar" ? "These links appear at the top of every page." : "These link columns appear at the bottom of every page."} Up to {kind === "navbar" ? `${MAX_LINKS} links` : `${MAX_COLUMNS} columns of ${MAX_LINKS} links`}. Entries marked Automatic are filled in by the site and cannot be edited here.
      </p>

      {failing.length > 0 && (
        <div className="mb-4 rounded-control bg-warning-soft px-3 py-2 text-[13px] text-warning">
          <p className="font-medium">Before this can be published:</p>
          <ul className="mt-1 list-disc space-y-0.5 pl-5">
            {failing.map((c) => (
              <li key={c.id}>
                {c.label}
                {c.detail ? ` (${c.detail})` : ""}
              </li>
            ))}
          </ul>
        </div>
      )}

      <SiteDetails kind={kind} initial={state.draft.data} canEdit={canEdit} onSave={(patch) => saveAndGoLive({ ...base, data: { ...base.data, ...patch } }, "Saved.")} />

      {kind === "navbar" ? (
        <section className="rounded-card border border-line bg-surface shadow-card">
          <div className="flex items-center justify-between border-b border-line px-4 py-3">
            <p className="text-[13px] text-ink-muted">
              {items.length} of {MAX_LINKS} links
            </p>
            {addButton(null)}
          </div>
          {rows(null)}
        </section>
      ) : items.length === 0 ? (
        <EmptyState title="No columns yet." description="Add your first column of links." action={canEdit ? <Button variant="primary" onClick={() => setColumnEdit({ index: null, label: "" })}>+ Add column</Button> : undefined} />
      ) : (
        <div className="space-y-4">
          {items.map((group, gi) => (
            <section key={gi} className="rounded-card border border-line bg-surface shadow-card">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-4 py-3">
                <div>
                  <h3 className="text-base font-semibold text-ink">{group.label}</h3>
                  <p className="text-xs text-ink-muted">
                    Column {gi + 1} &middot; {(group.children ?? []).length} of {MAX_LINKS} links
                  </p>
                </div>
                {canEdit && (
                  <div className="flex flex-wrap items-center gap-1">
                    {addButton(gi)}
                    <Button size="sm" onClick={() => setColumnEdit({ index: gi, label: group.label })}>
                      Rename
                    </Button>
                    <Button size="sm" disabled={pending} onClick={() => persist(items.filter((_, n) => n !== gi), `Removed the "${group.label}" column.`, items)}>
                      Remove
                    </Button>
                  </div>
                )}
              </div>
              {rows(gi)}
            </section>
          ))}
          {canEdit && (
            <Button disabled={items.length >= MAX_COLUMNS} onClick={() => setColumnEdit({ index: null, label: "" })}>
              + Add column
            </Button>
          )}
        </div>
      )}

      {automatic.length > 0 && (
        <div className="mt-4 flex flex-wrap items-start gap-3 rounded-card border border-dashed border-line bg-canvas/50 px-4 py-3">
          <Icon name="lock" size={16} className="mt-0.5 shrink-0 text-ink-muted" />
          <div className="min-w-0 text-[13px]">
            <p className="font-medium text-ink">Managed by the site</p>
            <p className="mt-0.5 text-ink-muted">
              {automatic.map((x, n) => (
                <span key={x.label}>
                  {n > 0 && " · "}
                  <span className="text-ink">{x.label}</span> ({x.note.charAt(0).toLowerCase() + x.note.slice(1)})
                </span>
              ))}
              . These are filled in automatically and cannot be edited here.
            </p>
          </div>
        </div>
      )}

      {editing && (
        <LinkModal
          key={`${editing.column}-${editing.index}`}
          editing={editing}
          pages={pages}
          onClose={() => setEditing(null)}
          onSave={(item) => {
            const list = [...listAt(editing.column)];
            if (editing.index === null) list.push(item);
            else list[editing.index] = { ...list[editing.index], ...item };
            persist(withList(editing.column, list), editing.index === null ? "Link added." : "Link saved.");
            setEditing(null);
          }}
        />
      )}
      {columnEdit && (
        <ColumnModal
          label={columnEdit.label}
          isNew={columnEdit.index === null}
          onClose={() => setColumnEdit(null)}
          onSave={(label) => {
            persist(columnEdit.index === null ? [...items, { label, href: "", cta: false, children: [] }] : items.map((g, n) => (n === columnEdit.index ? { ...g, label } : g)), "Column saved.");
            setColumnEdit(null);
          }}
        />
      )}
    </div>
  );
}

function LinkModal({ editing, pages, onClose, onSave }: { editing: Editing; pages: PageOption[]; onClose: () => void; onSave: (item: Item) => void }) {
  const { item } = editing;
  const startType = item.href && isExternal(item.href) ? "external" : "page";
  const [label, setLabel] = useState(item.label);
  const [type, setType] = useState<"page" | "external">(startType);
  const [path, setPath] = useState(startType === "page" ? item.href : "");
  const [url, setUrl] = useState(startType === "external" ? item.href : "");
  const [errors, setErrors] = useState<{ label?: string; target?: string }>({});
  const [asking, setAsking] = useState(false);

  const options = path && !pages.some((p) => p.path === path) ? [{ label: path, path }, ...pages] : pages;
  const dirty = label !== item.label || (type === "page" ? path : url) !== item.href || type !== startType;

  const submit = () => {
    const href = type === "page" ? path : url.trim();
    const e: typeof errors = {};
    if (!label.trim() || label.trim().length > 60) e.label = "Give it a name of 1 to 60 characters.";
    const problem = targetProblem(type, href);
    if (problem) e.target = problem;
    setErrors(e);
    if (e.label || e.target) return;
    onSave({ ...item, label: label.trim(), href });
  };

  const close = () => (dirty ? setAsking(true) : onClose());

  return (
    <>
      <Modal
        open
        title={editing.index === null ? "Add link" : "Edit link"}
        size="md"
        onClose={close}
        badges={dirty ? <Chip tone="amber">Unsaved changes</Chip> : undefined}
        footer={
          <>
            <Button onClick={close}>Cancel</Button>
            <Button variant="primary" onClick={submit}>
              Save link
            </Button>
          </>
        }
      >
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          <Field label="Label" htmlFor="l-label" hint="1 to 60 characters. This is the text visitors see.">
            <Input id="l-label" value={label} maxLength={60} onChange={(e) => setLabel(e.target.value)} aria-invalid={Boolean(errors.label)} />
            {errors.label && <p role="alert" className="text-xs text-danger">{errors.label}</p>}
          </Field>
          <Field label="Type" htmlFor="l-type">
            <Select id="l-type" value={type} onChange={(e) => setType(e.target.value as "page" | "external")}>
              <option value="page">Page on this site</option>
              <option value="external">External link</option>
            </Select>
          </Field>
          {type === "page" ? (
            <Field label="Points to" htmlFor="l-path" hint="The path is filled in for you.">
              <Select id="l-path" value={path} onChange={(e) => setPath(e.target.value)} aria-invalid={Boolean(errors.target)}>
                <option value="">Choose a page</option>
                {options.map((p) => (
                  <option key={p.path} value={p.path}>
                    {p.label} ({p.path})
                  </option>
                ))}
              </Select>
              {errors.target && <p role="alert" className="text-xs text-danger">{errors.target}</p>}
            </Field>
          ) : (
            <Field label="Address" htmlFor="l-url" hint="https:// only. mailto: and tel: links also work.">
              <Input id="l-url" value={url} placeholder="https://" onChange={(e) => setUrl(e.target.value)} aria-invalid={Boolean(errors.target)} className="font-mono text-[13px]" />
              {errors.target && <p role="alert" className="text-xs text-danger">{errors.target}</p>}
            </Field>
          )}
        </form>
      </Modal>
      <DiscardDialog open={asking} what="link" onKeep={() => setAsking(false)} onDiscard={() => (setAsking(false), onClose())} />
    </>
  );
}

function ColumnModal({ label: initial, isNew, onClose, onSave }: { label: string; isNew: boolean; onClose: () => void; onSave: (label: string) => void }) {
  const [label, setLabel] = useState(initial);
  const [error, setError] = useState<string | null>(null);
  const submit = () => {
    if (!label.trim() || label.trim().length > 60) return setError("Give it a name of 1 to 60 characters.");
    onSave(label.trim());
  };
  return (
    <Modal
      open
      title={isNew ? "Add column" : "Rename column"}
      size="sm"
      onClose={onClose}
      footer={
        <>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="primary" onClick={submit}>
            Save
          </Button>
        </>
      }
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <Field label="Column title" htmlFor="c-label">
          <Input id="c-label" value={label} maxLength={60} onChange={(e) => setLabel(e.target.value)} />
          {error && <p role="alert" className="text-xs text-danger">{error}</p>}
        </Field>
      </form>
    </Modal>
  );
}
