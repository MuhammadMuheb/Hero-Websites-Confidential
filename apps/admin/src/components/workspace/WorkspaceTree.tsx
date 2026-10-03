"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { WORKSPACE_TREE } from "@/lib/nav";

interface WorkspaceTreeProps {
  projectId: string;
  projectName: string;
  badge?: ReactNode;
  /** Real counts keyed by tree path. */
  counts?: Record<string, number>;
  /** The project's live site (https), when it has one. */
  liveUrl?: string | null;
}

function TreeList({ projectId, counts = {}, liveUrl }: { projectId: string; counts?: Record<string, number>; liveUrl?: string | null }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Project content" className="space-y-5">
      <ul className="space-y-0.5 border-b border-line pb-3">
        {liveUrl && (
          <li>
            <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between rounded-control px-2 py-1.5 text-sm text-primary hover:bg-canvas">
              <span>Live site</span>
              <span aria-hidden="true">&#8599;</span>
              <span className="sr-only">(opens {liveUrl} in a new tab)</span>
            </a>
          </li>
        )}
        <li>
          <Link href={`/projects/edit/${projectId}`} className="flex items-center rounded-control px-2 py-1.5 text-sm text-ink hover:bg-canvas">
            Project settings
          </Link>
        </li>
      </ul>
      {WORKSPACE_TREE.map((group) => (
        <div key={group.title}>
          <h3 className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-wider text-ink-muted">{group.title}</h3>
          <ul className="space-y-0.5">
            {group.items.map((item) => {
              const href = `/projects/${projectId}/${item.path}`;
              const active = pathname === href;
              return (
                <li key={item.path}>
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={clsx(
                      "flex items-center justify-between rounded-control px-2 py-1.5 text-sm",
                      active ? "bg-primary-soft font-medium text-primary" : "text-ink hover:bg-canvas",
                    )}
                  >
                    <span>{item.label}</span>
                    {counts[item.path] !== undefined && <span className="text-xs text-ink-muted">{counts[item.path]}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

export function WorkspaceTree({ projectId, projectName, badge, counts, liveUrl }: WorkspaceTreeProps) {
  return (
    <>
      <details className="rounded-card border border-line bg-surface shadow-card lg:hidden">
        <summary className="flex cursor-pointer items-center justify-between px-4 py-3 text-sm font-semibold">
          <span>{projectName}: content tree</span>
          {badge}
        </summary>
        <div className="border-t border-line p-3">
          <TreeList projectId={projectId} counts={counts} liveUrl={liveUrl} />
        </div>
      </details>

      <aside className="hidden lg:block">
        <div className="sticky top-[calc(theme(spacing.topbar)+24px)] rounded-card border border-line bg-surface p-3 shadow-card">
          <div className="mb-3 flex items-center justify-between gap-2 px-2">
            <p className="text-sm font-semibold leading-tight">{projectName}</p>
            {badge}
          </div>
          <TreeList projectId={projectId} counts={counts} liveUrl={liveUrl} />
        </div>
      </aside>
    </>
  );
}
