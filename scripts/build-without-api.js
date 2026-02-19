import { execSync } from 'child_process';
import { existsSync, renameSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');
const apiDir = join(projectRoot, 'src/app/api');
const apiBackupDir = join(projectRoot, 'src/app/api.backup');

try {
  // Step 1: Temporarily move API directory out of the way
  if (existsSync(apiDir)) {
    console.log('📦 Temporarily moving API routes out of the way for static export...');
    renameSync(apiDir, apiBackupDir);
  }

  // Step 2: Run Next.js build
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
  // Step 3: Restore API directory
  if (existsSync(apiBackupDir)) {
    console.log('📦 Restoring API routes...');
    renameSync(apiBackupDir, apiDir);
  }
}
