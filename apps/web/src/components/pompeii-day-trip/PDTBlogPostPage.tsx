'use client';

import Link from '@/components/NetworkLink';
import { SafeImage } from '@/components/SafeImage';
import type { BlogPostDoc } from '@/lib/firestore';

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export function PDTBlogPostPage({ post }: { post: BlogPostDoc }) {
  return (
    <div className="pdt-scope bg-white">
      <section className="border-b border-line bg-paper-tint">
        <div className="mx-auto max-w-[720px] px-6 pt-6 sm:px-14">
          <nav aria-label="Breadcrumb" className="text-sm text-faint">
            <Link href="/pompeii-day-trip" className="hover:text-accent">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/pompeii-day-trip/blog" className="hover:text-accent">
              Blog
            </Link>
            <span className="mx-2">/</span>
            <span className="text-ink-muted">{post.title}</span>
          </nav>
        </div>
        <div className="mx-auto max-w-[720px] px-6 py-10 sm:px-14 sm:py-14">
          <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">{post.title}</h1>
          <p className="mt-4 text-sm text-ink-muted">
            {formatDate(post.publishedAt)}
          </p>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-[720px] px-6 sm:px-14">
          {post.coverImageUrl && (
            <div className="mb-10 aspect-[16/9] overflow-hidden rounded-media bg-media">
              <SafeImage
                src={post.coverImageUrl}
                alt={post.title}
                fill
                sizes="720px"
                className="object-cover"
              />
            </div>
          )}

          <div
            className="rich-content prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: post.bodyHtml }}
          />

        </div>
      </section>
    </div>
  );
}
