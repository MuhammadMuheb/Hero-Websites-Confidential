"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { deleteProject, getProjectDeleteInfo } from "@/app/actions/projects";
import { Button } from "@/components/ui/Button";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
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
  const [info, setInfo] = useState<{ cards: number; images: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const show = () => {
    setError(null);
    setInfo(null);
    setOpen(true);
    void getProjectDeleteInfo(slug).then((r) => r.ok && setInfo(r.data));
  };

  const submit = () =>
    startTransition(async () => {
      setError(null);
      const r = await deleteProject(slug, slug);
      if (!r.ok) return setError(r.error);
      const { removed, revalidateError } = r.data;
      notify(revalidateError ? `Deleted ${name}, but the public site could not be refreshed yet.` : `Deleted ${name} (${removed.cards} cards, ${removed.images} images removed).`, { tone: revalidateError ? "error" : "success" });
      setOpen(false);
      if (redirectTo) router.push(redirectTo);
      router.refresh();
    });

  return (
    <>
      <Button variant="danger" size={size} onClick={show} aria-label={`Delete project ${name}`}>
        Delete
      </Button>
      <ConfirmDialog
        open={open}
        title="Delete project?"
        confirmLabel="Delete project"
        tone="danger"
        typeToConfirm={slug}
        typeLabel={
          <>
            Type the project slug <code className="rounded bg-canvas px-1 font-mono text-xs">{slug}</code> to confirm
          </>
        }
        blockedReason={status === "live" ? "This project is Live. Visitors will lose the site immediately. Set its status to Coming soon or Archived first, then delete it." : undefined}
        busy={pending}
        error={error}
        onConfirm={submit}
        onCancel={() => !pending && setOpen(false)}
      >
        <p>
          <strong>{name}</strong>
        </p>
        <p>
          This permanently removes the project, its {info?.cards ?? cards ?? "own"} cards and {info ? info.images : "its"} images. It leaves Our Network. This cannot be undone.
        </p>
      </ConfirmDialog>
    </>
  );
}
