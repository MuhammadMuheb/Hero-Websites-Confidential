import type { Metadata } from 'next';
import { Fraunces, Playfair_Display, Public_Sans } from 'next/font/google';
import Script from 'next/script';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BING_SITE_VERIFICATION, GA_MEASUREMENT_ID, GOOGLE_SITE_VERIFICATION } from '@/lib/analytics';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  axes: ['opsz', 'SOFT', 'WONK'],
  display: 'swap',
});

const publicSans = Public_Sans({
  subsets: ['latin'],
  variable: '--font-public-sans',
  display: 'swap',
});

// Second serif, distinct from Fraunces — used only for the media-mentions
// row so each masthead-style name reads as its own distinct publication,
// not a uniform list.
const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://streetfoodrome.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Street Food Rome | Authentic Rome Food Tours & Street Food Guide",
    template: '%s | Street Food Rome',
  },
  description:
    "A first-hand guide to Rome's street food from a 12-year resident — honest neighbourhood, market, and tour recommendations, no tourist traps.",
  openGraph: {
    type: 'website',
    siteName: 'Street Food Rome',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
  },
  // Search-engine ownership verification — populated the moment
  // GOOGLE_SITE_VERIFICATION / BING_SITE_VERIFICATION are set in the
  // deployment's env vars (see lib/analytics.ts); each is `undefined` until
  // then, and Next.js omits the corresponding meta tag entirely rather than
  // rendering an empty one. No placeholder codes are checked in — a fake
  // verification value would just fail Google/Bing's ownership check.
  verification: {
    google: GOOGLE_SITE_VERIFICATION,
    other: BING_SITE_VERIFICATION ? { 'msvalidate.01': BING_SITE_VERIFICATION } : undefined,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${publicSans.variable} ${playfairDisplay.variable}`}>
      <body className="flex min-h-screen flex-col bg-paper text-ink antialiased">
        {/* GA4 — only renders once NEXT_PUBLIC_GA_MEASUREMENT_ID is set (see
            lib/analytics.ts); a no-op on every environment until then, so
            nothing here reports to an analytics property that doesn't exist. */}
        {GA_MEASUREMENT_ID ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');`}
            </Script>
          </>
        ) : null}
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
