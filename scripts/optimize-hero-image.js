/**
 * Generates optimized WebP for the hero image.
 * Run: node scripts/optimize-hero-image.js
 *
 * Requires: npm install sharp --save-dev
 */

import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const publicDir = join(__dirname, '..', 'public', 'images');
const inputPath = join(publicDir, 'heroimage.png');
const outputWebP = join(publicDir, 'heroimage.webp');

async function main() {
  if (!existsSync(inputPath)) {
    console.error('Input not found:', inputPath);
    process.exit(1);
  }

  try {
    // WebP at max 1600px width (covers most viewports), quality 82
    await sharp(inputPath)
      .resize(1600, null, { withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(outputWebP);
    console.log('Created:', outputWebP);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

main();
