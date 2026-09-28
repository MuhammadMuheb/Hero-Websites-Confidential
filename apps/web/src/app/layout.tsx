import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import Script from 'next/script';
import { Header } from '@/components/chrome/Header';
import { Footer } from '@/components/chrome/Footer';
import { BING_SITE_VERIFICATION, GA_MEASUREMENT_ID, GOOGLE_SITE_VERIFICATION } from '@/lib/analytics';
import './globals.css';
import './animations.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['600', '700', '800', '900'],
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
    // Fallback share image for any page that doesn't set its own.
    images: [
      {
        url: 'https://images.unsplash.com/photo-1708628934823-a37e3fe0bb4e?w=1200&h=630&fit=crop&q=80&auto=format',
        width: 1200,
        height: 630,
        alt: 'A Rome side street lit for the evening, tables set out along the cobblestones',
      },
    ],
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
    <html lang="en" className={montserrat.variable}>
      <body className="flex min-h-screen flex-col bg-cream text-ink antialiased">
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
