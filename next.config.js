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
};

export default nextConfig;
