import { SectionHeader } from '@/components/SectionHeader';
import { Button } from '@/components/Button';
import { TourCard } from '@/components/cards/TourCard';
import { CategoryTile } from '@/components/CategoryTile';
import { AreaTile } from '@/components/AreaTile';
import { FAQAccordion } from '@/components/FAQAccordion';
import { FactsGrid } from '@/components/FactsGrid';
import { Ticker } from '@/components/Ticker';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Pagination } from '@/components/Pagination';
import { VideoRow } from '@/components/VideoRow';
import { JournalCard } from '@/components/JournalCard';
import { getAllTours } from '@/lib/firestore';

export const metadata = {
  title: 'Component Library | Dev',
  robots: 'noindex, nofollow',
};

export default async function ComponentsPage() {
  const tours = await getAllTours();
  const sampleTour = tours[0];

  const faqItems = [
    {
      question: 'How long are the tours?',
      answer: 'Most tours are 3-4 hours, though some can be customized to fit your schedule.',
    },
    {
      question: 'Do you offer private tours?',
      answer: 'Yes! We offer both group and private tours. Contact us for custom arrangements.',
    },
    {
      question: 'What if the weather is bad?',
      answer: 'Tours proceed rain or shine, but we can reschedule if needed.',
    },
  ];

  const facts = [
    { number: '500+', label: 'Happy Travelers' },
    { number: '12', label: 'City Network' },
    { number: '50+', label: 'Unique Tours' },
    { number: '10+', label: 'Years Experience' },
  ];

  const videos = [
    {
      id: '1',
      thumbnail: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=225&fit=crop',
      title: 'Testaccio Market Tour',
      duration: '3:45',
    },
    {
      id: '2',
      thumbnail: 'https://images.unsplash.com/photo-1503037896923-fa02b70c1b1d?w=400&h=225&fit=crop',
      title: 'Trastevere Evening',
      duration: '4:12',
    },
    {
      id: '3',
      thumbnail: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=225&fit=crop',
      title: 'Cooking Class',
      duration: '5:30',
    },
  ];

  return (
    <main className="min-h-screen bg-cream pt-20">
      {/* Buttons */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <SectionHeader title="Button Styles" />
        <div className="flex flex-wrap gap-4">
          <Button variant="primary">Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button size="sm">Small</Button>
          <Button size="lg">Large</Button>
        </div>
      </section>

      {/* Section Headers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <SectionHeader
          eyebrow="Featured"
          title="Section Headers"
          subtitle="This is a subtitle that provides additional context"
        />
      </section>

      {/* Breadcrumbs & Pagination */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-12">
          <h3 className="font-display text-2xl font-bold mb-4">Breadcrumbs</h3>
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Tours', href: '/tours' },
              { label: 'Testaccio', href: '/neighborhoods/testaccio' },
              { label: 'Current Page' },
            ]}
          />
        </div>
        <div>
          <h3 className="font-display text-2xl font-bold mb-4">Pagination</h3>
          <Pagination currentPage={2} totalPages={5} basePath="/tours" />
        </div>
      </section>

      {/* Tour Card */}
      {sampleTour && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h3 className="font-display text-2xl font-bold mb-4">Tour Card</h3>
          <div className="w-full md:w-80">
            <TourCard tour={sampleTour} priority />
          </div>
        </section>
      )}

      {/* Category & Area Tiles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h3 className="font-display text-2xl font-bold mb-4">Category Tile</h3>
        <div className="w-full md:w-96 mb-12">
          <CategoryTile
            title="Street Food Tours"
            href="/tours/category/street-food"
            image="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop"
            imageAlt="Street food"
            count={12}
          />
        </div>
        <h3 className="font-display text-2xl font-bold mb-4">Area Tile</h3>
        <div className="w-full md:w-96">
          <AreaTile
            name="Testaccio"
            href="/neighborhoods/testaccio"
            description="Authentic Roman neighborhood with local markets and trattorias"
          />
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <SectionHeader title="FAQ Accordion" />
        <div className="max-w-2xl mx-auto">
          <FAQAccordion items={faqItems} />
        </div>
      </section>

      {/* Facts Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <SectionHeader title="Facts Grid" />
        <FactsGrid facts={facts} />
      </section>

      {/* Ticker */}
      <section className="py-12">
        <Ticker items={['Street Food Tours', 'Cooking Classes', 'Wine Tastings', 'Market Walks']} />
      </section>

      {/* Video Row */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <SectionHeader title="Video Gallery" />
        <VideoRow videos={videos} />
      </section>

      {/* Journal Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <SectionHeader title="Journal Cards" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <JournalCard
              key={i}
              title={`Guide to ${['Testaccio', 'Trastevere', 'Monti'][i - 1]}`}
              excerpt="Discover the hidden gems and local favorites in this historic Rome neighborhood."
              href="/guides"
              image="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop"
              imageAlt="Rome"
              date="Dec 15, 2024"
              readTime="5 min read"
              category="Guide"
            />
          ))}
        </div>
      </section>
    </main>
  );
}
