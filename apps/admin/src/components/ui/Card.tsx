import clsx from "clsx";
import type { ReactNode } from "react";

interface CardProps {
  title?: string;
  action?: ReactNode;
  className?: string;
  bodyClassName?: string;
  children: ReactNode;
}

export function Card({ title, action, className, bodyClassName, children }: CardProps) {
  return (
    <section className={clsx("rounded-card border border-line bg-surface shadow-card", className)}>
      {(title || action) && (
        <header className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
          {title && <h2 className="text-base font-semibold text-ink">{title}</h2>}
          {action}
        </header>
      )}
      <div className={clsx("p-4", bodyClassName)}>{children}</div>
    </section>
  );
}
