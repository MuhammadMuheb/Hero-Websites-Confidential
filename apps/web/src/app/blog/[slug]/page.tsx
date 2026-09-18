import type { Metadata } from 'next';
import Link from '@/components/NetworkLink';
import { notFound } from 'next/navigation';
import { getAuthor, getBlogPostBySlug, SITE_DOMAIN } from '@/lib/firestore';
import { SafeImage } from '@/components/SafeImage';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.metaTitle,
    description: post.metaDesc,
    alternates: { canonical: `https://${SITE_DOMAIN}/blog/${post.slug}` },
    openGraph: post.coverImageUrl
      ? {
          type: 'article',
          title: post.metaTitle,
          description: post.metaDesc,
          url: `https://${SITE_DOMAIN}/blog/${post.slug}`,
          publishedTime: post.publishedAt,
          images: [{ url: post.coverImageUrl, alt: post.title }],
        }
      : undefined,
    twitter: post.coverImageUrl ? { card: 'summary_large_image', images: [post.coverImageUrl] } : undefined,
  };
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const author = post.authorId ? await getAuthor(post.authorId) : null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    datePublished: post.publishedAt,
    ...(post.coverImageUrl ? { image: post.coverImageUrl } : {}),
    ...(author ? { author: { '@type': 'Person', name: author.name } } : {}),
    url: `https://${SITE_DOMAIN}/blog/${post.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="bg-paper-tint py-10 sm:py-14">
        <div className="mx-auto max-w-[720px] px-6 sm:px-14">
          <nav className="text-sm text-faint">
            <Link href="/blog" className="hover:text-accent">
              Blog
            </Link>
            <span className="mx-2">/</span>
            <span className="text-ink-muted">{post.title}</span>
          </nav>
          <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-3 text-sm text-faint">
            {formatDate(post.publishedAt)}
            {author ? <> &middot; By {author.name}</> : null}
          </p>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto max-w-[720px] px-6 sm:px-14">
          {post.coverImageUrl ? (
            <div className="relative aspect-[16/9] overflow-hidden rounded-media bg-media">
              <SafeImage src={post.coverImageUrl} alt={post.title} fill priority sizes="720px" className="object-cover" />
            </div>
          ) : null}

          <div className="rich-content mt-8" dangerouslySetInnerHTML={{ __html: post.bodyHtml }} />

          {author ? (
            <div className="mt-10 flex items-start gap-4 rounded-card border border-line p-6">
              {author.avatarUrl ? (
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-media">
                  <SafeImage src={author.avatarUrl} alt={author.name} fill sizes="48px" className="object-cover" />
                </div>
              ) : null}
              <div>
                <p className="font-display text-sm font-semibold text-ink">{author.name}</p>
                {author.bio ? <p className="mt-1 text-sm leading-relaxed text-ink-muted">{author.bio}</p> : null}
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}
