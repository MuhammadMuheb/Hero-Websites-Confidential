import Link from '@/components/NetworkLink';

export function RPCBlogPage() {
  return (
    <div className="rpc-scope bg-white">
      <section className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-6 pt-6 sm:px-14">
          <nav aria-label="Breadcrumb" className="text-sm text-faint">
            <Link href="/" className="hover:text-accent">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-ink-muted">Blog</span>
          </nav>
        </div>
        <div className="mx-auto max-w-[1440px] px-6 py-14 text-center sm:px-14 sm:py-16">
          <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">Rome Pizza Class Blog</h1>
          <p className="mt-4 text-ink-muted">Pizza technique guides, dough hydration notes, and Rome cooking class planning</p>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-14 text-center">
          <p className="text-ink-muted">
            Blog articles about pizza dough, wood-fired ovens, and Rome cooking classes are coming soon.
          </p>
          <Link
            href="/blog"
            className="mt-6 inline-flex h-11 items-center justify-center rounded-control bg-accent-gradient px-6 text-sm font-bold text-white shadow-glow transition-transform duration-200 ease-out hover:scale-[1.02] active:scale-[0.98]"
          >
            Explore All Blog Posts
          </Link>
        </div>
      </section>
    </div>
  );
}
