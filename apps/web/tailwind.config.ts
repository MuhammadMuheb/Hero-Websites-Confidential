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
        'ink-soft': withOpacity('--ink-soft'),
        faint: withOpacity('--faint'),
        accent: withOpacity('--accent'),
        'accent-hover': withOpacity('--accent-hover'),
        'accent-soft': withOpacity('--accent-soft'),
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
      // A named radius scale (ui-ux-pro-max: "pick one radius scale and apply
      // consistently"). Slightly larger than the previous system for a
      // softer, more modern silhouette on cards/media/panels, while buttons
      // and inputs stay tighter so they still read as clickable controls.
      borderRadius: {
        control: '10px',
        panel: '20px',
        card: '24px',
        media: '28px',
      },
      // A named elevation scale (ui-ux-pro-max: "use a small, consistent
      // shadow/elevation scale... never invented ad hoc per component").
      // Softer, deeper and slightly warmer than the previous flat scale so
      // cards and panels read as genuinely lifted, not just outlined.
      boxShadow: {
        card: '0 1px 2px rgba(20,20,22,0.04), 0 18px 40px -12px rgba(20,20,22,0.10)',
        'card-soft': '0 1px 2px rgba(20,20,22,0.04), 0 14px 32px -10px rgba(20,20,22,0.08)',
        'card-hover': '0 8px 16px -4px rgba(20,20,22,0.10), 0 28px 56px -16px rgba(20,20,22,0.18)',
        dropdown: '0 24px 48px -12px rgba(20,20,22,0.22)',
        popover: '0 20px 56px -8px rgba(20,20,22,0.24)',
        'bar-up': '0 -8px 24px rgba(20,20,22,0.08)',
        aside: '0 4px 16px -4px rgba(20,20,22,0.06), 0 20px 40px -12px rgba(20,20,22,0.10)',
        search: '0 12px 24px -8px rgba(20,20,22,0.12), 0 32px 64px -16px rgba(20,20,22,0.20)',
        tab: '0 1px 3px rgba(20,20,22,0.15)',
        glow: '0 8px 24px -4px rgba(255,0,34,0.35)',
      },
      backgroundImage: {
        'accent-gradient': 'linear-gradient(135deg, rgb(var(--accent)) 0%, rgb(var(--accent-hover)) 100%)',
        'ink-gradient': 'linear-gradient(180deg, rgba(20,20,22,0) 0%, rgba(20,20,22,0.92) 100%)',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
