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
    // Removing 'motion' to avoid conflict with 'framer-motion' v11
    dedupe: ['react', 'react-dom', 'three', '@react-three/fiber', '@react-three/drei', 'framer-motion', 'scheduler', '@supabase/supabase-js'],
  },
  optimizeDeps: {
    // Pre-bundle these dependencies to avoid multiple instances
    include: [
      'react', 
      'react-dom', 
      'three', 
      '@react-three/fiber', 
      '@react-three/drei',
      'framer-motion',
      'scheduler',
      '@supabase/supabase-js',
      'react-router',
      'react-router-dom',
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
