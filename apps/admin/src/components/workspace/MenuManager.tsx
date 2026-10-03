"use client";

import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { publishPage, saveDraft } from "@/app/actions/content";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Field";
import { Icon } from "@/components/ui/Icon";
import { PageHeader } from "@/components/ui/PageHeader";
import { useToast } from "@/components/ui/Toast";
import type { PageDraft, PageState } from "@/lib/types";

/** One link. In the footer, a column is an item whose `children` are its links. */
interface Item {
  label: string;
  href: string;
  cta?: boolean;
  children?: Item[];
}

interface Props {
  projectSlug: string;
  projectName: string;
  /** "navbar": a flat list of links. "footer": columns of links. */
  kind: "navbar" | "footer";
  state: PageState;
  canEdit: boolean;
  canPublish: boolean;
  /** Links that are filled in automatically on the site (shown locked, so nobody looks for them). */
  automatic?: { label: string; note: string }[];
}

const BLANK: Item = { label: "", href: "" };
const same = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);

/** A target is a site path, an https link, a mailto or a tel link. */
function problem(item: Item, needsHref: boolean): string | null {
  if (!item.label.trim()) return "Give it a name.";
  if (!needsHref) return null;
  const href = item.href.trim();
  if (href.startsWith("/") && !href.startsWith("//")) return href === href.toLowerCase() ? null : "Site paths are lower case, for example /about.";
  return /^(https:\/\/|mailto:|tel:)\S+$/i.test(href) ? null : "Use a site path like /about, or a full https:// link.";
}

const iconButton = "rounded p-1.5 text-ink-muted hover:bg-canvas hover:text-ink disabled:opacity-30";

/**
 * One line with a pencil. The pencil turns it into inline fields with Save and Cancel; Save keeps the change and
 * stores it straight away. `onChange` only changes the list on screen (used for order and removal).
 */
function Line({
  item,
  withHref,
  canEdit,
  first,
  last,
  startEditing,
  onSave,
  onCancelNew,
  onMove,
  onRemove,
  busy,
}: {
  item: Item;
  withHref: boolean;
  canEdit: boolean;
  first: boolean;
  last: boolean;
  startEditing: boolean;
  onSave: (next: Item) => void;
  onCancelNew: () => void;
  onMove: (delta: -1 | 1) => void;
  onRemove: () => void;
  busy: boolean;
}) {
  const [editing, setEditing] = useState(startEditing);
  const [label, setLabel] = useState(item.label);
  const [href, setHref] = useState(item.href);
  const [error, setError] = useState<string | null>(null);

  const open = () => {
    setLabel(item.label);
    setHref(item.href);
    setError(null);
    setEditing(true);
  };
  const cancel = () => {
    if (!item.label && !item.href) return onCancelNew();
    setEditing(false);
  };
  const save = () => {
    const next = { ...item, label: label.trim(), href: withHref ? href.trim() : item.href };
    const issue = problem(next, withHref);
    if (issue) return setError(issue);
    setEditing(false);
    onSave(next);
  };

  if (editing) {
    return (
      <li className="rounded-control border border-primary/40 bg-primary-soft/40 p-3">
        <div className={clsx("grid gap-2", withHref && "sm:grid-cols-2")}>
          <label className="block space-y-1">
            <span className="text-xs font-medium text-ink-muted">Name</span>
            <Input autoFocus value={label} onChange={(e) => setLabel(e.target.value)} onKeyDown={(e) => e.key === "Enter" && save()} maxLength={60} />
          </label>
          {withHref && (
            <label className="block space-y-1">
              <span className="text-xs font-medium text-ink-muted">Opens</span>
              <Input value={href} placeholder="/about" onChange={(e) => setHref(e.target.value)} onKeyDown={(e) => e.key === "Enter" && save()} className="font-mono text-[13px]" />
            </label>
          )}
        </div>
        {error && (
          <p role="alert" className="mt-2 text-[13px] text-danger">
            {error}
          </p>
        )}
        <div className="mt-3 flex gap-2">
          <Button size="sm" variant="primary" onClick={save} disabled={busy}>
            Save
          </Button>
          <Button size="sm" onClick={cancel}>
            Cancel
          </Button>
        </div>
      </li>
    );
  }

  return (
    <li className="group flex items-center gap-2 rounded-control px-2 py-1.5 hover:bg-canvas">
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-ink">{item.label}</p>
        {withHref && <p className="truncate font-mono text-xs text-ink-muted">{item.href}</p>}
      </div>
      {canEdit && (
        <div className="flex shrink-0 items-center">
          <button type="button" aria-label={`Edit ${item.label}`} title="Edit" onClick={open} className={clsx(iconButton, "text-primary")}>
            <Icon name="pencil" size={16} />
          </button>
          <button type="button" aria-label={`Move ${item.label} up`} disabled={first} onClick={() => onMove(-1)} className={iconButton}>
            <Icon name="up" size={16} />
          </button>
          <button type="button" aria-label={`Move ${item.label} down`} disabled={last} onClick={() => onMove(1)} className={iconButton}>
            <Icon name="down" size={16} />
          </button>
          <button type="button" aria-label={`Remove ${item.label}`} title="Remove" onClick={onRemove} className="rounded p-1.5 text-danger hover:bg-danger-soft">
            <Icon name="trash" size={16} />
          </button>
        </div>
      )}
    </li>
  );
}

function List({
  items,
  withHref,
  canEdit,
  newIndex,
  onCommit,
  onChange,
  addLabel,
  busy,
  empty,
}: {
  items: Item[];
  withHref: boolean;
  canEdit: boolean;
  /** Index of a row that was just added and starts in edit mode. */
  newIndex: number | null;
  onCommit: (next: Item[]) => void;
  onChange: (next: Item[]) => void;
  addLabel: string;
  busy: boolean;
  empty: string;
}) {
  const [added, setAdded] = useState<number | null>(newIndex);
  const move = (i: number, d: -1 | 1) => {
    const next = [...items];
    [next[i], next[i + d]] = [next[i + d], next[i]];
    onChange(next);
  };
  return (
    <div>
      {items.length === 0 && <p className="rounded-control border border-dashed border-line px-3 py-6 text-center text-[13px] text-ink-muted">{empty}</p>}
      <ul className="space-y-1">
        {items.map((item, i) => (
          <Line
            key={`${i}-${item.label}-${item.href}`}
            item={item}
            withHref={withHref}
            canEdit={canEdit}
            first={i === 0}
            last={i === items.length - 1}
            startEditing={added === i}
            busy={busy}
            onSave={(next) => {
              setAdded(null);
              onCommit(items.map((x, n) => (n === i ? next : x)));
            }}
            onCancelNew={() => {
              setAdded(null);
              onChange(items.filter((_, n) => n !== i));
            }}
            onMove={(d) => move(i, d)}
            onRemove={() => onChange(items.filter((_, n) => n !== i))}
          />
        ))}
      </ul>
      {canEdit && (
        <Button
          size="sm"
          className="mt-3"
          onClick={() => {
            setAdded(items.length);
            onChange([...items, { ...BLANK }]);
          }}
        >
          <Icon name="plus" size={16} /> {addLabel}
        </Button>
      )}
    </div>
  );
}

export function MenuManager({ projectSlug, projectName, kind, state, canEdit, canPublish, automatic }: Props) {
  const router = useRouter();
  const { notify } = useToast();
  const [pending, startTransition] = useTransition();

  const initial = ((state.draft.data[kind] as Item[] | undefined) ?? []).filter((i) => i && typeof i.label === "string");
  const [saved, setSaved] = useState<Item[]>(initial);
  const [items, setItems] = useState<Item[]>(initial);
  const [live, setLive] = useState(state.status === "published");
  const [version, setVersion] = useState(state.version);
  const [note, setNote] = useState<{ tone: "success" | "warning"; text: string; issues?: string[] }>();
  const dirty = !same(items, saved);
  const title = kind === "navbar" ? "Navbar" : "Footer";

  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  /** Stores `next` as the draft and, for people who may publish, makes it live in the same step. */
  const persist = (next: Item[]) => {
    setItems(next);
    startTransition(async () => {
      const draft: PageDraft = { ...state.draft, data: { ...state.draft.data, [kind]: next } };
      const s = await saveDraft(projectSlug, "navigation", draft);
      if (!s.ok) {
        setNote({ tone: "warning", text: s.error, issues: s.issues });
        return notify(s.error, { tone: "error" });
      }
      setSaved(next);
      if (!canPublish) {
        setNote({ tone: "success", text: "Saved as a draft. Someone with publish rights puts it live." });
        return notify("Saved as a draft");
      }
      const p = await publishPage(projectSlug, "navigation");
      if (!p.ok) {
        setLive(false);
        setNote({ tone: "warning", text: "Saved, but it is not live yet.", issues: p.issues?.length ? p.issues : [p.error] });
        return notify("Saved, but not live yet", { tone: "error" });
      }
      setLive(true);
      setVersion(p.data.version);
      setNote(p.data.revalidateError ? { tone: "warning", text: "Saved and published, but the site has not refreshed yet.", issues: [p.data.revalidateError] } : { tone: "success", text: `Saved and live (version ${p.data.version}).` });
      notify(p.data.revalidateError ? "Published, but the site was not refreshed" : "Saved and live", { tone: p.data.revalidateError ? "error" : "success" });
      router.refresh();
    });
  };

  const saveLabel = canPublish ? "Save and publish" : "Save draft";
  const badge = dirty ? <Badge tone="amber">Unsaved changes</Badge> : live ? <Badge tone="green">Live, version {version}</Badge> : <Badge tone="grey">Draft, not live</Badge>;
  const valid = (list: Item[], withHref: boolean) => list.every((i) => problem(i, withHref) === null);

  const saveBar = (
    <div className="mt-6 border-t border-line pt-4">
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="primary" disabled={pending || !dirty || (kind === "navbar" ? !valid(items, true) : !items.every((g) => problem(g, false) === null && valid(g.children ?? [], true)))} onClick={() => persist(items)}>
          {pending ? "Saving..." : saveLabel}
        </Button>
        <span className="text-[13px] text-ink-muted">{dirty ? "You have changes that are not saved yet." : "Everything is saved."}</span>
      </div>
      {note && (
        <div role="status" className={clsx("mt-3 rounded-control px-3 py-2 text-[13px]", note.tone === "success" ? "bg-primary-soft text-primary" : "bg-warning-soft text-warning")}>
          <p className="font-medium">{note.text}</p>
          {note.issues && note.issues.length > 0 && (
            <ul className="mt-1 list-disc space-y-0.5 pl-5">
              {note.issues.slice(0, 5).map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );

  return (
    <>
      <PageHeader
        title={title}
        badge={badge}
        breadcrumbs={[{ label: projectName, href: `/projects/${projectSlug}` }, { label: title }]}
        description={kind === "navbar" ? "The links at the top of every page. Click the pencil to rename a link or change where it goes." : "The link columns at the bottom of every page. Click the pencil to rename a column or a link."}
      />

      {kind === "navbar" ? (
        <section className="rounded-card border border-line bg-surface p-5 shadow-card">
          <List items={items} withHref canEdit={canEdit} newIndex={null} busy={pending} onCommit={persist} onChange={setItems} addLabel="Add a link" empty="No links yet." />
          {automatic && automatic.length > 0 && (
            <div className="mt-5 border-t border-line pt-4">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-ink-muted">Added automatically</p>
              <ul className="space-y-1">
                {automatic.map((a) => (
                  <li key={a.label} className="flex items-center justify-between gap-3 rounded-control px-2 py-1.5">
                    <span className="text-sm text-ink">{a.label}</span>
                    <span className="text-xs text-ink-muted">{a.note}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {canEdit && saveBar}
        </section>
      ) : (
        <div className="space-y-4">
          {items.map((group, gi) => (
            <section key={gi} className="rounded-card border border-line bg-surface p-5 shadow-card">
              <GroupTitle
                title={group.label}
                canEdit={canEdit}
                onSave={(label) => persist(items.map((g, n) => (n === gi ? { ...g, label } : g)))}
                onRemove={() => setItems(items.filter((_, n) => n !== gi))}
                isNew={!group.label}
              />
              <List
                items={group.children ?? []}
                withHref
                canEdit={canEdit}
                newIndex={null}
                busy={pending}
                onCommit={(children) => persist(items.map((g, n) => (n === gi ? { ...g, children } : g)))}
                onChange={(children) => setItems(items.map((g, n) => (n === gi ? { ...g, children } : g)))}
                addLabel="Add a link"
                empty="No links in this column."
              />
            </section>
          ))}
          {canEdit && items.length < 4 && (
            <Button onClick={() => setItems([...items, { label: "", href: "", children: [] }])}>
              <Icon name="plus" size={16} /> Add a column
            </Button>
          )}
          {canEdit && <div className="rounded-card border border-line bg-surface px-5 pb-5 shadow-card">{saveBar}</div>}
          {automatic && automatic.length > 0 && (
            <p className="text-xs text-ink-muted">
              Added automatically: {automatic.map((a) => `${a.label} (${a.note})`).join(", ")}.
            </p>
          )}
        </div>
      )}
    </>
  );
}

/** A footer column's name with its own pencil. */
function GroupTitle({ title, canEdit, isNew, onSave, onRemove }: { title: string; canEdit: boolean; isNew: boolean; onSave: (label: string) => void; onRemove: () => void }) {
  const [editing, setEditing] = useState(isNew);
  const [value, setValue] = useState(title);
  const [error, setError] = useState<string | null>(null);

  if (editing) {
    return (
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Input autoFocus value={value} maxLength={60} onChange={(e) => setValue(e.target.value)} className="max-w-xs" aria-label="Column name" onKeyDown={(e) => e.key === "Enter" && (value.trim() ? (setEditing(false), onSave(value.trim())) : setError("Give it a name."))} />
        <Button
          size="sm"
          variant="primary"
          onClick={() => {
            if (!value.trim()) return setError("Give it a name.");
            setEditing(false);
            onSave(value.trim());
          }}
        >
          Save
        </Button>
        <Button size="sm" onClick={() => (title ? setEditing(false) : onRemove())}>
          Cancel
        </Button>
        {error && <span className="text-[13px] text-danger">{error}</span>}
      </div>
    );
  }
  return (
    <div className="mb-4 flex items-center justify-between gap-2">
      <h2 className="text-base font-semibold text-ink">{title}</h2>
      {canEdit && (
        <div className="flex items-center">
          <button type="button" aria-label={`Rename ${title}`} title="Rename" onClick={() => (setValue(title), setError(null), setEditing(true))} className={clsx(iconButton, "text-primary")}>
            <Icon name="pencil" size={16} />
          </button>
          <button type="button" aria-label={`Remove the ${title} column`} title="Remove column" onClick={onRemove} className="rounded p-1.5 text-danger hover:bg-danger-soft">
            <Icon name="trash" size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
