import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages base path.
// - Project site  -> https://USER.github.io/REPO/   => base must be "/REPO/"
// - User site     -> https://USER.github.io/        => base must be "/"
// The deploy workflow sets VITE_BASE automatically from the repository name.
const base = process.env.VITE_BASE ?? '/portfolio/'

export default defineConfig({
  base,
  plugins: [react()],
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    assetsInlineLimit: 2048,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('three') || id.includes('@react-three')) return 'three'
            if (id.includes('framer-motion')) return 'motion'
            return 'vendor'
          }
        },
      },
    },
  },
})
