import clsx from "clsx";
import Link from "next/link";

interface TabsProps {
  tabs: { id: string; label: string }[];
  active: string;
  basePath: string;
}

/** Link-based tabs: the active tab lives in the URL (?tab=...), so it is shareable and server-rendered. */
export function Tabs({ tabs, active, basePath }: TabsProps) {
  return (
    <div role="tablist" className="mb-4 flex gap-1 overflow-x-auto border-b border-line">
      {tabs.map((t) => {
        const isActive = t.id === active;
        return (
          <Link
            key={t.id}
            role="tab"
            aria-selected={isActive}
            href={`${basePath}?tab=${t.id}`}
            className={clsx(
              "-mb-px whitespace-nowrap border-b-2 px-3 py-2 text-sm font-medium transition-colors",
              isActive ? "border-primary text-primary" : "border-transparent text-ink-muted hover:text-ink",
            )}
          >
            {t.label}
          </Link>
        );
      })}
    </div>
  );
}
