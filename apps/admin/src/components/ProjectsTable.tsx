"use client";

import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState, useTransition } from "react";
import { deleteProject, getProjectDeleteInfo } from "@/app/actions/projects";
import { ProjectForm } from "@/components/ProjectForm";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Chip, type ChipTone } from "@/components/ui/Chip";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { DiscardDialog } from "@/components/ui/DiscardDialog";
import { EmptyState } from "@/components/ui/EmptyState";
import { Icon } from "@/components/ui/Icon";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import type { Project, ProjectStatus } from "@/lib/types";

export interface ProjectRow extends Project {
  /** Where the project name leads: the live address, or null when the project has none. */
  openUrl: string | null;
}

type SortKey = "name" | "status" | "cards" | "lastEdit";
type StatusFilter = "all" | ProjectStatus;

const PAGE_SIZE = 25;
const STATUS_LABEL: Record<ProjectStatus, string> = { live: "Live", coming_soon: "Coming soon", archived: "Archived" };
const STATUS_TONE: Record<ProjectStatus, ChipTone> = { live: "green", coming_soon: "amber", archived: "grey" };
const STATUS_RANK: Record<ProjectStatus, number> = { live: 0, coming_soon: 1, archived: 2 };
const TABS: { id: StatusFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "live", label: "Live" },
  { id: "coming_soon", label: "Coming soon" },
  { id: "archived", label: "Archived" },
];

/** "Today 14:02", "Yesterday", "3 Oct 2026", or "No edits yet". */
function formatEdit(iso: string | null): string {
  if (!iso) return "No edits yet";
  const d = new Date(iso);
  const now = new Date();
  const day = (x: Date) => Math.floor(new Date(x.getFullYear(), x.getMonth(), x.getDate()).getTime() / 86_400_000);
  const diff = day(now) - day(d);
  if (diff === 0) return `Today ${d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}`;
  if (diff === 1) return "Yesterday";
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

type ModalState = { kind: "edit"; project: ProjectRow } | { kind: "new" } | { kind: "delete"; project: ProjectRow } | null;

export function ProjectsTable({ rows, canCreate, canManage }: { rows: ProjectRow[]; canCreate: boolean; canManage: boolean }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const { notify } = useToast();
  const searchRef = useRef<HTMLInputElement>(null);

  // The view lives in the address bar, so it survives a refresh and can be bookmarked.
  const q = params.get("q") ?? "";
  const status = (TABS.some((t) => t.id === params.get("status")) ? params.get("status") : "all") as StatusFilter;
  const sort = (["name", "status", "cards", "lastEdit"].includes(params.get("sort") ?? "") ? params.get("sort") : "") as SortKey | "";
  const dir = params.get("dir") === "desc" ? "desc" : "asc";
  const page = Math.max(1, Number(params.get("page")) || 1);

  const setView = useCallback(
    (next: Record<string, string | null>) => {
      const p = new URLSearchParams(params.toString());
      for (const [k, v] of Object.entries(next)) {
        if (v === null || v === "" || (k === "status" && v === "all") || (k === "page" && v === "1")) p.delete(k);
        else p.set(k, v);
      }
      const qs = p.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [params, pathname, router],
  );

  const [search, setSearch] = useState(q);
  useEffect(() => setSearch(q), [q]);
  useEffect(() => {
    if (search === q) return;
    const t = window.setTimeout(() => setView({ q: search.trim(), page: null }), 200);
    return () => window.clearTimeout(t);
  }, [search, q, setView]);

  // "/" jumps to the search box.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      if (e.key === "/" && !e.ctrlKey && !e.metaKey && el && !/^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName) && !el.isContentEditable) {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const counts = useMemo(() => {
    const c = { all: rows.length, live: 0, coming_soon: 0, archived: 0 };
    for (const r of rows) c[r.status] += 1;
    return c;
  }, [rows]);

  const visible = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const list = rows.filter((r) => (status === "all" || r.status === status) && (!needle || r.name.toLowerCase().includes(needle) || r.domain.toLowerCase().includes(needle) || r.slug.includes(needle)));
    const byName = (a: ProjectRow, b: ProjectRow) => a.name.localeCompare(b.name);
    const sign = dir === "desc" ? -1 : 1;
    return [...list].sort((a, b) => {
      if (!sort) return STATUS_RANK[a.status] - STATUS_RANK[b.status] || byName(a, b); // default: Live first, then name
      const diff = sort === "name" ? byName(a, b) : sort === "status" ? STATUS_RANK[a.status] - STATUS_RANK[b.status] : sort === "cards" ? a.cards - b.cards : (a.lastEdit ?? "").localeCompare(b.lastEdit ?? "");
      return sign * diff || byName(a, b);
    });
  }, [rows, q, status, sort, dir]);

  const pages = Math.max(1, Math.ceil(visible.length / PAGE_SIZE));
  const current = Math.min(page, pages);
  const shown = visible.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  const [modal, setModal] = useState<ModalState>(null);

  const sortBy = (key: SortKey) => setView({ sort: key, dir: sort === key && dir === "asc" ? "desc" : "asc", page: null });
  const ariaSort = (key: SortKey) => (sort === key ? (dir === "asc" ? "ascending" : "descending") : "none");
  const Head = ({ k, children, className }: { k: SortKey; children: string; className?: string }) => (
    <th scope="col" aria-sort={ariaSort(k)} className={clsx("px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-ink-muted", className)}>
      <button type="button" onClick={() => sortBy(k)} className="inline-flex items-center gap-1 rounded hover:text-ink">
        {children}
        {sort === k && <Icon name={dir === "asc" ? "up" : "down"} size={12} />}
      </button>
    </th>
  );

  return (
    <>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="relative w-full sm:max-w-sm">
          <label htmlFor="project-search" className="sr-only">
            Search projects
          </label>
          <Icon name="search" size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" />
          <input
            id="project-search"
            ref={searchRef}
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects"
            className="h-9 w-full rounded-control border border-line bg-surface pl-9 pr-3 text-sm placeholder:text-ink-muted/70"
          />
        </div>
        {canCreate && (
          <Button variant="primary" onClick={() => setModal({ kind: "new" })}>
            + New project
          </Button>
        )}
      </div>

      <div role="tablist" aria-label="Filter by status" className="mb-3 flex flex-wrap gap-1">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={status === t.id}
            onClick={() => setView({ status: t.id, page: null })}
            className={clsx("rounded-control px-3 py-1.5 text-[13px] font-medium", status === t.id ? "bg-primary text-white" : "bg-surface text-ink hover:bg-line/50")}
          >
            {t.label} <span className={status === t.id ? "text-white/80" : "text-ink-muted"}>{counts[t.id]}</span>
          </button>
        ))}
      </div>

      {rows.length === 0 ? (
        <EmptyState
          title="No projects to show"
          description={canCreate ? "Create your first project to get started." : "You have not been assigned to any project yet. Ask a Super Admin."}
          action={canCreate ? <Button variant="primary" onClick={() => setModal({ kind: "new" })}>+ New project</Button> : undefined}
        />
      ) : visible.length === 0 ? (
        <EmptyState title="No projects match your search." description="Try another name or domain, or clear the filters." action={<Button onClick={() => (setSearch(""), setView({ q: null, status: null, page: null }))}>Clear search</Button>} />
      ) : (
        <div className="overflow-x-auto rounded-card border border-line bg-surface shadow-card">
          <table className="w-full min-w-[760px] border-collapse text-sm">
            <thead className="border-b border-line bg-canvas/60">
              <tr>
                <Head k="name">Project</Head>
                <Head k="status">Status</Head>
                <Head k="cards" className="text-right">
                  Cards
                </Head>
                <Head k="lastEdit">Last edit</Head>
                <th scope="col" className="px-4 py-2.5 text-right text-xs font-semibold uppercase tracking-wide text-ink-muted">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {shown.map((p) => (
                <tr key={p.id} className="h-[60px] border-b border-line last:border-0 hover:bg-canvas/40">
                  <td className="px-4 py-2">
                    {p.openUrl ? (
                      <a href={p.openUrl} target="_blank" rel="noopener noreferrer" title={`Open ${p.openUrl}`} className="font-medium text-primary underline-offset-2 hover:underline">
                        {p.name}
                        <span aria-hidden="true"> &#8599;</span>
                        <span className="sr-only"> (opens the live site in a new tab)</span>
                      </a>
                    ) : (
                      <span className="font-medium text-ink">{p.name}</span>
                    )}
                    {p.openUrl ? (
                      <p className="text-xs text-ink-muted">{p.domain || p.openUrl}</p>
                    ) : (
                      <p className="text-xs text-warning" title="No address set. Add a public URL in Edit.">
                        No address set
                      </p>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    <Chip tone={STATUS_TONE[p.status]}>{STATUS_LABEL[p.status]}</Chip>
                  </td>
                  <td className="px-4 py-2 text-right tabular-nums">{p.cards}</td>
                  <td className="px-4 py-2 text-ink-muted">{formatEdit(p.lastEdit)}</td>
                  <td className="px-4 py-2">
                    <div className="flex items-center justify-end gap-2">
                      <ButtonLink href={`/projects/${p.id}`} variant="primary" size="sm">
                        Open
                      </ButtonLink>
                      {canManage && (
                        <>
                          <Button size="sm" onClick={() => setModal({ kind: "edit", project: p })} aria-label={`Edit ${p.name}`}>
                            Edit
                          </Button>
                          <Button size="sm" variant="danger" onClick={() => setModal({ kind: "delete", project: p })} aria-label={`Delete ${p.name}`}>
                            Delete
                          </Button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-4 py-3 text-[13px] text-ink-muted">
            <p>
              Showing {(current - 1) * PAGE_SIZE + 1} to {Math.min(current * PAGE_SIZE, visible.length)} of {visible.length} {visible.length === 1 ? "project" : "projects"}
            </p>
            {pages > 1 && (
              <nav aria-label="Pages" className="flex items-center gap-1">
                <Button size="sm" disabled={current === 1} onClick={() => setView({ page: String(current - 1) })}>
                  Previous
                </Button>
                {Array.from({ length: pages }, (_, i) => i + 1)
                  .filter((n) => n === 1 || n === pages || Math.abs(n - current) <= 1)
                  .map((n, i, all) => (
                    <span key={n} className="flex items-center gap-1">
                      {i > 0 && all[i - 1] !== n - 1 && <span aria-hidden="true">…</span>}
                      <button type="button" aria-current={n === current ? "page" : undefined} onClick={() => setView({ page: String(n) })} className={clsx("h-8 min-w-8 rounded-control px-2 text-[13px] font-medium", n === current ? "bg-primary text-white" : "hover:bg-canvas")}>
                        {n}
                      </button>
                    </span>
                  ))}
                <Button size="sm" disabled={current === pages} onClick={() => setView({ page: String(current + 1) })}>
                  Next
                </Button>
              </nav>
            )}
          </div>
        </div>
      )}

      <ProjectModals modal={modal} onClose={() => setModal(null)} notify={notify} />
    </>
  );
}

function ProjectModals({ modal, onClose, notify }: { modal: ModalState; onClose: () => void; notify: ReturnType<typeof useToast>["notify"] }) {
  const router = useRouter();
  const [dirty, setDirty] = useState(false);
  const [asking, setAsking] = useState(false);
  const [created, setCreated] = useState<string | null>(null);

  // Delete
  const [info, setInfo] = useState<{ cards: number; images: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const kind = modal?.kind;
  const project = modal && modal.kind !== "new" ? modal.project : null;
  const slug = project?.slug;

  useEffect(() => {
    setDirty(false);
    setAsking(false);
    setCreated(null);
    setError(null);
    setInfo(null);
    if (kind !== "delete" || !slug) return;
    let alive = true;
    getProjectDeleteInfo(slug).then((r) => alive && r.ok && setInfo(r.data));
    return () => {
      alive = false;
    };
  }, [kind, slug]);

  const requestClose = () => (dirty && !created ? setAsking(true) : onClose());

  const remove = () => {
    if (!project) return;
    startTransition(async () => {
      setError(null);
      const r = await deleteProject(project.slug, project.slug);
      if (!r.ok) return setError(r.error);
      const { removed, revalidateError } = r.data;
      notify(revalidateError ? `Deleted ${project.name}, but the public site could not be refreshed yet.` : `Deleted ${project.name} (${removed.cards} cards, ${removed.images} images removed).`, { tone: revalidateError ? "error" : "success" });
      onClose();
      router.refresh();
    });
  };

  return (
    <>
      <Modal
        open={kind === "edit" || kind === "new"}
        title={created ? "Project created." : kind === "new" ? "New project" : "Edit project"}
        subtitle={kind === "edit" && project ? project.name : undefined}
        size="lg"
        onClose={requestClose}
        badges={dirty && !created ? <Chip tone="amber">Unsaved changes</Chip> : undefined}
      >
        {created ? (
          <div className="space-y-4">
            <p className="text-sm">Your project is ready. Open it to add pages and cards, or start from a content file.</p>
            <div className="flex flex-wrap gap-2">
              <ButtonLink href={`/projects/${created}`} variant="primary">
                Open project
              </ButtonLink>
              <ButtonLink href={`/projects/${created}/import`}>Upload content file</ButtonLink>
              <Button onClick={onClose}>Close</Button>
            </div>
          </div>
        ) : (
          (kind === "edit" || kind === "new") && (
            <ProjectForm
              key={project?.id ?? "new"}
              project={project ?? undefined}
              onDirtyChange={setDirty}
              onCancel={requestClose}
              onSaved={(r) => {
                setDirty(false);
                if (r.created) setCreated(r.slug);
                else onClose();
              }}
            />
          )
        )}
      </Modal>
      <DiscardDialog
        open={asking}
        what="project"
        onKeep={() => setAsking(false)}
        onDiscard={() => {
          setAsking(false);
          setDirty(false);
          onClose();
        }}
      />

      <ConfirmDialog
        open={kind === "delete" && project !== null}
        title="Delete project?"
        confirmLabel="Delete project"
        tone="danger"
        typeToConfirm={project?.slug}
        typeLabel={
          <>
            Type the project slug <code className="rounded bg-canvas px-1 font-mono text-xs">{project?.slug}</code> to confirm
          </>
        }
        blockedReason={project?.status === "live" ? "This project is Live. Visitors will lose the site immediately. Set its status to Coming soon or Archived in Edit first, then delete it." : undefined}
        busy={pending}
        error={error}
        onConfirm={remove}
        onCancel={onClose}
      >
        {project && (
          <>
            <p>
              <strong>{project.name}</strong>
            </p>
            <p className="text-[13px] text-ink-muted">
              {project.domain || "No domain"} &middot; {STATUS_LABEL[project.status]}
            </p>
            <p>
              This permanently removes the project, its {info?.cards ?? project.cards} cards and {info ? info.images : "its"} images. It leaves Our Network. This cannot be undone.
            </p>
          </>
        )}
      </ConfirmDialog>
    </>
  );
}
