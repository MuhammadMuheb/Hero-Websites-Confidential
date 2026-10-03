"use client";

import clsx from "clsx";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Icon } from "./Icon";

const SIZES = { sm: "max-w-md", md: "max-w-xl", lg: "max-w-[880px]", xl: "max-w-[1120px]" } as const;

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Open modals, top one last. Only the top one reacts to Escape and traps the Tab key. */
const stack: symbol[] = [];
let scrollLocks = 0;

interface ModalProps {
  open: boolean;
  title: string;
  /** A short line under the title, for example "About / Hero". */
  subtitle?: string;
  size?: keyof typeof SIZES;
  /**
   * Called for the X button, Escape and a click outside. The caller decides whether to close, so it can ask
   * "Discard changes?" first. While `busy` is true nothing closes.
   */
  onClose: () => void;
  busy?: boolean;
  children: ReactNode;
  /** Fixed bar at the bottom: the buttons. */
  footer?: ReactNode;
  /** Chips next to the title, for example "Unsaved changes". */
  badges?: ReactNode;
}

/**
 * The one dialog of the admin. Centred over a dimmed page, header and footer stay put while the body scrolls.
 * Focus is trapped inside, Escape closes, and focus returns to the button that opened it.
 */
export function Modal({ open, title, subtitle, size = "md", onClose, busy, children, footer, badges }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const [mounted, setMounted] = useState(false);
  // Parents pass an inline onClose; a ref keeps the effect from re-running (and stealing focus) on each keystroke.
  const closeRef = useRef(onClose);
  const busyRef = useRef(busy);
  useEffect(() => {
    closeRef.current = onClose;
    busyRef.current = busy;
  });

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const id = Symbol("modal");
    stack.push(id);
    const opener = document.activeElement as HTMLElement | null;
    if (scrollLocks++ === 0) document.body.style.overflow = "hidden";

    const panel = panelRef.current;
    // First field if there is one, otherwise the panel itself. Skip the close button so typing can start at once.
    const first = panel?.querySelector<HTMLElement>('[data-autofocus], input:not([disabled]), textarea:not([disabled]), select:not([disabled])');
    (first ?? panel)?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (stack[stack.length - 1] !== id) return;
      if (e.key === "Escape") {
        e.stopPropagation();
        if (!busyRef.current) closeRef.current();
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((el) => el.offsetParent !== null);
      if (items.length === 0) {
        e.preventDefault();
        return panel.focus();
      }
      const firstEl = items[0];
      const lastEl = items[items.length - 1];
      if (e.shiftKey && (document.activeElement === firstEl || document.activeElement === panel)) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };
    document.addEventListener("keydown", onKey, true);

    return () => {
      document.removeEventListener("keydown", onKey, true);
      stack.splice(stack.indexOf(id), 1);
      if (--scrollLocks === 0) document.body.style.overflow = "";
      // Back to the button that opened the dialog (if it is still on the page).
      if (opener && document.contains(opener)) opener.focus();
    };
  }, [open]);

  if (!open || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-6">
      <div
        className="animate-fade absolute inset-0 bg-ink/50"
        aria-hidden="true"
        onMouseDown={(e) => {
          if (e.target === e.currentTarget && !busy) onClose();
        }}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={clsx("animate-modal relative flex max-h-[92vh] w-full flex-col rounded-t-card bg-surface shadow-pop outline-none sm:max-h-[90vh] sm:rounded-card", SIZES[size])}
      >
        <header className="flex shrink-0 items-start justify-between gap-4 border-b border-line px-6 py-4">
          <div className="min-w-0">
            {subtitle && <p className="truncate text-[13px] text-ink-muted">{subtitle}</p>}
            <div className="flex flex-wrap items-center gap-2">
              <h2 id={titleId} className="text-base font-semibold text-ink">
                {title}
              </h2>
              {badges}
            </div>
          </div>
          <button type="button" onClick={onClose} disabled={busy} aria-label="Close" className="-mr-2 shrink-0 rounded-control p-2 text-ink-muted hover:bg-canvas hover:text-ink disabled:opacity-50">
            <Icon name="close" />
          </button>
        </header>
        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">{children}</div>
        {footer && <footer className="flex shrink-0 flex-wrap items-center justify-end gap-2 border-t border-line px-6 py-4">{footer}</footer>}
      </div>
    </div>,
    document.body,
  );
}
