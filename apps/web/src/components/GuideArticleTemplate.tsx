'use client';

import type { BlogPostDoc } from '@/lib/firestore';
import Link from 'next/link';
import { Hero } from '@/components/Hero';
import { useReveal } from '@/hooks/useReveal';

interface GuideArticleTemplateProps {
  post: BlogPostDoc;
}

export function GuideArticleTemplate({ post }: GuideArticleTemplateProps) {
  useReveal();

  const readTime = Math.ceil((post.bodyHtml?.length || 0) / 200);

  return (
    <>
      <Hero
        imageUrl={post.coverImageUrl || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600&q=80'}
        title={post.title}
        subtitle={post.excerpt || ''}
        accentWord=""
      />

      <article className="bg-cream py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Meta */}
          <div className="flex items-center gap-4 mb-8 text-sm text-ink/60">
            {post.publishedAt && (
              <time dateTime={post.publishedAt.toString()}>
                {new Date(post.publishedAt).toLocaleDateString()}
              </time>
            )}
            {readTime > 0 && <span>{readTime} min read</span>}
            {post.categorySlug && <span className="inline-block px-2 py-1 bg-brand/10 text-brand rounded-full text-xs font-semibold">{post.categorySlug}</span>}
          </div>

          {/* Content */}
          {post.bodyHtml && (
            <div
              className="prose prose-lg max-w-none
                prose-headings:font-display prose-headings:font-bold prose-headings:text-ink
                prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl
                prose-p:text-ink/80 prose-p:leading-relaxed
                prose-a:text-brand hover:prose-a:underline
                prose-strong:text-ink prose-strong:font-bold
                prose-code:bg-cream-deep prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-brand
                prose-blockquote:border-l-4 prose-blockquote:border-brand prose-blockquote:pl-4 prose-blockquote:italic
                prose-li:text-ink/80
                prose-img:rounded-card prose-img:shadow-md
              "
              dangerouslySetInnerHTML={{ __html: post.bodyHtml }}
            />
          )}

          {/* Author Info */}
          <div className="mt-16 pt-8 border-t border-line">
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-ink">About this guide</h3>
                <p className="text-sm text-ink/70 mt-2">
                  This guide was written by local experts with years of experience in the field. All recommendations are based on first-hand experience.
                </p>
              </div>
            </div>
          </div>

          {/* Related Articles CTA */}
          <div className="mt-16 bg-brand rounded-card p-8 text-center">
            <h3 className="font-display text-2xl font-bold text-cream mb-4">Explore More Guides</h3>
            <p className="text-cream/90 mb-6">Discover more local tips and travel guides</p>
            <Link
              href="/guides"
              className="inline-block px-6 py-3 bg-cream text-brand font-semibold rounded-control hover:shadow-lg transition-shadow"
            >
              Browse All Guides
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
