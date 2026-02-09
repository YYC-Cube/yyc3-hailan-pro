import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    // Gzip压缩
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 10240, // 10KB以上的文件才压缩
      deleteOriginFile: false,
    }),
    // Brotli压缩
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 10240,
      deleteOriginFile: false,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "three": path.resolve(__dirname, "node_modules/three"),
    },
  },
  optimizeDeps: {
    include: [
      '@emotion/is-prop-valid', 
      'framer-motion',
    ],
    exclude: [
      'react-router',
    ],
  },
  build: {
    target: 'es2015',
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // React核心库
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor-react';
          }
          // 路由库
          if (id.includes('node_modules/react-router')) {
            return 'vendor-router';
          }
          // UI组件库 - Radix UI
          if (id.includes('node_modules/@radix-ui')) {
            return 'vendor-ui-radix';
          }
          // UI组件库 - MUI
          if (id.includes('node_modules/@mui')) {
            return 'vendor-ui-mui';
          }
          // 3D渲染库
          if (id.includes('node_modules/three') || 
              id.includes('node_modules/@react-three')) {
            return 'vendor-3d';
          }
          // 动画库
          if (id.includes('node_modules/framer-motion')) {
            return 'vendor-animation';
          }
          // 工具库
          if (id.includes('node_modules/date-fns') || 
              id.includes('node_modules/clsx') ||
              id.includes('node_modules/class-variance-authority')) {
            return 'vendor-utils';
          }
          // 其他node_modules
          if (id.includes('node_modules')) {
            return 'vendor-misc';
          }
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/\.(png|jpe?g|gif|svg|webp|ico)$/i.test(assetInfo.name)) {
            return 'assets/images/[name]-[hash].[ext]';
          }
          if (/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name)) {
            return 'assets/fonts/[name]-[hash].[ext]';
          }
          return 'assets/[ext]/[name]-[hash].[ext]';
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  server: {
    port: 3000,
    host: true,
  },
});
