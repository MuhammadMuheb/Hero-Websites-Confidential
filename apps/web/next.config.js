/**
 * The 12 other network sites used to be placeholder pages at /<slug> on this domain. Any of those URLs
 * may be indexed, so none returns a 404 (Blueprint 2, section 9).
 *   - No domain yet (default): a TEMPORARY 302 to the home page. It is deliberately not a 301, so search
 *     engines do not cache "this page moved permanently to the homepage".
 *   - Site is live on its own domain: set `domain` below and the same URLs become a 301 to that domain.
 * Check Search Console (Pages report) before changing an entry.
 */
const OTHER_NETWORK_SITES = [
  { slug: 'underground-colosseum', domain: null },
  { slug: 'pompeii-day-trip', domain: null },
  { slug: 'rome-vespa', domain: null },
  { slug: 'tuscany-day-trip', domain: null },
  { slug: 'private-vatican', domain: null },
  { slug: 'golf-cart-rome', domain: null },
  { slug: 'cooking-in-rome', domain: null },
  { slug: 'rome-pizza-class', domain: null },
  { slug: 'tiramisu-class', domain: null },
  { slug: 'naples-street-food', domain: null },
  { slug: 'amalfi-day-trip', domain: null },
  { slug: 'tivoli-day-trip', domain: null },
];

function otherNetworkSiteRedirects() {
  return OTHER_NETWORK_SITES.flatMap(({ slug, domain }) =>
    domain
      ? [
          { source: `/${slug}`, destination: `https://${domain}`, permanent: true },
          { source: `/${slug}/:path*`, destination: `https://${domain}/:path*`, permanent: true },
        ]
      : [
          { source: `/${slug}`, destination: '/', statusCode: 302 },
          // Sub-pages were "under construction" placeholders, so they have no equivalent here: go home.
          { source: `/${slug}/:path*`, destination: '/', statusCode: 302 },
        ],
  );
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // A custom loader (see src/lib/unsplash-image-loader.ts) hands the browser
    // a direct, transformed Unsplash CDN URL instead of proxying every image
    // through this app's own server — the previous wildcard remotePatterns
    // (hostname: '**') both allowed any external host through our image proxy
    // (an unnecessary SSRF-shaped surface) and routed every request through a
    // single point of failure that was timing out under load. remotePatterns
    // is inert once a custom loader is set (Next no longer fetches images
    // itself), but images.unsplash.com is still declared here as accurate,
    // living documentation of the one external image host this site uses.
    loader: 'custom',
    loaderFile: './src/lib/unsplash-image-loader.ts',
    remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }],
  },
  // Lets the admin check that a project's domain really reaches this app (and not a parking page).
  async headers() {
    return [{ source: '/:path*', headers: [{ key: 'X-Served-By', value: 'italy-tours-web' }] }];
  },
  // Street Food Rome is the root site ("/"). Old or shared links to
  // /street-food-rome must open it instead of a 404.
  async redirects() {
    return [
      { source: '/street-food-rome', destination: '/', permanent: true },
      { source: '/street-food-rome/:path*', destination: '/:path*', permanent: true },
      ...otherNetworkSiteRedirects(),
    ];
  },
};

module.exports = nextConfig;
