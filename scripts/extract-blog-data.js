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
  
  // Helper function to extract string value from TypeScript string literal
  function extractStringValue(content, fieldName) {
    // Match field: 'value' or field: "value", handling escaped quotes
    const singleQuoteRegex = new RegExp(`${fieldName}:\\s*'((?:[^'\\\\]|\\\\.)*)'`, 's');
    const doubleQuoteRegex = new RegExp(`${fieldName}:\\s*"((?:[^"\\\\]|\\\\.)*)"`, 's');
    
    const singleMatch = content.match(singleQuoteRegex);
    const doubleMatch = content.match(doubleQuoteRegex);
    
    let value = singleMatch ? singleMatch[1] : (doubleMatch ? doubleMatch[1] : '');
    
    // Unescape common escape sequences
    value = value
      .replace(/\\'/g, "'")
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, '\\')
      .replace(/\\n/g, '\n')
      .replace(/\\t/g, '\t');
    
    return value;
  }
  
  // Find the 'en' object section
  const enSectionMatch = fileContent.match(/en:\s*\{([\s\S]*?)(?:\},\s*es:|$)/);
  if (!enSectionMatch) {
    console.error('❌ Error: Could not find "en" section in blog file');
    process.exit(1);
  }
  
  const enSection = enSectionMatch[1];
  
  // Extract fields from en section
  const title = extractStringValue(enSection, 'title');
  const excerpt = extractStringValue(enSection, 'excerpt');
  const imageUrl = extractStringValue(enSection, 'imageUrl');
  
  if (!title || !slug) {
    console.error('❌ Error: Could not extract required blog data (title and slug)');
    console.error(`   Title: "${title}"`);
    console.error(`   Slug: "${slug}"`);
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
