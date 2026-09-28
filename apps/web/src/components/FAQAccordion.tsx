'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={index} className="border border-line rounded-control overflow-hidden">
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full px-6 py-4 bg-paper hover:bg-cream-deep transition-colors flex items-center justify-between text-left"
          >
            <span className="font-semibold text-ink">{item.question}</span>
            <span
              className={`text-2xl text-brand transition-transform flex-shrink-0 ${
                openIndex === index ? 'rotate-45' : ''
              }`}
            >
              ＋
            </span>
          </button>
          {openIndex === index && (
            <div className="px-6 py-4 bg-cream-deep border-t border-line text-ink/70">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
