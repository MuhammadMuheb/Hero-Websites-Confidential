import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import sharp from "sharp";
import { adminBucket } from "@/lib/firebase/admin";
import { PermissionError } from "@/lib/auth/permissions";
import { requirePermission } from "@/lib/auth/session";
import { rateLimit } from "@/lib/auth/rate-limit";
import { writeAudit } from "@/lib/repo/audit";
import { SLUG_RE } from "@/lib/validation/schemas";

export const runtime = "nodejs";

const MAX_BYTES = 8 * 1024 * 1024;
const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"]);

/**
 * Image upload: checked permission, size and real image content; resized server side and
 * stored as WebP in Cloud Storage. The bucket is private; the returned URL carries a download token.
 */
export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const slug = String(form.get("project") ?? "");
    const file = form.get("file");
    if (!SLUG_RE.test(slug) || !(file instanceof File)) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

    const user = await requirePermission("draft:write", slug);
    if (!(await rateLimit("upload", user.uid, 60, 600))) return NextResponse.json({ error: "Too many uploads. Please wait." }, { status: 429 });
    if (!ALLOWED.has(file.type)) return NextResponse.json({ error: "Use a JPEG, PNG, WebP, AVIF or GIF image." }, { status: 415 });
    if (file.size > MAX_BYTES) return NextResponse.json({ error: "The image is larger than 8 MB." }, { status: 413 });

    let webp: Buffer;
    try {
      // Decoding the bytes proves it is a real image regardless of the declared type.
      webp = await sharp(Buffer.from(await file.arrayBuffer()), { limitInputPixels: 50_000_000 })
        .rotate()
        .resize({ width: 2000, height: 2000, fit: "inside", withoutEnlargement: true })
        .webp({ quality: 82 })
        .toBuffer();
    } catch {
      return NextResponse.json({ error: "That file could not be read as an image." }, { status: 422 });
    }

    const bucket = adminBucket();
    const path = `projects/${slug}/${randomUUID()}.webp`;
    const token = randomUUID();
    await bucket.file(path).save(webp, {
      contentType: "image/webp",
      resumable: false,
      metadata: { cacheControl: "public, max-age=31536000, immutable", metadata: { firebaseStorageDownloadTokens: token } },
    });
    const url = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(path)}?alt=media&token=${token}`;
    await writeAudit({ actor: user, propertySlug: slug, entityType: "image", entityId: path, action: "create", summary: `Uploaded image ${path}` });
    return NextResponse.json({ url });
  } catch (e) {
    if (e instanceof PermissionError) return NextResponse.json({ error: e.message }, { status: 403 });
    console.error("[upload]", e);
    return NextResponse.json({ error: "Upload failed. Please try again." }, { status: 500 });
  }
}
