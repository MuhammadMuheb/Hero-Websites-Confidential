import type { Metadata } from 'next';
import { getAllBlogPosts, SITE_DOMAIN } from '@/lib/firestore';
import { Hero } from '@/components/Hero';
import { SectionHeader } from '@/components/SectionHeader';
import { JournalCard } from '@/components/JournalCard';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Guides & Stories — Street Food Rome',
  description: 'Food guides, neighborhood tips, and stories from 12+ years in Rome.',
  alternates: { canonical: `https://${SITE_DOMAIN}/guides` },
};

export default async function GuidesPage() {
  const allPosts = await getAllBlogPosts();

  return (
    <>
      <Hero
        imageUrl="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600&q=80"
        title="Guides & Stories"
        subtitle="Food guides, tips, and local insights"
        accentWord="Stories"
      />

      <section className="bg-cream py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Journal" title="Latest Guides" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allPosts.map((post, i) => (
              <div key={post.slug} data-reveal style={{ '--i': i } as React.CSSProperties}>
                <JournalCard
                  title={post.title}
                  excerpt={post.bodyHtml?.substring(0, 100) || 'Food guide'}
                  href={`/guides/${post.slug}`}
                  image="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=500&h=300&fit=crop"
                  imageAlt={post.title}
                  date={new Date().toLocaleDateString()}
                  category={post.categorySlug || undefined}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
