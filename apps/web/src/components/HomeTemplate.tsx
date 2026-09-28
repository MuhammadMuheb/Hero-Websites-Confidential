'use client';

import type { BlogPostDoc, TourDoc } from '@/lib/firestore';
import { Hero } from '@/components/Hero';
import { TourCard } from '@/components/cards/TourCard';
import { AreaTile } from '@/components/AreaTile';
import { JournalCard } from '@/components/JournalCard';
import { SectionHeader } from '@/components/SectionHeader';
import { Button } from '@/components/Button';
import { useReveal } from '@/hooks/useReveal';
import { NEIGHBORHOODS } from '@/lib/tours';
import { Heart, Users, MapPin, Clock } from 'lucide-react';

interface HomeTemplateProps {
  heroImageUrl: string | null;
  tours: TourDoc[];
  blogPosts: BlogPostDoc[];
}

export function HomeTemplate({ heroImageUrl, tours, blogPosts }: HomeTemplateProps) {
  useReveal();

  const topTours = tours.slice(0, 12);
  const areas = NEIGHBORHOODS.slice(0, 6);

  // Group tours by category for category rows
  const streetFoodTours = tours.filter((t) => t.features?.includes('Street Food')).slice(0, 3);
  const cookingTours = tours.filter((t) => t.features?.includes('Cooking')).slice(0, 3);
  const wineTours = tours.filter((t) => t.features?.includes('Wine')).slice(0, 3);

  return (
    <>
      {/* 1. Hero */}
      <section id="hero">
        <Hero imageUrl={heroImageUrl} />
      </section>

      {/* 2. Explore - Area tiles with images */}
      <section id="explore" className="bg-cream py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Explore" title="Top Neighborhoods" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {areas.map((area, i) => (
              <div key={area.slug} data-reveal style={{ '--i': i } as React.CSSProperties}>
                <AreaTile
                  name={area.name}
                  href={`/neighborhoods/${area.slug}`}
                  description={`Discover authentic ${area.name}`}
                  image={`https://images.unsplash.com/photo-${1500000000 + i}?w=600&h=450&fit=crop`}
                  imageAlt={area.name}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Popular Tours - 3-per-row grid + snap-row mobile */}
      <section id="popular" className="bg-cream-deep py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Our Favorites" title="Popular Tours" />
          <div className="hidden md:grid grid-cols-3 gap-6">
            {topTours.slice(0, 9).map((tour, i) => (
              <div key={tour.slug} data-reveal style={{ '--i': i } as React.CSSProperties}>
                <TourCard tour={tour} priority={i === 0} />
              </div>
            ))}
          </div>
          {/* Mobile snap-scroll */}
          <div className="md:hidden overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex gap-4 pb-4">
              {topTours.slice(0, 9).map((tour) => (
                <div key={tour.slug} className="flex-shrink-0 w-[calc(100vw-2rem)] sm:w-80">
                  <TourCard tour={tour} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Categories - ROWS (category tile + 3 tour cards) */}
      <section id="categories" className="bg-cream py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Browse by Type" />
          <div className="space-y-12">
            {/* Street Food Row */}
            {streetFoodTours.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div data-reveal style={{ '--i': 0 } as React.CSSProperties}>
                  <div className="h-full rounded-card bg-gradient-to-br from-brand/10 to-cream-deep p-6 flex flex-col justify-center">
                    <h3 className="font-display text-2xl font-bold text-ink">Street Food</h3>
                    <p className="text-sm text-ink/60 mt-2">Local favorites & authentic bites</p>
                  </div>
                </div>
                {streetFoodTours.map((tour, i) => (
                  <div key={tour.slug} data-reveal style={{ '--i': i + 1 } as React.CSSProperties}>
                    <TourCard tour={tour} />
                  </div>
                ))}
              </div>
            )}

            {/* Cooking Row */}
            {cookingTours.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div data-reveal style={{ '--i': 0 } as React.CSSProperties}>
                  <div className="h-full rounded-card bg-gradient-to-br from-gold/10 to-cream-deep p-6 flex flex-col justify-center">
                    <h3 className="font-display text-2xl font-bold text-ink">Cooking</h3>
                    <p className="text-sm text-ink/60 mt-2">Make Roman food yourself</p>
                  </div>
                </div>
                {cookingTours.map((tour, i) => (
                  <div key={tour.slug} data-reveal style={{ '--i': i + 1 } as React.CSSProperties}>
                    <TourCard tour={tour} />
                  </div>
                ))}
              </div>
            )}

            {/* Wine Row */}
            {wineTours.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div data-reveal style={{ '--i': 0 } as React.CSSProperties}>
                  <div className="h-full rounded-card bg-gradient-to-br from-brand-dark/10 to-cream-deep p-6 flex flex-col justify-center">
                    <h3 className="font-display text-2xl font-bold text-ink">Wine & Beer</h3>
                    <p className="text-sm text-ink/60 mt-2">Tastings & local favorites</p>
                  </div>
                </div>
                {wineTours.map((tour, i) => (
                  <div key={tour.slug} data-reveal style={{ '--i': i + 1 } as React.CSSProperties}>
                    <TourCard tour={tour} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 5. Trust - How We Choose (4 icon points) */}
      <section id="trust" className="bg-ink text-cream py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-cream mb-4">How We Choose</h2>
            <p className="text-cream/80 max-w-2xl mx-auto">
              Every tour is built on 12+ years of living, eating, and exploring Rome
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Heart,
                title: 'Authentic',
                description: 'No tourist traps — only where Romans actually eat',
              },
              {
                icon: Users,
                title: 'Local-Led',
                description: 'Guides who live and eat in Rome daily',
              },
              {
                icon: MapPin,
                title: 'Neighborhood-Based',
                description: 'Explore real neighborhoods, not just landmarks',
              },
              {
                icon: Clock,
                title: 'Intimate Groups',
                description: '8-12 people max for genuine connection',
              },
            ].map((point, i) => {
              const Icon = point.icon;
              return (
                <div key={i} data-reveal style={{ '--i': i } as React.CSSProperties} className="text-center">
                  <Icon size={48} className="mx-auto mb-4 text-gold" />
                  <h3 className="font-display text-xl font-bold mb-2">{point.title}</h3>
                  <p className="text-cream/70 text-sm">{point.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Plan - CTA band */}
      <section id="plan" className="bg-cream-deep py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-4xl font-bold text-ink mb-4">Ready to Explore?</h2>
          <p className="text-lg text-ink/70 mb-8">Choose your perfect tour and book today</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button variant="primary">Browse All Tours</Button>
            <Button variant="outline">View Guides</Button>
          </div>
        </div>
      </section>

      {/* 7-10. Hidden sections (no data yet) */}

      {/* 11. Journal */}
      <section id="journal" className="bg-cream py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Latest" title="Guides & Stories" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.slice(0, 3).map((post, i) => (
              <div key={post.slug} data-reveal style={{ '--i': i } as React.CSSProperties}>
                <JournalCard
                  title={post.title}
                  excerpt={post.bodyHtml?.substring(0, 100) || 'Latest guide'}
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

      {/* 12. CTA */}
      <section id="cta" className="bg-ink text-cream py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="reveal-lines font-display text-5xl font-bold mb-6">
            {'Experience Rome\nLike a Local'.split('\n').map((line, i) => (
              <span key={i} className="line block">
                <span className="line-i" style={{ '--ln': i } as React.CSSProperties}>
                  {line}
                </span>
              </span>
            ))}
          </h2>
          <p className="text-xl text-cream/90 mb-8">
            Authentic food tours led by a 12-year Rome resident
          </p>
          <button className="cta-pulse px-10 py-4 bg-brand text-cream rounded-full font-semibold hover:bg-brand-dark transition-colors text-lg">
            Book Your Tour
          </button>
        </div>
      </section>

      {/* Network Strip */}
      <section id="network" className="bg-cream border-t border-line py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-semibold text-gold-deep uppercase tracking-wider mb-3">
              Part of the Italy Tours Network
            </p>
            <p className="text-ink/70 mb-6">
              13 cities across Italy, all with authentic local expertise
            </p>
            <Button variant="outline">Explore Other Cities</Button>
          </div>
        </div>
      </section>
    </>
  );
}
