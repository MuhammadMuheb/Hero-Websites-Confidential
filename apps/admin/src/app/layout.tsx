import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { BRAND } from "@/lib/brand";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: `${BRAND.product} | ${BRAND.name}`, template: `%s | ${BRAND.name}` },
  description: `${BRAND.name} ${BRAND.product}: ${BRAND.tagline}.`,
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#14352A" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
