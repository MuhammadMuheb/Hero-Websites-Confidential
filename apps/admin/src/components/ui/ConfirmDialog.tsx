"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Button } from "./Button";
import { Input } from "./Field";
import { Modal } from "./Modal";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  children: ReactNode;
  confirmLabel: string;
  cancelLabel?: string;
  /** "danger" makes the confirm button red. Use it only for destructive actions. */
  tone?: "primary" | "danger";
  /** When set, the confirm button stays disabled until this exact text is typed. */
  typeToConfirm?: string;
  /** Label of the typing field, for example "Type the project slug rome-vespa to confirm". */
  typeLabel?: ReactNode;
  /** Reason the action cannot be taken at all (shown instead of the field, confirm disabled). */
  blockedReason?: string;
  busy?: boolean;
  error?: string | null;
  onConfirm: () => void;
  onCancel: () => void;
}

/** A small confirmation over the current screen. Replaces window.confirm everywhere. */
export function ConfirmDialog({ open, title, children, confirmLabel, cancelLabel = "Cancel", tone = "primary", typeToConfirm, typeLabel, blockedReason, busy, error, onConfirm, onCancel }: ConfirmDialogProps) {
  const [typed, setTyped] = useState("");
  useEffect(() => {
    if (!open) setTyped("");
  }, [open]);

  const typedOk = typeToConfirm === undefined || typed.trim() === typeToConfirm;
  const canConfirm = typedOk && !blockedReason && !busy;

  return (
    <Modal
      open={open}
      title={title}
      size="sm"
      onClose={onCancel}
      busy={busy}
      footer={
        <>
          <Button onClick={onCancel} disabled={busy}>
            {cancelLabel}
          </Button>
          <Button variant={tone === "danger" ? "danger" : "primary"} onClick={onConfirm} disabled={!canConfirm}>
            {busy ? "Working..." : confirmLabel}
          </Button>
        </>
      }
    >
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (canConfirm) onConfirm();
        }}
      >
        <div className="space-y-2 text-sm text-ink">{children}</div>
        {blockedReason ? (
          <p role="alert" className="rounded-control bg-danger-soft px-3 py-2 text-[13px] text-danger">
            {blockedReason}
          </p>
        ) : (
          typeToConfirm !== undefined && (
            <div className="space-y-1">
              <label htmlFor="confirm-typed" className="block text-[13px] font-medium text-ink">
                {typeLabel ?? "Type to confirm"}
              </label>
              <Input id="confirm-typed" value={typed} onChange={(e) => setTyped(e.target.value)} autoComplete="off" className="font-mono text-xs" />
            </div>
          )
        )}
        {error && (
          <p role="alert" className="rounded-control bg-danger-soft px-3 py-2 text-[13px] text-danger">
            {error}
          </p>
        )}
      </form>
    </Modal>
  );
}
