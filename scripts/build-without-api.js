import { execSync } from 'child_process';
import { existsSync, renameSync, mkdirSync, rmSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');
const apiDir = join(projectRoot, 'src/app/api');
// Move backup outside src/app so Next.js doesn't try to process it as a route
const apiBackupDir = join(projectRoot, '.build-backup/api');
const sitemapFile = join(projectRoot, 'src/app/sitemap.js');
const sitemapBackupFile = join(projectRoot, '.build-backup/sitemap.js');
const robotsFile = join(projectRoot, 'src/app/robots.js');
const robotsBackupFile = join(projectRoot, '.build-backup/robots.js');

try {
  // Create backup directory if it doesn't exist (outside src/app so Next.js doesn't scan it)
  const backupDir = join(projectRoot, '.build-backup');
  if (!existsSync(backupDir)) {
    mkdirSync(backupDir, { recursive: true });
  }

  // Clean up any existing backup from previous failed builds (both old and new locations)
  if (existsSync(apiBackupDir)) {
    console.log('🧹 Cleaning up existing backup...');
    rmSync(apiBackupDir, { recursive: true, force: true });
  }
  
  // Also clean up any old backup files that might be in src/app/ from previous failed builds
  const oldApiBackup = join(projectRoot, 'src/app/api.backup');
  const oldSitemapBackup = join(projectRoot, 'src/app/sitemap.js.backup');
  const oldRobotsBackup = join(projectRoot, 'src/app/robots.js.backup');
  
  if (existsSync(oldApiBackup)) {
    console.log('🧹 Cleaning up old backup directory in src/app/...');
    rmSync(oldApiBackup, { recursive: true, force: true });
  }
  if (existsSync(oldSitemapBackup)) {
    rmSync(oldSitemapBackup, { force: true });
  }
  if (existsSync(oldRobotsBackup)) {
    rmSync(oldRobotsBackup, { force: true });
  }
  

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

  // Step 3: Temporarily move robots.js (not compatible with static export)
  // We use the static robots.txt from public/ instead
  if (existsSync(robotsFile)) {
    console.log('📦 Temporarily moving robots.js out of the way for static export...');
    renameSync(robotsFile, robotsBackupFile);
  }

  // Step 4: Clean .next directory to remove stale cache
  const nextDir = join(projectRoot, '.next');
  if (existsSync(nextDir)) {
    console.log('🧹 Cleaning .next cache...');
    rmSync(nextDir, { recursive: true, force: true });
  }

  // Step 5: Run Next.js build
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
  // Step 6: Restore all moved files/directories
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
