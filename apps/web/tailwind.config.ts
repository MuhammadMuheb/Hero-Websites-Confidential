import type { Config } from 'tailwindcss';

function withOpacity(variable: string) {
  return `rgb(var(${variable}) / <alpha-value>)`;
}

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: withOpacity('--paper'),
        'paper-tint': withOpacity('--paper-tint'),
        ink: withOpacity('--ink'),
        'ink-muted': withOpacity('--ink-muted'),
        faint: withOpacity('--faint'),
        accent: withOpacity('--accent'),
        'accent-hover': withOpacity('--accent-hover'),
        gold: withOpacity('--gold'),
        success: withOpacity('--success'),
        line: withOpacity('--line'),
        'line-strong': withOpacity('--line-strong'),
        media: withOpacity('--media'),
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
        sans: ['var(--font-public-sans)', 'system-ui', 'sans-serif'],
        playfair: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};

export default config;
