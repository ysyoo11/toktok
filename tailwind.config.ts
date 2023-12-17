import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'theme-pink-100': '#FE2D55',
        'theme-pink-200': '#EF2B50',
      },
      screens: {
        xs: '512px',
      },
      fontSize: {
        xxs: [
          '0.625rem',
          {
            lineHeight: '0.75rem',
          },
        ],
      },
      animation: {
        'fade-out': 'fade-out 0.3s forwards linear',
      },
      keyframes: {
        'fade-out': {
          '0%': { opacity: '80' },
          '100%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
