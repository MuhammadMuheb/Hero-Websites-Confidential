"use client";

import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import { confirmImport, previewImport, type ImportPreview } from "@/app/actions/import";
import { Badge } from "@/components/ui/Badge";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Table, Td, Th } from "@/components/ui/Table";
import { useToast } from "@/components/ui/Toast";

const MAX_BYTES = 2_000_000;

export function ImportPanel({ projectSlug, canEdit }: { projectSlug: string; canEdit: boolean }) {
  const router = useRouter();
  const { notify } = useToast();
  const [pending, startTransition] = useTransition();
  const fileRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");
  const [text, setText] = useState("");
  const [preview, setPreview] = useState<ImportPreview | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [issues, setIssues] = useState<string[]>([]);
  const [done, setDone] = useState<{ pages: number; cards: number } | null>(null);

  const reset = () => {
    setPreview(null);
    setError(null);
    setIssues([]);
    setDone(null);
  };

  const onFile = async (file: File | undefined) => {
    reset();
    if (!file) return;
    if (file.size > MAX_BYTES) {
      setError("The file is larger than 2 MB.");
      return;
    }
    const content = await file.text();
    setFileName(file.name);
    setText(content);
    startTransition(async () => {
      const r = await previewImport(projectSlug, content);
      if (!r.ok) {
        setError(r.error);
        return setIssues(r.issues ?? []);
      }
      setPreview(r.data);
    });
  };

  return (
    <div className="space-y-4">
      <Card title="1. Choose a content file">
        <p className="mb-3 text-[13px] text-ink-muted">
          JSON only. The importer matches exact key names, enforces the counts (20 chips, 10 names, 5 categories with 3 tours each, 4 criteria, 3 places tabs) and rejects the whole file if anything is wrong. Nothing is saved until you confirm, and then only as drafts.
        </p>
        <input ref={fileRef} type="file" accept="application/json,.json" aria-label="Content JSON file" className="sr-only" tabIndex={-1} onChange={(e) => onFile(e.target.files?.[0])} />
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary" disabled={!canEdit || pending} onClick={() => fileRef.current?.click()}>
            {pending ? "Checking..." : "Choose JSON file"}
          </Button>
          {fileName && <span className="font-mono text-xs text-ink-muted">{fileName}</span>}
          {!canEdit && <span className="text-[13px] text-ink-muted">You can view this screen but not import.</span>}
        </div>
      </Card>

      {error && (
        <div role="alert" className="rounded-card border border-danger/30 bg-danger-soft p-4 text-[13px] text-danger">
          <p className="font-semibold">{error}</p>
          {issues.length > 0 && (
            <ul className="mt-2 list-disc space-y-0.5 pl-5">
              {issues.slice(0, 100).map((i) => (
                <li key={i} className="font-mono text-xs">
                  {i}
                </li>
              ))}
            </ul>
          )}
          {issues.length > 100 && <p className="mt-2">and {issues.length - 100} more.</p>}
        </div>
      )}

      {preview && !done && (
        <Card title="2. Preview">
          <div className="mb-3 flex flex-wrap items-center gap-2 text-[13px]">
            <Badge tone="blue">Pages: {preview.summary.pages.join(", ")}</Badge>
            <Badge tone="green">{preview.summary.newCards} new cards</Badge>
            <Badge tone="amber">{preview.summary.updatedCards} cards updated</Badge>
            <span className="text-ink-muted">{preview.rows.length}{preview.truncated ? "+" : ""} field changes</span>
          </div>
          {preview.rows.length === 0 ? (
            <p className="text-ink-muted">Nothing would change: the file matches the current drafts.</p>
          ) : (
            <Table>
              <thead>
                <tr>
                  <Th>Target</Th>
                  <Th>Path</Th>
                  <Th>Current value</Th>
                  <Th>New value</Th>
                </tr>
              </thead>
              <tbody>
                {preview.rows.map((r, i) => (
                  <tr key={`${r.target}-${r.path}-${i}`}>
                    <Td className="font-mono text-xs">{r.target}</Td>
                    <Td className="font-mono text-xs">{r.path}</Td>
                    <Td className="max-w-[260px] truncate text-ink-muted" title={r.current}>
                      {r.current || <span aria-label="empty">(empty)</span>}
                    </Td>
                    <Td className="max-w-[260px] truncate font-medium" title={r.next}>
                      {r.next}
                    </Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
          {preview.truncated && <p className="mt-2 text-[13px] text-ink-muted">Only the first 500 changes are listed. All of them are imported.</p>}
          <div className="mt-4 flex flex-wrap gap-2">
            <Button
              variant="primary"
              disabled={pending || !canEdit}
              onClick={() =>
                startTransition(async () => {
                  const r = await confirmImport(projectSlug, text);
                  if (!r.ok) {
                    setPreview(null);
                    setError(r.error);
                    return setIssues(r.issues ?? []);
                  }
                  setDone(r.data);
                  notify("Imported as drafts");
                  router.refresh();
                })
              }
            >
              {pending ? "Saving drafts..." : "Confirm: save as drafts"}
            </Button>
            <Button
              disabled={pending}
              onClick={() => {
                reset();
                setFileName("");
                setText("");
              }}
            >
              Cancel
            </Button>
          </div>
        </Card>
      )}

      {done && (
        <Card title="Imported as drafts">
          <p className="mb-3">
            {done.pages} page(s) and {done.cards} card(s) were saved as drafts. Nothing is live yet: review and publish each page and card.
          </p>
          <div className="flex gap-2">
            <ButtonLink href={`/projects/${projectSlug}/pages/home`} variant="primary" size="sm">
              Review Home
            </ButtonLink>
            <ButtonLink href={`/projects/${projectSlug}/listings/tours`} size="sm">
              Review cards
            </ButtonLink>
          </div>
        </Card>
      )}
    </div>
  );
}
