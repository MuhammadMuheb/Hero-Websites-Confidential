import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { headers } from 'next/headers';
import Script from 'next/script';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { RevealAnimations } from '@/components/RevealAnimations';
import { NetworkProvider } from '@/components/NetworkProvider';
import { getLiveNetworkSites } from '@/lib/network';
import { DEFAULT_NAVIGATION, getNavigation } from '@/lib/navigation';
import { TENANT_HEADER } from '@/lib/tenant-host';
import { BING_SITE_VERIFICATION, GA_MEASUREMENT_ID, GOOGLE_SITE_VERIFICATION } from '@/lib/analytics';
import './globals.css';
import './animations.css';

export const dynamic = 'force-dynamic';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['600', '700', '800', '900'],
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
});

const metadata: Metadata = {
  title: { template: '%s | Italy Tours Network', default: 'Italy Tours Network' },
  description: 'First-hand tour comparisons and travel guides for Italy. Unbiased recommendations from local experts.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://italy-tours.example.com'),
  robots: { index: true, follow: true },
  openGraph: { type: 'website', locale: 'en_US' },
  ...(GOOGLE_SITE_VERIFICATION || BING_SITE_VERIFICATION ? {
    verification: {
      ...(GOOGLE_SITE_VERIFICATION && { google: GOOGLE_SITE_VERIFICATION }),
      ...(BING_SITE_VERIFICATION && { other: { 'msvalidate.01': BING_SITE_VERIFICATION } }),
    },
  } : {}),
};

export { metadata };

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Requests for another project's own domain (set by the middleware) are rendered by the generic site template
  // under /sites/<domain>, which brings its own header and footer. Street Food Rome's chrome and analytics
  // therefore apply to the legacy site only.
  const isTenant = Boolean((await headers()).get(TENANT_HEADER));
  const networkSites = isTenant ? [] : await getLiveNetworkSites();
  const navigation = isTenant ? DEFAULT_NAVIGATION : await getNavigation();
  return (
    <html lang="en" className={montserrat.variable}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {!isTenant && GA_MEASUREMENT_ID && (
          <Script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} />
        )}
        {!isTenant && GA_MEASUREMENT_ID && (
          <Script
            id="gtag-init"
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${GA_MEASUREMENT_ID}');`,
            }}
          />
        )}
      </head>
      <body className="bg-cream text-ink font-sans">
        {isTenant ? (
          children
        ) : (
          <NetworkProvider sites={networkSites}>
            <RevealAnimations />
            <Header links={navigation.navbar} />
            <main>{children}</main>
            <Footer groups={navigation.footer} />
          </NetworkProvider>
        )}
      </body>
    </html>
  );
}