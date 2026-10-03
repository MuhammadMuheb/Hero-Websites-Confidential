"use client";

import { createContext, useContext, useRef, useState } from "react";
import { Button } from "./Button";
import { useToast } from "./Toast";

/** Provides the project that uploads belong to, so nested editors need no extra props. */
export const UploadContext = createContext<string | null>(null);

export async function uploadImage(project: string, file: File): Promise<string> {
  const body = new FormData();
  body.set("project", project);
  body.set("file", file);
  const res = await fetch("/api/upload", { method: "POST", body });
  const json = (await res.json().catch(() => ({}))) as { url?: string; error?: string };
  if (!res.ok || !json.url) throw new Error(json.error ?? "Upload failed.");
  return json.url;
}

export function ImageUploader({ onUploaded, label = "Upload image", project }: { onUploaded: (url: string) => void; label?: string; project?: string }) {
  const ctx = useContext(UploadContext);
  const slug = project ?? ctx;
  const { notify } = useToast();
  const ref = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  if (!slug) return null;

  return (
    <>
      <input
        ref={ref}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
        className="sr-only"
        aria-label={label}
        tabIndex={-1}
        onChange={async (e) => {
          const file = e.target.files?.[0];
          e.target.value = "";
          if (!file) return;
          setBusy(true);
          try {
            onUploaded(await uploadImage(slug, file));
            notify("Image uploaded");
          } catch (err) {
            notify(err instanceof Error ? err.message : "Upload failed.", { tone: "error" });
          } finally {
            setBusy(false);
          }
        }}
      />
      <Button size="sm" disabled={busy} onClick={() => ref.current?.click()}>
        {busy ? "Uploading..." : label}
      </Button>
    </>
  );
}
