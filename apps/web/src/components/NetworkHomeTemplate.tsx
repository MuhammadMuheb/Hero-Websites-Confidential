'use client';

import Image from 'next/image';
import Link from '@/components/NetworkLink';
import type { BlogPostDoc } from '@/lib/firestore';
import { Hero } from '@/components/Hero';
import { JournalCard } from '@/components/JournalCard';
import { Button } from '@/components/Button';
import { useReveal } from '@/hooks/useReveal';
import type { HubTour } from '@/components/network/NetworkHubPages';

interface NetworkHomeTemplateProps {
  siteName: string;
  heroImageUrl?: string;
  heroTitle?: string;
  tours: HubTour[];
  blogPosts?: BlogPostDoc[];
  description?: string;
}

export function NetworkHomeTemplate({
  siteName,
  heroImageUrl,
  heroTitle,
  tours,
  blogPosts = [],
  description = 'Curated tours and local experiences',
}: NetworkHomeTemplateProps) {
  useReveal();

  const topTours = tours.slice(0, 8);
  const recentPosts = blogPosts.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section id="hero">
        <Hero
          imageUrl={heroImageUrl || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&q=80'}
          title={heroTitle || siteName}
          subtitle={description}
          accentWord=""
        />
      </section>

      {/* Featured Tours */}
      <section id="tours" className="bg-cream py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="font-display text-4xl font-bold text-ink mb-2">Featured Tours</h2>
            <p className="text-ink/70">Handpicked experiences for travelers like you</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topTours.map((tour, i) => (
              <Link
                key={tour.slug}
                href={`/go/${tour.slug}`}
                rel="sponsored nofollow"
                className="group flex flex-col overflow-hidden rounded-card bg-white border border-line shadow-md hover:shadow-lg transition-all duration-200"
                data-reveal
                style={{ '--i': i } as React.CSSProperties}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-cream-deep">
                  <Image
                    src={tour.image.src}
                    alt={tour.image.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {tour.badge && (
                    <span className="absolute top-3 left-3 rounded-full bg-brand px-3 py-1 text-xs font-bold text-cream">
                      {tour.badge}
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <span className="text-xs font-semibold uppercase tracking-[0.1em] text-ink/60">{tour.partner}</span>
                  <h3 className="mt-1.5 font-display text-lg font-semibold leading-snug text-ink">{tour.title}</h3>
                  <p className="mt-1.5 text-sm text-ink/70">{tour.meta}</p>
                  <div className="mt-auto flex items-end justify-between pt-5">
                    <p className="text-sm text-ink/70">
                      from <span className="font-bold text-ink">€{tour.priceFrom}</span>
                    </p>
                    <span className="inline-flex min-h-[44px] items-center rounded-control bg-brand px-4 text-sm font-bold text-cream hover:bg-brand/90 transition-colors">
                      Check
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {tours.length > 8 && (
            <div className="mt-12 text-center">
              <Link href="/tours">
                <Button variant="secondary">View all tours</Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Blog/Guides Section */}
      {recentPosts.length > 0 && (
        <section id="guides" className="bg-white py-20 border-t border-line">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="font-display text-4xl font-bold text-ink mb-2">Guides & Stories</h2>
              <p className="text-ink/70">Tips, advice, and local insights</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentPosts.map((post, i) => (
                <div key={post.slug} data-reveal style={{ '--i': i } as React.CSSProperties}>
                  <JournalCard
                    title={post.title}
                    excerpt={post.bodyHtml?.substring(0, 100) || 'Guide'}
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
      )}

      {/* CTA Section */}
      <section className="bg-brand py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-4xl font-bold text-cream mb-4">Ready to explore?</h2>
          <p className="text-cream/90 mb-8 text-lg">Browse our complete selection of tours and experiences</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tours">
              <Button variant="secondary">Browse Tours</Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline">Get in Touch</Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
