import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/Button';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: "The page you're looking for doesn't exist or has moved.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <h1 className="font-display text-6xl font-bold text-ink mb-4">404</h1>
        <h2 className="font-display text-3xl font-bold text-ink mb-4">Page Not Found</h2>
        <p className="text-lg text-ink/70 mb-8">
          The page you&apos;re looking for doesn&apos;t exist. Maybe it wandered off to another neighborhood in Rome?
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/">
            <Button variant="primary">Back to Home</Button>
          </Link>
          <Link href="/tours">
            <Button variant="outline">Browse Tours</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
