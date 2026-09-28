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
  // Street Food Rome is the root site ("/"). Old or shared links to
  // /street-food-rome must open it instead of a 404.
  async redirects() {
    return [
      { source: '/street-food-rome', destination: '/', permanent: true },
      { source: '/street-food-rome/:path*', destination: '/:path*', permanent: true },
    ];
  },
};

module.exports = nextConfig;
