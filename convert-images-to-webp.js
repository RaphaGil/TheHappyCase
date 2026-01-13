#!/usr/bin/env node

/**
 * Image Conversion Script
 * Converts PNG/JPG files to WebP format
 * 
 * Prerequisites:
 * npm install -g sharp-cli
 * OR
 * npm install sharp
 * 
 * Usage:
 * node convert-images-to-webp.js
 */

const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, 'public', 'images');
let convertedCount = 0;
let skippedCount = 0;
let errorCount = 0;

// Check if sharp is available
let sharp;
try {
  sharp = require('sharp');
} catch (e) {
  console.error('❌ Error: sharp package not found!');
  console.log('\nPlease install sharp first:');
  console.log('  npm install sharp');
  console.log('\nOr use ImageMagick:');
  console.log('  macOS: brew install imagemagick');
  console.log('  Linux: sudo apt-get install imagemagick');
  console.log('  Windows: Download from https://imagemagick.org/\n');
  process.exit(1);
}

function isWebPFormat(filePath) {
  try {
    const buffer = fs.readFileSync(filePath);
    // WebP files start with RIFF header and have WEBP at offset 8
    return buffer.length >= 12 &&
           buffer[0] === 0x52 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x46 &&
           buffer[8] === 0x57 && buffer[9] === 0x45 && buffer[10] === 0x42 && buffer[11] === 0x50;
  } catch (e) {
    return false;
  }
}

function convertToWebP(filePath) {
  return new Promise((resolve, reject) => {
    const ext = path.extname(filePath).toLowerCase();
    
    // Check if file is already WebP format (regardless of extension)
    if (isWebPFormat(filePath)) {
      skippedCount++;
      resolve({ skipped: true, reason: 'Already WebP format' });
      return;
    }
    
    // Determine output path
    let outputPath;
    if (ext === '.webp') {
      // File has .webp extension but is PNG/JPG format - convert to temp file first
      outputPath = filePath + '.tmp';
    } else if (['.png', '.jpg', '.jpeg'].includes(ext)) {
      // PNG/JPG file - convert to .webp
      outputPath = filePath.replace(/\.(png|jpg|jpeg)$/i, '.webp');
      
      // Skip if output already exists and is valid WebP
      if (fs.existsSync(outputPath)) {
        if (isWebPFormat(outputPath)) {
          skippedCount++;
          resolve({ skipped: true, reason: 'Output file already exists and is valid WebP' });
          return;
        }
        // Output exists but is not WebP - we'll overwrite it
      }
    } else {
      // Not an image file we can convert
      skippedCount++;
      resolve({ skipped: true, reason: 'Not a supported image format' });
      return;
    }
    
    // Get original size before conversion
    const originalSize = fs.statSync(filePath).size;
    
    sharp(filePath)
      .webp({ quality: 85, effort: 6 })
      .toFile(outputPath)
      .then(() => {
        // Get new file size
        const newSize = fs.statSync(outputPath).size;
        const savings = ((1 - newSize / originalSize) * 100).toFixed(1);
        
        // If converting in place (file had .webp extension), replace original
        if (ext === '.webp') {
          fs.unlinkSync(filePath);
          fs.renameSync(outputPath, filePath);
          outputPath = filePath;
        } else {
          // Remove original PNG/JPG file
          fs.unlinkSync(filePath);
        }
        
        convertedCount++;
        resolve({ 
          converted: true, 
          originalSize, 
          newSize, 
          savings,
          outputPath 
        });
      })
      .catch((err) => {
        // Clean up temp file if it exists
        if (ext === '.webp' && fs.existsSync(outputPath)) {
          try {
            fs.unlinkSync(outputPath);
          } catch (e) {
            // Ignore cleanup errors
          }
        }
        errorCount++;
        reject(err);
      });
  });
}

async function processDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      await processDirectory(fullPath);
    } else if (entry.isFile()) {
      try {
        const result = await convertToWebP(fullPath);
        if (result.converted) {
          console.log(`✅ Converted: ${path.relative(imagesDir, fullPath)}`);
          console.log(`   Size: ${(result.originalSize / 1024 / 1024).toFixed(2)}MB → ${(result.newSize / 1024 / 1024).toFixed(2)}MB (${result.savings}% reduction)`);
        } else if (!result.skipped) {
          console.log(`⏭️  Skipped: ${path.relative(imagesDir, fullPath)} (${result.reason})`);
        }
      } catch (err) {
        console.error(`❌ Error converting ${fullPath}:`, err.message);
      }
    }
  }
}

async function main() {
  console.log('🖼️  Starting image conversion to WebP...\n');
  console.log('Images directory:', imagesDir);
  console.log('Quality: 85% (recommended for photos)\n');
  
  if (!fs.existsSync(imagesDir)) {
    console.error('❌ Images directory not found:', imagesDir);
    process.exit(1);
  }
  
  const startTime = Date.now();
  
  try {
    await processDirectory(imagesDir);
    
    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000).toFixed(2);
    
    console.log('\n' + '='.repeat(50));
    console.log('✨ Conversion Complete!');
    console.log('='.repeat(50));
    console.log(`✅ Converted: ${convertedCount} files`);
    console.log(`⏭️  Skipped: ${skippedCount} files`);
    console.log(`❌ Errors: ${errorCount} files`);
    console.log(`⏱️  Duration: ${duration}s`);
    console.log('='.repeat(50));
  } catch (err) {
    console.error('❌ Fatal error:', err);
    process.exit(1);
  }
}

main();
