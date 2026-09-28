'use client';

import Image from 'next/image';
import { Play } from 'lucide-react';
import { useRef } from 'react';

interface Video {
  id: string;
  thumbnail: string;
  title: string;
  duration: string;
}

interface VideoRowProps {
  videos: Video[];
}

export function VideoRow({ videos }: VideoRowProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <div className="overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" style={{ scrollSnapType: 'x mandatory' }}>
      <div
        ref={trackRef}
        className="flex gap-4 sm:gap-6 px-4 sm:px-6 lg:px-8 py-4 w-max lg:w-auto lg:justify-start"
        style={{
          display: 'flex',
          gap: '24px',
          paddingLeft: '1rem',
          paddingRight: '1rem',
        }}
      >
        {videos.map((video) => (
          <div
            key={video.id}
            className="flex-shrink-0 w-[240px] lg:w-[calc(25%-18px)] aspect-[9/16] rounded-[28px] overflow-hidden group relative bg-media"
            style={{ scrollSnapAlign: 'start' }}
          >
            {/* Poster image */}
            <Image
              src={video.thumbnail}
              alt={video.title}
              fill
              className="object-cover"
              loading="lazy"
            />

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink/60" />

            {/* Play button - centered */}
            <button className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform">
              <div className="w-16 h-16 rounded-full bg-cream flex items-center justify-center shadow-lg">
                <Play size={28} className="text-ink ml-1" fill="currentColor" />
              </div>
            </button>

            {/* Title + duration at bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p className="text-cream font-semibold text-sm line-clamp-2">{video.title}</p>
              <p className="text-cream/70 text-xs mt-1">{video.duration}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
