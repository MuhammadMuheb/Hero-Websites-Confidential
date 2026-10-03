"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { deleteProject } from "@/app/actions/projects";
import { Button } from "@/components/ui/Button";
import { Drawer } from "@/components/ui/Drawer";
import { Field, Input } from "@/components/ui/Field";
import { useToast } from "@/components/ui/Toast";
import type { ProjectStatus } from "@/lib/types";

interface Props {
  slug: string;
  name: string;
  status: ProjectStatus;
  /** Number of cards, when the page already knows it. */
  cards?: number;
  size?: "sm" | "md";
  /** Where to go after a successful delete. Default: stay on the page and refresh it. */
  redirectTo?: string;
}

/** Permanent project delete with typed confirmation. The server re-checks permission, the slug and the Live guard. */
export function DeleteProjectButton({ slug, name, status, cards, size = "sm", redirectTo }: Props) {
  const router = useRouter();
  const { notify } = useToast();
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const isLive = status === "live";

  const close = () => {
    if (pending) return;
    setOpen(false);
    setConfirm("");
    setError(null);
  };

  const submit = () =>
    startTransition(async () => {
      setError(null);
      const r = await deleteProject(slug, confirm);
      if (!r.ok) return setError(r.error);
      const { removed, revalidateError } = r.data;
      notify(
        revalidateError
          ? `Deleted ${name}, but the public site could not be refreshed yet.`
          : `Deleted ${name} (${removed.cards} cards, ${removed.images} images removed).`,
        { tone: revalidateError ? "error" : "success" },
      );
      setOpen(false);
      setConfirm("");
      if (redirectTo) router.push(redirectTo);
      router.refresh();
    });

  return (
    <>
      <Button variant="danger" size={size} onClick={() => setOpen(true)} aria-label={`Delete project ${name}`}>
        Delete
      </Button>

      <Drawer open={open} title="Delete project" onClose={close}>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (!isLive && confirm.trim() === slug) submit();
          }}
        >
          <p>
            You are about to permanently delete <strong>{name}</strong>
            {typeof cards === "number" ? <> and its {cards} cards</> : null}.
          </p>
          <ul className="list-disc space-y-1 pl-5 text-[13px] text-ink-muted">
            <li>All its cards, redirects, taxonomies, navigation and Home content are removed.</li>
            <li>Its uploaded images are removed from storage.</li>
            <li>It is removed from every user&rsquo;s access and from Our Network.</li>
            <li>The project link stops opening for everyone (404).</li>
            <li>The audit log keeps one record of the deletion.</li>
          </ul>
          <p className="text-[13px] font-medium text-danger">This cannot be undone.</p>

          {isLive ? (
            <p role="alert" className="rounded-control bg-danger-soft px-3 py-2 text-[13px] text-danger">
              This project is Live. Set its status to Coming soon or Archived (Settings, Projects, Edit) before deleting it.
            </p>
          ) : (
            <Field label={`Type "${slug}" to confirm`} htmlFor="del-confirm">
              <Input id="del-confirm" value={confirm} onChange={(e) => setConfirm(e.target.value)} autoComplete="off" className="font-mono text-xs" />
            </Field>
          )}

          {error && (
            <p role="alert" className="rounded-control bg-danger-soft px-3 py-2 text-[13px] text-danger">
              {error}
            </p>
          )}

          <div className="flex gap-2">
            <Button type="submit" variant="danger" disabled={pending || isLive || confirm.trim() !== slug}>
              {pending ? "Deleting..." : "Delete permanently"}
            </Button>
            <Button onClick={close} disabled={pending}>
              Cancel
            </Button>
          </div>
        </form>
      </Drawer>
    </>
  );
}
