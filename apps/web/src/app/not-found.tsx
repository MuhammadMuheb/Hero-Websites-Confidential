import type { Metadata } from 'next';
import Link from '@/components/NetworkLink';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: "The page you're looking for doesn't exist on Street Food Rome.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-6 py-32 text-center">
      <h1 className="font-sans text-3xl font-bold text-ink">Page not found</h1>
      <p className="mt-3 text-ink-muted">This page doesn&rsquo;t exist on Street Food Rome.</p>
      <Link
        href="/"
        className="mt-8 rounded-control bg-accent-gradient px-6 py-3 text-sm font-bold text-white shadow-glow transition-transform duration-200 ease-out hover:scale-[1.02] active:scale-[0.98]"
      >
        Back to the homepage
      </Link>
    </div>
  );
}
