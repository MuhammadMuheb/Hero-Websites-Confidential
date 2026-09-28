import React from 'react';

interface TickerProps {
  items: string[];
  duration?: number;
}

export function Ticker({ items, duration = 45 }: TickerProps) {
  const doubled = [...items, ...items];

  return (
    <div className="ticker-container overflow-hidden bg-cream-deep py-6">
      <div
        className="ticker-track flex gap-8 whitespace-nowrap"
        style={{ '--ticker-duration': `${duration}s` } as React.CSSProperties}
      >
        {doubled.map((item, i) => (
          <span key={i} className="text-sm font-semibold text-ink flex-shrink-0">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
