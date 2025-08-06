import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/ai-education-platform/', // GitHub Pages용 base path
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})