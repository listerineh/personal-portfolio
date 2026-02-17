#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const playwrightCacheDir = path.join(
  process.env.HOME || process.env.USERPROFILE,
  '.cache',
  'ms-playwright'
);

const browsersInstalled = fs.existsSync(playwrightCacheDir) && 
  fs.readdirSync(playwrightCacheDir).length > 0;

if (browsersInstalled) {
  console.log('✓ Playwright browsers already installed');
  process.exit(0);
}

console.log('Installing Playwright browsers...');
console.log('This may take a few minutes on first run.\n');

try {
  execSync('npx playwright install', { stdio: 'inherit' });
  console.log('\n✓ Playwright setup complete!');
  process.exit(0);
} catch (error) {
  console.error('✗ Failed to install Playwright browsers');
  process.exit(1);
}
