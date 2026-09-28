import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-2 text-sm">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {item.href ? (
            <Link href={item.href} className="text-brand hover:underline">
              {item.label}
            </Link>
          ) : (
            <span className="text-ink/60">{item.label}</span>
          )}
          {index < items.length - 1 && <ChevronRight size={16} className="text-ink/40" />}
        </div>
      ))}
    </nav>
  );
}
