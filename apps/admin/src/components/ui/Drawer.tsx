"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { Icon } from "./Icon";

interface DrawerProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
}

export function Drawer({ open, title, onClose, children, footer }: DrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  // Parents pass an inline onClose, so a new function arrives on every render. Keeping it in a ref
  // stops the effect below from re-running (and re-focusing the panel) each time someone types.
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onCloseRef.current();
    document.addEventListener("keydown", onKey);
    panelRef.current?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-ink/40" onClick={onClose} aria-hidden="true" />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-surface shadow-pop outline-none"
      >
        <header className="flex h-topbar shrink-0 items-center justify-between border-b border-line px-4">
          <h2 className="text-base font-semibold">{title}</h2>
          <button type="button" onClick={onClose} aria-label="Close" className="rounded-control p-1.5 text-ink-muted hover:bg-canvas hover:text-ink">
            <Icon name="close" />
          </button>
        </header>
        <div className="flex-1 overflow-y-auto p-4">{children}</div>
        {footer && <footer className="flex shrink-0 items-center justify-end gap-2 border-t border-line p-4">{footer}</footer>}
      </div>
    </div>
  );
}
