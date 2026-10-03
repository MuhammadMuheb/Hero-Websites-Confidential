import clsx from "clsx";
import type { ReactNode } from "react";

export function Table({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={clsx("overflow-x-auto rounded-card border border-line bg-surface shadow-card", className)}>
      <table className="w-full min-w-[560px] border-collapse text-left text-sm">{children}</table>
    </div>
  );
}

export function Th({ children, className }: { children?: ReactNode; className?: string }) {
  return (
    <th scope="col" className={clsx("border-b border-line bg-canvas px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-ink-muted", className)}>
      {children}
    </th>
  );
}

export function Td({ children, className, title }: { children?: ReactNode; className?: string; title?: string }) {
  return <td title={title} className={clsx("border-b border-line px-4 py-3 align-middle last:border-b-0", className)}>{children}</td>;
}
