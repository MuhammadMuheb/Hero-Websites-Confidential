import type { Metadata } from 'next';
import { SITE_DOMAIN } from '@/lib/firestore';
import { Hero } from '@/components/Hero';
import { SectionHeader } from '@/components/SectionHeader';
import { FAQAccordion } from '@/components/FAQAccordion';

export const metadata: Metadata = {
  title: 'FAQ — Street Food Rome',
  description: 'Frequently asked questions about Street Food Rome tours, bookings, and experiences.',
  alternates: { canonical: `https://${SITE_DOMAIN}/faq` },
};

export default function FaqPage() {
  const faqItems = [
    {
      question: 'How long are the tours?',
      answer: 'Most of our tours are 3-4 hours, though some can be customized to fit your schedule. We always prioritize quality over rushing.',
    },
    {
      question: 'What should I wear?',
      answer: 'Wear comfortable walking shoes (we cover 2-3 miles on most tours) and dress for the weather. Rome is beautiful in all seasons!',
    },
    {
      question: 'Do you offer private tours?',
      answer: 'Yes! We love working with groups. Contact us for custom arrangements, pricing, and availability for your specific dates.',
    },
    {
      question: 'What if I have dietary restrictions?',
      answer: 'Let us know in advance (vegetarian, vegan, gluten-free, allergies, etc.) and we&apos;ll customize the tour to your needs.',
    },
    {
      question: 'How many people are on each tour?',
      answer: 'Our group tours have 8-12 people maximum. This keeps groups intimate enough for genuine conversation with the guide.',
    },
    {
      question: 'What if the weather is bad?',
      answer: 'Tours proceed rain or shine (Rome isn\'t known for extreme weather). If conditions are severe, we can reschedule.',
    },
    {
      question: 'Can I book online?',
      answer: 'Yes, you can book directly through our website. For group bookings or special requests, email us at hello@streetfoodrome.com.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards and PayPal. Payment is due at booking to secure your spot.',
    },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Hero
        imageUrl="https://images.unsplash.com/photo-1516594915649-c945b9c922c8?w=1600&q=80"
        title="Questions About Rome?"
        subtitle="We've got answers"
        accentWord="answers"
      />

      <section className="bg-cream py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="FAQ"
            title="Common Questions"
            subtitle="Everything you need to know about booking and experiencing our tours"
          />

          <FAQAccordion items={faqItems} />

          <div className="mt-16 p-8 bg-cream-deep rounded-card text-center">
            <p className="font-semibold text-ink mb-4">Didn&apos;t find your answer?</p>
            <p className="text-ink/70 mb-6">
              Reach out to us directly at{' '}
              <a href="mailto:hello@streetfoodrome.com" className="text-brand hover:underline">
                hello@streetfoodrome.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
