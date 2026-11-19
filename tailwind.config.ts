import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary, #7C2D12)',
          hover: 'var(--color-primary-hover, #9A3412)',
          light: 'var(--color-primary-light, #FEF3C7)',
          foreground: 'var(--color-primary-foreground, #FFFFFF)',
        },
        whatsapp: {
          DEFAULT: '#25D366',
          dark: '#20BA5A',
        },
      },
      fontFamily: {
        sans: ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};

export default config;
