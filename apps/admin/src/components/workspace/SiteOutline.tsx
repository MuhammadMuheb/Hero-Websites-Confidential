import clsx from "clsx";
import Link from "next/link";
import type { OutlineGroup } from "@/lib/content/outline";

const ROW = "flex items-center justify-between gap-2 rounded-control px-2.5 py-2 text-sm";

function List({ groups, selected, base }: { groups: OutlineGroup[]; selected: string; base: string }) {
  return (
    <nav aria-label="Site outline" className="space-y-4">
      {groups.map((g) => (
        <div key={g.title}>
          <h3 className="px-2.5 pb-1 text-[11px] font-semibold uppercase tracking-wider text-ink-muted">{g.title}</h3>
          <ul className="space-y-0.5">
            {g.items.map((item) => {
              const active = item.id === selected;
              const children = item.children ?? [];
              // Nested entries are part of the item they belong to: they open under it while it is selected.
              const open = active && children.length > 0;
              return (
                <li key={item.id}>
                  <Link href={`${base}?item=${item.id}`} scroll={false} aria-current={active ? "page" : undefined} aria-expanded={children.length > 0 ? open : undefined} className={clsx(ROW, active ? "bg-primary-soft font-medium text-primary" : "text-ink hover:bg-canvas")}>
                    <span className="truncate">{item.label}</span>
                    {item.count !== undefined && (
                      <span className="shrink-0 text-xs tabular-nums text-ink-muted">
                        {item.count}
                        {item.unit ? ` ${item.unit}` : ""}
                      </span>
                    )}
                  </Link>
                  {children.length > 0 && (
                    <div className={clsx("grid transition-[grid-template-rows,opacity] duration-150 ease-out motion-reduce:transition-none", open ? "grid-rows-[1fr] opacity-100" : "invisible grid-rows-[0fr] opacity-0")}>
                      <ul className="ml-4 min-h-0 space-y-0.5 overflow-hidden border-l border-line pl-2">
                        {children.map((c) => (
                          <li key={c.id}>
                            <Link href={`${base}?item=${c.id}`} scroll={false} tabIndex={open ? undefined : -1} className={clsx(ROW, "py-1.5 text-[13px] text-ink-muted hover:bg-canvas hover:text-ink")}>
                              <span className="truncate">{c.label}</span>
                              <span aria-hidden="true">&rarr;</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

/** The one navigation of the project editor: the site in the order a visitor meets it. */
export function SiteOutline({ groups, selected, base }: { groups: OutlineGroup[]; selected: string; base: string }) {
  const current = groups.flatMap((g) => g.items).find((i) => i.id === selected);
  return (
    <>
      <details className="rounded-card border border-line bg-surface shadow-card lg:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-semibold [&::-webkit-details-marker]:hidden">
          <span>Outline</span>
          <span className="font-normal text-ink-muted">{current?.label}</span>
        </summary>
        <div className="border-t border-line p-2">
          <List groups={groups} selected={selected} base={base} />
        </div>
      </details>
      <aside className="hidden lg:block">
        <div className="sticky top-[calc(theme(spacing.topbar)+24px)] rounded-card border border-line bg-surface p-3 shadow-card">
          <List groups={groups} selected={selected} base={base} />
        </div>
      </aside>
    </>
  );
}
