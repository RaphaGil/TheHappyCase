import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get base URL from environment variable or default to '/' for root deployment
// For GitHub Pages subdirectory: VITE_BASE_URL=/TheHappyCase/
// For Netlify/Vercel root: VITE_BASE_URL=/ (or leave unset)
const baseUrl = process.env.VITE_BASE_URL || '/';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Base public path when served in production
  // Defaults to '/' for root deployment (Netlify, Vercel)
  // Set VITE_BASE_URL=/TheHappyCase/ for GitHub Pages subdirectory
  base: baseUrl,
  
  // Explicitly set the root and public directory
  root: '.',
  publicDir: 'public',
  
  // Development server configuration
  server: {
    port: 3000,
    open: false,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  
  // Build configuration
  build: {
    outDir: 'build',
    assetsDir: 'static',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'fabric-vendor': ['fabric'],
        },
      },
    },
  },
  
  // Resolve aliases
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});

