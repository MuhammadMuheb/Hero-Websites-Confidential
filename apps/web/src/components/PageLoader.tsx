'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function PageLoader() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Listen for route changes
    const originalPush = router.push;
    router.push = function(...args) {
      setIsLoading(true);
      return originalPush.apply(this, args);
    };

    return () => {
      router.push = originalPush;
    };
  }, [router]);

  useEffect(() => {
    // Stop loading after brief delay
    if (isLoading) {
      const timer = setTimeout(() => setIsLoading(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/50 backdrop-blur-sm transition-opacity duration-300">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600"></div>
        <p className="text-sm font-medium text-gray-700">Loading...</p>
      </div>
    </div>
  );
}
