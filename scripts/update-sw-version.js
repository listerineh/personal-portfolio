#!/usr/bin/env node

/**
 * Script to automatically update Service Worker cache version
 * Updates the CACHE_NAME with current timestamp
 * Run this before each deployment to bust cache
 */

const fs = require('fs');
const path = require('path');

const SW_PATH = path.join(__dirname, '../public/sw.js');

function updateServiceWorkerVersion() {
  try {
    // Read current service worker file
    let swContent = fs.readFileSync(SW_PATH, 'utf8');
    
    // Generate new cache name with timestamp
    const now = new Date();
    const timestamp = now.toISOString().replace(/[:.]/g, '-').slice(0, -5); // Format: 2026-03-11T00-40-30
    const newCacheName = `listerineh-portfolio-${timestamp}`;
    
    // Replace CACHE_NAME value
    const cacheNameRegex = /const CACHE_NAME = ['"]([^'"]+)['"]/;
    const match = swContent.match(cacheNameRegex);
    
    if (!match) {
      console.error('❌ Could not find CACHE_NAME in sw.js');
      process.exit(1);
    }
    
    const oldCacheName = match[1];
    swContent = swContent.replace(cacheNameRegex, `const CACHE_NAME = '${newCacheName}'`);
    
    // Write updated content
    fs.writeFileSync(SW_PATH, swContent, 'utf8');
    
    console.log('✅ Service Worker cache version updated');
    console.log(`   Old: ${oldCacheName}`);
    console.log(`   New: ${newCacheName}`);
    
  } catch (error) {
    console.error('❌ Error updating service worker:', error.message);
    process.exit(1);
  }
}

updateServiceWorkerVersion();
