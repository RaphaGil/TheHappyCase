import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Set the workspace root to silence the lockfile warning
  // This tells Next.js/Turbopack where the project root is
  // Using absolute path as required by Turbopack
  outputFileTracingRoot: resolve(__dirname),
  turbopack: {
    root: resolve(__dirname),
  },
  // Configure Next.js for static export (required for Netlify)
  // API routes are handled by Netlify Functions, so we can use static export
  output: 'export',
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  // Skip trailing slash redirects (not needed for static export)
  trailingSlash: false,
};

export default nextConfig;
