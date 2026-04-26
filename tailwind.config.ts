import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#FFF0F2',
          100: '#FFD9DF',
          200: '#FFB3BC',
          300: '#FF8090',
          400: '#F04055',
          600: '#D9182E',   // THE red — user approved this one
          700: '#B5112A',
          800: '#920F24',
          900: '#6D0E1C',
          DEFAULT: '#D9182E',
        },
        ink: {
          DEFAULT: '#0D0508',  // near-black with warm red undertone
          soft:    '#180B10',
          muted:   '#251118',
        },
        warm: {
          50:  '#FFF8F5',
          100: '#FFF0EB',
          200: '#FFE4DC',
        },
      },
      fontFamily: {
        sans:    ['"DM Sans"', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      animation: {
        marquee: 'marquee 35s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
