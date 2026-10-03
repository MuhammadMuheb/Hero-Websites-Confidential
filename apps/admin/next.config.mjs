import path from "node:path";
import { fileURLToPath } from "node:url";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Lets a production build run beside a dev server without sharing .next.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  // Pin the monorepo root (a stray lockfile higher up would otherwise be picked).
  outputFileTracingRoot: path.join(path.dirname(fileURLToPath(import.meta.url)), "../.."),
  // The admin has two screens, Projects and Settings. The root opens Projects (a real 307, before auth runs).
  async redirects() {
    return [{ source: "/", destination: "/projects", permanent: false }];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Admin must never be indexed (blueprint D2)
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
