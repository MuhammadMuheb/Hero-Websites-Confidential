"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from "react";
import { Icon } from "./Icon";

interface ToastOptions {
  tone?: "success" | "error";
  /** Label and handler of an inline action such as Undo. */
  actionLabel?: string;
  onAction?: () => void;
  durationMs?: number;
}

interface ToastApi {
  notify: (message: string, options?: ToastOptions) => void;
}

const ToastContext = createContext<ToastApi>({ notify: () => undefined });

export function useToast() {
  return useContext(ToastContext);
}

interface ToastState extends ToastOptions {
  message: string;
  id: number;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<ToastState | null>(null);
  const counter = useRef(0);

  const notify = useCallback((message: string, options: ToastOptions = {}) => {
    const id = ++counter.current;
    setToast({ message, id, ...options });
    window.setTimeout(() => setToast((cur) => (cur?.id === id ? null : cur)), options.durationMs ?? (options.tone === "error" ? 6000 : 3200));
  }, []);

  const api = useMemo(() => ({ notify }), [notify]);

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div aria-live="polite" role="status" className="pointer-events-none fixed bottom-4 left-1/2 z-[60] -translate-x-1/2 px-4">
        {toast && (
          <div
            className={`pointer-events-auto flex items-center gap-3 rounded-control px-4 py-2.5 text-sm text-white shadow-pop ${toast.tone === "error" ? "bg-danger" : "bg-primary-dark"}`}
          >
            <Icon name={toast.tone === "error" ? "alert" : "check"} size={16} />
            <span>{toast.message}</span>
            {toast.actionLabel && toast.onAction && (
              <button
                type="button"
                className="rounded px-2 py-0.5 text-[13px] font-semibold underline underline-offset-2 hover:bg-white/15"
                onClick={() => {
                  toast.onAction?.();
                  setToast(null);
                }}
              >
                {toast.actionLabel}
              </button>
            )}
          </div>
        )}
      </div>
    </ToastContext.Provider>
  );
}
