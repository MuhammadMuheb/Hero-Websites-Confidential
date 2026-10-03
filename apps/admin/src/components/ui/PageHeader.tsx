import type { ReactNode } from "react";
import Link from "next/link";

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: { label: string; href?: string }[];
  actions?: ReactNode;
  badge?: ReactNode;
}

export function PageHeader({ title, description, breadcrumbs, actions, badge }: PageHeaderProps) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
      <div className="min-w-0">
        {breadcrumbs && (
          <nav aria-label="Breadcrumb" className="mb-1 flex flex-wrap items-center gap-1 text-[13px] text-ink-muted">
            {breadcrumbs.map((b, i) => (
              <span key={b.label} className="flex items-center gap-1">
                {i > 0 && <span aria-hidden="true">/</span>}
                {b.href ? (
                  <Link href={b.href} className="hover:text-ink hover:underline">
                    {b.label}
                  </Link>
                ) : (
                  <span className="text-ink">{b.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="break-words text-[20px] font-semibold leading-8 tracking-tight text-ink sm:text-[24px]">{title}</h1>
          {badge}
        </div>
        {description && <p className="mt-1 max-w-2xl text-ink-muted">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}
