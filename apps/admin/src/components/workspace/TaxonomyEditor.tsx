"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { saveTaxonomies } from "@/app/actions/tours";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Field";
import { Icon } from "@/components/ui/Icon";
import { useToast } from "@/components/ui/Toast";
import type { Taxonomies } from "@/lib/types";

const GROUPS: { key: keyof Taxonomies; title: string }[] = [
  { key: "categories", title: "Tour categories" },
  { key: "neighbourhoods", title: "Neighbourhoods" },
  { key: "cities", title: "Cities" },
  { key: "blogCategories", title: "Blog categories" },
];

export function TaxonomyEditor({ projectSlug, initial, canEdit }: { projectSlug: string; initial: Taxonomies; canEdit: boolean }) {
  const router = useRouter();
  const { notify } = useToast();
  const [pending, startTransition] = useTransition();
  const [tax, setTax] = useState(initial);
  const [draft, setDraft] = useState<Record<string, string>>({});
  const [dirty, setDirty] = useState(false);

  const add = (key: keyof Taxonomies) => {
    const v = (draft[key] ?? "").trim();
    if (!v || tax[key].some((x) => x.toLowerCase() === v.toLowerCase())) return;
    setTax({ ...tax, [key]: [...tax[key], v] });
    setDraft({ ...draft, [key]: "" });
    setDirty(true);
  };

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2">
        {GROUPS.map((g) => (
          <Card key={g.key} title={`${g.title} (${tax[g.key].length})`}>
            {tax[g.key].length === 0 ? (
              <p className="mb-3 text-[13px] text-ink-muted">Nothing here yet.</p>
            ) : (
              <ul className="mb-3 flex flex-wrap gap-2">
                {tax[g.key].map((i) => (
                  <li key={i} className="flex items-center gap-1">
                    <Badge>{i}</Badge>
                    {canEdit && (
                      <button
                        type="button"
                        aria-label={`Remove ${i}`}
                        className="rounded p-0.5 text-danger hover:bg-danger-soft"
                        onClick={() => {
                          setTax({ ...tax, [g.key]: tax[g.key].filter((x) => x !== i) });
                          setDirty(true);
                        }}
                      >
                        <Icon name="close" size={14} />
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            )}
            {canEdit && (
              <div className="flex gap-2">
                <Input
                  aria-label={`Add to ${g.title}`}
                  placeholder="Add an item"
                  value={draft[g.key] ?? ""}
                  maxLength={80}
                  onChange={(e) => setDraft({ ...draft, [g.key]: e.target.value })}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), add(g.key))}
                />
                <Button size="sm" onClick={() => add(g.key)}>
                  Add
                </Button>
              </div>
            )}
          </Card>
        ))}
      </div>
      {canEdit ? (
        <div className="mt-4">
          <Button
            variant="primary"
            disabled={pending || !dirty}
            onClick={() =>
              startTransition(async () => {
                const r = await saveTaxonomies(projectSlug, tax);
                if (!r.ok) return notify(r.error, { tone: "error" });
                setDirty(false);
                notify("Lists saved");
                router.refresh();
              })
            }
          >
            {pending ? "Saving..." : "Save lists"}
          </Button>
        </div>
      ) : (
        <p className="mt-4 text-[13px] text-ink-muted">Only Admin and Super Admin can change the managed lists.</p>
      )}
    </>
  );
}
