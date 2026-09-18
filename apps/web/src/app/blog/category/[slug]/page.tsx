import type { Metadata } from 'next';
import Link from '@/components/NetworkLink';
import { notFound } from 'next/navigation';
import { getAllBlogPosts, getPageDoc, SITE_DOMAIN } from '@/lib/firestore';
import { InnerHero } from '@/components/InnerHero';
import { SafeImage } from '@/components/SafeImage';
import { BLOG_CATEGORIES, getBlogCategory } from '@/lib/blog';
import { CATEGORIES, NETWORK_SITES } from '@/lib/tours';

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  return BLOG_CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = getBlogCategory(slug);
  if (!category) return {};
  const page = await getPageDoc(`blog-category-${category.slug}`);
  const title = page?.metaTitle ?? `${category.name} — Street Food Rome Blog`;
  const description = page?.metaDesc ?? category.intro;
  return {
    title,
    description,
    alternates: { canonical: `https://${SITE_DOMAIN}/blog/category/${category.slug}` },
    openGraph: page?.heroImageUrl
      ? {
          title,
          description,
          url: `https://${SITE_DOMAIN}/blog/category/${category.slug}`,
          images: [{ url: page.heroImageUrl, alt: category.name }],
        }
      : undefined,
    twitter: page?.heroImageUrl ? { card: 'summary_large_image', images: [page.heroImageUrl] } : undefined,
  };
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default async function BlogCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getBlogCategory(slug);
  if (!category) notFound();

  const page = await getPageDoc(`blog-category-${category.slug}`);
  const allPosts = await getAllBlogPosts();
  const posts = allPosts.filter((p) => p.categorySlug === category.slug);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${category.name} — Street Food Rome Blog`,
    url: `https://${SITE_DOMAIN}/blog/category/${category.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <InnerHero
        eyebrow="Blog Category"
        title={category.name}
        subtitle={category.intro}
        breadcrumb={{ label: 'Blog', href: '/blog' }}
        imageUrl={page?.heroImageUrl}
        imageAlt={category.name}
      />

      <section className="py-14">
        <div className="mx-auto max-w-[1000px] px-6 sm:px-14">
          <div
            className="rich-content mb-10 text-base leading-relaxed text-ink-muted"
            dangerouslySetInnerHTML={{ __html: page?.bodyHtml ?? `<p>${category.intro}</p>` }}
          />

          {posts.length === 0 ? (
            <p className="text-sm text-ink-muted">
              No posts are tagged in {category.name} yet — more coming soon. In the meantime, browse{' '}
              <Link href="/blog" className="font-bold text-accent hover:underline">
                every post
              </Link>
              .
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
              {posts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex flex-col">
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
          )}

          <div className="mt-14 grid grid-cols-1 gap-8 border-t border-line pt-10 sm:grid-cols-2">
            <div>
              <h2 className="font-display text-base font-semibold text-ink">Explore by category</h2>
              <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
                {CATEGORIES.map((c) => (
                  <li key={c.slug}>
                    <Link href={`/tours/category/${c.slug}`} className="font-bold text-accent hover:underline">
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-display text-base font-semibold text-ink">Our Network</h2>
              <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
                {NETWORK_SITES.map((site) => (
                  <li key={site.number}>
                    <Link href={`/${site.slug}`} className="font-bold text-accent hover:underline">
                      {site.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
