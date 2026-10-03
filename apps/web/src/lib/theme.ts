import type { CSSProperties } from 'react';

export interface ProjectTheme {
  primary: string;
  dark: string;
  accent: string;
  fontHeading?: string;
  fontBody?: string;
}

const HEX = /^#[0-9a-fA-F]{6}$/;

function rgb(hex: string): [number, number, number] {
  return [parseInt(hex.slice(1, 3), 16), parseInt(hex.slice(3, 5), 16), parseInt(hex.slice(5, 7), 16)];
}

/** Mixes two colours; amount 0 = a, 1 = b. */
function mix(a: [number, number, number], b: [number, number, number], amount: number): [number, number, number] {
  const channel = (i: 0 | 1 | 2) => Math.round(a[i] * (1 - amount) + b[i] * amount);
  return [channel(0), channel(1), channel(2)];
}

const triplet = (c: [number, number, number]) => c.join(' ');

/**
 * The project's colours as the CSS variables the site's Tailwind palette reads (`rgb(var(--brand) / <alpha>)`).
 * An invalid colour is ignored, so a typo in the admin can never break the page.
 */
export function themeVars(theme: Partial<ProjectTheme> | undefined): CSSProperties {
  const vars: Record<string, string> = {};
  if (theme?.primary && HEX.test(theme.primary)) {
    const primary = rgb(theme.primary);
    vars['--brand'] = triplet(primary);
    vars['--brand-dark'] = triplet(mix(primary, [0, 0, 0], 0.25));
    vars['--accent-soft'] = triplet(mix(primary, [255, 255, 255], 0.9));
  }
  if (theme?.dark && HEX.test(theme.dark)) vars['--ink'] = triplet(rgb(theme.dark));
  if (theme?.accent && HEX.test(theme.accent)) {
    const accent = rgb(theme.accent);
    vars['--gold'] = triplet(accent);
    vars['--gold-deep'] = triplet(mix(accent, [0, 0, 0], 0.4));
  }
  return vars as CSSProperties;
}
