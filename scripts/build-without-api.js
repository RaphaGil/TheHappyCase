import { execSync } from 'child_process';
import { existsSync, renameSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');
const apiDir = join(projectRoot, 'src/app/api');
const apiBackupDir = join(projectRoot, 'src/app/api.backup');
const sitemapFile = join(projectRoot, 'src/app/sitemap.js');
const sitemapBackupFile = join(projectRoot, 'src/app/sitemap.js.backup');
const robotsFile = join(projectRoot, 'src/app/robots.js');
const robotsBackupFile = join(projectRoot, 'src/app/robots.js.backup');

try {
  // Step 1: Temporarily move API directory out of the way
  if (existsSync(apiDir)) {
    console.log('📦 Temporarily moving API routes out of the way for static export...');
    renameSync(apiDir, apiBackupDir);
  }

  // Step 2: Temporarily move sitemap.js (not compatible with static export)
  if (existsSync(sitemapFile)) {
    console.log('📦 Temporarily moving sitemap.js out of the way for static export...');
    renameSync(sitemapFile, sitemapBackupFile);
  }

  // Step 3: Temporarily move robots.js (may have same issue)
  if (existsSync(robotsFile)) {
    console.log('📦 Temporarily moving robots.js out of the way for static export...');
    renameSync(robotsFile, robotsBackupFile);
  }

  // Step 4: Run Next.js build
  console.log('🔨 Running Next.js build...');
  execSync('next build', { 
    stdio: 'inherit',
    cwd: projectRoot,
    env: { ...process.env }
  });

  console.log('✅ Build completed successfully!');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
} finally {
  // Step 5: Restore all moved files/directories
  if (existsSync(apiBackupDir)) {
    console.log('📦 Restoring API routes...');
    renameSync(apiBackupDir, apiDir);
  }
  if (existsSync(sitemapBackupFile)) {
    console.log('📦 Restoring sitemap.js...');
    renameSync(sitemapBackupFile, sitemapFile);
  }
  if (existsSync(robotsBackupFile)) {
    console.log('📦 Restoring robots.js...');
    renameSync(robotsBackupFile, robotsFile);
  }
}
