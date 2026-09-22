'use client';

import { useEffect, useRef, useState } from 'react';
import Link from '@/components/NetworkLink';

interface DropdownItem {
  label: string;
  href: string;
}

interface NavDropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  columns?: number;
  onClose?: () => void;
}

export function NavDropdown({ trigger, items, columns = 2, onClose }: NavDropdownProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
        onClose?.();
      }
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [onClose]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 text-sm font-medium text-ink-muted transition-colors hover:text-accent"
      >
        {trigger}
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        >
          <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div
          className={`absolute left-0 top-full mt-2 rounded-lg border border-line bg-white p-4 shadow-lg min-w-max grid-cols-${columns}`}
          style={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, minmax(180px, 1fr))` }}
        >
          <ul className="space-y-2">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block text-sm text-ink-muted transition-colors hover:text-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
