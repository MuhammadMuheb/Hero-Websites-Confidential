'use client';

import Link from '@/components/NetworkLink';
import { SafeImage } from '@/components/SafeImage';
import { BLOG_CATEGORIES } from '@/lib/blog';
import type { BlogPostDoc } from '@/lib/firestore';

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export function PDTBlogPageFull({ posts }: { posts: BlogPostDoc[] }) {
  return (
    <div className="pdt-scope bg-white">
      <section className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-6 pt-6 sm:px-14">
          <nav aria-label="Breadcrumb" className="text-sm text-faint">
            <Link href="/pompeii-day-trip" className="hover:text-accent">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-ink-muted">Blog</span>
          </nav>
        </div>
        <div className="mx-auto max-w-[1440px] px-6 py-14 text-center sm:px-14 sm:py-16">
          <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">Pompeii Day Trip Blog</h1>
          <p className="mt-4 text-ink-muted">Travel tips, history, and planning guides for Pompeii</p>
        </div>
      </section>

      <section className="pt-10">
        <div className="mx-auto max-w-[1000px] px-6 sm:px-14">
          <div className="flex flex-wrap gap-2">
            {BLOG_CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                href={`/pompeii-day-trip/blog/category/${c.slug}`}
                className="rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-ink-muted transition-colors hover:border-accent hover:text-accent"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto max-w-[1000px] px-6 sm:px-14">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
              {posts.map((post) => (
                <Link key={post.slug} href={`/pompeii-day-trip/blog/${post.slug}`} className="group flex flex-col">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-media bg-media">
                    {post.coverImageUrl ? (
                      <SafeImage
                        src={post.coverImageUrl}
                        alt={post.title}
                        fill
                        sizes="(min-width: 640px) 460px, 90vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : null}
                  </div>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.1em] text-faint">
                    {formatDate(post.publishedAt)}
                  </p>
                  <h2 className="mt-1 font-display text-xl font-semibold text-ink">{post.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{post.excerpt}</p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <p className="text-ink-muted">No blog posts found.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
