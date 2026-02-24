#!/usr/bin/env node

/**
 * Script para extraer datos de un archivo de blog
 * Uso: node scripts/extract-blog-data.js <blog-file-path>
 */

const fs = require('fs');
const path = require('path');

const blogFilePath = process.argv[2];

if (!blogFilePath) {
  console.error('❌ Error: Blog file path is required');
  console.log('\nUsage:');
  console.log('  node scripts/extract-blog-data.js <blog-file-path>');
  console.log('\nExample:');
  console.log('  node scripts/extract-blog-data.js src/lib/data/blog/my-new-post.ts');
  process.exit(1);
}

if (!fs.existsSync(blogFilePath)) {
  console.error(`❌ Error: File not found: ${blogFilePath}`);
  process.exit(1);
}

try {
  const fileContent = fs.readFileSync(blogFilePath, 'utf8');
  
  // Extract slug from filename (remove .ts extension)
  const fileName = path.basename(blogFilePath, '.ts');
  const slug = fileName;
  
  // Extract title from English version (en object)
  const titleMatch = fileContent.match(/en:\s*{[^}]*title:\s*['"]([^'"]+)['"]/s);
  const title = titleMatch ? titleMatch[1] : '';
  
  // Extract excerpt from English version
  const excerptMatch = fileContent.match(/en:\s*{[^}]*excerpt:\s*['"]([^'"]+)['"]/s);
  const excerpt = excerptMatch ? excerptMatch[1] : '';
  
  // Extract imageUrl from English version
  const imageMatch = fileContent.match(/en:\s*{[^}]*imageUrl:\s*['"]([^'"]+)['"]/s);
  const imageUrl = imageMatch ? imageMatch[1] : '';
  
  if (!title || !slug) {
    console.error('❌ Error: Could not extract required blog data (title and slug)');
    process.exit(1);
  }
  
  // Output as JSON for GitHub Actions
  const blogData = {
    title,
    slug,
    excerpt,
    imageUrl: imageUrl ? `https://listerineh.dev${imageUrl}` : ''
  };
  
  console.log(JSON.stringify(blogData));
  
} catch (error) {
  console.error('❌ Error reading or parsing blog file:', error.message);
  process.exit(1);
}
