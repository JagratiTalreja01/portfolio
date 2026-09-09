/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        void: '#04070E',
        abyss: '#070C17',
        hull: '#0B1220',
        shelf: '#101A2C',
        graticule: '#1B2A45',
        signal: '#3FE0FF',
        cobalt: '#3D6DFF',
        violet: '#8A6CFF',
        gold: '#E9B665',
        paper: '#E8EEF7',
        muted: '#8CA0BD',
        dim: '#61748F',
      },
      fontFamily: {
        sans: ['Archivo', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        read: ['Newsreader', 'Georgia', 'serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        'display': ['clamp(2.6rem, 7vw, 5.6rem)', { lineHeight: '0.95', letterSpacing: '-0.035em' }],
        'title': ['clamp(1.9rem, 3.6vw, 3.1rem)', { lineHeight: '1.05', letterSpacing: '-0.028em' }],
        'sub': ['clamp(1.15rem, 1.8vw, 1.5rem)', { lineHeight: '1.25', letterSpacing: '-0.015em' }],
      },
      maxWidth: { measure: '68ch', prose: '58ch' },
      transitionTimingFunction: { swath: 'cubic-bezier(0.22, 1, 0.36, 1)' },
    },
  },
  plugins: [],
}
