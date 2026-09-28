import React from 'react';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeader({ eyebrow, title, subtitle, className = '' }: SectionHeaderProps) {
  return (
    <div className={`text-center mb-12 ${className}`}>
      {eyebrow && (
        <p className="text-sm font-semibold text-gold-deep uppercase tracking-wider mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display font-bold text-3xl sm:text-4xl text-ink mb-4 reveal-lines">
        {title.split('\n').map((line, i) => (
          <span key={i} className="block">
            <span className="line">
              <span className="line-i" style={{ '--ln': i } as React.CSSProperties}>
                {line}
              </span>
            </span>
          </span>
        ))}
      </h2>
      {subtitle && <p className="text-lg text-ink/70 max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  );
}
