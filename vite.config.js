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
  plugins: [
    react({
      // Optimize React for production builds
      jsxRuntime: 'automatic',
    }),
  ],
  
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
        target: 'http://127.0.0.1:3001',
        changeOrigin: true,
        secure: false,
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, res) => {
            console.error('❌ Proxy error:', err.message);
            if (res && !res.headersSent) {
              res.writeHead(500, {
                'Content-Type': 'application/json',
              });
              res.end(JSON.stringify({ 
                error: 'Proxy error: Backend server may not be running on port 3001',
                details: err.message 
              }));
            }
          });
        },
      },
      '/get-orders': {
        target: 'http://127.0.0.1:3001',
        changeOrigin: true,
        secure: false,
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, res) => {
            console.error('❌ Proxy error:', err.message);
            if (res && !res.headersSent) {
              res.writeHead(500, {
                'Content-Type': 'application/json',
              });
              res.end(JSON.stringify({ 
                error: 'Proxy error: Backend server may not be running on port 3001',
                details: err.message 
              }));
            }
          });
        },
      },
    },
  },
  
  // Build configuration
  build: {
    outDir: 'build',
    assetsDir: 'static',
    sourcemap: false,
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Shared utilities and data - extract to common chunk to avoid duplication
          if (id.includes('/src/utils/shared/') || id.includes('/src/data/products.json')) {
            return 'shared-utils';
          }
          
          // Shared component utilities
          if (id.includes('/src/utils/') && !id.includes('/src/utils/shared/')) {
            // Check if it's a commonly used utility
            if (id.includes('inventory') || id.includes('cartHelpers') || id.includes('imagePath')) {
              return 'shared-utils';
            }
          }
          
          // Vendor chunk for React and React Router
          if (id.includes('node_modules')) {
            // React ecosystem - group together (most important, should be cached)
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'react-vendor';
            }
            // Fabric.js - large library, separate chunk (only used in CreateYours)
            if (id.includes('fabric')) {
              return 'fabric-vendor';
            }
            // FontAwesome - can be large, separate chunk
            if (id.includes('@fortawesome')) {
              return 'fontawesome-vendor';
            }
            // Stripe SDK - separate chunk for payment functionality (only used in checkout)
            if (id.includes('@stripe')) {
              return 'stripe-vendor';
            }
            // Supabase - separate chunk (only used in dashboard/API calls)
            if (id.includes('@supabase')) {
              return 'supabase-vendor';
            }
            // Other vendor libraries - group smaller ones together
            if (id.includes('axios') || id.includes('slick-carousel') || id.includes('react-slick')) {
              return 'utils-vendor';
            }
            // Default vendor chunk for other node_modules
            return 'vendor';
          }
        },
        // Optimize chunk file names for better caching
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
      },
    },
    // Enable aggressive minification
    // esbuild is faster, terser provides better compression (saves ~10-15% more)
    // To use terser for maximum compression: npm install --save-dev terser
    // Then change minify to 'terser' and uncomment terserOptions below
    minify: 'esbuild',
    // esbuild minification options (already optimized by default)
    // For even better compression, switch to terser:
    // minify: 'terser',
    // terserOptions: {
    //   compress: {
    //     drop_console: true, // Remove console.log statements
    //     drop_debugger: true, // Remove debugger statements
    //     pure_funcs: ['console.log', 'console.info', 'console.debug'],
    //     passes: 2, // Multiple compression passes
    //     dead_code: true, // Remove unreachable code
    //     unused: true, // Remove unused variables
    //   },
    //   format: {
    //     comments: false, // Remove all comments
    //   },
    //   mangle: {
    //     safari10: true, // Fix Safari 10 issues
    //   },
    // },
    // Additional build optimizations
    cssMinify: true, // Minify CSS as well
    reportCompressedSize: false, // Disable compressed size reporting for faster builds
    // Target modern browsers for smaller output
    target: 'es2015', // Modern browsers support ES2015+
  },
  
  // Resolve aliases
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});

