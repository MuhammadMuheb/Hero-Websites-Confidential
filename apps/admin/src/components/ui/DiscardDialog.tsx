"use client";

import { ConfirmDialog } from "./ConfirmDialog";

/** Asked when someone closes a pop-up that still has edits in it. */
export function DiscardDialog({ open, what = "section", onKeep, onDiscard }: { open: boolean; what?: "section" | "tour" | "link" | "project"; onKeep: () => void; onDiscard: () => void }) {
  return (
    <ConfirmDialog open={open} title="Discard changes?" confirmLabel="Discard" cancelLabel="Keep editing" tone="danger" onConfirm={onDiscard} onCancel={onKeep}>
      <p>Your edits to this {what} have not been saved.</p>
    </ConfirmDialog>
  );
}
