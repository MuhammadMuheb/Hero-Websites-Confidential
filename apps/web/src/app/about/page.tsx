import type { Metadata } from 'next';
import { SITE_DOMAIN } from '@/lib/firestore';
import { Hero } from '@/components/Hero';
import { SectionHeader } from '@/components/SectionHeader';
import { Button } from '@/components/Button';
import { DarkImageBand } from '@/components/DarkImageBand';
import { FactsGrid } from '@/components/FactsGrid';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'About Street Food Rome — Local Expert Tours',
  description: 'Meet the team behind Street Food Rome — 12+ years of authentic local expertise leading food tours across Rome neighborhoods.',
  alternates: { canonical: `https://${SITE_DOMAIN}/about` },
  openGraph: {
    title: 'About Street Food Rome',
    description: 'Authentic food tours from a 12-year Rome resident',
    url: `https://${SITE_DOMAIN}/about`,
  },
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <Hero
        imageUrl="https://images.unsplash.com/photo-1695521821755-a7419a4a1b50?w=1600&q=80"
        title="Street Food Rome is Built on Authenticity"
        subtitle="12+ years of living, eating, and exploring Rome"
        accentWord="Authenticity"
      />

      {/* Story Section */}
      <section className="bg-cream py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Our Story"
            title="How It Started"
            subtitle="From a passion for authentic Rome to leading food tours"
          />
          <div className="prose prose-lg max-w-none text-ink/70">
            <p>
              Street Food Rome began as a blog documenting the best street food, neighborhoods, and local secrets across Rome. What started as personal notes evolved into guided tours for travelers who wanted to experience Rome like a local — not as a tourist.
            </p>
            <p>
              Every tour is designed around real neighborhoods, real people, and real food. We skip the tourist traps and explore where Romans actually eat.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-cream-deep py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="What Makes Us Different" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Local Expertise',
                description: '12+ years living in Rome means we know the neighborhoods, the people, and the best food.',
              },
              {
                title: 'Small Groups',
                description: 'We keep groups intimate so you can ask questions and have real conversations with locals.',
              },
              {
                title: 'Authentic Experiences',
                description: 'No tourist menus, no orchestrated performances — just real Rome and real food.',
              },
            ].map((item, i) => (
              <div key={i} data-reveal style={{ '--i': i } as React.CSSProperties} className="p-6 bg-paper rounded-card">
                <h3 className="font-display text-xl font-bold text-ink mb-3">{item.title}</h3>
                <p className="text-ink/70">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Band */}
      <section>
        <DarkImageBand
          imageUrl="https://images.unsplash.com/photo-1514306688772-4fd55265788e?w=1600&q=80"
          imageAlt="Street Food Rome"
        />
      </section>

      {/* Stats */}
      <section className="bg-cream py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="By The Numbers" />
          <FactsGrid
            facts={[
              { number: '12+', label: 'Years in Rome' },
              { number: '5K+', label: 'Happy Travelers' },
              { number: '50+', label: 'Unique Tours' },
              { number: '13', label: 'Cities in Network' },
            ]}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink text-cream py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-4xl font-bold mb-6">Ready to Explore Rome Like a Local?</h2>
          <p className="text-lg text-cream/80 mb-8">Book one of our authentic food tours today</p>
          <Button variant="primary">Browse Tours</Button>
        </div>
      </section>
    </>
  );
}
