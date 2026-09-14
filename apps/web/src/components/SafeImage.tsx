'use client';

import { useState } from 'react';
import Image, { type ImageProps } from 'next/image';

/**
 * Wraps next/image with an onError fallback. Third-party image hosts
 * (Unsplash in this case) occasionally fail a single request even when the
 * URL is valid — without this, a failed fetch renders as a blank box with
 * visible alt text instead of degrading gracefully.
 */
export function SafeImage({ alt, className, ...rest }: ImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <div className={`bg-media ${className ?? ''}`} role="img" aria-label={alt} />;
  }

  return <Image alt={alt} className={className} onError={() => setFailed(true)} {...rest} />;
}
