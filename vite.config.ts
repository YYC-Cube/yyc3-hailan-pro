import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    // Force single instance of critical packages
    dedupe: ['react', 'react-dom', 'react-router-dom', 'react-router', 'three', '@react-three/fiber', '@react-three/drei', 'motion'],
  },
  optimizeDeps: {
    // Pre-bundle these dependencies to avoid multiple instances
    include: [
      'react', 
      'react-dom', 
      'react-router-dom',
      'react-router',
      'three', 
      '@react-three/fiber', 
      '@react-three/drei',
      'scheduler',
      'motion',
    ],
    // Exclude react-reconciler to prevent conflicts
    exclude: ['react-reconciler'],
    // Force dependency optimization on every start
    force: true,
  },
  // Ensure proper module resolution
  build: {
    commonjsOptions: {
      include: [/node_modules/],
    },
  },
})
