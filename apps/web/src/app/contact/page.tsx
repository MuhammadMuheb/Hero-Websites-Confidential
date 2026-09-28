import type { Metadata } from 'next';
import { SITE_DOMAIN } from '@/lib/firestore';
import { Hero } from '@/components/Hero';
import { SectionHeader } from '@/components/SectionHeader';
import { Button } from '@/components/Button';

export const metadata: Metadata = {
  title: 'Contact — Street Food Rome',
  description: 'Get in touch with Street Food Rome for custom tours, questions, or group bookings.',
  alternates: { canonical: `https://${SITE_DOMAIN}/contact` },
};

export default function ContactPage() {
  return (
    <>
      <Hero
        imageUrl="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&q=80"
        title="Get In Touch"
        subtitle="We'd love to hear from you"
      />

      <section className="bg-cream py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Contact Us" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            {/* Contact Info */}
            <div>
              <h3 className="font-display text-2xl font-bold text-ink mb-6">Ways to Reach Us</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-sm font-semibold text-gold-deep uppercase tracking-wider">Email</p>
                  <p className="text-lg text-ink mt-1">hello@streetfoodrome.com</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gold-deep uppercase tracking-wider">Phone</p>
                  <p className="text-lg text-ink mt-1">+39 (000) 123-4567</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gold-deep uppercase tracking-wider">Location</p>
                  <p className="text-lg text-ink mt-1">Rome, Italy</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h3 className="font-display text-2xl font-bold text-ink mb-6">Send a Message</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-ink mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-line rounded-control focus:outline-none focus:border-brand"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-line rounded-control focus:outline-none focus:border-brand"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink mb-2">Message</label>
                  <textarea
                    className="w-full px-4 py-2 border border-line rounded-control focus:outline-none focus:border-brand h-32"
                    placeholder="Your message..."
                  />
                </div>
                <Button variant="primary" className="w-full">
                  Send Message
                </Button>
              </form>
            </div>
          </div>

          {/* FAQ */}
          <div className="pt-12 border-t border-line">
            <h3 className="font-display text-2xl font-bold text-ink mb-6">Quick Answers</h3>
            <div className="space-y-4">
              {[
                {
                  q: 'Can I book a private tour?',
                  a: 'Yes! We offer custom private tours for groups of any size. Contact us for pricing.',
                },
                {
                  q: 'What if I have dietary restrictions?',
                  a: 'Let us know in advance and we\'ll tailor the tour to your needs.',
                },
                {
                  q: 'How many people are on each tour?',
                  a: 'Our group tours have 8-12 people maximum to keep them intimate and engaging.',
                },
              ].map((item, i) => (
                <div key={i} className="p-4 bg-cream-deep rounded-control">
                  <p className="font-semibold text-ink mb-2">{item.q}</p>
                  <p className="text-ink/70">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
